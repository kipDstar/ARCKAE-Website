import { useEffect, useMemo, useState } from 'react';
import { api, type FAQ as FAQType } from '../lib/api';
import { Accordion } from '../components/ui/Accordion';
import { Input } from '../components/ui/Input';

const categories: FAQType['category'][] = [
  'Getting Started',
  'Admissions',
  'IELTS',
  'Visa & Travel',
  'After Arrival',
];

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQType[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<FAQType['category'] | 'All'>(
    'All',
  );

  useEffect(() => {
    api
      .getFaqs()
      .then((data) => {
        if (!data.length) {
          setFaqs([
            {
              id: 'seed-1',
              question: 'Is the initial consultation free?',
              answer:
                'Yes, ARCKAE provides a free consultation to evaluate student goals and recommend study options.',
              category: 'Getting Started',
            },
            {
              id: 'seed-2',
              question: 'Can you help with visa applications?',
              answer:
                'Yes, we guide students on all required documentation and application procedures to maximize approval chances.',
              category: 'Visa & Travel',
            },
          ]);
        } else {
          setFaqs(data);
        }
      })
      .catch(() => {
        setFaqs([
          {
            id: 'seed-1',
            question: 'Is the initial consultation free?',
            answer:
              'Yes, ARCKAE provides a free consultation to evaluate student goals and recommend study options.',
            category: 'Getting Started',
          },
          {
            id: 'seed-2',
            question: 'Can you help with visa applications?',
            answer:
              'Yes, we guide students on all required documentation and application procedures to maximize approval chances.',
            category: 'Visa & Travel',
          },
        ]);
      });
  }, []);

  const filtered = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === 'All' ? true : faq.category === activeCategory;
      const term = search.trim().toLowerCase();
      const matchesSearch = !term
        ? true
        : faq.question.toLowerCase().includes(term) ||
          faq.answer.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [faqs, search, activeCategory]);

  return (
    <div className="space-y-10">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Frequently Asked Questions
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Answers to common questions about studying abroad with ARCKAE.
        </h1>
        <p className="text-sm leading-relaxed text-slate-300 md:text-base">
          Browse by category or search for keywords like &quot;IELTS&quot;, &quot;visa&quot;
          or &quot;fees&quot;. You can also ask your counsellor anything during a
          consultation.
        </p>
      </header>

      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className={`rounded-full px-3 py-1 text-xs ${
              activeCategory === 'All'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-900/60 text-slate-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-900/60 text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="max-w-xs">
          <Input
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section>
        {filtered.length ? (
          <Accordion
            items={filtered.map((faq) => ({
              id: faq.id,
              title: faq.question,
              children: (
                <div className="space-y-1 text-sm text-slate-200">
                  <p>{faq.answer}</p>
                  <p className="text-xs text-slate-400">
                    Category: <span className="font-medium">{faq.category}</span>
                  </p>
                </div>
              ),
            }))}
          />
        ) : (
          <p className="text-sm text-slate-300">
            No FAQs match your search. Try a different keyword or ask us directly using
            the contact form.
          </p>
        )}
      </section>
    </div>
  );
};

export default FAQ;

