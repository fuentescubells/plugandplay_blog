"use client";

import { useLoader } from "@/shared/context/loader-context";
import { LoaderBar } from "./loader-bar";

export function GlobalLoader() {
    const { loading } = useLoader();
    return <LoaderBar loading={loading} />;
}
