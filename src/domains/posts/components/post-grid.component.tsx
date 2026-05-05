import { Post } from "../models/post.model";
import { PostGridCard } from "./post-grid-card.component";

interface PostGridProps {
  posts: Post[];
}

export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <p className="col-span-full py-16 text-center text-neutral-400">
        No hay artículos disponibles.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostGridCard key={post.id} post={post} />
      ))}
    </div>
  );
}
