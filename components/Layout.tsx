import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { ParallaxProvider } from "react-scroll-parallax";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen dark:bg-black flex-col items-center justify-center transition-all duration-300">
      <NavigationBar />
      <ParallaxProvider>
        <main className="flex flex-col items-center justify-center ">
          {children}
          <SpeedInsights />
        </main>
      </ParallaxProvider>
      <Footer />
    </div>
  );
}
