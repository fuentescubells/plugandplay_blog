import { Category } from "../models/category.model";

export interface CategoryNode extends Category {
    children: CategoryNode[];
}

/**
 * Convierte una lista plana de categorías en un árbol.
 * Las categorías raíz tienen parent === 0.
 */
export function buildCategoryTree(categories: Category[]): CategoryNode[] {
    const map = new Map<number, CategoryNode>();

    for (const cat of categories) {
        map.set(cat.id, { ...cat, children: [] });
    }

    const roots: CategoryNode[] = [];

    for (const node of map.values()) {
        if (node.parent === 0) {
            roots.push(node);
        } else {
            const parent = map.get(node.parent);
            if (parent) {
                parent.children.push(node);
            } else {
                // Padre no encontrado (excluido o inexistente) → tratar como raíz
                roots.push(node);
            }
        }
    }

    return roots;
}
