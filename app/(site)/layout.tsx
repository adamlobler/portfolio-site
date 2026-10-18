import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import { ParallaxBoundary } from "../../components/client/Parallax";

/**
 * The full site chrome, formerly `components/Layout.tsx`. `/contact` opts out
 * by living in the `(bare)` group instead of by a pathname check in `_app`.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen dark:bg-black flex-col items-center justify-center transition-all duration-300">
      <NavigationBar />
      <ParallaxBoundary>
        <main className="flex flex-col items-center justify-center">
          {children}
        </main>
      </ParallaxBoundary>
      <Footer />
    </div>
  );
}
