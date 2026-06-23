import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[.8fr_1fr] lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Contact</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Talk to our commerce studio.</h1>
        <p className="mt-5 text-muted-foreground">Use this polished mock form as a future backend integration point for support, wholesale, or client inquiries.</p>
      </div>
      <form className="space-y-4 rounded-xl border border-border bg-card p-6">
        <Input label="Name" placeholder="Jane Founder" />
        <Input label="Email" type="email" placeholder="jane@example.com" />
        <Textarea label="Message" placeholder="Tell us what you are building" />
        <Button className="w-full">Send message</Button>
      </form>
    </div>
  );
}
