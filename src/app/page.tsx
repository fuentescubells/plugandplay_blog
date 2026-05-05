import { Suspense } from "react";
import { fetchCategories } from "@/domains/categories/services/categorie.service";
import { FeaturedPostWrapper } from "@/domains/posts/components/featured-post-wrapper.component";
import { PostsWrapper } from "@/domains/posts/components/posts-wrapper.component";
import { fetchPosts } from "@/domains/posts/services/post.service";
import { CategoriesPillsList } from "@/domains/categories/components/categories-pills.component";
import { TextLink } from "@/ui/link/link.ui";
import { FeaturedPostSkeleton } from "@/ui/skeletons/featured-post-skeleton";
import { PostGridSkeleton } from "@/ui/skeletons/post-grid-skeleton";

export default async function Home() {
  const categories = await fetchCategories();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      {/* Post destacado */}
      <section className="mb-10">
        <Suspense fallback={<FeaturedPostSkeleton />}>
          <FeaturedPostWrapper />
        </Suspense>
      </section>

      {/* Grid de posts recientes */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Últimos artículos
          </h2>
          <TextLink href="/blog">Ver todos →</TextLink>
        </div>
        <Suspense fallback={<PostGridSkeleton count={12} />}>
          <PostsWrapper fetcher={() => fetchPosts(12)} />
        </Suspense>
      </section>

      <CategoriesPillsList categories={categories} />
    </main>
  );
}
