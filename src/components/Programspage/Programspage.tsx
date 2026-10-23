'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import s from './Programspage.module.css';

// Same display font used across the rest of the site
const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

/* ---------- Icons (same stroke family as the rest of the site) ---------- */
const ICONS: Record<string, string[]> = {
  book:      ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'],
  heart:     ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'],
  users:     ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  briefcase: ['M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'],
  leaf:      ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z', 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'],
  flag:      ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
  monitor:   ['M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M8 21h8', 'M12 17v4'],
  shield:    ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  file:      ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
  code:      ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
  sun:       ['M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z', 'M12 1v2', 'M12 21v2', 'M4.22 4.22l1.42 1.42', 'M18.36 18.36l1.42 1.42', 'M1 12h2', 'M21 12h2', 'M4.22 19.78l1.42-1.42', 'M18.36 5.64l1.42-1.42'],
  calendar:  ['M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
  star:      ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
  check:     ['M20 6L9 17l-5-5'],
};
function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(ICONS[name] || []).map(d => <path key={d} d={d} />)}
    </svg>
  );
}

/* ---------- Content (from the home Programs + Journey sections) ---------- */
type Program = { icon: string; tag: string; title: string; desc: string; points: string[]; serves: string };
type Pillar = {
  id: 'social' | 'cyber' | 'puja'; label: string; short: string; headline: string; text: string;
  cta: { label: string; topic: string }; topic: string; programs: Program[];
};

