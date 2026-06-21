import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ComponentProps, useId } from "react";

const inputVariants = cva(
  "w-full rounded-md border text-[15px] font-sans text-text-primary outline-none transition-all duration-150 bg-surface-1 border-[var(--line)] placeholder:text-text-faint focus:border-green-500 focus:bg-surface-2 focus:shadow-focus disabled:opacity-50 disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  {
    variants: {
      hasIcon: {
        true: "h-12 pl-[42px] pr-[14px]",
        false: "h-12 px-[14px]",
      },
    },
    defaultVariants: {
      hasIcon: false,
    },
  },
);

interface InputFieldProps
  extends
    Omit<ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  label: string;
  Icon?: LucideIcon;
  hint?: string;
  containerClassName?: string;
}

function InputField({
  label,
  Icon,
  hint,
  className,
  containerClassName,
  id,
  ...props
}: InputFieldProps) {
  const generatedInputId = useId();
  const inputId = id ?? generatedInputId;

  return (
    <div data-slot="input-field" className={cn("block", containerClassName)}>
      <label
        htmlFor={inputId}
        data-slot="input-label"
        className="block text-[13px] font-semibold text-text-primary mb-1.75"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <span
            data-slot="input-icon"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300 pointer-events-none"
          >
            <Icon size={20} strokeWidth={2} />
          </span>
        )}

        <input
          id={inputId}
          data-slot="input"
          className={cn(inputVariants({ hasIcon: !!Icon }), className)}
          {...props}
        />
      </div>

      {hint && (
        <span
          data-slot="input-hint"
          className="block text-xs text-text-subtle mt-1.5"
        >
          {hint}
        </span>
      )}
    </div>
  );
}

interface TextareaFieldProps
  extends
    React.ComponentProps<"textarea">,
    Pick<InputFieldProps, "label" | "hint" | "containerClassName"> {}

function TextareaField({
  label,
  hint,
  className,
  containerClassName,
  id,
  rows = 4,
  ...props
}: TextareaFieldProps) {
  const generatedTextareaId = useId();
  const textareaId = id ?? generatedTextareaId;

  return (
    <div data-slot="textarea-field" className={cn("block", containerClassName)}>
      <label
        htmlFor={textareaId}
        data-slot="input-label"
        className="block text-[13px] font-semibold text-text-primary mb-1.75"
      >
        {label}
      </label>

      <textarea
        id={textareaId}
        data-slot="textarea"
        rows={rows}
        className={cn(
          "w-full rounded-md border text-[15px] font-sans text-text-primary outline-none transition-all duration-150 bg-surface-1 border-(--line) placeholder:text-text-faint focus:border-green-500 focus:bg-surface-2 focus:shadow-focus disabled:opacity-50 disabled:cursor-not-allowed resize-none p-[13px_14px]",
          className,
        )}
        {...props}
      />

      {hint && (
        <span
          data-slot="input-hint"
          className="block text-xs text-text-subtle mt-1.5"
        >
          {hint}
        </span>
      )}
    </div>
  );
}

export { InputField, TextareaField, inputVariants };
