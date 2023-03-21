import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import NewFooter from "./NewFooter";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen dark:bg-black flex-col items-center justify-center transition-all duration-300">
      <NavigationBar />
      <main className="flex flex-col items-center justify-center ">
        {children}
      </main>
      <NewFooter />

      {/*<Footer />*/}
    </div>
  );
}
