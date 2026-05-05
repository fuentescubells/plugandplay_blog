"use client";

import { useState, useRef, useTransition } from "react";
import { Overlay } from "@/ui/overlay/overlay";
import { SlidePanel } from "@/ui/slide-panel/slide-panel";
import { Post } from "@/domains/posts/models/post.model";
import { SearchIcon } from "@/shared/icons/search-icon";
import { CloseIcon } from "@/shared/icons/close-icon";
import { PostCard } from "@/domains/posts/components/post-card.component";
import { SearchResultSkeletonList } from "@/ui/skeletons/search-result-skeleton";
import { useLoader } from "@/shared/context/loader-context";

export function SearchBar() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Post[]>([]);
    const [isPending, startTransition] = useTransition();
    const inputRef = useRef<HTMLInputElement>(null);
    const { startLoading, stopLoading } = useLoader();

    function handleOpen() {
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    function handleClose() {
        setOpen(false);
        setQuery("");
        setResults([]);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setQuery(value);
        if (value.length < 2) {
            setResults([]);
            return;
        }
        startTransition(async () => {
            startLoading();
            const res = await fetch(`/api/posts/search?q=${encodeURIComponent(value)}`);
            if (res.ok) setResults(await res.json());
            stopLoading();
        });
    }

    return (
        <>
            <button
                aria-label="Abrir buscador"
                onClick={handleOpen}
                className="flex items-center justify-center rounded p-1.5 text-neutral-600 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            >
                <SearchIcon />
            </button>

            <Overlay open={open} onClose={handleClose} />

            <SlidePanel
                open={open}
                side="right"
                as="aside"
                role="dialog"
                ariaModal={true}
                ariaLabel="Buscador"
                className="max-w-1/2 fixed right-0 top-0 z-50 flex min-h-screen w-1/2 flex-col bg-neutral-100 shadow-lg dark:bg-neutral-800"
            >
                <form
                    role="search"
                    onSubmit={(e) => e.preventDefault()}
                    className="flex items-center gap-2 border-b border-neutral-300 px-4 py-3 dark:border-neutral-600"
                >
                    <SearchIcon className="shrink-0 text-neutral-400 dark:text-neutral-500" />
                    <input
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={handleChange}
                        placeholder="Buscar artículos..."
                        aria-label="Buscar artículos"
                        className="w-full bg-transparent text-sm text-neutral-700 placeholder-neutral-400 outline-none dark:text-neutral-200 dark:placeholder-neutral-500"
                    />
                    <button
                        aria-label="Cerrar buscador"
                        onClick={handleClose}
                        className="shrink-0 rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-neutral-50"
                    >
                        <CloseIcon size={16} />
                    </button>
                </form>

                <section aria-live="polite" aria-label="Resultados de búsqueda">
                    {isPending && query.length >= 2 && (
                        <SearchResultSkeletonList count={4} />
                    )}

                    {!isPending && results.length > 0 && (
                        <ul>
                            {results.map((post) => (
                                <li key={post.id}>
                                    <PostCard post={post} onClick={handleClose} />
                                </li>
                            ))}
                        </ul>
                    )}

                    {!isPending && query.length >= 2 && results.length === 0 && (
                        <p className="px-4 py-2 text-sm text-neutral-400 dark:text-neutral-500">
                            Sin resultados para &ldquo;{query}&rdquo;
                        </p>
                    )}
                </section>
            </SlidePanel>
        </>
    );
}

