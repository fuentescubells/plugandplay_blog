import { Post } from "../models/post.model";
import { PostGrid } from "./post-grid.component";
import { Pagination } from "@/ui/pagination/pagination";

interface FetcherResult {
  posts: Post[];
  totalPages: number;
}

interface PostsWrapperProps {
  fetcher: () => Promise<FetcherResult>;
  pagination?: { basePath: string; currentPage: number };
}

export async function PostsWrapper({ fetcher, pagination }: PostsWrapperProps) {
  const { posts, totalPages } = await fetcher();

  return (
    <>
      <PostGrid posts={posts} />
      {pagination && totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={totalPages}
            basePath={pagination.basePath}
          />
        </div>
      )}
    </>
  );
}
