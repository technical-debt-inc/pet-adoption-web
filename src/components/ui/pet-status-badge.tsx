import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const petStatusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 h-[26px] px-[11px] rounded-pill text-xs font-semibold",
  {
    variants: {
      status: {
        available: "bg-green-100 text-green-700",
        adopted: "bg-[var(--purple-100)] text-[var(--purple-600)]",
      },
      onPhoto: {
        true: "bg-white shadow-sm",
        false: "",
      },
    },
    compoundVariants: [
      { status: "available", onPhoto: true, class: "text-green-700" },
      { status: "adopted", onPhoto: true, class: "text-[var(--purple-600)]" },
    ],
    defaultVariants: {
      status: "available",
      onPhoto: false,
    },
  },
);

const dotVariants = cva("w-[7px] h-[7px] rounded-full", {
  variants: {
    status: {
      available: "bg-green-500",
      adopted: "bg-[var(--purple-500)]",
    },
  },
  defaultVariants: {
    status: "available",
  },
});

const statusLabel: Record<"available" | "adopted", string> = {
  available: "Disponível",
  adopted: "Adotado",
};

interface PetStatusBadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof petStatusBadgeVariants> {
  /** Sobrescreve o texto padrão (Disponível / Adotado) */
  label?: string;
}

function PetStatusBadge({
  className,
  status = "available",
  onPhoto,
  label,
  ...props
}: PetStatusBadgeProps) {
  return (
    <span
      data-slot="pet-status-badge"
      data-status={status}
      className={cn(petStatusBadgeVariants({ status, onPhoto, className }))}
      {...props}
    >
      <span
        data-slot="pet-status-dot"
        className={cn(dotVariants({ status }))}
      />
      {label ?? statusLabel[status ?? "available"]}
    </span>
  );
}

export { PetStatusBadge, petStatusBadgeVariants };
export type { PetStatusBadgeProps };
