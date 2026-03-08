import { Link, NavLink } from 'react-router-dom';
import { Button } from './ui/Button';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/location', label: 'Location' },
  { to: '/faq', label: 'FAQ' },
];

const activeClasses = 'text-emerald-400';
const baseClasses =
  'text-sm text-slate-300 transition-colors hover:text-emerald-300';

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/40">
            <span className="text-base font-black tracking-tight">A</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide text-slate-50">
              ARCKAE
            </p>
            <p className="text-[11px] font-medium uppercase text-slate-400">
              Study Abroad Agency
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : ''}`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            as="a" // will be ignored by TS but fine at runtime; keep simple
            href="/contact"
            variant="primary"
            className="hidden text-xs md:inline-flex"
          >
            Book appointment
          </Button>
          <Button
            variant="ghost"
            className="text-xs"
            onClick={() => {
              window.location.href = '/staff';
            }}
          >
            Staff
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
