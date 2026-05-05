import Link from "next/link";
import Image from "next/image";
import { Post } from "../models/post.model";
import { getPostImageUrl, formatPostDate } from "../utils/post.utils";

interface FeaturedPostProps {
  post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const image = getPostImageUrl(post);
  const date = formatPostDate(post.date);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex min-h-72 overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:min-h-96"
    >
      {image && (
        <figure className="absolute inset-0">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1280px"
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
        </figure>
      )}

      <div className="relative mt-auto flex flex-col gap-2 p-6 lg:p-8">
        <span className="text-xs font-medium uppercase tracking-widest text-white/70">
          Destacado
        </span>
        <h2
          className="text-2xl font-bold leading-tight text-white lg:text-3xl"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div
          className="line-clamp-2 text-sm text-white/70"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <time className="mt-1 text-xs text-white/50" dateTime={post.date}>
          {date}
        </time>
      </div>
    </Link>
  );
}
