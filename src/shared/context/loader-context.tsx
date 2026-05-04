"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface LoaderContextValue {
    startLoading: () => void;
    stopLoading: () => void;
    loading: boolean;
}

const LoaderContext = createContext<LoaderContextValue>({
    startLoading: () => {},
    stopLoading: () => {},
    loading: false,
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);

    const startLoading = useCallback(() => setCount((c) => c + 1), []);
    const stopLoading = useCallback(() => setCount((c) => Math.max(0, c - 1)), []);

    return (
        <LoaderContext.Provider value={{ startLoading, stopLoading, loading: count > 0 }}>
            {children}
        </LoaderContext.Provider>
    );
}

export function useLoader() {
    return useContext(LoaderContext);
}
