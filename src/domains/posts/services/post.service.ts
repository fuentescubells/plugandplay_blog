import { logger } from "@/shared/utils/logger";
import wpApi from "@/shared/lib/wordpress.lib";
import { Post } from "../models/post.model";

export async function fetchPosts(perPage: number = 16): Promise<Post[]> {
  try {
    const { data } = await wpApi.get<Post[]>("/posts", {
      params: { per_page: perPage, _fields: "id,slug,title,excerpt,featured_media,categories,tags,date" },
    });
    return data;
  } catch (error) {
    logger.error("Error fetching posts:", error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data } = await wpApi.get<Post[]>("/posts", {
      params: { slug, _fields: "id,slug,title,content,excerpt,featured_media,categories,tags,date,modified" },
    });
    return data[0] ?? null;
  } catch (error) {
    logger.error(`Error fetching post [${slug}]:`, error);
    return null;
  }
}

export async function fetchPostsByCategory(categoryId: number, perPage: number = 16): Promise<Post[]> {
  try {
    const { data } = await wpApi.get<Post[]>("/posts", {
      params: {
        categories: categoryId,
        per_page: perPage,
        _fields: "id,slug,title,excerpt,featured_media,categories,tags,date",
      },
    });
    return data;
  } catch (error) {
    logger.error(`Error fetching posts by category [${categoryId}]:`, error);
    return [];
  }
}

export async function searchPosts(query: string, perPage: number = 10): Promise<Post[]> {
  try {
    const { data } = await wpApi.get<Post[]>("/posts", {
      params: { search: query, per_page: perPage, _fields: "id,slug,title" },
    });
    return data;
  } catch (error) {
    logger.error("Error searching posts:", error);
    return [];
  }
}
