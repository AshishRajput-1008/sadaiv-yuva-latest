'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import s from './Partnerpage.module.css';

// Same display font used across the rest of the site
const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

const CREDENTIALS = [
  { label: 'Registration', value: '12A registered' },
  { label: 'Tax benefit', value: '80G registered' },
  { label: 'CSR', value: 'Approved for CSR funds' },
  { label: 'Founded', value: '2024, by youth volunteers' },
];

const WAYS = [
  {
    tone: 'saffron',
    title: 'Companies and CSR teams',
    text: 'Fund or co-design a programme in education, health, livelihood or women empowerment, and see it carried out in the villages we work in.',
    cta: 'Talk about CSR',
    topic: 'csr',
  },
  {
    tone: 'blue',
    title: 'Donors and sponsors',
    text: 'Support the foundation with a gift or sponsor a specific activity. Individuals, families and groups of friends are all welcome.',
    cta: 'Donate or sponsor',
    topic: 'donate',
  },
  {
    tone: 'green',
    title: 'Schools, colleges and institutions',
    text: 'Bring Sadaiv Cyber\u2019s digital safety education to your students or staff, or work with us on community and awareness activities.',
    cta: 'Write to our team',
    topic: 'cyber',
  },
  {
    tone: 'saffron',
    title: 'Volunteers and members',
    text: 'Give your time, skills or voice. Volunteers and members are the reason the foundation works as a youth-led organisation.',
    cta: 'Volunteer or join',
    topic: 'volunteer',
  },
];

const AREAS = [
  {
    tone: 'saffron',
    name: 'Sadaiv Yuva Foundation',
    text: 'Grassroots social work with youth and families in villages.',
    items: ['Education', 'Health', 'Livelihood', 'Women empowerment'],
  },
  {
    tone: 'blue',
    name: 'Sadaiv Cyber',
    text: 'Digital safety education that helps people stay safe online.',
    items: ['Digital literacy', 'Online safety awareness'],
  },
  {
    tone: 'green',
    name: 'Sadaiv Puja',
    text: 'Preserving and sharing our cultural traditions.',
    items: ['Puja services', 'Havan services'],
  },
];

const STEPS = [
  { tone: 'saffron', title: 'Tell us about you', text: 'Write to us with who you are and what you would like to support.' },
  { tone: 'blue', title: 'We talk it through', text: 'A person from our team replies, and we agree together on the focus area that fits best.' },
  { tone: 'green', title: 'We act on the ground', text: 'Our volunteers and local teams carry out the work in the communities we serve.' },
  { tone: 'saffron', title: 'We keep you informed', text: 'You hear back from us about how the work is going and who it has reached.' },
];

const COMMITMENTS = [
  { tone: 'saffron', title: 'Rooted in the grassroots', text: 'We work directly with youth and families in villages, where need is greatest, not from a distance.' },
  { tone: 'blue', title: 'Open and accountable', text: 'You can ask us how your support is being used, and we will answer plainly.' },
  { tone: 'green', title: 'Built to last', text: 'We prefer steady, sustainable work over short-lived efforts, so that results stay with the community.' },
  { tone: 'saffron', title: 'Respectful of every community', text: 'Our programmes are inclusive, and we work with communities rather than simply for them.' },
];

const FAQ = [
  {
    q: 'Can we support just one area of work?',
    a: 'Yes. You can choose the foundation\u2019s social work, Sadaiv Cyber, or Sadaiv Puja, or combine them. Tell us your interest and we will suggest how to proceed.',
  },
  {
    q: 'Is the foundation approved for CSR funding and tax benefits?',
    a: 'The foundation is registered under 12A and 80G and approved for CSR funds. Write to us and we will share the details you need for your records.',
  },
  {
    q: 'Can our employees or students take part?',
    a: 'Yes. Employee and student volunteering is a good way to get involved. Describe your group and the time you have, and we will reply with options.',
  },
  {
    q: 'We are a small organisation. Can we still partner?',
    a: 'Of course. Partnerships come in every size, from a single awareness session to a long-term programme. Start with a short message.',
  },
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
    const t = window.setTimeout(measure, 400);
    window.addEventListener('resize', measure);
    return () => { window.clearTimeout(t); window.removeEventListener('resize', measure); };
  }, []);
  return ref;
}

