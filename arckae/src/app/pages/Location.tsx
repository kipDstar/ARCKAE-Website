import { LocationMap } from '../components/LocationMap';

const Location = () => (
  <div className="space-y-10">
    <header className="max-w-3xl space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
        Location
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
        Visit us at Kalyet Center, Iten Town.
      </h1>
      <p className="text-sm leading-relaxed text-slate-300 md:text-base">
        Our office is easy to access from Iten and surrounding areas. Use the Google
        Maps link to get directions right to our door.
      </p>
    </header>
    <LocationMap />
  </div>
);

export default Location;

