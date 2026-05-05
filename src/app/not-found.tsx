import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
      <p className="text-6xl font-bold text-neutral-200 dark:text-neutral-800">404</p>
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Página no encontrada
      </h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">
        La página que buscas no existe o ha sido eliminada.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
