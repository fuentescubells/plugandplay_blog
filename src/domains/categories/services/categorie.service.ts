import { logger } from "@/shared/utils/logger";
import { Category } from "../models/category.model";
import wpApi from "@/shared/lib/wordpress.lib";

export async function fetchCategories(limit: number = 100): Promise<Category[]> {
  try {
    const { data } = await wpApi.get<Category[]>("/categories", {
      params: { per_page: limit, exclude: 1 },
    });
    
    return data;
  } catch (error) {
    logger.error("Error fetching categories:", error);
    return [];
  }
}
