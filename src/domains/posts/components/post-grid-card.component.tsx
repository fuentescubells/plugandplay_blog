import Link from "next/link";
import Image from "next/image";
import { Post } from "../models/post.model";
import { getPostImageUrl, formatPostDate } from "../utils/post.utils";

interface PostGridCardProps {
  post: Post;
}

export function PostGridCard({ post }: PostGridCardProps) {
  const image = getPostImageUrl(post);
  const date = formatPostDate(post.date);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden border border-neutral-200 bg-white transition-colors duration-200 hover:border-neutral-900 hover:bg-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-100 dark:hover:bg-neutral-100"
    >
      <figure className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="h-full w-full bg-neutral-200 dark:bg-neutral-700" />
        )}
      </figure>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <time className="text-xs text-neutral-400 group-hover:text-neutral-400 dark:group-hover:text-neutral-500" dateTime={post.date}>
          {date}
        </time>
        <h2
          className="line-clamp-2 text-base font-semibold leading-snug text-neutral-900 group-hover:text-white dark:text-neutral-100 dark:group-hover:text-neutral-900"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div
          className="line-clamp-3 text-sm leading-relaxed text-neutral-500 group-hover:text-neutral-300 dark:text-neutral-400 dark:group-hover:text-neutral-600"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </div>
    </Link>
  );
}
