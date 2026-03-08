import { useEffect, useState } from 'react';
import { api, type Service } from '../lib/api';
import { Card } from '../components/ui/Card';

interface FlippableCardProps {
  service: Service;
}

const FlippableCard = ({ service }: FlippableCardProps) => {
  return (
    <div className="group perspective">
      <div className="relative h-full w-full transform rounded-3xl border border-slate-800 bg-slate-900/60 text-left shadow-lg shadow-black/30 transition-transform duration-500 group-hover:[transform:rotateY(180deg)] [transform-style:preserve-3d]">
        <div className="absolute inset-0 flex flex-col justify-between p-5 [backface-visibility:hidden]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              {service.category === 'main' ? 'Main service' : 'Auxiliary service'}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-slate-50">{service.name}</h3>
            <p className="mt-2 text-sm text-slate-300">{service.short_description}</p>
          </div>
          <p className="mt-4 text-xs text-slate-400">Hover to see full details →</p>
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h3 className="text-lg font-semibold text-emerald-200">{service.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            {service.long_description}
          </p>
        </div>
      </div>
    </div>
  );
};

const seedServices: Service[] = [
  {
    id: 'seed-1',
    name: 'End-to-End Study Abroad Support',
    category: 'main',
    icon_url: '/icons/support.svg',
    short_description: 'Complete guidance from application to post-arrival.',
    long_description:
      'We guide students through school selection, application, visa, pre-departure and post-arrival orientation.',
  },
  {
    id: 'seed-2',
    name: 'IELTS Training',
    category: 'main',
    icon_url: '/icons/ielts.svg',
    short_description: 'Prepare for IELTS exams with expert guidance.',
    long_description:
      'Tailored IELTS coaching to help students achieve required scores for admission.',
  },
];

const Services = () => {
  const [services, setServices] = useState<Service[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getServices()
      .then((data) => {
        setServices(data.length ? data : seedServices);
      })
      .catch(() => {
        setServices(seedServices);
        setError(
          'Showing sample services. Connect the backend to manage services from the admin panel.',
        );
      });
  }, []);

  const main = (services ?? []).filter((s) => s.category === 'main');
  const auxiliary = (services ?? []).filter((s) => s.category === 'auxiliary');

  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Services
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Everything you need to study abroad with confidence.
        </h1>
        <p className="text-sm leading-relaxed text-slate-300 md:text-base">
          From the first counselling session to airport pickup in your new country, ARCKAE
          offers structured, personalised support so you never feel lost in the process.
        </p>
        {error ? <p className="text-xs text-amber-300">{error}</p> : null}
      </header>

      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-slate-50">Main services</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {main.map((service) => (
            <FlippableCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-50">We also provide</h2>
            <p className="text-sm text-slate-300">
              Auxiliary services that make your transition smoother and safer.
            </p>
          </div>
          <Card className="max-w-md text-xs text-slate-300">
            <p className="font-medium text-emerald-300">Tip for parents</p>
            <p className="mt-2">
              Use our accommodation and financial advisory services to understand where
              your child will live and what costs to expect each semester.
            </p>
          </Card>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {auxiliary.length
            ? auxiliary.map((service) => (
                <FlippableCard key={service.id} service={service} />
              ))
            : [
                'Accommodation Booking',
                'Employment Advisory',
                'Post-Arrival Support',
                'Change of Institution',
                'Financial Advisory',
                'Flight Booking Support',
              ].map((name) => (
                <Card key={name} className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-50">{name}</h3>
                  <p className="text-xs text-slate-300">
                    Personalised, local‑context advice so you and your family make decisions
                    with full information.
                  </p>
                </Card>
              ))}
        </div>
      </section>
    </div>
  );
};

export default Services;

