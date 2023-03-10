import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen dark:bg-black flex-col items-center justify-center transition-all duration-300">
      <NavigationBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
