import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import { fetchCategories } from "@/domains/categories/services/categorie.service";
import { PostsWrapper } from "@/domains/posts/components/posts-wrapper.component";
import { fetchPostsByCategoryPaginated } from "@/domains/posts/services/post.service";
import { Breadcrumb } from "@/ui/breadcrumb/breadcrumb";
import { PostGridSkeleton } from "@/ui/skeletons/post-grid-skeleton";

const getCategories = cache(fetchCategories);


export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description || `Artículos sobre ${category.name}`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: category.name },
        ]}
      />

      <header className="mb-8 mt-4">
        <h1
          className="text-3xl font-bold text-neutral-900 dark:text-neutral-100"
          dangerouslySetInnerHTML={{ __html: category.name }}
        />
        {category.description && (
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            {category.description}
          </p>
        )}
        <p className="mt-1 text-sm text-neutral-400">
          {category.count} {category.count === 1 ? "artículo" : "artículos"}
        </p>
      </header>

      <Suspense fallback={<PostGridSkeleton count={12} />}>
        <PostsWrapper
          fetcher={() => fetchPostsByCategoryPaginated(category.id, currentPage, 12)}
          pagination={{ basePath: `/categoria/${slug}`, currentPage }}
        />
      </Suspense>
    </main>
  );
}
