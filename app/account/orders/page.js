import Link from "next/link";
import { ChevronRight, Package, ReceiptText, Truck } from "lucide-react";
import { AccountShell } from "@/components/account/account-shell";
import { getAllOrders, formatPrice } from "@/lib/data";

export default function OrdersPage() {
  const orders = getAllOrders();

  return (
    <AccountShell title="Orders" description="View order status, shipping progress, payment method, and item summaries.">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-xl border border-border bg-card p-5">
          <h2 className="font-semibold">Order summary</h2>
          <div className="mt-5 space-y-4 text-sm">
            <Stat icon={Package} label="Total orders" value={orders.length} />
            <Stat icon={Truck} label="In progress" value={orders.filter((order) => order.status !== "delivered").length} />
            <Stat icon={ReceiptText} label="Delivered" value={orders.filter((order) => order.status === "delivered").length} />
          </div>
        </aside>
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/account/order/${order.id}`} className="block rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-semibold">{order.orderNumber}</h2>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold capitalize">{order.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {order.paymentMethod}</p>
                </div>
                <div className="flex items-center gap-3 font-semibold">
                  {formatPrice(order.total)}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="mt-5 flex -space-x-3">
                {order.items.map((item) => (
                  <img key={item.productId} src={item.image} alt={item.name} className="h-12 w-12 rounded-full border-2 border-card object-cover" />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AccountShell>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary"><Icon className="h-4 w-4" /></span>
      <span>
        <span className="block font-semibold">{value}</span>
        <span className="text-muted-foreground">{label}</span>
      </span>
    </div>
  );
}
