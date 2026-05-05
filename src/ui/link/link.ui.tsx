import Link from "next/link";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
}

export function TextLink({ href, children }: TextLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-neutral-50 dark:hover:underline"
    >
      {children}
    </Link>
  );
}
