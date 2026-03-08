const About = () => (
  <div className="space-y-10">
    <section className="max-w-3xl space-y-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
        About ARCKAE
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
        Rooted in Iten, connected to the world.
      </h1>
      <p className="text-sm leading-relaxed text-slate-300 md:text-base">
        ARCKAE Study Abroad Agency is based in Iten Town, Kalyet Center, 2nd Floor,
        Kenya. We exist to help students, parents and young professionals navigate
        the complex journey of studying abroad with clarity, confidence and
        personalised guidance.
      </p>
      <p className="text-sm leading-relaxed text-slate-300 md:text-base">
        From the first conversation about &quot;where do I start?&quot; to the moment
        you land in your new country, our counsellors walk every step with you:
        reviewing options, preparing IELTS, handling documentation, and ensuring you
        are mentally and practically ready for life abroad.
      </p>
    </section>

    <section className="grid gap-6 md:grid-cols-3">
      <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Mission
        </p>
        <p className="mt-3 text-sm text-slate-100">
          To unlock global education opportunities for students from Iten and beyond
          through honest guidance, structured preparation and end‑to‑end support.
        </p>
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
          What we value
        </p>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          <li>Transparent, realistic counselling</li>
          <li>Involving parents in key decisions</li>
          <li>Ethical school and visa guidance</li>
          <li>Support beyond departure and arrival</li>
        </ul>
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
          Who we serve
        </p>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          <li>High‑school leavers &amp; diploma holders</li>
          <li>University students seeking transfers</li>
          <li>Young professionals seeking postgraduate options</li>
          <li>Parents exploring overseas education for their children</li>
        </ul>
      </div>
    </section>
  </div>
);

export default About;
