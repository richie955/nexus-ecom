"use client";
import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EditableField({ label, value, onSave, type = "text", className }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || "");

  const save = () => {
    onSave(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value || "");
    setEditing(false);
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between gap-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
        {editing ? (
          <div className="flex gap-1">
            <Button type="button" size="icon-sm" variant="ghost" onClick={save} aria-label={`Save ${label}`}>
              <Check className="h-4 w-4" />
            </Button>
            <Button type="button" size="icon-sm" variant="ghost" onClick={cancel} aria-label={`Cancel ${label}`}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(true)}>
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        )}
      </div>
      {editing ? (
        <input
          type={type}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="h-11 w-full border-0 border-b border-foreground bg-transparent px-0 text-base font-medium outline-none focus:ring-0"
        />
      ) : (
        <div className="min-h-11 border-b border-border py-2 text-base font-medium">{value || "Not added"}</div>
      )}
    </div>
  );
}
