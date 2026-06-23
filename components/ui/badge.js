import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border text-foreground",
        success: "bg-success/15 text-success border border-success/25",
        warning: "bg-warning/15 text-warning border border-warning/25",
        destructive: "bg-destructive/15 text-destructive border border-destructive/25",
        sale: "bg-destructive text-white",
        new: "bg-primary text-primary-foreground",
        premium: "bg-amber-100 text-amber-800 border border-amber-200",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export function Badge({ className, variant, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </span>
  );
}

export function ProductBadge({ badge }) {
  if (!badge) return null;
  const variantMap = {
    Sale: "sale",
    New: "new",
    Premium: "premium",
    "Best Seller": "success",
    Trending: "secondary",
  };
  return <Badge variant={variantMap[badge] || "default"}>{badge}</Badge>;
}
