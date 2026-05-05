import { Suspense } from "react";
import { PostsWrapper } from "@/domains/posts/components/posts-wrapper.component";
import { fetchPostsPaginated } from "@/domains/posts/services/post.service";
import { PostGridSkeleton } from "@/ui/skeletons/post-grid-skeleton";

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata = {
  title: "Blog",
  description: "Todos los artículos del blog.",
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Blog</h1>
        <p className="mt-1 text-neutral-500 dark:text-neutral-400">
          Todos los artículos
        </p>
      </header>

      <Suspense fallback={<PostGridSkeleton count={12} />}>
        <PostsWrapper
          fetcher={() => fetchPostsPaginated(currentPage, 12)}
          pagination={{ basePath: "/blog", currentPage }}
        />
      </Suspense>
    </main>
  );
}
