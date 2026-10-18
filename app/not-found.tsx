import Link from "next/link";

/**
 * Root-level, so it also covers unknown case-study slugs — `[slug]` sets
 * `dynamicParams = false`, which turns anything outside `generateStaticParams`
 * into this instead of a render.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen dark:bg-black flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-h3 md:text-h1 dark:text-white">Page not found</h1>
      <p className="text-subtitle2 text-gray-600 dark:text-gray-300">
        That page does not exist — it may have moved.
      </p>
      <Link className="btn-primary" href="/">
        Back to the homepage
      </Link>
    </main>
  );
}
