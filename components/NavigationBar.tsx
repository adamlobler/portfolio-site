"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

import Socials from "./Socials";
import ThemeSwitch from "./theme/ThemeSwitch";
import Button from "./ui/Button";
import { useDialog } from "../lib/a11y/dialog";

const navigationItems = [
  { name: "Home", link: "/" },
  { name: "Projects", link: "/works" },
  { name: "Playground", link: "/playground" },
];

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  /**
   * The sheet is a dialog, so it gets dialog behaviour: focus is contained,
   * Escape closes, the body is locked while it is open and the toggle gets
   * focus back on the way out. All four come from `lib/a11y/dialog`, which is
   * also where the body-lock bug from phase 1 is actually fixed — the old
   * effect here wrote the lock from the pre-update state and handed back a
   * hard-coded `overflow: scroll`.
   */
  const { ref, onBackdropClick } = useDialog({
    open: isOpen,
    onClose: () => setIsOpen(false),
  });

  /** A route change while the sheet is open means a link inside it was used. */
  useEffect(() => setIsOpen(false), [pathname]);

  const current = (link: string) => (pathname === link ? "page" : undefined);

  return (
    <nav className="site-nav" aria-label="Main">
      <div className="container mx-auto flex max-w-page flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-button font-semibold whitespace-nowrap text-content-primary">
            Adam Lobler
            <span className="font-medium text-content-muted">
              {" "}
              | product designer
            </span>
          </span>
        </Link>

        <div className="flex items-center justify-center">
          {/* Desktop navigation */}
          <ul className="mr-8 hidden items-center gap-inline-md md:flex">
            {navigationItems.map((item) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  className="nav-link block"
                  aria-current={current(item.link)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center gap-inline-xs">
            <ThemeSwitch />
            <Button href="/contact" className="hidden md:inline-flex">
              Get in touch!
            </Button>
            <button
              onClick={() => setIsOpen((open) => !open)}
              type="button"
              className="inline-flex items-center rounded-control p-2 text-accent-default md:hidden"
              aria-controls="navbar-sheet"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <XMarkIcon className="h-8 w-8" />
              ) : (
                <Bars3Icon className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        ref={ref}
        id="navbar-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        onClick={onBackdropClick}
        className={
          isOpen
            ? "nav-overlay flex h-screen w-full flex-col items-center justify-center gap-stack-lg px-gutter pb-12 md:hidden"
            : "hidden"
        }
      >
        <ul className="flex flex-col gap-stack-xs md:flex-row">
          {navigationItems.map((item) => (
            <li key={item.link}>
              <Link
                href={item.link}
                className="nav-link block py-6 text-center text-subtitle1"
                aria-current={current(item.link)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-14">
          <Socials />
        </div>
        <Button href="/contact" block className="mx-8">
          Get in touch!
        </Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
