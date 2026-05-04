import Link from "next/link";
import Image from "next/image";
import { Post } from "../models/post.model";

interface PostCardProps {
    post: Post;
    onClick?: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
    const media = post._embedded?.["wp:featuredmedia"]?.[0];

    const imageUrl =
        media?.media_details?.sizes?.thumbnail?.source_url ??
        media?.media_details?.sizes?.medium?.source_url ??
        media?.source_url;

    return (
        <Link
            href={`/blog/${post.slug}`}
            onClick={onClick}
            className="group flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-neutral-700 dark:hover:bg-neutral-200"
        >
            {imageUrl ? (
                <figure className="relative h-12 w-12 shrink-0 overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={media?.alt_text ?? ""}
                        fill
                        sizes="48px"
                        unoptimized
                        className="object-cover"
                    />
                </figure>
            ) : (
                <div aria-hidden="true" className="h-12 w-12 shrink-0 bg-neutral-300 dark:bg-neutral-600" />
            )}

            <span
                className="line-clamp-2 text-sm text-neutral-700 group-hover:text-neutral-50 dark:text-neutral-200 dark:group-hover:text-neutral-900"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
        </Link>
    );
}
