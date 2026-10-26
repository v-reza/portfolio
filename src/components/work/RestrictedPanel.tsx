import s from "./RestrictedPanel.module.css";

type Props = {
  /** e.g. "Restricted access" */
  title: string;
  /** One short line of context. */
  note: string;
};

/**
 * Flat lock-up in the manner of a simple logo slide: a mark, one wordmark,
 * one line of context. Used where a real screen cannot be published.
 */
export function RestrictedPanel({ title, note }: Props) {
  return (
    <div className={s.panel} role="img" aria-label={`${title}. ${note}`}>
      <svg className={s.mark} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="15.5" r="1.4" fill="currentColor" />
      </svg>
      <p className={s.wordmark}>{title}</p>
      <p className={s.note}>{note}</p>
    </div>
  );
}
