"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar hydration mismatch: no renderizar hasta montar en cliente
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--spacing-2)",
        padding: "var(--spacing-2) var(--spacing-3)",
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        color: "var(--color-text)",
        fontSize: "var(--font-size-sm)",
        cursor: "pointer",
        transition: "background var(--transition-base), color var(--transition-base)",
      }}
    >
      {isDark ? "☀️ Claro" : "🌙 Oscuro"}
    </button>
  );
}
