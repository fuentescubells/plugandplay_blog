export function AccordionPostSkeleton() {
    return (
        <div className="px-6 py-2">
            <div className="h-3 w-4/5 animate-pulse rounded bg-neutral-300 dark:bg-neutral-700" />
        </div>
    );
}

export function AccordionPostsSkeletonList({ count = 3 }: { count?: number }) {
    return (
        <ul aria-hidden="true">
            {Array.from({ length: count }).map((_, i) => (
                <li key={i}>
                    <AccordionPostSkeleton />
                </li>
            ))}
        </ul>
    );
}
