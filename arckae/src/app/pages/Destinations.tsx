const Destinations = () => (
  <div className="space-y-10">
    <section className="max-w-3xl space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
        Destinations
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
        Why many ARCKAE students choose Australia.
      </h1>
      <p className="text-sm leading-relaxed text-slate-300 md:text-base">
        Australia offers world‑class universities, practical programmes, flexible work
        options for students, and a welcoming multicultural environment. ARCKAE helps you
        match your goals with the right city, institution and course.
      </p>
    </section>

    <section className="grid gap-6 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
          Education quality
        </p>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          <li>Globally ranked universities and colleges</li>
          <li>Industry‑linked programmes and internships</li>
          <li>Pathways from diploma to degree</li>
        </ul>
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Student life
        </p>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          <li>Safe, multicultural cities and campuses</li>
          <li>Part‑time work options while you study</li>
          <li>Support for international students</li>
        </ul>
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
          Pathways after study
        </p>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          <li>Post‑study work opportunities</li>
          <li>Clear migration pathways for eligible graduates</li>
          <li>Support from ARCKAE even after you arrive</li>
        </ul>
      </div>
    </section>
  </div>
);

export default Destinations;

