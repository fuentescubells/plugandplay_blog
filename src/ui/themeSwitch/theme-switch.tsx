"use client";

import { useEffect, useState } from "react";
import { Switch } from "@base-ui/react/switch";
import { useTheme } from "next-themes";
import { SunIcon } from "@/shared/icons/sun-icon";
import { MoonIcon } from "@/shared/icons/moon-icon";

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-6 w-11 rounded-full bg-neutral-200 dark:bg-neutral-700" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Switch.Root
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      aria-label="Cambiar tema"
      className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full border border-neutral-300 bg-neutral-200 transition-colors duration-200 data-[checked]:border-neutral-700 data-[checked]:bg-neutral-800 dark:border-neutral-600 dark:bg-neutral-700 dark:data-[checked]:border-neutral-300 dark:data-[checked]:bg-neutral-200"
    >
      <Switch.Thumb className="flex h-4 w-4 translate-x-0.5 items-center justify-center rounded-full bg-white shadow transition-transform duration-200 data-[checked]:translate-x-[1.375rem] data-[checked]:bg-neutral-900">
        {isDark
          ? <MoonIcon size={10} className="text-neutral-100" />
          : <SunIcon size={10} className="text-neutral-500" />
        }
      </Switch.Thumb>
    </Switch.Root>
  );
}
