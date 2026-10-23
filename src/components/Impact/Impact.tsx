'use client';
import { useRef, useEffect, JSX } from 'react';
import { Fraunces } from 'next/font/google';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import s from './Impact.module.css';

const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

/*
  Keep these figures in sync with the Hero stats strip and the About section.
  Only publish numbers you can back up with your own records.
*/
const STATS = [
  {
    value: 10, suffix: 'K+', label: 'Lives touched',
    desc: 'People and families reached through our education, digital skills and community support work.',
    c: '#EA5B14', c2: '#F59A23', soft: 'rgba(234,91,20,.10)', icon: 'heart',
  },
  {
    value: 70, suffix: '+', label: 'Villages reached',
    desc: 'Villages where our team and volunteers work directly with local youth and families.',
    c: '#1A7F2E', c2: '#3FAE55', soft: 'rgba(26,127,46,.10)', icon: 'pin',
  },
  {
    value: 3, suffix: '+', label: 'Years of service',
    desc: 'Steady, on-the-ground work since we began, built on trust with the communities we serve.',
    c: '#1F5FA8', c2: '#4A8FD9', soft: 'rgba(31,95,168,.10)', icon: 'calendar',
  },
  {
    value: 6, suffix: '', label: 'Active programs',
    desc: 'Ongoing programs across education, digital skills and community support.',
    c: '#D98410', c2: '#F59A23', soft: 'rgba(245,154,35,.16)', icon: 'grid',
  },
] as const;

const FOCUS = ['Cyber Education', 'Digital skills', 'Social support'];

const ICONS: Record<string, JSX.Element> = {
  heart: <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5 6.4 5c2 0 3.5 1.1 5.6 3.2C14.1 6.1 15.6 5 17.6 5 21 5 22.8 8.6 21.5 11.8 19.5 16.4 12 21 12 21z" />,
  pin: <><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></>,
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = (n: number) => { el.textContent = `${n}${suffix}`; };

    // Respect reduced motion: just show the final number
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { show(value); return; }

    show(0);
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        show(Math.round((1 - Math.pow(1 - p, 3)) * value));   // ease-out cubic
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);

    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, suffix]);

  // Final value is rendered on the server / without JS; screen readers always get the final value
  return (
    <>
      <span ref={ref} aria-hidden="true">{value}{suffix}</span>
      <span className={s.vh}>{value}{suffix}</span>
    </>
  );
}

export default function Impact() {
  const secRef = useScrollReveal();

  return (
    <section id="impact" className={`${s.impact} ${display.variable}`} ref={secRef} aria-labelledby="impact-title">
      <div className={s.bg} aria-hidden="true" />
      <div className={s.watermark} aria-hidden="true">IMPACT</div>

      <div className="wrap">
        {/* Heading row */}
        <div className={`${s.head} sr`}>
          <div>
            <p className={s.eyebrow}>
              <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
              Our Impact
            </p>
            <h2 id="impact-title" className={s.title}>
              Our work, <em>in numbers</em>
            </h2>
            <span className={s.rule} aria-hidden="true" />
          </div>
          <p className={s.lead}>
            A plain look at where we work and who we have reached so far. Behind every figure
            is a family, a young person or a village we know by name.
          </p>
        </div>

        {/* Stat cards */}
        <ul className={s.grid}>
          {STATS.map((c, i) => (
            <li
              key={c.label}
              className={`${s.card} sr d${i + 1}`}
              style={{ '--c': c.c, '--c2': c.c2, '--soft': c.soft } as React.CSSProperties}
            >
              <span className={s.icon} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[c.icon]}
                </svg>
              </span>
              <p className={s.num}><Counter value={c.value} suffix={c.suffix} /></p>
              <h3 className={s.label}>{c.label}</h3>
              <p className={s.desc}>{c.desc}</p>
            </li>
          ))}
        </ul>

        {/* Focus areas + call to action (same pills and button as the About section) */}
        <div className={`${s.foot} sr`}>
          <div className={s.focus}>
            <span className={s.focusLabel}>Where our work focuses</span>
            <ul className={s.pills}>
              {FOCUS.map((label, i) => (
                <li className={`${s.tag} ${s[`t${i}`]}`} key={label}>
                  <i aria-hidden="true" />{label}
                </li>
              ))}
            </ul>
          </div>
          <a href="/Contact" className={s.cta}>
            JOIN US  <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}