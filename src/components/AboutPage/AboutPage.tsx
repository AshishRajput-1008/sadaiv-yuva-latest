'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import s from './Aboutpage.module.css';

// Same display font used across the rest of the site
const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

const FACTS = [
  { label: 'Founded', value: '2024' },
  { label: 'Started by', value: 'Youth volunteers' },
  { label: 'Status', value: 'Registered non-profit' },
  { label: 'Focus areas', value: 'Education, health, livelihood, women empowerment' },
];

const ARMS = [
  {
    tone: 'saffron',
    name: 'Sadaiv Yuva Foundation',
    text: 'Grassroots social work with youth and families in villages, where the need is greatest.',
    items: ['Education', 'Health', 'Livelihood', 'Women empowerment'],
    topic: 'info',
    icon: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17.5" cy="9" r="2.4" />
        <path d="M17 14.2c2.4.3 4.2 2.3 4.2 4.8" />
      </>
    ),
  },
  {
    tone: 'blue',
    name: 'Sadaiv Cyber',
    text: 'Digital safety education that helps people use the internet with confidence.',
    items: ['Digital literacy', 'Online safety'],
    topic: 'cyber',
    icon: (
      <>
        <path d="M12 3l7 3v5.5c0 4.3-2.9 8-7 9.5-4.1-1.5-7-5.2-7-9.5V6l7-3z" />
        <path d="M9 12l2.2 2.2L15.2 10" />
      </>
    ),
  },
  {
    tone: 'green',
    name: 'Sadaiv Puja',
    text: 'Preserving and sharing our cultural traditions through puja and havan services.',
    items: ['Puja', 'Havan'],
    topic: 'puja',
    icon: (
      <>
        <path d="M12 3c1 3.5 4.5 5 4.5 9.2A4.5 4.5 0 0 1 12 17a4.5 4.5 0 0 1-4.5-4.8C7.5 9.8 9 8.5 10 7c.5 1.2 1 1.8 2 2 0-2.5 0-4 0-6z" />
        <path d="M6 20.5h12" />
      </>
    ),
  },
];

const PRINCIPLES = [
  { tone: 'saffron', title: 'Education first', text: 'Learning is where opportunity begins, so it comes before everything else we do.' },
  { tone: 'blue', title: 'Women power', text: 'When women gain skills and confidence, whole families and villages move forward with them.' },
  { tone: 'green', title: 'Sustainability', text: 'We prefer steady work that lasts over quick efforts that fade.' },
  { tone: 'saffron', title: 'Inclusivity', text: 'Our programmes are open to every community, and no one is left to the margins.' },
  { tone: 'blue', title: 'Health for all', text: 'Good health should not depend on where a person was born.' },
  { tone: 'green', title: 'Digital India', text: 'People should be able to use technology safely, whether they live in a city or a village.' },
];


/* Measures the real fixed header height (any screen size) so the hero never sits under it */
function useHeaderOffset() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const measure = () => {
      let bottom = 0;
      document.querySelectorAll<HTMLElement>('header, nav, [class*="avbar" i]').forEach(el => {
        if (ref.current?.contains(el)) return; // ignore this page's own hero <header>
        if (getComputedStyle(el).position !== 'fixed') return;
        const r = el.getBoundingClientRect();
        if (r.top < 40 && r.height > 0) bottom = Math.max(bottom, r.bottom);
      });
      if (bottom && ref.current) ref.current.style.setProperty('--nav-h', `${Math.ceil(bottom) + 8}px`);
    };
    measure();
    const t = window.setTimeout(measure, 400); // after fonts / images settle
    window.addEventListener('resize', measure);
    return () => { window.clearTimeout(t); window.removeEventListener('resize', measure); };
  }, []);
  return ref;
}

