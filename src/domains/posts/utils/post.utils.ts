import { Post } from "../models/post.model";

export function getPostImageUrl(post: Post): { url: string; alt: string } | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;

  const url =
    media.media_details?.sizes?.medium?.source_url ??
    media.media_details?.sizes?.thumbnail?.source_url ??
    media.source_url;

  return url ? { url, alt: media.alt_text ?? "" } : null;
}

export function formatPostDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
