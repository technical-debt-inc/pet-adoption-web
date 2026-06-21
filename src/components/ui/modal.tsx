"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, TriangleAlert, X, Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const modalIconWrapperVariants = cva(
  "w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4",
  {
    variants: {
      variant: {
        default: "bg-green-100 text-green-700",
        secondary: "bg-surface-1 text-text-subtle",
        outline: "bg-yellow-100 text-yellow-700",
        destructive: "bg-red-100 text-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const variantIcon = {
  default: Check,
  secondary: Info,
  outline: TriangleAlert,
  destructive: X,
} as const;

interface ModalProps extends VariantProps<typeof modalIconWrapperVariants> {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

function Modal({
  open,
  onClose,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  variant = "default",
  icon,
  className,
}: ModalProps) {
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const Icon = variantIcon[variant ?? "default"];

  return (
    <div
      data-slot="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,32,27,0.28)] backdrop-blur-[2px] p-4"
    >
      <div
        data-slot="modal-content"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full max-w-[380px] bg-surface rounded-xl shadow-lg p-[26px] text-center",
          className,
        )}
      >
        <div
          data-slot="modal-icon"
          className={cn(modalIconWrapperVariants({ variant }))}
        >
          {icon ?? <Icon size={26} strokeWidth={2.2} />}
        </div>

        <h2
          data-slot="modal-title"
          className="text-[21px] font-extrabold text-text-primary tracking-tight leading-snug"
        >
          {title}
        </h2>

        {description && (
          <p
            data-slot="modal-description"
            className="mt-2 text-[15px] text-text-subtle leading-relaxed"
          >
            {description}
          </p>
        )}

        <div data-slot="modal-actions" className="flex gap-2.5 mt-[22px]">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            className="flex-1"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { Modal };
export type { ModalProps };
