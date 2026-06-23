import Link from "next/link";
import { CreditCard, Heart, MapPin, Package, Truck, User, WalletCards } from "lucide-react";
import { AccountShell } from "@/components/account/account-shell";
import { getAllOrders, formatPrice } from "@/lib/data";

export default function AccountPage() {
  const orders = getAllOrders();
  const latestOrder = orders[1] || orders[0];

  return (
    <AccountShell
      title="Welcome back, John"
      description="Review orders, saved details, addresses, wishlist, and payment preferences from one clean customer area."
      aside={<Link href="/account/profile" className="inline-flex h-10 items-center justify-center rounded-lg bg-foreground px-4 text-sm font-semibold text-background">Edit profile</Link>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        {[
          [Package, "Orders", "3 lifetime orders", "/account/orders"],
          [User, "Profile", "Contact details ready", "/account/profile"],
          [MapPin, "Addresses", "2 saved locations", "/account/addresses"],
          [Heart, "Wishlist", "Saved favorites", "/account/wishlist"],
        ].map(([Icon, label, copy, href]) => (
          <Link key={href} href={href} className="rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary"><Icon className="h-5 w-5" /></span>
            <h2 className="mt-4 font-semibold">{label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Recent orders</h2>
              <p className="mt-1 text-sm text-muted-foreground">Track purchases and view invoices.</p>
            </div>
            <Link href="/account/orders" className="text-sm font-semibold">View all</Link>
          </div>
          <div className="mt-5 space-y-3">
            {orders.map((order) => (
              <Link key={order.id} href={`/account/order/${order.id}`} className="grid gap-3 rounded-xl border border-border p-4 text-sm transition hover:bg-secondary sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <span>
                  <span className="block font-semibold">{order.orderNumber}</span>
                  <span className="text-muted-foreground">{order.items.length} items</span>
                </span>
                <span className="capitalize text-muted-foreground">{order.status}</span>
                <span className="font-semibold">{formatPrice(order.total)}</span>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary"><Truck className="h-5 w-5" /></span>
              <div>
                <h2 className="font-semibold">Next delivery</h2>
                <p className="text-sm text-muted-foreground">{latestOrder.orderNumber}</p>
              </div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-2/3 rounded-full bg-foreground" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Processing complete. Preparing shipment handoff.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Saved payment</h2>
            <div className="mt-4 rounded-xl bg-foreground p-4 text-background">
              <WalletCards className="h-5 w-5" />
              <p className="mt-8 text-sm text-background/70">Primary card</p>
              <p className="mt-1 font-semibold">Visa ending 4242</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Account readiness</h2>
            <div className="mt-4 space-y-3 text-sm">
              {["Email verified", "Default address saved", "Payment method ready"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-muted-foreground"><CreditCard className="h-4 w-4" />{item}</div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AccountShell>
  );
}
