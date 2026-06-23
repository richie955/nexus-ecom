import { AccountShell } from "@/components/account/account-shell";
import { ProfileForm } from "@/components/account/profile-form";

export default function ProfilePage() {
  return (
    <AccountShell title="Profile" description="Edit the customer details used across checkout, orders, and notifications.">
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <ProfileForm />
        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Preferences</h2>
            <div className="mt-5 space-y-4 text-sm">
              <label className="flex items-center justify-between gap-4">
                <span>
                  <span className="block font-medium">Order updates</span>
                  <span className="text-muted-foreground">Email shipment and delivery notices.</span>
                </span>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-foreground" />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span>
                  <span className="block font-medium">Product dispatch</span>
                  <span className="text-muted-foreground">New arrivals and private offers.</span>
                </span>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-foreground" />
              </label>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Security</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Password last changed 34 days ago. Two-factor authentication is ready for backend integration.</p>
          </div>
        </aside>
      </div>
    </AccountShell>
  );
}
