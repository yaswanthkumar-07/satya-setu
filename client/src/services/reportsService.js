import { api, unwrap } from './api';
import { REPORT_STATUS } from '../utils/status';

const toId = (item) => String(item?.id ?? item?._id ?? '');
const toCount = (value) => Math.max(0, Number(value) || 0);

/** Converts an API comment (Mongo-style or not) to the shape the UI expects. */
export function normalizeComment(raw) {
  return {
    id: String(raw.id ?? raw._id ?? raw.commentId ?? ''),
    author: raw.author ?? raw.user_name ?? 'Anonymous citizen',
    text: String(raw.text ?? raw.comment ?? ''),
    createdAt: raw.createdAt ?? raw.created_at ?? new Date().toISOString(),
    isDemo: Boolean(raw.isDemo),
    flagged: false,
  };
}

/** Converts an API report to the shape the UI expects, with safe defaults. */
export function normalizeReport(raw) {
  const media = raw.media ?? {};
  return {
    id: toId(raw),
    title: String(raw.title ?? ''),
    summary: String(raw.summary ?? raw.description ?? ''),
    category: raw.category ?? 'Other',
    sector: raw.sector === 'Private' ? 'Private' : 'Government',
    state: raw.state ?? '',
    district: raw.district ?? '',
    locality: raw.locality ?? '',
    organisation: raw.organisation ?? '',
    incidentDate: raw.incidentDate ?? null,
    // Unknown statuses fall back to "under moderation review", never to "verified".
    status: REPORT_STATUS[raw.status] ? raw.status : 'review',
    upvotes: toCount(raw.upvotes),
    commentCount: toCount(raw.commentCount),
    createdAt: raw.createdAt ?? new Date().toISOString(),
    media: { images: toCount(media.images), videos: toCount(media.videos) },
    isDemo: Boolean(raw.isDemo),
  };
}

export const reportsService = {
  async list({ signal } = {}) {
  const response = unwrap(await api.get('/reports', { signal }));
  return Array.isArray(response) ? response : response.reports ?? [];
},

  async create(payload) {
  const location = [
    payload.locality,
    payload.district,
    payload.state,
  ].filter(Boolean).join(', ');

  const response = unwrap(
    await api.post('/reports', {
      title: payload.title,
      description: payload.summary,
      category: payload.category,
      location,
    })
  );

  return {
    id: response.reportId,
    title: payload.title,
    description: payload.summary,
    summary: payload.summary,
    category: payload.category,
    location,
    status: 'Pending',
    created_at: new Date().toISOString(),
  };
},

  async withdraw(id) {
    await api.delete(`/reports/${encodeURIComponent(id)}`);
  },

  async setUpvote(id, on) {
    const url = `/reports/${encodeURIComponent(id)}/upvote`;
    if (on) await api.post(url);
    else await api.delete(url);
  },
    async listComments(reportId, { signal } = {}) {
    const response = unwrap(
      await api.get(`/comments/report/${encodeURIComponent(reportId)}`, { signal })
    );

    const items = Array.isArray(response)
      ? response
      : response.comments ?? [];

    return items.map(normalizeComment);
  },
  async addComment(reportId, text, userName = 'Anonymous citizen') {
  const response = unwrap(
    await api.post('/comments', {
      report_id: reportId,
      user_name: userName,
      comment: text,
    })
  );

  return {
    id: response.commentId,
    author: userName,
    text,
    createdAt: new Date().toISOString(),
  };
},

  async flagComment(reportId, commentId) {
    await api.post(
      `/reports/${encodeURIComponent(reportId)}/comments/${encodeURIComponent(commentId)}/flag`,
    );
  },

  async flagReport(reportId, { reason, details }) {
    await api.post(`/reports/${encodeURIComponent(reportId)}/flag`, { reason, details });
  },
};