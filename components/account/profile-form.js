"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditableField } from "@/components/account/editable-field";
import { useAuth } from "@/context/auth-context";

export function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "John Doe");
  const [email, setEmail] = useState(user?.email || "john@example.com");
  const [phone, setPhone] = useState(user?.phone || "+1 (555) 123-4567");
  const [birthday, setBirthday] = useState("March 12, 1991");
  const [saved, setSaved] = useState(false);

  const saveAll = () => {
    updateProfile({ name, email, phone });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        saveAll();
      }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Personal information</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage the details used for checkout, invoices, and account updates.</p>
        </div>
        <Button type="submit">{saved ? "Saved" : "Save profile"}</Button>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <EditableField label="Full name" value={name} onSave={setName} />
        <EditableField label="Email address" value={email} onSave={setEmail} type="email" />
        <EditableField label="Phone number" value={phone} onSave={setPhone} />
        <EditableField label="Birthday" value={birthday} onSave={setBirthday} />
      </div>
    </form>
  );
}
