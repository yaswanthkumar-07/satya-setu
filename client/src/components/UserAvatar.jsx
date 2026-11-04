import { useState } from 'react';

/** Name to show for a Firebase user: displayName, else the part of the email before @. */
export function getDisplayName(user) {
  if (!user) return '';
  const name = typeof user.displayName === 'string' ? user.displayName.trim() : '';
  if (name) return name;
  const local = typeof user.email === 'string' ? user.email.split('@')[0] : '';
  return local || 'Account';
}

function initialsOf(name) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('') || '?'
  );
}

/**
 * Profile photo from user.photoURL, with an initials fallback when there is no
 * photo or the image fails to load.
 */
export default function UserAvatar({ user, className = 'h-9 w-9', textClassName = 'text-sm' }) {
  const [failedUrl, setFailedUrl] = useState('');
  const url = user?.photoURL || '';
  const showPhoto = Boolean(url) && failedUrl !== url;
  const name = getDisplayName(user);

  if (showPhoto) {
    return (
      <img
        src={url}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setFailedUrl(url)}
        className={`${className} shrink-0 rounded-full object-cover ring-2 ring-white/60`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${className} ${textClassName} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric to-cyan font-bold text-white`}
    >
      {initialsOf(name)}
    </span>
  );
}