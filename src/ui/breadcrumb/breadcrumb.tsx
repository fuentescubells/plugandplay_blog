import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-neutral-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            {index > 0 && <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-600">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-900 dark:text-neutral-100 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