const PILLARS: Pillar[] = [
  {
    id: 'social', label: 'Social work', short: 'Education, health and livelihood',
    headline: 'Serving communities, village by village',
    text: 'This is the heart of the Foundation. Our social programmes cover education, health, women\u2019s empowerment, livelihood, the environment and youth leadership, each shaped by what the village itself tells us it needs.',
    cta: { label: 'Support our work', topic: 'donate' }, topic: 'info',
    programs: [
      { icon: 'book', tag: 'Education', title: 'Shiksha Uday: Rise of Education',
        desc: 'Learning support for children in rural schools, with books, uniforms, bridge classes and mentoring. We pay special attention to keeping girls enrolled and in class.',
        points: ['Learning centres', 'Books & uniforms', 'Mentoring'], serves: 'Children in rural schools' },
      { icon: 'heart', tag: 'Health', title: 'Swasthya Mitra: Health Companion',
        desc: 'Health camps, maternal and child health awareness, basic screenings and referrals that connect families in remote villages to the care they need.',
        points: ['Health camps', 'Screenings', 'Referrals'], serves: 'Families in remote villages' },
      { icon: 'users', tag: 'Women', title: 'Nari Shakti: Women\u2019s Strength',
        desc: 'Legal awareness, self-defence training, self-help groups and vocational skills that help women earn, save and take decisions for themselves.',
        points: ['Legal literacy', 'Self-help groups', 'Skills'], serves: 'Women and girls' },
      { icon: 'briefcase', tag: 'Livelihood', title: 'Rozgar Shakti: Employment Power',
        desc: 'Vocational training, mentoring and links to local employers and micro-finance, so young people can build a livelihood close to home.',
        points: ['Vocational training', 'Mentoring', 'Local linkages'], serves: 'Unemployed youth' },
      { icon: 'leaf', tag: 'Environment', title: 'Harit Bharat: Green India',
        desc: 'Tree plantation, waste management awareness and organic farming training led by village youth, so caring for the environment becomes an everyday habit.',
        points: ['Plantation drives', 'Waste awareness', 'Organic farming'], serves: 'Villages and farmers' },
      { icon: 'flag', tag: 'Leadership', title: 'Yuva Netritva: Youth Leaders',
        desc: 'Camps, workshops and small community-project grants that help young people grow into confident leaders in their own villages.',
        points: ['Leadership camps', 'Workshops', 'Project grants'], serves: 'Young people, 16 to 30' },
    ],
  },
  {
    id: 'cyber', label: 'Sadaiv Cyber', short: 'Digital skills and online safety',
    headline: 'Digital skills and safety for everyone',
    text: 'Sadaiv Cyber brings computers, internet know-how and online safety within reach of rural families, so they can use technology to learn, earn and reach the services they are entitled to.',
    cta: { label: 'Join Sadaiv Cyber membership', topic: 'membership' }, topic: 'cyber',
    programs: [
      { icon: 'monitor', tag: 'Digital literacy', title: 'Digital Saksharta',
        desc: 'Hands-on computer and smartphone basics, from typing and email to using the internet safely, taught in simple, local language.',
        points: ['Computer basics', 'Smartphone use', 'Internet skills'], serves: 'Students, women and elders' },
      { icon: 'shield', tag: 'Online safety', title: 'Cyber Suraksha',
        desc: 'Awareness sessions on online fraud, fake links and UPI scams, and on protecting personal data, so families can use digital tools with confidence.',
        points: ['Fraud awareness', 'UPI safety', 'Data privacy'], serves: 'Families and small shopkeepers' },
      { icon: 'file', tag: 'Access', title: 'Digital Seva Sahayata',
        desc: 'Guidance with online forms and government services such as scheme applications, certificates and document uploads, so no one is left out for lack of access.',
        points: ['Form filling', 'Scheme guidance', 'Document help'], serves: 'Anyone needing online help' },
      { icon: 'code', tag: 'Career', title: 'Tech Skills for Youth',
        desc: 'Computer courses and career guidance that prepare young people for digital jobs, freelancing and further study.',
        points: ['Computer courses', 'Career guidance', 'Freelancing basics'], serves: 'Youth and job seekers' },
    ],
  },
  {
    id: 'puja', label: 'Sadaiv Puja', short: 'Faith, culture and community',
    headline: 'Faith, culture and community together',
    text: 'Sadaiv Puja keeps our traditions alive through community celebrations and learning for the young, in ways that bring people together and respect the environment.',
    cta: { label: 'Write to Sadaiv Puja', topic: 'puja' }, topic: 'puja',
    programs: [
      { icon: 'calendar', tag: 'Community', title: 'Samuhik Puja & Utsav',
        desc: 'Community pujas and festivals organised with local volunteers, open to everyone, with contributions and expenses shared openly.',
        points: ['Community pujas', 'Festival events', 'Open accounts'], serves: 'Whole community' },
      { icon: 'star', tag: 'Children', title: 'Sanskar Shala',
        desc: 'Weekend sessions where children learn stories, values, shlokas and traditions in a warm, age-appropriate way.',
        points: ['Stories & values', 'Shlokas', 'Traditions'], serves: 'Children' },
      { icon: 'sun', tag: 'Service', title: 'Puja Seva',
        desc: 'Help for families with puja arrangements, including samagri, coordination with trusted pandits and guidance on rituals.',
        points: ['Puja samagri', 'Pandit coordination', 'Ritual guidance'], serves: 'Families' },
      { icon: 'leaf', tag: 'Green festivals', title: 'Eco Utsav',
        desc: 'Festivals with less waste: clay idols, flower-waste recycling and clean-up drives after celebrations, so devotion and the environment go together.',
        points: ['Clay idols', 'Flower recycling', 'Clean-up drives'], serves: 'Devotees and neighbourhoods' },
    ],
  },
];

const PRINCIPLES = [
  { title: 'Listen first', text: 'Every programme starts with a conversation with the village, not a plan made from outside.' },
  { title: 'Start local', text: 'We work through local volunteers, teachers and young people who live in the communities they serve.' },
  { title: 'Stay accountable', text: 'We share what we spend and what we achieve with our donors, members and partners.' },
];

