import NavigationBar from "../../components/NavigationBar";

/**
 * Nav only, no footer — the layout `/contact` needs, which is why it used to
 * be special-cased in `_app.tsx`. A route group expresses the same thing
 * without a runtime pathname comparison, and without the page having to
 * render its own navigation.
 */
export default function BareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
}
