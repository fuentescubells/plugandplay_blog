function PostGridCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="aspect-video w-full animate-pulse bg-neutral-200 dark:bg-neutral-800" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-2.5 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-4 w-3/5 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-1 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}

export function PostGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <PostGridCardSkeleton key={i} />
      ))}
    </div>
  );
}
