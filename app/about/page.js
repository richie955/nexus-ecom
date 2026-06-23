export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[.9fr_1.1fr] md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">About Nexus</p>
            <h1 className="mt-3 max-w-3xl text-5xl font-semibold tracking-tight">Everyday essentials, curated with intention.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Nexus brings together thoughtful electronics, wardrobe staples, books, and home objects for people who want fewer, better things.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
              alt="Curated retail shelves"
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[.8fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Our story</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Built for calm, confident shopping.</h2>
          </div>
          <div className="space-y-5 text-muted-foreground">
            <p>
              We started Nexus to make online shopping feel less noisy. Every product in the catalog is organized around clear information,
              honest merchandising, and a checkout flow that gets out of the way.
            </p>
            <p>
              Our buying team focuses on products that earn their place: durable materials, useful features, strong reviews, and simple
              post-purchase support.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            ["40+", "Curated products"],
            ["4", "Core departments"],
            ["2 day", "Average dispatch"],
            ["14 day", "Return window"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-border bg-background p-6">
              <div className="text-3xl font-semibold">{value}</div>
              <p className="mt-2 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Thoughtful curation", "We choose products that balance quality, practicality, and long-term appeal."],
            ["Clear service", "Shipping, returns, and account tools are designed to be easy to understand."],
            ["Modern retail", "The experience is clean, responsive, and ready for brands that value polish."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
