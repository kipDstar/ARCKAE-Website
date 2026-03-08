import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const StaffLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('arckae_token');
    if (token) {
      navigate('/staff/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    setLoading(true);
    try {
      const { access_token } = await api.login(email, password);
      localStorage.setItem('arckae_token', access_token);
      const user = await api.getMe(access_token);
      localStorage.setItem('arckae_user', JSON.stringify(user));
      navigate('/staff/dashboard');
    } catch {
      setError('Login failed. Check your email and password and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Staff login
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          Sign in to the ARCKAE dashboard.
        </h1>
      </header>
      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-medium text-slate-200" htmlFor="email">
              Email
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
            <label className="text-xs font-medium text-slate-200" htmlFor="password">
              Password
            </label>
            <Input id="password" name="password" type="password" required />
          </div>
          {error ? <p className="text-xs text-amber-300">{error}</p> : null}
          <Button type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default StaffLogin;

