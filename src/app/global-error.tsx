"use client";

import { useEffect } from "react";
import Link from "next/link";
import "./globals.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="h-full">
        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-400">
            Servicio no disponible
          </p>
          <h1 className="mt-4 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            No se puede conectar con el servidor
          </h1>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400">
            El contenido no está disponible en este momento. Inténtalo de nuevo en unos minutos.
          </p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={reset}
              className="border border-neutral-900 px-5 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white dark:border-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
            >
              Reintentar
            </button>
            <Link
              href="/"
              className="border border-neutral-200 px-5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-100 dark:hover:text-neutral-100"
            >
              Volver al inicio
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
