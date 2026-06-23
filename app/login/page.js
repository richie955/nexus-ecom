import Link from "next/link";
import { AuthForm } from "@/components/account/auth-form";

export default function LoginPage() {
  return <AuthShell title="Welcome back" copy="Use any email and the demo password to enter the customer dashboard."><AuthForm mode="login" /><Link href="/forgot-password" className="mt-4 block text-sm text-muted-foreground">Forgot password?</Link></AuthShell>;
}

function AuthShell({ title, copy, children }) {
  return <div className="mx-auto max-w-md px-4 py-16"><h1 className="text-4xl font-semibold tracking-tight">{title}</h1><p className="mt-3 text-muted-foreground">{copy}</p><div className="mt-8">{children}</div></div>;
}
