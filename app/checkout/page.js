"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, CheckCircle2, ClipboardCheck, CreditCard, Mail, Smartphone, Truck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/data";

const steps = [
  { label: "Information", icon: Mail },
  { label: "Shipping", icon: Truck },
  { label: "Payment", icon: CreditCard },
  { label: "Review", icon: ClipboardCheck },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const { items, total, subtotal, shipping } = useCart();

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Secure checkout</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Complete your order</h1>
        </div>
        <div className="grid grid-cols-4 border-b border-border bg-background/60">
          {steps.map(({ label, icon: Icon }, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(index)}
              className={`relative flex flex-col items-center gap-2 px-2 py-4 text-center text-xs font-semibold transition ${index <= step ? "text-foreground" : "text-muted-foreground"}`}
            >
              <span className={`grid h-9 w-9 place-items-center rounded-full border ${index < step ? "border-foreground bg-foreground text-background" : index === step ? "border-foreground bg-card" : "border-border bg-card"}`}>
                {index < step ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </span>
              <span className="hidden sm:block">{label}</span>
              {index < steps.length - 1 && <span className="absolute right-0 top-8 hidden h-px w-1/2 bg-border md:block" />}
            </button>
          ))}
        </div>
        <div className="p-6">
          {step === 0 && <InfoStep />}
          {step === 1 && <ShippingStep />}
          {step === 2 && <PaymentStep />}
          {step === 3 && <ReviewStep items={items} total={total} />}
          <div className="mt-8 flex justify-between border-t border-border pt-6">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
            {step < 3 ? <Button onClick={() => setStep(step + 1)}>Continue</Button> : <Link href="/order-success" className="inline-flex h-10 items-center justify-center rounded-lg bg-foreground px-5 text-sm font-medium text-background">Place mock order</Link>}
          </div>
        </div>
      </section>
      <aside className="h-fit rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Summary</h2>
        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div key={item.key} className="flex gap-3">
              <img src={item.images[0]} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">Qty {item.quantity}</p>
              </div>
              <span className="text-sm font-medium">{formatPrice((item.salePrice || item.price) * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div>
          <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
      </aside>
    </div>
  );
}

function InfoStep() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Contact information</h2>
      <p className="mt-1 text-sm text-muted-foreground">We will use this for order updates and delivery notices.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2"><Input label="Email" type="email" /><Input label="Phone" /><Input label="First name" /><Input label="Last name" /></div>
    </div>
  );
}

function ShippingStep() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Shipping address</h2>
      <p className="mt-1 text-sm text-muted-foreground">Choose a delivery method that fits the order.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2"><Input label="Address" className="sm:col-span-2" /><Input label="City" /><Input label="Postal code" /><Select><option>Standard shipping</option><option>Express shipping</option></Select></div>
    </div>
  );
}

function PaymentStep() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Payment method</h2>
      <p className="mt-1 text-sm text-muted-foreground">Mock payment UI for card, UPI, and Razorpay wallet.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {[[CreditCard, "Card", "Visa, Mastercard"], [Smartphone, "UPI", "PhonePe, GPay"], [Wallet, "Razorpay", "Wallet checkout"]].map(([Icon, label, copy]) => (
          <label key={label} className="flex cursor-pointer flex-col gap-4 rounded-xl border border-border bg-background p-4 transition hover:border-foreground">
            <span className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary"><Icon className="h-5 w-5" /></span>
              <input type="radio" name="payment" defaultChecked={label === "Card"} className="accent-foreground" />
            </span>
            <span>
              <span className="block font-semibold">{label}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{copy}</span>
            </span>
          </label>
        ))}
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Input label="Card number" placeholder="4242 4242 4242 4242" className="sm:col-span-2" />
        <Input label="Expiry" placeholder="08 / 30" />
        <Input label="CVC" placeholder="123" />
      </div>
    </div>
  );
}

function ReviewStep({ items, total }) {
  return <div className="rounded-xl bg-secondary p-5"><CheckCircle2 className="mb-3 h-6 w-6 text-success" /><h2 className="font-semibold">Review your mock order</h2><p className="mt-2 text-sm text-muted-foreground">{items.length} line items totaling {formatPrice(total)}. No real payment will be captured.</p></div>;
}
