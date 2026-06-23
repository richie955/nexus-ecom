"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";

export function AuthForm({ mode }) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  const submit = (event) => {
    event.preventDefault();
    if (mode === "register") register({ name, email });
    else login(email, "demo");
    router.push("/account");
  };

  if (mode === "forgot") {
    return (
      <form className="space-y-4 rounded-xl border border-border bg-card p-6">
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Button className="w-full">Send reset link</Button>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-card p-6">
      {mode === "register" && <Input label="Name" value={name} onChange={(event) => setName(event.target.value)} />}
      <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <Input label="Password" type="password" value="password" readOnly />
      <Button className="w-full">{mode === "register" ? "Create account" : "Sign in"}</Button>
    </form>
  );
}