const MILESTONES = [
  {
    year: '2023', tag: 'The beginning', title: 'A small group, a simple belief',
    desc: 'Sadaiv Yuva Foundation began with a few young volunteers in Madhya Pradesh who believed that young people can lead change in their own villages. The first steps were modest: study support for children and awareness drives in nearby communities.',
  },
  {
    year: '2024', tag: 'Registration', title: 'Becoming a registered NGO',
    desc: 'We were formally registered in Madhya Pradesh, giving our work a legal and transparent footing. We then worked towards the 12A, 80G and CSR approvals that today allow donors and companies to support us with confidence.',
  },
  {
    year: '2025', tag: 'Three pillars', title: 'Growing into three pillars',
    desc: 'Alongside our social programmes in education, health, women\u2019s empowerment, livelihood and the environment, Sadaiv Cyber began bringing digital skills and online safety to families, and Sadaiv Puja began serving the community\u2019s cultural and spiritual needs.',
  },
  {
    year: '2026', tag: 'Today', title: 'Opening our doors to members', current: true,
    desc: 'We now invite supporters to join as members and become part of the movement, not just donors. Our programmes continue in the villages we serve, shaped by what the people there tell us they need.',
  },
  {
    year: 'Ahead', tag: 'Our promise', title: 'What comes next', next: true,
    desc: 'Deeper work in the villages we already serve, more partners who share our values, and openly sharing what we spend and what we achieve.',
  },
];

