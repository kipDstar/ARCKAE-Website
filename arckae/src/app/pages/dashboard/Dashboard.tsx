import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, type Appointment, type FAQ, type Service, type User } from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

type Tab = 'services' | 'faqs' | 'appointments';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('services');
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('arckae_token');
    if (!storedToken) {
      navigate('/staff');
      return;
    }
    setToken(storedToken);

    const storedUser = localStorage.getItem('arckae_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      api
        .getMe(storedToken)
        .then((u) => {
          setUser(u);
          localStorage.setItem('arckae_user', JSON.stringify(u));
        })
        .catch(() => {
          navigate('/staff');
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    Promise.all([api.getServices(), api.getFaqs(), api.getAppointments(token)])
      .then(([servicesRes, faqsRes, appointmentsRes]) => {
        setServices(servicesRes);
        setFaqs(faqsRes);
        setAppointments(appointmentsRes);
      })
      .catch(() => {
        setError('Failed to load dashboard data. Check that the API is running.');
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('arckae_token');
    localStorage.removeItem('arckae_user');
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Dashboard
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Welcome back{user ? `, ${user.name}` : ''}.
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Role: <span className="font-medium text-slate-200">{user?.role}</span>
          </p>
        </div>
        <Button variant="ghost" className="text-xs" onClick={handleLogout}>
          Log out
        </Button>
      </header>

      <nav className="flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={() => setTab('services')}
          className={`rounded-full px-3 py-1 ${
            tab === 'services' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900/60'
          }`}
        >
          Services
        </button>
        <button
          type="button"
          onClick={() => setTab('faqs')}
          className={`rounded-full px-3 py-1 ${
            tab === 'faqs' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900/60'
          }`}
        >
          FAQs
        </button>
        <button
          type="button"
          onClick={() => setTab('appointments')}
          className={`rounded-full px-3 py-1 ${
            tab === 'appointments' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900/60'
          }`}
        >
          Appointments
        </button>
      </nav>

      {error ? <p className="text-xs text-amber-300">{error}</p> : null}
      {loading ? <p className="text-xs text-slate-300">Loading…</p> : null}

      {tab === 'services' && token ? (
        <ServicesTab
          token={token}
          services={services}
          onChange={setServices}
          isAdmin={isAdmin}
        />
      ) : null}
      {tab === 'faqs' && token ? (
        <FaqsTab token={token} faqs={faqs} onChange={setFaqs} isAdmin={isAdmin} />
      ) : null}
      {tab === 'appointments' && token ? (
        <AppointmentsTab
          token={token}
          appointments={appointments}
          onChange={setAppointments}
        />
      ) : null}
    </div>
  );
};

interface ServicesTabProps {
  token: string;
  services: Service[];
  onChange: (services: Service[]) => void;
  isAdmin: boolean;
}

const ServicesTab = ({ token, services, onChange, isAdmin }: ServicesTabProps) => {
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setCreating(true);
    try {
      const created = await api.createService(token, {
        name: formData.get('name') as string,
        category: (formData.get('category') as 'main' | 'auxiliary') || 'main',
        icon_url: null,
        short_description: formData.get('short_description') as string,
        long_description: formData.get('long_description') as string,
      });
      onChange([created, ...services]);
      form.reset();
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    await api.deleteService(token, id);
    onChange(services.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <p className="text-sm font-semibold text-slate-100">Create service</p>
        {!isAdmin ? (
          <p className="text-xs text-slate-400">
            Only admins can create or edit services.
          </p>
        ) : (
          <form className="grid gap-3 md:grid-cols-2" onSubmit={handleCreate}>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200" htmlFor="name">
                Name
              </label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <option value="main">Main</option>
                <option value="auxiliary">Auxiliary</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label
                className="text-xs font-medium text-slate-200"
                htmlFor="short_description"
              >
                Short description
              </label>
              <Input id="short_description" name="short_description" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label
                className="text-xs font-medium text-slate-200"
                htmlFor="long_description"
              >
                Long description
              </label>
              <textarea
                id="long_description"
                name="long_description"
                rows={3}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                required
              />
            </div>
            <Button type="submit" disabled={creating} className="md:col-span-2">
              {creating ? 'Creating…' : 'Create service'}
            </Button>
          </form>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id} className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-50">{service.name}</p>
                <p className="text-xs text-slate-400">Category: {service.category}</p>
              </div>
              {isAdmin ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="text-[11px] text-rose-300"
                  onClick={() => handleDelete(service.id)}
                >
                  Delete
                </Button>
              ) : null}
            </div>
            <p className="text-slate-200">{service.short_description}</p>
          </Card>
        ))}
        {!services.length ? (
          <p className="text-xs text-slate-400">
            No services found. Use the form above to create the first service.
          </p>
        ) : null}
      </div>
    </div>
  );
};

interface FaqsTabProps {
  token: string;
  faqs: FAQ[];
  onChange: (faqs: FAQ[]) => void;
  isAdmin: boolean;
}

const FaqsTab = ({ token, faqs, onChange, isAdmin }: FaqsTabProps) => {
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setCreating(true);
    try {
      const created = await api.createFaq(token, {
        question: formData.get('question') as string,
        answer: formData.get('answer') as string,
        category: (formData.get('category') ||
          'Getting Started') as FAQ['category'],
      });
      onChange([created, ...faqs]);
      form.reset();
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    await api.deleteFaq(token, id);
    onChange(faqs.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <p className="text-sm font-semibold text-slate-100">Create FAQ</p>
        {!isAdmin ? (
          <p className="text-xs text-slate-400">
            Only admins can create or edit FAQs.
          </p>
        ) : (
          <form className="grid gap-3" onSubmit={handleCreate}>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200" htmlFor="question">
                Question
              </label>
              <Input id="question" name="question" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200" htmlFor="answer">
                Answer
              </label>
              <textarea
                id="answer"
                name="answer"
                rows={3}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-200" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <option value="Getting Started">Getting Started</option>
                <option value="Admissions">Admissions</option>
                <option value="IELTS">IELTS</option>
                <option value="Visa & Travel">Visa &amp; Travel</option>
                <option value="After Arrival">After Arrival</option>
              </select>
            </div>
            <Button type="submit" disabled={creating}>
              {creating ? 'Creating…' : 'Create FAQ'}
            </Button>
          </form>
        )}
      </Card>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <Card key={faq.id} className="space-y-2 text-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-50">{faq.question}</p>
                <p className="mt-1 text-xs text-slate-400">Category: {faq.category}</p>
              </div>
              {isAdmin ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="text-[11px] text-rose-300"
                  onClick={() => handleDelete(faq.id)}
                >
                  Delete
                </Button>
              ) : null}
            </div>
            <p className="text-slate-200">{faq.answer}</p>
          </Card>
        ))}
        {!faqs.length ? (
          <p className="text-xs text-slate-400">
            No FAQs yet. Use the form above to create the first FAQ.
          </p>
        ) : null}
      </div>
    </div>
  );
};

