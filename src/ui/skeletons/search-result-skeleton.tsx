export function SearchResultSkeleton() {
    return (
        <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-12 w-12 shrink-0 animate-pulse bg-neutral-300 dark:bg-neutral-600" />
            <div className="flex flex-1 flex-col gap-2">
                <div className="h-3 w-3/4 animate-pulse rounded bg-neutral-300 dark:bg-neutral-600" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>
        </div>
    );
}

export function SearchResultSkeletonList({ count = 4 }: { count?: number }) {
    return (
        <ul aria-hidden="true">
            {Array.from({ length: count }).map((_, i) => (
                <li key={i}>
                    <SearchResultSkeleton />
                </li>
            ))}
        </ul>
    );
}
