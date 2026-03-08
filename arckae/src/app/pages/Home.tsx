import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const mainServices = [
  'End‑to‑End Study Abroad Support',
  'IELTS Training',
  'Career Guidance',
  'School Applications',
  'Visa Application Support',
  'Pre / Post Departure Orientation',
];

const auxiliaryServices = [
  'Accommodation Booking',
  'Employment Advisory',
  'Post‑Arrival Support',
  'Change of Institution',
  'Financial Advisory',
  'Flight Booking Support',
];

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Iten • Kenya • Global study pathways
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
            Your bridge from Iten to world‑class universities.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
            ARCKAE walks with you from the first question to your first day on
            campus abroad — choosing the right country, preparing for IELTS,
            handling applications, visas, and settling in after arrival.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => {
                window.location.href = '/contact';
              }}
            >
              Book a free consultation
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                window.location.href = '/services';
              }}
            >
              View all services
            </Button>
          </div>
          <div className="mt-4 grid gap-3 text-xs text-slate-400 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-100">End‑to‑end support</p>
              <p>From course choice to landing abroad.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">IELTS &amp; visa ready</p>
              <p>Training, documentation and interview prep.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">Parents welcomed</p>
              <p>We involve parents at every major step.</p>
            </div>
          </div>
        </div>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-sky-500/10 to-transparent" />
          <div className="relative space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Main services
            </p>
            <ul className="space-y-2 text-sm text-slate-100">
              {mainServices.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-[11px] text-emerald-300">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              We also provide
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-200">
              {auxiliaryServices.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-800/70 bg-slate-900/60 px-3 py-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
