import Button from "../components/ui/Button";

/**
 * Root-level, so it also covers unknown case-study slugs — `[slug]` sets
 * `dynamicParams = false`, which turns anything outside `generateStaticParams`
 * into this instead of a render.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-stack-lg bg-surface-base px-gutter text-center">
      <h1 className="text-h3 text-content-primary md:text-h1">
        Page not found
      </h1>
      <p className="text-subtitle2 text-content-muted">
        That page does not exist — it may have moved.
      </p>
      <Button href="/">Back to the homepage</Button>
    </main>
  );
}
