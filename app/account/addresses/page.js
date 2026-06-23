import { AccountShell } from "@/components/account/account-shell";
import { AddressCard } from "@/components/account/address-card";

const addresses = [
  {
    id: "addr_001",
    label: "Home",
    name: "John Doe",
    line1: "123 Tech Street",
    line2: "Apt 4B",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "US",
    isDefault: true,
  },
  {
    id: "addr_002",
    label: "Office",
    name: "John Doe",
    line1: "456 Market St",
    line2: "Floor 12",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "US",
    isDefault: false,
  },
];

export default function AddressesPage() {
  return (
    <AccountShell
      title="Addresses"
      description="Manage saved shipping and billing locations. Fields use inline edit controls so the page stays calm until changes are needed."
      aside={<button className="inline-flex h-10 items-center justify-center rounded-lg bg-foreground px-4 text-sm font-semibold text-background">Add address</button>}
    >
      <div className="grid gap-6">
        {addresses.map((address) => <AddressCard key={address.id} address={address} />)}
      </div>
    </AccountShell>
  );
}
