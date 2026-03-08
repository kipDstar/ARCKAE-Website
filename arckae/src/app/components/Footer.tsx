const year = new Date().getFullYear();

const Footer = () => (
  <footer className="border-t border-white/5 bg-slate-950/80">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
      <p>
        © {year} ARCKAE Study Abroad Agency. All rights reserved.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="mailto:arckae.int@gmail.com"
          className="hover:text-emerald-300"
        >
          arckae.int@gmail.com
        </a>
        <span className="h-3 w-px bg-slate-700" />
        <a href="tel:+254741001286" className="hover:text-emerald-300">
          0741 001 286
        </a>
        <span className="h-3 w-px bg-slate-700" />
        <span>Iten Town, Kalyet Center, 2nd Floor, Kenya</span>
      </div>
    </div>
  </footer>
);

export default Footer;
