import { AccountNav } from "@/components/account/account-nav";

export function AccountShell({ title, eyebrow = "Customer area", description, children, aside }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
        </div>
        {aside}
      </div>
      <AccountNav />
      {children}
    </div>
  );
}
