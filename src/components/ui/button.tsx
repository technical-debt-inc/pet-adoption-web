import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const buttonVariants = cva(
  "cursor-pointer group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-green-500 text-white hover:bg-green-600",
        secondary: "bg-green-100 text-green-700 hover:bg-[var(--green-050)]",
        ghost:
          "bg-transparent text-ink-700 border border-[var(--line)] hover:bg-surface-1",
        dark: "bg-surface-2 text-ink-900 border border-[var(--line)]",
      },
      size: {
        sm: "h-[38px] px-4 text-sm gap-1.5",
        md: "h-11  px-[22px] text-[15px] gap-2",
        lg: "h-[52px] px-7 text-base gap-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const iconSize = {
  sm: 16,
  md: 18,
  lg: 20,
} as const;

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  children,
  Icon,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    Icon?: LucideIcon;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {Icon && <Icon size={iconSize[size ?? "md"]} className="size-4" />}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
