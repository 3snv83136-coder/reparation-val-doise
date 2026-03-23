"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer whitespace-nowrap shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-cta text-white hover:bg-cta-hover focus-visible:ring-cta shadow-sm",
        blue: "bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary shadow-sm",
        green: "bg-green text-white hover:bg-green-dark focus-visible:ring-green shadow-sm",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        outlineWhite: "border-2 border-white/50 text-white hover:bg-white hover:text-dark",
        ghost: "text-text-secondary hover:bg-light-grey hover:text-text-primary",
        link: "text-primary hover:underline underline-offset-4 p-0 font-medium",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
);
Button.displayName = "Button";
export { Button, buttonVariants };
