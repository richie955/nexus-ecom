"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Tabs({ tabs, defaultValue, className }) {
  const [active, setActive] = useState(defaultValue || tabs[0]?.value);
  const current = tabs.find((tab) => tab.value === active);

  return (
    <div className={className}>
      <div className="flex gap-1 rounded-lg bg-secondary p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActive(tab.value)}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition",
              active === tab.value && "bg-background text-foreground shadow-sm"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-5">{current?.content}</div>
    </div>
  );
}
