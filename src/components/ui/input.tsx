"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[var(--text)]">
            {label}
          </label>
        )}
        <input
          id={id}
          className={cn(
            "flex min-h-[44px] w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-colors placeholder:text-[var(--text-light)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent",
            error
              ? "border-[var(--danger)] focus:ring-[var(--danger)]"
              : "border-[var(--border)]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[var(--text)]">
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={cn(
            "flex min-h-[100px] w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-colors placeholder:text-[var(--text-light)] resize-y",
            "focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent",
            error
              ? "border-[var(--danger)] focus:ring-[var(--danger)]"
              : "border-[var(--border)]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
