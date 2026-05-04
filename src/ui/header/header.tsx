import Link from "next/link";
import { CategoriesMenu } from "@/domains/categories/components/categories-menu.component";
import { fetchCategories } from "@/domains/categories/services/categorie.service";
import { ThemeSwitch } from "../themeSwitch/theme-switch";
import { SearchBar } from "../search/search-bar";
import { HamburgerMenu } from "../hamburger/hamburger-menu";

export default async function BlogHeader() {
  const categories = await fetchCategories();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto max-w-7xl flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        <HamburgerMenu categories={categories} />

        <Link href="/" className="shrink-0 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          LOGO
        </Link>

        <nav className="hidden flex-1 lg:flex">
          <CategoriesMenu categories={categories} />
        </nav>

        <div className="flex items-center gap-3">
          <SearchBar />
          <ThemeSwitch />
        </div>

      </div>
    </header>
  );
}