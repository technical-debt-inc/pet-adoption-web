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
        default: "bg-[var(--green-500)] text-white hover:bg-[var(--green-600)]",
        secondary: "bg-[var(--green-100)] text-[var(--green-700)] hover:bg-[var(--green-050)]",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "bg-transparent text-[var(--ink-700)] border border-[var(--line)] hover:bg-[var(--surface-1)]",
        ghost: "bg-transparent text-[var(--ink-700)] hover:bg-[var(--surface-1)]",
        link: "bg-transparent text-[var(--green-700)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm gap-1.5",
        default: "h-11 px-5.5 text-[0.9375rem] gap-2",
        lg: "h-13 px-7 text-base gap-2",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const iconSize = {
  sm: 16,
  default: 18,
  lg: 20,
  icon: 18,
} as const;

function Button({
  className,
  variant = "default",
  size = "default",
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
      {Icon && <Icon size={iconSize[size ?? "default"]} className="size-4" />}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
