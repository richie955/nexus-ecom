import Link from "next/link";

export default function OrderFailedPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-4xl font-semibold">Payment could not be completed</h1>
      <p className="mt-3 text-muted-foreground">This mock failure state is ready for a future payment gateway integration.</p>
      <Link href="/checkout" className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-5 font-medium text-background">Return to checkout</Link>
    </div>
  );
}
