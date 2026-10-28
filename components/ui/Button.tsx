import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

/**
 * The only component on the site with a real variant matrix, which is the
 * whole reason `class-variance-authority` is here (~2 kB) and a component
 * library is not.
 *
 * Note what the table contains: class *names*, never declarations. Every
 * appearance decision lives in `.btn*` in `styles/recipes.css`, which reads
 * `--cmp-button-*`, which reads the semantic layer. So this file has no
 * opinion about colour, and a seventh theme restyles every button here
 * without touching a line of TypeScript.
 */
export const button = cva("btn", {
  variants: {
    variant: {
      primary: "btn--primary",
      secondary: "btn--secondary",
      /**
       * For `.band`, where the surface is a brand colour rather than a page
       * surface, so neither action semantic applies: the fill is the band's
       * label colour and the label is the band's fill.
       */
      "on-brand": "btn--on-brand",
    },
    size: {
      sm: "btn--sm",
      md: "btn--md",
      lg: "btn--lg",
    },
    /** `block` is layout, not appearance, so it is a plain utility. */
    block: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    /** `lg` is the button the site shipped with; it is the default so the
     *  migration off `.btn-primary` changed nothing visually. */
    variant: "primary",
    size: "lg",
    block: false,
  },
});

export type ButtonVariants = VariantProps<typeof button>;

type Common = ButtonVariants & { className?: string; children: ReactNode };

type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type AsLink = Common &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  > & {
    href: string;
  };

/**
 * One component for both elements, because the distinction that matters to a
 * reader is "button or link", and that is `href`. An `href` with a scheme or a
 * `target` leaves the app, so it renders a plain `<a>`; anything else is a
 * route and renders `next/link`, which is what keeps the client-side
 * navigation the old `<Link className="btn-primary">` call sites had.
 */
export default function Button(props: AsButton | AsLink) {
  const { variant, size, block, className, children, ...rest } = props;
  const classes = button({ variant, size, block, className });

  if (rest.href !== undefined) {
    const { href, ...anchor } = rest as AsLink;
    const external = /^[a-z]+:/i.test(href) || anchor.target === "_blank";
    return external ? (
      <a {...anchor} href={href} className={classes}>
        {children}
      </a>
    ) : (
      <Link {...anchor} href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rawButton } = rest as AsButton;
  return (
    <button {...rawButton} type={type} className={classes}>
      {children}
    </button>
  );
}
