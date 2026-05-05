import { fetchPosts } from "../services/post.service";
import { FeaturedPost } from "./featured-post.component";

export async function FeaturedPostWrapper() {
  const { posts } = await fetchPosts(1);
  const featured = posts[0];

  if (!featured) return null;

  return <FeaturedPost post={featured} />;
}
