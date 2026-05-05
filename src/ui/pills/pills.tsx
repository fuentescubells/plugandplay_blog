import Link from "next/link";

interface PillProps {
  label: string;
  href?: string;
  count?: number;
  onClick?: () => void;
}

export function Pill({ label, href, count, onClick }: PillProps) {
  const className =
    "inline-flex items-center rounded-full border border-neutral-200 px-4 py-1.5 text-sm text-neutral-600 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900";

  const content = (
    <>
      {label}
      {count !== undefined && count > 0 && (
        <span className="ml-1.5 text-xs text-neutral-400">({count})</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
