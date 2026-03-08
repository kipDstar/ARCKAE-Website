import { FormEvent, useState } from 'react';
import { api } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (captcha.trim() !== '7') {
      setError('Please answer the simple question correctly to prove you are human.');
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      intended_destination: formData.get('intended_destination') as string,
      preferred_course: formData.get('preferred_course') as string,
      current_education_level: formData.get('current_education_level') as string,
      message: formData.get('message') as string,
      appointment_date: formData.get('appointment_date') || null,
      mode: formData.get('mode') || null,
    };

    setLoading(true);
    try {
      await api.submitContact(payload);
      setSuccess(
        'Your enquiry has been received. A counsellor will contact you to confirm your appointment.',
      );
      form.reset();
      setCaptcha('');
    } catch (err) {
      setError('Something went wrong while submitting your request. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Contact &amp; Appointments
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Book a consultation with an ARCKAE counsellor.
        </h1>
        <p className="text-sm leading-relaxed text-slate-300 md:text-base">
          Share a few details about your study abroad plans and we&apos;ll recommend the
          best next step: online call or in‑person visit at our Iten office.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-slate-200" htmlFor="full_name">
                  Full name
                </label>
                <Input id="full_name" name="full_name" required />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-200" htmlFor="phone">
                  Phone number
                </label>
                <Input id="phone" name="phone" required />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-slate-200" htmlFor="email">
                  Email
                </label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <label
                  className="text-xs font-medium text-slate-200"
                  htmlFor="current_education_level"
                >
                  Current education level
                </label>
                <Input
                  id="current_education_level"
                  name="current_education_level"
                  placeholder="e.g. KCSE, Diploma, Degree"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  className="text-xs font-medium text-slate-200"
                  htmlFor="intended_destination"
                >
                  Intended destination
                </label>
                <Input
                  id="intended_destination"
                  name="intended_destination"
                  placeholder="e.g. Australia, UK, Canada"
                />
              </div>
              <div>
                <label
                  className="text-xs font-medium text-slate-200"
                  htmlFor="preferred_course"
                >
                  Preferred course / area
                </label>
                <Input
                  id="preferred_course"
                  name="preferred_course"
                  placeholder="e.g. Nursing, IT, Business"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  className="text-xs font-medium text-slate-200"
                  htmlFor="appointment_date"
                >
                  Preferred appointment date
                </label>
                <Input id="appointment_date" name="appointment_date" type="date" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-200" htmlFor="mode">
                  Mode
                </label>
                <select
                  id="mode"
                  name="mode"
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <option value="">Select...</option>
                  <option value="Physical">Physical (at ARCKAE office)</option>
                  <option value="Virtual">Virtual (phone / online)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-200" htmlFor="message">
                Tell us a bit more
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                placeholder="Share your goals, timelines or any questions you have."
              />
            </div>

            <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-300 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <p>
                Simple spam protection: what is{' '}
                <span className="font-semibold text-emerald-300">3 + 4</span>?
              </p>
              <Input
                name="captcha"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="Type your answer here"
              />
            </div>

            {error ? <p className="text-xs text-amber-300">{error}</p> : null}
            {success ? <p className="text-xs text-emerald-300">{success}</p> : null}

            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting…' : 'Submit request'}
            </Button>
          </form>
        </Card>

        <div className="space-y-4 text-sm text-slate-300">
          <Card className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              How appointments work
            </p>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-xs text-slate-200">
              <li>You submit this form with your basic details.</li>
              <li>A counsellor reviews it and contacts you to confirm a time.</li>
              <li>You meet physically in Iten or virtually depending on your choice.</li>
            </ol>
          </Card>
          <Card className="space-y-2 text-xs">
            <p className="font-medium text-emerald-300">Contact</p>
            <p>Email: arckae.int@gmail.com</p>
            <p>Tel: 0741 001 286</p>
            <p>Location: Iten Town, Kalyet Center, 2nd Floor, Kenya</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;

