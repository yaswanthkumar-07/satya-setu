# SATYA SETU: API contract for the Express + MongoDB backend

The frontend (`client/src/services`) expects the following. Responses may be
either `{ "data": ... }` or the bare value. Errors should be
`{ "message": "...", "code": "...", "errors": { field: "reason" } }` with a
proper HTTP status. Messages for 4xx errors are shown to users, so keep them
plain and safe. 5xx messages are never shown.

Base URL: `VITE_API_BASE_URL` (for example `/api`).

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/reports` | Public feed: ONLY moderator-approved reports |
| POST | `/reports` | Submit a report. Stored with status `review`. Never public until approved |
| DELETE | `/reports/:id` | Withdraw the submitter's own pending report |
| POST | `/reports/:id/upvote` | Add an upvote (idempotent per voter) |
| DELETE | `/reports/:id/upvote` | Remove the voter's upvote |
| POST | `/reports/:id/comments` | Add a comment `{ text }`. Returns the comment |
| POST | `/reports/:id/comments/:commentId/flag` | Flag a comment for moderation |
| POST | `/reports/:id/flag` | Flag a report `{ reason, details }` |
| GET | `/cases` | The curated case register |
| POST | `/contact` | Contact message `{ name, email, topic, message }` |
| POST | `/feedback` | Anonymous feedback `{ rating, topic, message }` |

## Report shape (GET /reports)

    {
      "id": "...",                 // or "_id" (the client accepts both)
      "title": "string",
      "summary": "string",         // the form sends this as "summary"
      "category": "Bribery",
      "sector": "Government" | "Private",
      "state": "Andhra Pradesh",
      "district": "Guntur",
      "locality": "",
      "organisation": "",
      "incidentDate": "YYYY-MM-DD" | null,
      "status": "unverified" | "review" | "evidence" | "verified",
      "upvotes": 0,
      "commentCount": 0,
      "media": { "images": 0, "videos": 0 },
      "createdAt": "ISO date",
      "comments": [ { "id": "...", "author": "Anonymous citizen", "text": "...", "createdAt": "ISO date" } ]
    }

`comments` is optional. If absent the feed shows a count and an empty thread.

## Case shape (GET /cases)

Same fields as `src/data/intelligenceData.js`: `id, title, startYear, period,
sector (Government|Private|Mixed), area, state, location, geo ({place,lat,lng}|null),
status (allegation|investigation|court|conviction), statusNote, summary, outcome,
timeline [{year, kind, text}], sources [{label, url}]`.
The client DROPS any case whose status is not one of the four allowed values,
so a wrong status can never be displayed by accident.

## Moderation and safety rules the SERVER must enforce

The client-side checks (phone, email, Aadhaar-style and PAN-style patterns) are
a convenience only. They can be bypassed, so the server must repeat them.

1. New reports are saved as `review` and excluded from `GET /reports` until a moderator approves them.
2. Re-run personal-information detection on title, summary, locality, organisation and comments. Reject or hold matches.
3. Validate lengths and enums (category, sector, state, district) exactly as the form does.
4. Keep an audit trail of moderator actions (who approved, edited or removed what, and when).
5. Never let a user set `status`, `upvotes`, `isDemo` or `createdAt`. Ignore those fields on input.
6. A report becomes `verified` only when a moderator links an official record or judgment.
7. Add a legal and takedown process for defamation complaints before launch.
8. Rate-limit write endpoints and add abuse protection (for example express-rate-limit), plus helmet, strict CORS and body-size limits.
9. De-duplicate upvotes per voter (session or account). Anonymous voting needs an abuse strategy.
10. Do not log request bodies for report and comment endpoints.

## Media

The prototype form sends only attachment COUNTS (`media.images`, `media.videos`).
Real uploads need a storage design (object storage with signed upload URLs,
malware scanning, EXIF stripping, face and number-plate review) and are not
implemented in the frontend yet.

## Suggested MongoDB collections

- `reports`: report fields above plus `moderation { state, reviewedBy, reviewedAt, notes }`.
- `comments`: `reportId, text, flaggedCount, hidden, createdAt`.
- `flags`: `targetType (report|comment), targetId, reason, details, createdAt`.
- `cases`: the case shape above. Keep `sources` with deep links to primary records.
- `messages`: contact and feedback submissions.