import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * A raised block: the three process steps on the homepage, the panels in the
 * playground. `tone: "quiet"` is the same geometry with no fill, which is what
 * the old `bg-gray-50 dark:bg-gray-900` blocks become once the appearance axis
 * owns the colour.
 */
export const card = cva("card", {
  variants: {
    tone: {
      raised: "",
      quiet: "card--quiet",
    },
    /** Hover and focus-within response. Only for cards that are a link. */
    interactive: {
      true: "card--interactive",
      false: "",
    },
  },
  defaultVariants: { tone: "raised", interactive: false },
});

export type CardVariants = VariantProps<typeof card>;

type Props = CardVariants &
  Omit<HTMLAttributes<HTMLElement>, "className" | "children"> & {
    /** `div` by default; pass `article`/`section`/`li` where the outline needs it. */
    as?: ElementType;
    className?: string;
    children: ReactNode;
  };

export default function Card({
  as: Tag = "div",
  tone,
  interactive,
  className,
  children,
  ...rest
}: Props) {
  return (
    <Tag {...rest} className={card({ tone, interactive, className })}>
      {children}
    </Tag>
  );
}
