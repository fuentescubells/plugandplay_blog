"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Overlay } from "@/ui/overlay/overlay";
import { SlidePanel } from "@/ui/slide-panel/slide-panel";
import { Category } from "@/domains/categories/models/category.model";
import { Post } from "@/domains/posts/models/post.model";
import { CloseIcon } from "@/shared/icons/close-icon";
import { HamburgerIcon } from "@/shared/icons/hamburger-icon";
import { ChevronIcon } from "@/shared/icons/chevron-icon";
import { AccordionPostsSkeletonList } from "@/ui/skeletons/accordion-posts-skeleton";
import { useLoader } from "@/shared/context/loader-context";
import { buildCategoryTree, CategoryNode } from "@/domains/categories/utils/category-tree";

interface HamburgerMenuProps {
    categories: Category[];
}

export function HamburgerMenu({ categories }: HamburgerMenuProps) {
    const [open, setOpen] = useState(false);
    const [expandedRoot, setExpandedRoot] = useState<number | null>(null);
    const [expandedSub, setExpandedSub] = useState<number | null>(null);
    const [postsByCategory, setPostsByCategory] = useState<Record<number, Post[]>>({});
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const { startLoading, stopLoading } = useLoader();

    const tree = buildCategoryTree(categories);

    function handleClose() {
        setOpen(false);
    }

    async function fetchPosts(categoryId: number) {
        if (postsByCategory[categoryId]) return;
        setLoadingId(categoryId);
        startLoading();
        const res = await fetch(`/api/posts/by-category?id=${categoryId}`);
        if (res.ok) {
            const posts: Post[] = await res.json();
            setPostsByCategory((prev) => ({ ...prev, [categoryId]: posts }));
        }
        stopLoading();
        setLoadingId(null);
    }

    async function handleToggleRoot(node: CategoryNode) {
        const id = node.id;
        if (expandedRoot === id) {
            setExpandedRoot(null);
            return;
        }
        setExpandedRoot(id);
        setExpandedSub(null);
        if (node.children.length === 0) {
            await fetchPosts(id);
        }
    }

    async function handleToggleSub(categoryId: number) {
        if (expandedSub === categoryId) {
            setExpandedSub(null);
            return;
        }
        setExpandedSub(categoryId);
        await fetchPosts(categoryId);
    }

    function renderPostsList(categoryId: number, slug: string) {
        const posts = postsByCategory[categoryId];
        const isLoading = loadingId === categoryId;
        return (
            <ul className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
                {isLoading && <AccordionPostsSkeletonList count={3} />}
                {posts?.map((post) => (
                    <li key={post.id}>
                        <Link
                            href={`/blog/${post.slug}`}
                            onClick={handleClose}
                            className="block px-6 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-700 hover:text-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-200 dark:hover:text-neutral-900"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                    </li>
                ))}
                <li>
                    <Link
                        href={`/categoria/${slug}`}
                        onClick={handleClose}
                        className="block px-6 py-2 text-xs font-medium text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200"
                    >
                        Ver todos →
                    </Link>
                </li>
            </ul>
        );
    }

    return (
        <>
            <button
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center justify-center rounded p-1.5 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 lg:hidden"
            >
                {open ? <CloseIcon size={20} /> : <HamburgerIcon size={20} />}
            </button>

            <Overlay open={open} onClose={handleClose} />

            <SlidePanel
                open={open}
                side="left"
                as="aside"
                role="dialog"
                ariaModal={true}
                ariaLabel="Menú móvil"
                className="fixed left-0 top-0 z-50 flex min-h-screen w-3/4 max-w-xs flex-col bg-neutral-100 shadow-xl dark:bg-neutral-800"
            >
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-700">
                    <span className="text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                        Categorías
                    </span>
                    <button
                        aria-label="Cerrar menú"
                        onClick={handleClose}
                        className="rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-neutral-50"
                    >
                        <CloseIcon size={18} />
                    </button>
                </div>

                <nav aria-label="Categorías">
                <ul className="flex flex-col overflow-y-auto py-2">
                    {tree.map((node) => {
                        const isRootOpen = expandedRoot === node.id;
                        const hasChildren = node.children.length > 0;

                        return (
                            <li key={node.id}>
                                {/* Botón de nivel raíz */}
                                <button
                                    onClick={() => handleToggleRoot(node)}
                                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-700 hover:text-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-200 dark:hover:text-neutral-900"
                                >
                                    <span>{node.name}</span>
                                    <motion.span
                                        animate={{ rotate: isRootOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronIcon direction="down" size={14} />
                                    </motion.span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isRootOpen && (
                                        <motion.div
                                            key={`root-${node.id}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.22, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            {hasChildren ? (
                                                // Nivel 2: subcategorías con su propio acordeón
                                                <ul className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
                                                    {node.children.map((child) => {
                                                        const isSubOpen = expandedSub === child.id;
                                                        return (
                                                            <li key={child.id}>
                                                                <button
                                                                    onClick={() => handleToggleSub(child.id)}
                                                                    className="flex w-full items-center justify-between px-6 py-2.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-700 hover:text-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-200 dark:hover:text-neutral-900"
                                                                >
                                                                    <span>{child.name}</span>
                                                                    <motion.span
                                                                        animate={{ rotate: isSubOpen ? 180 : 0 }}
                                                                        transition={{ duration: 0.2 }}
                                                                    >
                                                                        <ChevronIcon direction="down" size={12} />
                                                                    </motion.span>
                                                                </button>

                                                                <AnimatePresence initial={false}>
                                                                    {isSubOpen && (
                                                                        <motion.div
                                                                            key={`sub-${child.id}`}
                                                                            initial={{ height: 0, opacity: 0 }}
                                                                            animate={{ height: "auto", opacity: 1 }}
                                                                            exit={{ height: 0, opacity: 0 }}
                                                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                                                            className="overflow-hidden"
                                                                        >
                                                                            {renderPostsList(child.id, child.slug)}
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            ) : (
                                                // Sin subcategorías: posts directos
                                                renderPostsList(node.id, node.slug)
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        );
                    })}
                </ul>
                </nav>
            </SlidePanel>
        </>
    );
}

