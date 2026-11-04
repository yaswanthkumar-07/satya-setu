import { useRef, useState } from 'react';
import { Film, ImagePlus, Upload, X } from 'lucide-react';
import { formatBytes } from '../../utils/format';

export const MAX_IMAGES = 4;
export const MAX_VIDEOS = 1;
const MAX_IMAGE_MB = 5;
const MAX_VIDEO_MB = 25;

/**
 * Attachment interface. Files stay in the browser: nothing is uploaded in
 * this prototype. `items` is an array of { id, file, kind, url }.
 */
export default function MediaPicker({ items, onChange }) {
  const inputRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleSelect = (event) => {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = '';

    const next = [...items];
    const problems = [];

    picked.forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (!isImage && !isVideo) {
        problems.push(`${file.name}: only images and videos are supported.`);
        return;
      }

      const kind = isImage ? 'image' : 'video';
      const id = `${file.name}-${file.size}-${file.lastModified}`;

      if (next.some((i) => i.id === id)) return;

      const count = next.filter((i) => i.kind === kind).length;
      if (kind === 'image' && count >= MAX_IMAGES) {
        problems.push(`You can attach up to ${MAX_IMAGES} images.`);
        return;
      }
      if (kind === 'video' && count >= MAX_VIDEOS) {
        problems.push(`You can attach ${MAX_VIDEOS} video.`);
        return;
      }

      const limitMb = kind === 'image' ? MAX_IMAGE_MB : MAX_VIDEO_MB;
      if (file.size > limitMb * 1024 * 1024) {
        problems.push(`${file.name} is larger than ${limitMb} MB.`);
        return;
      }

      next.push({ id, file, kind, url: URL.createObjectURL(file) });
    });

    onChange(next);
    setMessage([...new Set(problems)].join(' '));
  };

  const handleRemove = (id) => {
    const target = items.find((i) => i.id === id);
    if (target) URL.revokeObjectURL(target.url);
    onChange(items.filter((i) => i.id !== id));
    setMessage('');
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleSelect}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-paper px-4 py-6 text-center transition hover:border-electric/60 hover:bg-electric/5"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-electric/10 text-electric">
          <Upload className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-sm font-semibold text-midnight">Add photos or a video</span>
        <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
            Up to {MAX_IMAGES} images, {MAX_IMAGE_MB} MB each
          </span>
          <span className="inline-flex items-center gap-1">
            <Film className="h-3.5 w-3.5" aria-hidden="true" />
            {MAX_VIDEOS} video, {MAX_VIDEO_MB} MB
          </span>
        </span>
      </button>

      {message && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600">
          {message}
        </p>
      )}

      {items.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item) => (
            <li key={item.id} className="relative overflow-hidden rounded-xl border border-line bg-white">
              {item.kind === 'image' ? (
                <img
                  src={item.url}
                  alt={`Preview of ${item.file.name}`}
                  className="h-24 w-full object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  muted
                  preload="metadata"
                  className="h-24 w-full bg-midnight object-cover"
                  aria-label={`Preview of ${item.file.name}`}
                />
              )}
              <div className="px-2.5 py-2">
                <p className="truncate text-xs font-semibold text-ink">{item.file.name}</p>
                <p className="text-[0.7rem] text-muted">{formatBytes(item.file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                aria-label={`Remove ${item.file.name}`}
                className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-midnight/80 text-white transition hover:bg-red-600"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-3 text-xs leading-relaxed text-muted">
        Avoid showing faces of private people, children, ID documents or vehicle number plates.
        Files stay in your browser in this prototype and are not uploaded.
      </p>
    </div>
  );
}