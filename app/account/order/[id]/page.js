import { notFound } from "next/navigation";
import { CheckCircle2, Circle, CreditCard, MapPin, Package } from "lucide-react";
import { AccountShell } from "@/components/account/account-shell";
import { getAllOrders, getOrderById, formatPrice } from "@/lib/data";

export function generateStaticParams() {
  return getAllOrders().map((order) => ({ id: order.id }));
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) notFound();

  return (
    <AccountShell title={order.orderNumber} eyebrow="Order detail" description={`${order.items.length} items · ${order.paymentMethod}`}>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Items</h2>
          <div className="mt-5 space-y-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex gap-4 rounded-xl border border-border p-4">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-1 font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Quantity {item.quantity}</p>
                </div>
                <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
            <Row label="Subtotal" value={formatPrice(order.subtotal)} />
            <Row label="Shipping" value={order.shipping ? formatPrice(order.shipping) : "Free"} />
            <Row label="Tax" value={formatPrice(order.tax)} />
            <Row label="Total" value={formatPrice(order.total)} strong />
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">Tracking</h2>
            <div className="mt-5 space-y-4">
              {order.tracking.map((event) => (
                <div key={event.status} className="flex gap-3 text-sm">
                  {event.completed ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                  <span>
                    <span className="block font-medium">{event.status}</span>
                    <span className="text-muted-foreground">{event.date ? new Date(event.date).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Pending"}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <InfoCard icon={MapPin} title="Shipping address">
            {order.shippingAddress.name}<br />
            {order.shippingAddress.line1}, {order.shippingAddress.line2}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
          </InfoCard>
          <InfoCard icon={CreditCard} title="Payment">{order.paymentMethod}</InfoCard>
          <InfoCard icon={Package} title="Status"><span className="capitalize">{order.status}</span></InfoCard>
        </aside>
      </div>
    </AccountShell>
  );
}

function Row({ label, value, strong }) {
  return <div className={`flex justify-between ${strong ? "pt-3 text-base font-semibold" : ""}`}><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary"><Icon className="h-5 w-5" /></span>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{children}</p>
    </div>
  );
}
