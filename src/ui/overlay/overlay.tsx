"use client";

import { useEffect } from "react";

interface OverlayProps {
  open: boolean;
  onClose: () => void;
}

export function Overlay({ open, onClose }: OverlayProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      aria-hidden="true"
      onClick={onClose}
      className="fixed inset-0 z-40 min-h-screen bg-black/50"
    />
  );
}

