import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
      <h1 className="mt-5 text-4xl font-semibold">Order placed</h1>
      <p className="mt-3 text-muted-foreground">Your mock order has been confirmed. Track it from the account dashboard.</p>
      <Link href="/account/orders" className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-5 font-medium text-background">View orders</Link>
    </div>
  );
}
