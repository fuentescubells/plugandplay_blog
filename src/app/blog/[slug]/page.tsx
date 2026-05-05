import { cache } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchPosts, fetchPostBySlug, fetchPostsByCategory } from "@/domains/posts/services/post.service";
import { fetchCategories } from "@/domains/categories/services/categorie.service";
import { getPostImageUrl, formatPostDate } from "@/domains/posts/utils/post.utils";
import { Breadcrumb } from "@/ui/breadcrumb/breadcrumb";
import { Pill } from "@/ui/pills/pills";
import { PostGrid } from "@/domains/posts/components/post-grid.component";

const getPost = cache(fetchPostBySlug);

export async function generateStaticParams() {
  const { posts } = await fetchPosts(100);
  return posts.map((p) => ({ slug: p.slug }));
}


interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const image = getPostImageUrl(post);

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, "").trim(),
    openGraph: image ? { images: [{ url: image.url }] } : undefined,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const image = getPostImageUrl(post);
  const date = formatPostDate(post.date);

  const [categories, relatedRaw] = await Promise.all([
    fetchCategories(),
    post.categories[0] ? fetchPostsByCategory(post.categories[0], 4) : Promise.resolve([]),
  ]);

  const postCategories = categories.filter((c) => post.categories.includes(c.id));
  const related = relatedRaw.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog" },
          ...(postCategories[0]
            ? [{ label: postCategories[0].name, href: `/categoria/${postCategories[0].slug}` }]
            : []),
          { label: post.title.rendered.replace(/<[^>]+>/g, "").trim() },
        ]}
      />

      <article className="mt-6">
        {/* Cabecera del artículo */}
        <header className="mb-8">
          {postCategories.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {postCategories.map((cat) => (
                <Pill key={cat.id} label={cat.name} href={`/categoria/${cat.slug}`} />
              ))}
            </div>
          )}

          <h1
            className="text-3xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 lg:text-4xl"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <time
            className="mt-3 block text-sm text-neutral-400"
            dateTime={post.date}
          >
            {date}
          </time>
        </header>

        {/* Imagen destacada */}
        {image && (
          <figure className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized
              className="object-cover"
            />
          </figure>
        )}

        {/* Contenido */}
        <div
          className="prose prose-neutral max-w-none dark:prose-invert
            prose-headings:font-bold prose-headings:tracking-tight
            prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>

      {/* Posts relacionados */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-neutral-200 pt-10 dark:border-neutral-800">
          <h2 className="mb-6 text-xl font-bold text-neutral-900 dark:text-neutral-100">
            También te puede interesar
          </h2>
          <PostGrid posts={related} />
        </section>
      )}
    </main>
  );
}
