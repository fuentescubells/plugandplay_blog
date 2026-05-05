export function FeaturedPostSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="relative flex min-h-72 overflow-hidden border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 lg:min-h-96"
    >
      {/* Imagen de fondo simulada */}
      <div className="absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-800" />

      {/* Gradiente overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

      {/* Contenido inferior */}
      <div className="relative mt-auto flex flex-col gap-3 p-6 lg:p-8">
        <div className="h-2.5 w-16 animate-pulse rounded bg-white/30" />
        <div className="h-7 w-3/4 animate-pulse rounded bg-white/40 lg:h-9" />
        <div className="h-7 w-1/2 animate-pulse rounded bg-white/30 lg:h-9" />
        <div className="mt-1 h-3 w-40 animate-pulse rounded bg-white/20" />
      </div>
    </div>
  );
}
