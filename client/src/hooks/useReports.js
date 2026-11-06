import { useCallback, useEffect, useRef, useState } from 'react';
import { createDemoComments, createDemoReports } from '../data/communityData';
import { ENV } from '../utils/constants';
import { wait } from '../utils/async';
import { detectPersonalInfo, personalInfoMessage } from '../utils/safety';
import { MAX_PENDING, clearStore, readStore, updateStore } from '../utils/demoStorage';
import { ApiError, getErrorMessage, isCancel } from '../services/api';
import { normalizeComment, normalizeReport, reportsService } from '../services/reportsService';

const SAVE_FAILED =
  'Your browser would not let us save this, so it will be lost when you refresh. Check that private browsing or blocked site data is not turned on.';

const fingerprint = (title, summary) =>
  `${String(title).trim().toLowerCase()}|${String(summary).trim().toLowerCase()}`;

const makeId = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Builds the demo state: regenerated demonstration data PLUS the user's own
 * saved data from localStorage. The two are kept separate in storage and only
 * merged here for display.
 */
function buildDemoState() {
  const store = readStore();
  const baseReports = createDemoReports();
  const baseComments = createDemoComments();
  const reportIds = new Set(baseReports.map((r) => r.id));

  const commentsByReport = {};
  const reports = baseReports.map((report) => {
    const mine = store.userComments[report.id] ?? [];
    const hidden = new Set(store.flaggedComments[report.id] ?? []);

    commentsByReport[report.id] = [...(baseComments[report.id] ?? []), ...mine].map((c) =>
      hidden.has(c.id) ? { ...c, flagged: true } : c,
    );

    return { ...report, commentCount: report.commentCount + mine.length };
  });

  return {
    reports,
    commentsByReport,
    pending: store.pending,
    flaggedReportIds: store.flaggedReports.filter((id) => reportIds.has(id)),
  };
}