export default function PartnerPage() {
  const pageRef = useHeaderOffset();
  useEffect(() => { document.title = 'Partner With Us | Sadaiv Yuva Foundation'; }, []);

  return (
    <div className={`${s.page} ${display.variable}`} ref={pageRef}>
      {/* ───────── Hero ───────── */}
      <header className={s.hero}>
        <div className={s.watermark} aria-hidden="true">PARTNER</div>
        <div className={`wrap ${s.heroGrid}`}>
          <div>
            <span className={s.chip}>
              <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
              Partner with us
            </span>
            <h1 className={s.h1}>
              Build a better Bharat,
              <em>together.</em>
            </h1>
            <span className={s.rule} aria-hidden="true" />
            <p className={s.lead}>
              Sadaiv Yuva Foundation is a youth-led non-profit working at the grassroots in education, health,
              livelihood and women empowerment. We partner with companies, donors, institutions and volunteers
              who want their support to reach people directly.
            </p>
            <div className={s.heroActions}>
              <Link href="/contact?topic=csr" className={s.btnPrimary}>Start a conversation</Link>
              <a href="#ways" className={s.btnText}>See ways to partner</a>
            </div>
          </div>

          <figure className={s.figure}>
            <div className={s.photo}>
              <Image
                src="/hero/about-us.jpg"
                alt="Sadaiv Yuva Foundation volunteers standing together in a village beneath the foundation banner"
                fill priority sizes="(max-width: 900px) 90vw, 40vw" className={s.photoImg}
              />
            </div>
            <figcaption className={s.caption}>Our volunteers with the community, in the field.</figcaption>
          </figure>
        </div>
      </header>

      {/* ───────── Credentials ───────── */}
      <section className={s.facts} aria-label="Foundation credentials">
        <dl className={`wrap ${s.factsGrid}`}>
          {CREDENTIALS.map(c => (
            <div className={s.fact} key={c.label}>
              <dt className={s.factLabel}>{c.label}</dt>
              <dd className={s.factValue}>{c.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ───────── Intro ───────── */}
      <section className={s.intro}>
        <div className={`wrap ${s.introGrid}`}>
          <div className={s.introHead}>
            <h2 className={s.h2}>Why partner with Sadaiv Yuva</h2>
            <span className={s.ruleSm} aria-hidden="true" />
          </div>
          <div className={s.prose}>
            <p>
              We began in 2024 with one belief: every young Indian deserves the tools to reach their full potential.
              That belief still shapes everything we do, and it is why we work where need is greatest and impact
              is most profound.
            </p>
            <p>
              Our work brings together grassroots social work, digital safety education through Sadaiv Cyber, and
              cultural preservation through Sadaiv Puja. Partners can support one area or several, and every
              partnership starts with a conversation about what matters to you.
            </p>
            <blockquote className={s.quote}>
              Sadaiv Yuva means always youthful. Our spirit to serve stays young, and our commitment to Bharat never fades.
            </blockquote>
          </div>
        </div>
      </section>

      {/* ───────── Ways to partner ───────── */}
      <section id="ways" className={s.ways} aria-labelledby="ways-title">
        <div className="wrap">
          <div className={s.sectionHead}>
            <h2 id="ways-title" className={s.h2}>Ways to partner</h2>
            <p className={s.sectionSub}>Choose the route that fits you best. Each one opens a message to our team with the right topic selected.</p>
          </div>
          <ul className={s.wayList}>
            {WAYS.map(w => (
              <li className={`${s.way} ${s[w.tone]}`} key={w.title}>
                <h3 className={s.wayTitle}>{w.title}</h3>
                <p className={s.wayText}>{w.text}</p>
                <Link href={`/contact?topic=${w.topic}`} className={s.wayLink}>{w.cta}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Areas of work ───────── */}
      <section className={s.areas} aria-labelledby="areas-title">
        <div className="wrap">
          <div className={s.areasHead}>
            <h2 id="areas-title" className={`${s.h2} ${s.h2Light}`}>What your support can go towards</h2>
            <p className={s.areasSub}>Three areas of work, each with its own team and focus.</p>
          </div>
          <div className={s.areasGrid}>
            {AREAS.map(a => (
              <article className={`${s.area} ${s[a.tone]}`} key={a.name}>
                <h3 className={s.areaName}>{a.name}</h3>
                <p className={s.areaText}>{a.text}</p>
                <ul className={s.areaList}>
                  {a.items.map(i => <li key={i}>{i}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── How it works ───────── */}
      <section className={s.steps} aria-labelledby="steps-title">
        <div className="wrap">
          <div className={s.sectionHead}>
            <h2 id="steps-title" className={s.h2}>How a partnership works</h2>
            <p className={s.sectionSub}>Simple, personal and without paperwork on the first step.</p>
          </div>
          <ol className={s.stepList}>
            {STEPS.map((st, i) => (
              <li className={`${s.step} ${s[st.tone]}`} key={st.title}>
                <span className={s.stepNum} aria-hidden="true">{i + 1}</span>
                <h3 className={s.stepTitle}>{st.title}</h3>
                <p className={s.stepText}>{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── Commitments ───────── */}
      <section className={s.commit} aria-labelledby="commit-title">
        <div className={`wrap ${s.commitGrid}`}>
          <div className={s.commitHead}>
            <h2 id="commit-title" className={s.h2}>What you can expect from us</h2>
            <span className={s.ruleSm} aria-hidden="true" />
            <p className={s.sectionSub}>Four commitments we hold ourselves to with every partner.</p>
          </div>
          <dl className={s.commitList}>
            {COMMITMENTS.map(c => (
              <div className={`${s.commitItem} ${s[c.tone]}`} key={c.title}>
                <dt className={s.commitTitle}>{c.title}</dt>
                <dd className={s.commitText}>{c.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className={s.faq} aria-labelledby="faq-title">
        <div className={`wrap ${s.faqGrid}`}>
          <div>
            <h2 id="faq-title" className={s.h2}>Questions partners ask</h2>
            <span className={s.ruleSm} aria-hidden="true" />
          </div>
          <div className={s.faqList}>
            {FAQ.map(f => (
              <details className={s.item} key={f.q}>
                <summary className={s.summary}>
                  <span>{f.q}</span>
                  <i className={s.plus} aria-hidden="true" />
                </summary>
                <p className={s.answer}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Closing ───────── */}
      <section className={s.closing}>
        <div className="wrap">
          <div className={s.closingBox}>
            <div>
              <h2 className={s.closingTitle}>Let&rsquo;s talk about what we can do together</h2>
              <p className={s.closingText}>
                Send us a short message. A person from our team will reply to you.
              </p>
            </div>
            <div className={s.closingActions}>
              <Link href="/contact?topic=csr" className={s.btnPrimary}>Start a conversation</Link>
              <Link href="/about" className={s.btnGhost}>About the foundation</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}