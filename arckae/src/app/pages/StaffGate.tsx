import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const StaffGate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const key = formData.get('access_key') as string;

    setLoading(true);
    try {
      await api.staffGate(email, key);
      sessionStorage.setItem('arckae_staff_email', email);
      navigate('/staff/login');
    } catch {
      setError(
        'Access denied. Check that you are using the correct staff email and access key.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Staff entry
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          Admin &amp; counsellor access.
        </h1>
        <p className="max-w-xl text-sm text-slate-300">
          This area is reserved for ARCKAE staff only. Use your registered staff email
          and the shared access key provided by the administrator.
        </p>
      </header>
      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-medium text-slate-200" htmlFor="email">
              Staff email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={sessionStorage.getItem('arckae_staff_email') ?? ''}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-200" htmlFor="access_key">
              Staff access key
            </label>
            <Input
              id="access_key"
              name="access_key"
              type="password"
              placeholder="Provided by ARCKAE admin"
              required
            />
          </div>
          {error ? <p className="text-xs text-amber-300">{error}</p> : null}
          <Button type="submit" disabled={loading}>
            {loading ? 'Checking…' : 'Continue to login'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default StaffGate;

