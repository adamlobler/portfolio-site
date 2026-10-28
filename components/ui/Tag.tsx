import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

/**
 * The case-study chip. It was an inline `text-button p-2 border rounded-sm`
 * repeated in two files with different padding in each; it is now one recipe
 * with one set of tokens, so `compact` tightens it and `brutalist` squares it.
 */
export const tag = cva("tag", {
  variants: {
    variant: {
      outline: "tag--outline",
      solid: "tag--solid",
    },
  },
  defaultVariants: { variant: "outline" },
});

export type TagVariants = VariantProps<typeof tag>;

export default function Tag({
  variant,
  className,
  children,
}: TagVariants & { className?: string; children: ReactNode }) {
  return <span className={tag({ variant, className })}>{children}</span>;
}
