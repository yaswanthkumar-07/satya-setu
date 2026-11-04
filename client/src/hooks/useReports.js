import { useCallback, useEffect, useRef, useState } from 'react';
import { createDemoComments, createDemoReports } from '../data/communityData';
import { ENV } from '../utils/constants';
import { wait } from '../utils/async';
import { getErrorMessage, isCancel } from '../services/api';
import { normalizeComment, normalizeReport, reportsService } from '../services/reportsService';

/**
 * Community state manager.
 *
 * - VITE_USE_DEMO_DATA=true  -> local synthetic data with a short simulated delay.
 * - VITE_USE_DEMO_DATA=false -> real API calls through services/reportsService.
 *
 * Moderation model: a submitted report goes to `pending` (visible only to the
 * submitter) and is NEVER added to the public feed by the client.
 *
 * Async actions either resolve, or throw an error whose message is safe to
 * show (see getErrorMessage). Upvotes and comment flags are optimistic and
 * roll back on failure, then expose `actionError`.
 */
export function useReports() {
  const [reports, setReports] = useState([]);
  const [commentsByReport, setCommentsByReport] = useState({});
  const [pending, setPending] = useState([]);
  const [votedIds, setVotedIds] = useState([]);
  const [flaggedReportIds, setFlaggedReportIds] = useState([]);
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const controllerRef = useRef(null);
  const counterRef = useRef(0);
  const votingRef = useRef(new Set());

  const nextId = useCallback((prefix) => {
    counterRef.current += 1;
    return `${prefix}-${Date.now()}-${counterRef.current}`;
  }, []);

  const reportError = useCallback((err) => setActionError(getErrorMessage(err)), []);
  const clearActionError = useCallback(() => setActionError(null), []);

  const run = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      if (ENV.USE_DEMO_DATA) {
        await wait(650, signal);
        setReports(createDemoReports());
        setCommentsByReport(createDemoComments());
      } else {
        const items = await reportsService.list({ signal });
        const nextReports = [];
        const nextComments = {};

        items.forEach((raw) => {
          const report = normalizeReport(raw);
          if (!report.id) return;
          const comments = Array.isArray(raw.comments) ? raw.comments.map(normalizeComment) : [];
          nextComments[report.id] = comments;
          nextReports.push({
            ...report,
            commentCount: raw.commentCount ?? comments.length,
          });
        });

        setReports(nextReports);
        setCommentsByReport(nextComments);
      }
    } catch (err) {
      if (signal.aborted || isCancel(err)) return;
      setError(getErrorMessage(err, 'We could not load community reports. Please try again.'));
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, []);

  const reload = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    run(controller.signal);
  }, [run]);

  useEffect(() => {
    reload();
    return () => controllerRef.current?.abort();
  }, [reload]);

  const toggleUpvote = useCallback(
    async (id) => {
      if (votingRef.current.has(id)) return;
      votingRef.current.add(id);

      const already = votedIds.includes(id);
      const apply = (on) => {
        setVotedIds((prev) =>
          on ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((x) => x !== id),
        );
        setReports((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, upvotes: Math.max(0, r.upvotes + (on ? 1 : -1)) } : r,
          ),
        );
      };

      apply(!already);
      try {
        if (!ENV.USE_DEMO_DATA) await reportsService.setUpvote(id, !already);
      } catch (err) {
        apply(already); // roll back
        reportError(err);
      } finally {
        votingRef.current.delete(id);
      }
    },
    [votedIds, reportError],
  );

  const addComment = useCallback(
    async (reportId, text) => {
      let comment;
      if (ENV.USE_DEMO_DATA) {
        comment = {
          id: nextId('c'),
          author: 'You (anonymous)',
          text,
          createdAt: new Date().toISOString(),
          isDemo: false,
          flagged: false,
        };
      } else {
        comment = normalizeComment(await reportsService.addComment(reportId, text));
      }

      setCommentsByReport((prev) => ({
        ...prev,
        [reportId]: [...(prev[reportId] ?? []), comment],
      }));
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, commentCount: r.commentCount + 1 } : r)),
      );
      return comment;
    },
    [nextId],
  );

  const flagComment = useCallback(
    async (reportId, commentId) => {
      const mark = (flagged) =>
        setCommentsByReport((prev) => ({
          ...prev,
          [reportId]: (prev[reportId] ?? []).map((c) =>
            c.id === commentId ? { ...c, flagged } : c,
          ),
        }));

      mark(true); // hide immediately for the person who reported it
      try {
        if (!ENV.USE_DEMO_DATA) await reportsService.flagComment(reportId, commentId);
      } catch (err) {
        mark(false);
        reportError(err);
      }
    },
    [reportError],
  );

  const flagReport = useCallback(async (reportId, reason, details) => {
    if (!ENV.USE_DEMO_DATA) await reportsService.flagReport(reportId, { reason, details });
    setFlaggedReportIds((prev) => (prev.includes(reportId) ? prev : [...prev, reportId]));
    setFlags((prev) => [
      ...prev,
      { reportId, reason, details, createdAt: new Date().toISOString() },
    ]);
  }, []);

  const submitReport = useCallback(
    async (data) => {
      let item;
      if (ENV.USE_DEMO_DATA) {
        await wait(700);
        item = {
          ...data,
          id: nextId('pending'),
          createdAt: new Date().toISOString(),
          status: 'review',
          upvotes: 0,
          commentCount: 0,
          isDemo: false,
        };
      } else {
        const saved = normalizeReport(await reportsService.create(data));
        // Whatever the server says, a new submission is shown as awaiting moderation.
        item = { ...saved, status: 'review', isDemo: false };
      }

      setPending((prev) => [item, ...prev]);
      return item;
    },
    [nextId],
  );

  const withdrawPending = useCallback(
    async (id) => {
      try {
        if (!ENV.USE_DEMO_DATA) await reportsService.withdraw(id);
        setPending((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        reportError(err);
      }
    },
    [reportError],
  );

  return {
    reports,
    commentsByReport,
    pending,
    votedIds,
    flaggedReportIds,
    flags,
    loading,
    error,
    actionError,
    clearActionError,
    reload,
    toggleUpvote,
    addComment,
    flagComment,
    flagReport,
    submitReport,
    withdrawPending,
  };
}