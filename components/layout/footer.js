import Link from "next/link";

export function Footer() {
  const columns = [
    ["Shop", [["Categories", "/categories"], ["Collections", "/collections"], ["Search", "/search"]]],
    ["Company", [["About", "/about"], ["Contact", "/contact"]]],
    ["Account", [["Profile", "/account/profile"], ["Orders", "/account/orders"], ["Wishlist", "/account/wishlist"]]],
  ];
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_2fr] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2 font-semibold"><span className="grid h-9 w-9 place-items-center rounded-lg bg-foreground text-background">N</span>Nexus</Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">A polished ecommerce starter built for fast product discovery, smooth checkout, and easy backend replacement.</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {columns.map(([title, items]) => (
            <div key={title}>
              <h3 className="font-semibold">{title}</h3>
              <div className="mt-4 space-y-3">
                {items.map(([label, href]) => <Link key={href} href={href} className="block text-sm text-muted-foreground hover:text-foreground">{label}</Link>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
