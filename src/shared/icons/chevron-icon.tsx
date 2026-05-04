interface ChevronIconProps {
    className?: string;
    size?: number;
    direction?: "up" | "down" | "left" | "right";
}

const rotationMap = {
    up: "rotate-180",
    down: "rotate-0",
    left: "-rotate-90",
    right: "rotate-90",
};

export function ChevronIcon({ className, size = 16, direction = "down" }: ChevronIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={[rotationMap[direction], className].filter(Boolean).join(" ")}
        >
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}
