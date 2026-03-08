import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
    <Navbar />
    <main className="mx-auto flex max-w-6xl flex-1 flex-col gap-16 px-4 pb-16 pt-28 md:px-6 lg:px-8">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
