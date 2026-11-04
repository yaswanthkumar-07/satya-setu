import axios from 'axios';
import { ENV } from '../utils/constants';

/**
 * Centralised Axios instance. Every network call in the app goes through it.
 *
 * - Base URL comes from VITE_API_BASE_URL (no secrets are stored here).
 * - Errors are normalised into ApiError with a safe, user-readable message.
 * - Cancelled requests (AbortController) are passed through untouched.
 */

export const isCancel = axios.isCancel;

export class ApiError extends Error {
  constructor(message, { status = null, code = 'UNKNOWN', details = null } = {}) {
    super(message);
    this.name = 'ApiError';
    this.isApiError = true;
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const STATUS_MESSAGES = {
  400: 'The request was not valid. Please check what you entered.',
  401: 'You need to sign in to do that.',
  403: 'You do not have permission to do that.',
  404: 'We could not find what you asked for.',
  408: 'The request timed out. Please try again.',
  413: 'What you sent is too large.',
  429: 'Too many requests. Please wait a moment and try again.',
};

function toApiError(error) {
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ApiError('The server took too long to respond. Please try again.', {
      code: 'TIMEOUT',
    });
  }

  if (!error.response) {
    return new ApiError('We could not reach the server. Check your connection and try again.', {
      code: 'NETWORK',
    });
  }

  const { status, data } = error.response;
  const serverMessage = typeof data?.message === 'string' ? data.message : null;

  // Show the server's message for client errors (for example validation).
  // Never show raw 5xx messages, which may leak internals.
  let message;
  if (serverMessage && status < 500) message = serverMessage;
  else if (status >= 500) message = 'The server had a problem. Please try again later.';
  else message = STATUS_MESSAGES[status] ?? 'Something went wrong. Please try again.';

  return new ApiError(message, {
    status,
    code: data?.code ?? `HTTP_${status}`,
    details: data?.errors ?? null,
  });
}

export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000,
  headers: { Accept: 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => (axios.isCancel(error) ? Promise.reject(error) : Promise.reject(toApiError(error))),
);

/** Accepts either { data: ... } or a bare payload. */
export const unwrap = (response) => response.data?.data ?? response.data;

/** Safe message for the UI. Unknown (non-API) errors get the generic fallback. */
export function getErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  return error?.isApiError ? error.message : fallback;
}