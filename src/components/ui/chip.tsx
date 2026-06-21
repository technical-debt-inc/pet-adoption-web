import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const chipVariants = cva(
  "cursor-pointer inline-flex items-center justify-center h-10 px-[18px] rounded-pill text-[14.5px] whitespace-nowrap transition-all duration-150 border outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      active: {
        true: "bg-green-500 text-white border-green-500 font-semibold",
        false:
          "bg-surface-2 text-ink-700 border-[var(--line)] font-medium hover:border-green-500 hover:text-green-700",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

interface ChipProps
  extends ComponentProps<"button">, VariantProps<typeof chipVariants> {
  asChild?: boolean;
}

function Chip({ className, active, asChild = false, ...props }: ChipProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="chip"
      data-active={active}
      className={cn(chipVariants({ active, className }))}
      {...props}
    />
  );
}

export { Chip, chipVariants };
export type { ChipProps };
