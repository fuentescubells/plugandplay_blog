"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import { Meter } from "@base-ui/react/meter";

interface LoaderBarProps {
    loading: boolean;
}

export function LoaderBar({ loading }: LoaderBarProps) {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let controls: { stop: () => void };

        if (loading) {
            setVisible(true);
            setValue(0);
            controls = animate(0, 80, {
                duration: 1.4,
                ease: "easeOut",
                onUpdate: (v) => setValue(Math.round(v)),
            });
        } else if (visible) {
            controls = animate(value, 100, {
                duration: 0.25,
                ease: "easeOut",
                onUpdate: (v) => setValue(Math.round(v)),
                onComplete: () => {
                    setTimeout(() => {
                        setVisible(false);
                        setValue(0);
                    }, 300);
                },
            });
        }

        return () => controls?.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    if (!visible) return null;

    return (
        <Meter.Root
            value={value}
            min={0}
            max={100}
            aria-label="Cargando"
            className="fixed left-0 right-0 top-0 z-[100] h-0.5 overflow-hidden bg-transparent"
        >
            <Meter.Track className="absolute inset-0">
                <Meter.Indicator className="h-full bg-neutral-700 transition-[width] duration-100 dark:bg-neutral-200" />
            </Meter.Track>
        </Meter.Root>
    );
}
