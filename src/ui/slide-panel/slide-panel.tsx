"use client";

import { motion, AnimatePresence, type Transition } from "framer-motion";

interface SlidePanelProps {
    open: boolean;
    side: "left" | "right";
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
    as?: "div" | "nav" | "aside";
    role?: string;
    ariaModal?: boolean;
}

const transitions: Record<"left" | "right", Transition> = {
    left:  { type: "spring", stiffness: 320, damping: 30 },
    right: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.32 },
};

const positions = {
    left:  { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
    right: { initial: { x: 24, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 24, opacity: 0 } },
};

export function SlidePanel({ open, side, children, className, ariaLabel, as = "div", role, ariaModal }: SlidePanelProps) {
    const { initial, animate, exit } = positions[side];
    const transition = transitions[side];
    const Tag = motion[as];

    return (
        <AnimatePresence>
            {open && (
                <Tag
                    key={`slide-panel-${side}`}
                    aria-label={ariaLabel}
                    role={role}
                    aria-modal={ariaModal}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={transition}
                    className={className}
                >
                    {children}
                </Tag>
            )}
        </AnimatePresence>
    );
}