interface AppointmentsTabProps {
  token: string;
  appointments: Appointment[];
  onChange: (appointments: Appointment[]) => void;
}

const AppointmentsTab = ({ token, appointments, onChange }: AppointmentsTabProps) => {
  const handleStatusChange = async (id: string, status: Appointment['status']) => {
    const updated = await api.updateAppointment(token, id, { status });
    onChange(appointments.map((a) => (a.id === id ? updated : a)));
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-2 text-xs text-slate-200">
        <p className="font-semibold text-slate-50">Appointments</p>
        <p className="text-slate-400">
          Counsellors see appointments assigned to them. Admins see all appointments.
        </p>
      </Card>
      <div className="space-y-3">
        {appointments.map((a) => (
          <Card key={a.id} className="space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-50">{a.full_name}</p>
                <p className="text-slate-300">
                  {a.email} • {a.phone}
                </p>
              </div>
              <select
                value={a.status}
                onChange={(e) =>
                  handleStatusChange(a.id, e.target.value as Appointment['status'])
                }
                className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-[11px] text-slate-100"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <p className="text-slate-300">
              Destination: {a.intended_destination || 'Not specified'} • Course:{' '}
              {a.preferred_course || 'Not specified'}
            </p>
            <p className="text-slate-400">
              Appointment:{' '}
              {a.appointment_date ? `${a.appointment_date} • ${a.mode}` : 'To be agreed'}
            </p>
            {a.message ? (
              <p className="text-slate-300">Message: {a.message}</p>
            ) : null}
          </Card>
        ))}
        {!appointments.length ? (
          <p className="text-xs text-slate-400">
            No appointments yet. New submissions from the website will appear here.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;

