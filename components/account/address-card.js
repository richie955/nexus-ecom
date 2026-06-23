"use client";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { EditableField } from "@/components/account/editable-field";

export function AddressCard({ address }) {
  const [label, setLabel] = useState(address.label);
  const [name, setName] = useState(address.name);
  const [line1, setLine1] = useState(address.line1);
  const [line2, setLine2] = useState(address.line2);
  const [city, setCity] = useState(address.city);
  const [state, setState] = useState(address.state);
  const [zip, setZip] = useState(address.zip);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary"><MapPin className="h-5 w-5" /></span>
          <div>
            <h2 className="font-semibold">{label}</h2>
            <p className="text-sm text-muted-foreground">{address.isDefault ? "Default shipping address" : "Saved address"}</p>
          </div>
        </div>
        {address.isDefault && <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">Default</span>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <EditableField label="Label" value={label} onSave={setLabel} />
        <EditableField label="Recipient" value={name} onSave={setName} />
        <EditableField label="Address line 1" value={line1} onSave={setLine1} className="sm:col-span-2" />
        <EditableField label="Address line 2" value={line2} onSave={setLine2} className="sm:col-span-2" />
        <EditableField label="City" value={city} onSave={setCity} />
        <EditableField label="State" value={state} onSave={setState} />
        <EditableField label="Postal code" value={zip} onSave={setZip} />
        <EditableField label="Country" value={address.country} onSave={() => {}} />
      </div>
    </div>
  );
}
