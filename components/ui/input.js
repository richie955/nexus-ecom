import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef(({ className, type = "text", label, error, id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border border-border bg-background px-3.5 py-2 text-sm placeholder:text-muted-foreground",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus:ring-destructive",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";

const Textarea = forwardRef(({ className, label, error, id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        ref={ref}
        className={cn(
          "flex w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none",
          "disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]",
          error && "border-destructive focus:ring-destructive",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Input, Textarea };
