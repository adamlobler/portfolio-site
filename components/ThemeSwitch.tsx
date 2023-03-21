import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-6 w-6 text-gray-100 m-4" />;

  return (
    <button
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      id="theme-switcher"
      title="Theme switcher button"
      value="theme"
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-6 w-6 text-gray-100 m-4" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-500 m-4" />
      )}
    </button>
  );
}
