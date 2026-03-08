const address = 'Iten Town, Kalyet Center, 2nd Floor, Kenya';
const mapsQuery = encodeURIComponent(address);
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

export function LocationMap() {
  return (
    <section className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-black/30">
        <iframe
          title="ARCKAE location on Google Maps"
          src={mapsEmbed}
          className="h-[320px] w-full border-0 md:h-[420px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-50">Visit ARCKAE in Iten Town</h2>
        <p className="text-sm text-slate-300">
          We are located at <span className="font-semibold">{address}</span>. Drop by for a
          friendly, no‑pressure conversation about your study abroad plans.
        </p>
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-4 text-sm">
          <p className="font-medium text-emerald-300">Contact</p>
          <p className="mt-2 text-slate-200">
            Email:{' '}
            <a href="mailto:arckae.int@gmail.com" className="underline decoration-emerald-400">
              arckae.int@gmail.com
            </a>
          </p>
          <p className="mt-1 text-slate-200">
            Tel:{' '}
            <a href="tel:+254741001286" className="underline decoration-emerald-400">
              0741 001 286
            </a>
          </p>
        </div>
        <a
          href={mapsLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          Open in Google Maps
          <span className="ml-2 text-xs">↗</span>
        </a>
      </div>
    </section>
  );
}

