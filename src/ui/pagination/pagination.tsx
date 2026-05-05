import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

type PageItem = number | "ellipsis-start" | "ellipsis-end";

function buildPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: PageItem[] = [1];

  if (current > 3) items.push("ellipsis-start");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) items.push(i);

  if (current < total - 2) items.push("ellipsis-end");

  items.push(total);
  return items;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;
  const items = buildPageItems(currentPage, totalPages);

  function href(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`;
  }

  const navItemClass = "flex h-9 w-9 items-center justify-center rounded-md border text-sm transition-colors";
  const activeClass = "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900";
  const inactiveClass = "border-neutral-200 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800";
  const disabledClass = "pointer-events-none border-neutral-100 text-neutral-300 dark:border-neutral-800 dark:text-neutral-600";

  return (
    <nav aria-label="Paginación" className="flex items-center justify-center gap-1">
      <Link
        href={prev ? href(prev) : "#"}
        aria-disabled={!prev}
        className={`${navItemClass} ${prev ? inactiveClass : disabledClass}`}
      >
        ‹
      </Link>

      {items.map((item) =>
        item === "ellipsis-start" || item === "ellipsis-end" ? (
          <span
            key={item}
            className={`${navItemClass} border-transparent text-neutral-400`}
          >
            …
          </span>
        ) : (
          <Link
            key={item}
            href={href(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={`${navItemClass} font-medium ${item === currentPage ? activeClass : inactiveClass}`}
          >
            {item}
          </Link>
        )
      )}

      <Link
        href={next ? href(next) : "#"}
        aria-disabled={!next}
        className={`${navItemClass} ${next ? inactiveClass : disabledClass}`}
      >
        ›
      </Link>
    </nav>
  );
}
