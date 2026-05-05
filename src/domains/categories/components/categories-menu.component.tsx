"use client";

import { Menubar } from "@base-ui/react/menubar";
import { Menu } from "@base-ui/react/menu";
import { useRef, useState } from "react";
import { Category } from "../models/category.model";
import { Post } from "@/domains/posts/models/post.model";
import { buildCategoryTree, CategoryNode } from "../utils/category-tree";
import { ChevronIcon } from "@/shared/icons/chevron-icon";

interface CategoriesMenuProps {
    categories: Category[];
}

const popupCls =
    "min-w-[14rem] border-neutral-200 bg-neutral-100 shadow-md dark:border-neutral-700 dark:bg-neutral-800";
const itemCls =
    "block w-full text-left px-4 py-1.5 text-sm text-neutral-600 hover:bg-neutral-700 hover:text-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-200 dark:hover:text-neutral-900";

export function CategoriesMenu({ categories }: CategoriesMenuProps) {
    const [postsByCategory, setPostsByCategory] = useState<Record<number, Post[]>>({});
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const tree = buildCategoryTree(categories);

    function handleHover(categoryId: number) {
        if (postsByCategory[categoryId]) return;
        timerRef.current = setTimeout(async () => {
            const res = await fetch(`/api/posts/by-category?id=${categoryId}`);
            if (res.ok) {
                const posts: Post[] = await res.json();
                setPostsByCategory((prev) => ({ ...prev, [categoryId]: posts }));
            }
        }, 200);
    }

    function handleLeave() {
        if (timerRef.current) clearTimeout(timerRef.current);
    }

    function renderPosts(catId: number) {
        const posts = postsByCategory[catId];
        if (!posts?.length) return null;
        return posts.map((post) => (
            <Menu.LinkItem
                key={post.id}
                href={`/blog/${post.slug}`}
                className={itemCls}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
        ));
    }

    function renderRootCategory(node: CategoryNode) {
        if (node.children.length === 0) {
            return (
                <Menu.Root key={node.id}>
                    <Menu.Trigger
                        onMouseEnter={() => handleHover(node.id)}
                        onMouseLeave={handleLeave}
                        className="px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    >
                        {node.name}
                    </Menu.Trigger>
                    <Menu.Portal>
                        <Menu.Positioner className="z-50">
                            <Menu.Popup className={popupCls}>
                                {renderPosts(node.id)}
                            </Menu.Popup>
                        </Menu.Positioner>
                    </Menu.Portal>
                </Menu.Root>
            );
        }

        // Con subcategorías: submenú por cada hijo
        return (
            <Menu.Root key={node.id}>
                <Menu.Trigger className="px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
                    {node.name}
                </Menu.Trigger>
                <Menu.Portal>
                    <Menu.Positioner className="z-50">
                        <Menu.Popup className={popupCls}>
                            {node.children.map((child) => (
                                <Menu.SubmenuRoot key={child.id}>
                                    <Menu.SubmenuTrigger
                                        onMouseEnter={() => handleHover(child.id)}
                                        onMouseLeave={handleLeave}
                                        className={`${itemCls} flex items-center justify-between gap-2`}
                                    >
                                        {child.name}
                                        <ChevronIcon size={12} className="-rotate-90" />
                                    </Menu.SubmenuTrigger>
                                    <Menu.Portal>
                                        <Menu.Positioner className="z-50">
                                            <Menu.Popup className={popupCls}>
                                                {renderPosts(child.id)}
                                            </Menu.Popup>
                                        </Menu.Positioner>
                                    </Menu.Portal>
                                </Menu.SubmenuRoot>
                            ))}
                        </Menu.Popup>
                    </Menu.Positioner>
                </Menu.Portal>
            </Menu.Root>
        );
    }

    return (
        <Menubar className="px-6 w-full flex flex-row gap-x-12 justify-center">
            {tree.map((node) => renderRootCategory(node))}
        </Menubar>
    );
}