export default function AboutPage() {
  const pageRef = useHeaderOffset();
  useEffect(() => { document.title = 'About Us | Sadaiv Yuva Foundation'; }, []);

  return (
    <div className={`${s.page} ${display.variable}`} ref={pageRef}>
      {/* ───────── Hero ───────── */}
      <header className={s.hero}>
        <div className={s.watermark} aria-hidden="true">ABOUT</div>
        <div className={`wrap ${s.heroGrid}`}>
          <div className={s.heroCopy}>
            <span className={s.chip}>
              <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
              About us
            </span>
            <h1 className={s.h1}>
              Always youthful,
              <em>always of service.</em>
            </h1>
            <span className={s.rule} aria-hidden="true" />
            <p className={s.lead}>
              Sadaiv Yuva Foundation is a non-profit started by young volunteers who believe every young Indian
              deserves the tools to reach their full potential. We work at the grassroots, with the people
              and villages that need support the most.
            </p>
            <div className={s.heroActions}>
              <Link href="/contact" className={s.btnPrimary}>Partner with us</Link>
              <a href="#story" className={s.btnText}>Read our story</a>
            </div>
          </div>

          <figure className={s.figure}>
            <div className={s.photo}>
              <Image
                src="/hero/about-us.jpg"
                alt="Sadaiv Yuva Foundation volunteers standing together in a village beneath the foundation banner"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 40vw"
                className={s.photoImg}
              />
            </div>
            <figcaption className={s.caption}>Our volunteers with the community, in the field.</figcaption>
          </figure>
        </div>
      </header>

      {/* ───────── Key facts ───────── */}
      <section className={s.facts} aria-label="Foundation at a glance">
        <dl className={`wrap ${s.factsGrid}`}>
          {FACTS.map(f => (
            <div className={s.fact} key={f.label}>
              <dt className={s.factLabel}>{f.label}</dt>
              <dd className={s.factValue}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ───────── Story ───────── */}
      <section id="story" className={s.story}>
        <div className={`wrap ${s.storyGrid}`}>
          <div className={s.storyHead}>
            <h2 className={s.h2}>Where we began</h2>
            <span className={s.ruleSm} aria-hidden="true" />
          </div>

          <div className={s.prose}>
            <p>
              Sadaiv Yuva Foundation began in 2024, when a group of young volunteers decided that waiting for
              opportunity to reach villages was not enough. They shared one belief: every young Indian deserves
              the tools to reach their full potential.
            </p>
            <p>
              So we started where the need is greatest, at the grassroots, working directly with youth and families.
              Our work centres on education, health, livelihood and women empowerment, the areas where steady
              support changes what a family is able to do next.
            </p>
            <p>
              As the work grew, two partner organisations joined it. <strong>Sadaiv Cyber</strong> teaches digital
              safety and literacy so people can use the internet with confidence. <strong>Sadaiv Puja</strong> carries
              our cultural traditions forward through puja and havan services. Together with the foundation&rsquo;s
              field work, they let us support people at every stage of life.
            </p>
            <blockquote className={s.quote}>
              Sadaiv Yuva means always youthful. Our spirit to serve stays young, and our commitment to Bharat never fades.
            </blockquote>
          </div>
        </div>
      </section>

      {/* ───────── Three arms ───────── */}
      <section className={s.arms} aria-labelledby="arms-title">
        <div className="wrap">
          <div className={s.armsHead}>
            <h2 id="arms-title" className={`${s.h2} ${s.h2Light}`}>One foundation, three ways of working</h2>
            <p className={s.armsSub}>
              Each team has its own focus and its own contact, and all three work towards the same goal.
            </p>
          </div>

          <div className={s.armsGrid}>
            {ARMS.map(a => (
              <article className={`${s.arm} ${s[a.tone]}`} key={a.name}>
                <span className={s.armIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{a.icon}</svg>
                </span>
                <h3 className={s.armName}>{a.name}</h3>
                <p className={s.armText}>{a.text}</p>
                <ul className={s.armList}>
                  {a.items.map(i => <li key={i}>{i}</li>)}
                </ul>
                <Link href={`/contact?topic=${a.topic}`} className={s.armLink}>Write to this team</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Principles ───────── */}
      <section className={s.principles} aria-labelledby="principles-title">
        <div className="wrap">
          <div className={s.principlesHead}>
            <h2 id="principles-title" className={s.h2}>What guides our work</h2>
            <p className={s.principlesSub}>Six commitments that shape every programme we run.</p>
          </div>
          <ul className={s.principleList}>
            {PRINCIPLES.map(p => (
              <li className={`${s.principle} ${s[p.tone]}`} key={p.title}>
                <h3 className={s.pTitle}>{p.title}</h3>
                <p className={s.pText}>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Closing call ───────── */}
      <section className={s.closing}>
        <div className="wrap">
          <div className={s.closingBox}>
            <div>
              <h2 className={s.closingTitle}>Volunteer, give, or partner with us</h2>
              <p className={s.closingText}>
                Tell us how you would like to be involved. A person from our team will write back to you.
              </p>
            </div>
            <div className={s.closingActions}>
              <Link href="/contact" className={s.btnPrimary}>Get in touch</Link>
              <Link href="/" className={s.btnGhost}>Back to home</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}