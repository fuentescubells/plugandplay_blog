import { logger } from "@/shared/utils/logger";
import wpApi from "@/shared/lib/wordpress.lib";
import { Post } from "../models/post.model";
import { GRID_FIELDS } from "../constants/gridFields.constants";


export async function fetchPosts(perPage: number = 16): Promise<{ posts: Post[]; totalPages: number }> {
  try {
    const { data, headers } = await wpApi.get<Post[]>("/posts", {
      params: { per_page: perPage, _embed: true, _fields: GRID_FIELDS },
    });
    const totalPages = parseInt(headers["x-wp-totalpages"] ?? "1", 10);
    return { posts: data, totalPages };
  } catch (error) {
    logger.error("Error fetching posts:", error);
    throw error;
  }
}

export async function fetchPostsPaginated( page: number = 1, perPage: number = 12): Promise<{ posts: Post[]; totalPages: number }> {
  try {
    const { data, headers } = await wpApi.get<Post[]>("/posts", {
      params: { page, per_page: perPage, _embed: true, _fields: GRID_FIELDS },
    });
    const totalPages = parseInt(headers["x-wp-totalpages"] ?? "1", 10);
    return { posts: data, totalPages };
  } catch (error) {
    logger.error("Error fetching paginated posts:", error);
    throw error;
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data } = await wpApi.get<Post[]>("/posts", {
      params: {
        slug,
        _embed: true,
        _fields: "id,slug,title,content,excerpt,featured_media,categories,tags,date,modified,_links",
      },
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
        _embed: true,
        _fields: GRID_FIELDS,
      },
    });
    return data;
  } catch (error) {
    logger.error(`Error fetching posts by category [${categoryId}]:`, error);
    throw error;
  }
}

export async function fetchPostsByCategoryPaginated(
  categoryId: number,
  page: number = 1,
  perPage: number = 12
): Promise<{ posts: Post[]; totalPages: number }> {
  try {
    const { data, headers } = await wpApi.get<Post[]>("/posts", {
      params: {
        categories: categoryId,
        page,
        per_page: perPage,
        _embed: true,
        _fields: GRID_FIELDS,
      },
    });
    const totalPages = parseInt(headers["x-wp-totalpages"] ?? "1", 10);
    return { posts: data, totalPages };
  } catch (error) {
    logger.error(`Error fetching paginated posts by category [${categoryId}]:`, error);
    throw error;
  }
}