/**
 * Community state manager.
 *
 * - VITE_USE_DEMO_DATA is not "false" -> synthetic demo data, plus the user's own
 *   reports/comments saved in THIS browser's localStorage (not shared with
 *   other users or devices).
 * - VITE_USE_DEMO_DATA=false -> real API calls through services/reportsService.
 *
 * Moderation model: a submitted report goes to `pending` (visible only to the
 * submitter) and is NEVER added to the public feed and never marked verified.
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
  const votingRef = useRef(new Set());
  const pendingRef = useRef([]);
  const submitInflightRef = useRef(null);
  const lastCommentRef = useRef({ key: '', at: 0 });

  useEffect(() => {
    pendingRef.current = pending;
  }, [pending]);

  const reportError = useCallback((err) => setActionError(getErrorMessage(err)), []);
  const clearActionError = useCallback(() => setActionError(null), []);

  /** Saves user data in demo mode. Warns the user if the browser refuses. */
  const persist = useCallback((mutator) => {
    if (!ENV.USE_DEMO_DATA) return;
    if (!updateStore(mutator)) setActionError(SAVE_FAILED);
  }, []);

  const run = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      if (ENV.USE_DEMO_DATA) {
        await wait(650, signal);
        const demo = buildDemoState();
        setReports(demo.reports);
        setCommentsByReport(demo.commentsByReport);
        setPending(demo.pending);
        setFlaggedReportIds(demo.flaggedReportIds);
      } else {
        const items = await reportsService.list({ signal });
const nextReports = [];
const nextComments = {};

for (const raw of items) {
  const report = normalizeReport(raw);

  if (!report.id) continue;

  const comments = await reportsService.listComments(report.id, { signal });

  nextComments[report.id] = comments;

  nextReports.push({
    ...report,
    commentCount: comments.length,
  });
}

setReports(nextReports);
setCommentsByReport(nextComments);

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
    async (reportId, rawText) => {
      const clean = String(rawText ?? '').trim();

      if (clean.length < 3) throw new ApiError('Please write at least a few words.', { code: 'INVALID' });
      const found = detectPersonalInfo(clean);
      if (found.length) throw new ApiError(personalInfoMessage(found), { code: 'PERSONAL_INFO' });

      // Block double-posts caused by repeated clicks
      const key = `${reportId}|${clean.toLowerCase()}`;
      const now = Date.now();
      if (lastCommentRef.current.key === key && now - lastCommentRef.current.at < 3000) {
        throw new ApiError('That comment was just posted.', { code: 'DUPLICATE' });
      }
      lastCommentRef.current = { key, at: now };

      let comment;
      try {
        if (ENV.USE_DEMO_DATA) {
          comment = {
            id: makeId('c'),
            author: 'You (anonymous)',
            text: clean,
            createdAt: new Date().toISOString(),
            isDemo: false,
            flagged: false,
          };
        } else {
          comment = normalizeComment(await reportsService.addComment(reportId, clean));
        }
      } catch (err) {
        lastCommentRef.current = { key: '', at: 0 }; // allow a retry after a failure
        throw err;
      }

      setCommentsByReport((prev) => ({
        ...prev,
        [reportId]: [...(prev[reportId] ?? []), comment],
      }));
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, commentCount: r.commentCount + 1 } : r)),
      );
      persist((s) => ({
        ...s,
        userComments: { ...s.userComments, [reportId]: [...(s.userComments[reportId] ?? []), comment] },
      }));
      return comment;
    },
    [persist],
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
        persist((s) => {
          const current = s.flaggedComments[reportId] ?? [];
          return {
            ...s,
            flaggedComments: {
              ...s.flaggedComments,
              [reportId]: current.includes(commentId) ? current : [...current, commentId],
            },
          };
        });
      } catch (err) {
        mark(false);
        reportError(err);
      }
    },
    [persist, reportError],
  );

  const flagReport = useCallback(
    async (reportId, reason, details) => {
      if (!ENV.USE_DEMO_DATA) await reportsService.flagReport(reportId, { reason, details });
      setFlaggedReportIds((prev) => (prev.includes(reportId) ? prev : [...prev, reportId]));
      setFlags((prev) => [
        ...prev,
        { reportId, reason, details, createdAt: new Date().toISOString() },
      ]);
      persist((s) => ({
        ...s,
        flaggedReports: s.flaggedReports.includes(reportId)
          ? s.flaggedReports
          : [...s.flaggedReports, reportId],
      }));
    },
    [persist],
  );

  const submitReport = useCallback(
    (data) => {
      // A second click while the first submission is still running gets the same result
      if (submitInflightRef.current) return submitInflightRef.current;

      const task = (async () => {
        if (!data?.title?.trim() || !data?.summary?.trim()) {
          throw new ApiError('A title and a description are required.', { code: 'INVALID' });
        }
        if (pendingRef.current.length >= MAX_PENDING) {
          throw new ApiError(
            `You already have ${MAX_PENDING} reports awaiting moderation. Withdraw one first.`,
            { code: 'LIMIT' },
          );
        }
        const print = fingerprint(data.title, data.summary);
        if (pendingRef.current.some((p) => fingerprint(p.title, p.summary) === print)) {
          throw new ApiError('You have already submitted this report. It is awaiting moderation.', {
            code: 'DUPLICATE',
          });
        }

        let item;
        if (ENV.USE_DEMO_DATA) {
          await wait(700);
          item = {
            ...data,
            id: makeId('pending'),
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

        setPending((prev) => [item, ...prev].slice(0, MAX_PENDING));
        persist((s) => ({ ...s, pending: [item, ...s.pending].slice(0, MAX_PENDING) }));
        return item;
      })();

      submitInflightRef.current = task;
      const release = () => {
        submitInflightRef.current = null;
      };
      task.then(release, release);
      return task;
    },
    [persist],
  );

  const withdrawPending = useCallback(
    async (id) => {
      try {
        if (!ENV.USE_DEMO_DATA) await reportsService.withdraw(id);
        setPending((prev) => prev.filter((p) => p.id !== id));
        persist((s) => ({ ...s, pending: s.pending.filter((p) => p.id !== id) }));
      } catch (err) {
        reportError(err);
      }
    },
    [persist, reportError],
  );

  /** Demo helper: forgets everything this browser saved and reloads the demo data. */
  const clearLocalData = useCallback(() => {
    clearStore();
    setPending([]);
    setVotedIds([]);
    setFlaggedReportIds([]);
    setFlags([]);
    setActionError(null);
    reload();
  }, [reload]);

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
    clearLocalData,
    toggleUpvote,
    addComment,
    flagComment,
    flagReport,
    submitReport,
    withdrawPending,
  };
}