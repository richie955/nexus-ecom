import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:opacity-90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-border bg-background hover:bg-secondary text-foreground",
        ghost:
          "hover:bg-secondary text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
        link:
          "text-foreground underline-offset-4 hover:underline p-0 h-auto",
        muted:
          "bg-muted text-muted-foreground hover:bg-secondary",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-9 w-9",
        "icon-sm": "h-7 w-7",
        "icon-lg": "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = forwardRef(({ className, variant, size, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(buttonVariants({ variant, size, className }))}
    {...props}
  >
    {children}
  </button>
));
Button.displayName = "Button";

export { Button, buttonVariants };
