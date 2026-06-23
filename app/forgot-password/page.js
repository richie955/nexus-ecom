import { AuthForm } from "@/components/account/auth-form";

export default function ForgotPasswordPage() {
  return <div className="mx-auto max-w-md px-4 py-16"><h1 className="text-4xl font-semibold tracking-tight">Reset password</h1><p className="mt-3 text-muted-foreground">Mock password recovery form ready for a future auth backend.</p><div className="mt-8"><AuthForm mode="forgot" /></div></div>;
}
