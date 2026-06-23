import Link from "next/link";
import { Heart, MapPin, Package, UserRound, LayoutDashboard } from "lucide-react";

export function AccountNav() {
  const links = [
    ["Overview", "/account", LayoutDashboard],
    ["Profile", "/account/profile", UserRound],
    ["Orders", "/account/orders", Package],
    ["Addresses", "/account/addresses", MapPin],
    ["Wishlist", "/account/wishlist", Heart],
  ];
  return (
    <div className="mb-8 flex gap-2 overflow-x-auto rounded-xl border border-border bg-card p-2">
      {links.map(([label, href, Icon]) => (
        <Link key={href} href={href} className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </div>
  );
}
