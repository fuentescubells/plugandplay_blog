import { Category } from "../models/category.model";
import { Pill } from "@/ui/pills/pills";

interface CategoriesPillsListProps {
  categories: Category[];
}

export function CategoriesPillsList({ categories }: CategoriesPillsListProps) {
  if (categories.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-neutral-100">
        Explorar por categoría
      </h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Pill
            key={cat.id}
            label={cat.name}
            href={`/categoria/${cat.slug}`}
            count={cat.count}
          />
        ))}
      </div>
    </section>
  );
}