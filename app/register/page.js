import Link from "next/link";
import { AuthForm } from "@/components/account/auth-form";

export default function RegisterPage() {
  return <div className="mx-auto max-w-md px-4 py-16"><h1 className="text-4xl font-semibold tracking-tight">Create account</h1><p className="mt-3 text-muted-foreground">Start a demo customer profile with saved addresses and wishlist.</p><div className="mt-8"><AuthForm mode="register" /></div><Link href="/login" className="mt-4 block text-sm text-muted-foreground">Already have an account?</Link></div>;
}