const TOTAL = PILLARS.reduce((n, p) => n + p.programs.length, 0);
const NAV = [
  ...PILLARS.map(p => ({ id: p.id as string, label: p.label })),
  { id: 'journey', label: 'Our journey' },
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

export default function ProgramsPage() {
  const pageRef = useHeaderOffset();
  const [active, setActive] = useState<string>(NAV[0].id);

  useEffect(() => { document.title = 'Our Programmes | Sadaiv Yuva Foundation'; }, []);

  // Highlights the section currently on screen in the sticky index
  useEffect(() => {
    const els = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!('IntersectionObserver' in window) || !els.length) return;
    const io = new IntersectionObserver(
      entries => {
        const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px' },
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`${s.page} ${display.variable}`} ref={pageRef}>
      {/* ───────── Hero ───────── */}
      <header className={s.hero}>
        <div className={s.watermark} aria-hidden="true">PROGRAMMES</div>
        <div className={`wrap ${s.heroGrid}`}>
          <div>
            <span className={s.chip}>
              <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
              Our programmes
            </span>
            <h1 className={s.h1}>
              Three pillars,
              <em>one purpose.</em>
            </h1>
            <span className={s.rule} aria-hidden="true" />
            <p className={s.lead}>
              Sadaiv Yuva Foundation works through social service, digital empowerment under Sadaiv Cyber, and
              cultural service under Sadaiv Puja. Each pillar serves the same community and the same goal: a
              young, capable, self-reliant Bharat.
            </p>
          </div>

          <ul className={s.index} aria-label="The three pillars">
            {PILLARS.map(p => (
              <li key={p.id}>
                <a href={`#${p.id}`} className={`${s.indexItem} ${s[p.id]}`}>
                  <span className={s.indexName}>{p.label}</span>
                  <span className={s.indexShort}>{p.short}</span>
                  <span className={s.indexCount}>{p.programs.length} programmes</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ───────── Facts ───────── */}
      <section className={s.facts} aria-label="Programmes at a glance">
        <dl className={`wrap ${s.factsGrid}`}>
          <div className={s.fact}><dt className={s.factLabel}>Pillars</dt><dd className={s.factValue}>3</dd></div>
          <div className={s.fact}><dt className={s.factLabel}>Programmes</dt><dd className={s.factValue}>{TOTAL}</dd></div>
          <div className={s.fact}><dt className={s.factLabel}>Where we work</dt><dd className={s.factValue}>Villages and rural communities</dd></div>
          <div className={s.fact}><dt className={s.factLabel}>Working since</dt><dd className={s.factValue}>2023</dd></div>
        </dl>
      </section>

      {/* ───────── Sticky index ───────── */}
      <nav className={s.stick} aria-label="Jump to a section">
        <div className={`wrap ${s.stickInner}`}>
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} className={`${s.stickLink} ${active === n.id ? s.stickOn : ''}`}
              aria-current={active === n.id ? 'true' : undefined}>
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ───────── Pillars ───────── */}
      {PILLARS.map((p, i) => (
        <section id={p.id} key={p.id} className={`${s.pillar} ${s[p.id]} ${i % 2 === 1 ? s.alt : ''}`} aria-labelledby={`${p.id}-title`}>
          <div className={`wrap ${s.pillarGrid}`}>
            <div className={s.pillarHead}>
              <span className={s.pillarTag}>{p.label}</span>
              <h2 id={`${p.id}-title`} className={s.h2}>{p.headline}</h2>
              <p className={s.pillarText}>{p.text}</p>
              <Link href={`/contact?topic=${p.cta.topic}`} className={s.pillarCta}>{p.cta.label}</Link>
            </div>

            <ul className={s.list}>
              {p.programs.map(pr => (
                <li className={s.row} key={pr.title}>
                  <span className={s.rowIcon} aria-hidden="true"><Icon name={pr.icon} size={24} /></span>
                  <div className={s.rowBody}>
                    <span className={s.rowTag}>{pr.tag}</span>
                    <h3 className={s.rowTitle}>{pr.title}</h3>
                    <p className={s.rowDesc}>{pr.desc}</p>
                    <ul className={s.points}>
                      {pr.points.map(pt => (
                        <li key={pt}><Icon name="check" size={14} />{pt}</li>
                      ))}
                    </ul>
                    <div className={s.rowFoot}>
                      <p className={s.serves}><span>Who it serves</span>{pr.serves}</p>
                      <Link href={`/contact?topic=${p.topic}`} className={s.rowLink} aria-label={`Get involved with ${pr.title}`}>Get involved</Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* ───────── How we work ───────── */}
      <section className={s.how} aria-labelledby="how-title">
        <div className="wrap">
          <div className={s.howHead}>
            <h2 id="how-title" className={`${s.h2} ${s.h2Light}`}>How we work</h2>
            <p className={s.howSub}>Three habits that shape every programme, in every village.</p>
          </div>
          <div className={s.howGrid}>
            {PRINCIPLES.map(pr => (
              <div className={s.principle} key={pr.title}>
                <h3 className={s.pTitle}>{pr.title}</h3>
                <p className={s.pText}>{pr.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Journey ───────── */}
      <section id="journey" className={s.journey} aria-labelledby="journey-title">
        <div className={`wrap ${s.journeyGrid}`}>
          <div className={s.journeyHead}>
            <h2 id="journey-title" className={s.h2}>Built step by step, since 2023</h2>
            <span className={s.ruleSm} aria-hidden="true" />
            <p className={s.journeySub}>
              We are a young foundation, and we would rather be honest about that than exaggerate. Here is how
              Sadaiv Yuva Foundation has grown so far.
            </p>
          </div>

          <ol className={s.tl}>
            {MILESTONES.map(m => (
              <li className={`${s.step} ${m.current ? s.stepNow : ''} ${m.next ? s.stepNext : ''}`} key={m.year}>
                <div className={s.stepYear}>{m.year}</div>
                <div className={s.stepBody}>
                  <span className={s.stepTag}>{m.tag}</span>
                  <h3 className={s.stepTitle}>{m.title}</h3>
                  <p className={s.stepDesc}>{m.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── Closing ───────── */}
      <section className={s.closing}>
        <div className="wrap">
          <div className={s.closingBox}>
            <div>
              <h2 className={s.closingTitle}>Every journey needs fellow travellers</h2>
              <p className={s.closingText}>Join us as a member, volunteer or supporter, and help write the next chapter.</p>
            </div>
            <div className={s.closingActions}>
              <Link href="/contact?topic=membership" className={s.btnPrimary}>Join as a member</Link>
              <Link href="/partner" className={s.btnGhost}>Partner with us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}