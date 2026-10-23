'use client';
import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { Fraunces } from 'next/font/google';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import s from './Programs.module.css';

// Same display font as the Navbar, Hero and Footer
const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

/* ---------- Icons (stroke style, same family as the footer) ---------- */
const ICONS: Record<string, string[]> = {
  book:     ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'],
  heart:    ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'],
  users:    ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  briefcase:['M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'],
  leaf:     ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z', 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'],
  flag:     ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
  monitor:  ['M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M8 21h8', 'M12 17v4'],
  shield:   ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  file:     ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
  code:     ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
  sun:      ['M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z', 'M12 1v2', 'M12 21v2', 'M4.22 4.22l1.42 1.42', 'M18.36 18.36l1.42 1.42', 'M1 12h2', 'M21 12h2', 'M4.22 19.78l1.42-1.42', 'M18.36 5.64l1.42-1.42'],
  calendar: ['M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
  star:     ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
  arrow:    ['M5 12h14', 'M13 6l6 6-6 6'],
  check:    ['M20 6L9 17l-5-5'],
};

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(ICONS[name] || []).map(d => <path key={d} d={d} />)}
    </svg>
  );
}

/* ---------- Content ---------- */
interface Program {
  icon: string;
  tag: string;
  title: string;
  desc: string;
  points: string[];
  serves: string;
}
interface Pillar {
  id: string;
  label: string;
  short: string;
  icon: string;
  color: string;
  eyebrow: string;
  headline: string;
  text: string;
  cta: { label: string; href: string };
  cols: 3 | 4;
  programs: Program[];
}

const pillars: Pillar[] = [
  {
    id: 'social', label: 'Social Work', short: 'Education, health & livelihood', icon: 'users', color: '#16803D',
    eyebrow: 'Pillar 01 · Social Work',
    headline: 'Serving communities, village by village',
    text: 'This is the heart of the Foundation. Our social programmes cover education, health, women’s empowerment, livelihood, the environment and youth leadership, each shaped by what the village itself tells us it needs.',
    cta: { label: 'Support our work', href: '/Contact' },
    cols: 3,
    programs: [
      { icon: 'book', tag: 'Education', title: 'Shiksha Uday: Rise of Education',
        desc: 'Learning support for children in rural schools, with books, uniforms, bridge classes and mentoring. We pay special attention to keeping girls enrolled and in class.',
        points: ['Learning centres', 'Books & uniforms', 'Mentoring'], serves: 'Children in rural schools' },
      { icon: 'heart', tag: 'Health', title: 'Swasthya Mitra: Health Companion',
        desc: 'Health camps, maternal and child health awareness, basic screenings and referrals that connect families in remote villages to the care they need.',
        points: ['Health camps', 'Screenings', 'Referrals'], serves: 'Families in remote villages' },
      { icon: 'users', tag: 'Women', title: 'Nari Shakti: Women’s Strength',
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
    id: 'cyber', label: 'Sadaiv Cyber', short: 'Digital skills & online safety', icon: 'monitor', color: '#1D4ED8',
    eyebrow: 'Pillar 02 · Sadaiv Cyber',
    headline: 'Digital skills and safety for everyone',
    text: 'Sadaiv Cyber brings computers, internet know-how and online safety within reach of rural families, so they can use technology to learn, earn and reach the services they are entitled to.',
    cta: { label: 'Join Sadaiv Cyber Membership', href: '#membership' },
    cols: 4,
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
    id: 'puja', label: 'Sadaiv Puja', short: 'Faith, culture & community', icon: 'sun', color: '#E8650F',
    eyebrow: 'Pillar 03 · Sadaiv Puja',
    headline: 'Faith, culture and community together',
    text: 'Sadaiv Puja keeps our traditions alive through community celebrations and learning for the young, in ways that bring people together and respect the environment.',
    cta: { label: 'Explore Sadaiv Puja', href: '#partners' },
    cols: 4,
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

const principles = [
  { n: '01', title: 'Listen first', text: 'Every programme starts with a conversation with the village, not a plan made from outside.' },
  { n: '02', title: 'Start local', text: 'We work through local volunteers, teachers and young people who live in the communities they serve.' },
  { n: '03', title: 'Stay accountable', text: 'We share what we spend and what we achieve with our donors, members and partners.' },
];

/* ---------- Components ---------- */
function ProgramCard({ p }: { p: Program }) {
  return (
    <article className={s.card}>
      <div className={s.cardTop}>
        <div className={s.icon}><Icon name={p.icon} size={24} /></div>
        <span className={s.tag}>{p.tag}</span>
      </div>
      <h4 className={s.title}>{p.title}</h4>
      <p className={s.desc}>{p.desc}</p>
      <ul className={s.points}>
        {p.points.map(pt => (
          <li key={pt}><Icon name="check" size={14} />{pt}</li>
        ))}
      </ul>
      <div className={s.foot}>
        <div>
          <span className={s.footLabel}>Who it serves</span>
          <strong className={s.serves}>{p.serves}</strong>
        </div>
        <a href="#contact" className={s.arrow} aria-label={`Get involved with ${p.title}`}>
          <Icon name="arrow" size={18} />
        </a>
      </div>
    </article>
  );
}

export default function Programs() {
  const secRef = useScrollReveal();
  const [activeId, setActiveId] = useState(pillars[0].id);
  const active = pillars.find(p => p.id === activeId) ?? pillars[0];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = pillars.findIndex(p => p.id === activeId);
    if (e.key === 'ArrowRight') { e.preventDefault(); setActiveId(pillars[(i + 1) % pillars.length].id); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); setActiveId(pillars[(i - 1 + pillars.length) % pillars.length].id); }
  };

  return (
    <section id="programs" className={`${s.programs} ${display.variable} sec`} ref={secRef}>
      <div className="wrap">
        <div className={`${s.hd} sr`}>
          <span className="chip"><i />Our Programs</span>
          <h2 className="sec-title">Three pillars, <em>one</em> purpose</h2>
          <p className="sec-sub">
            Sadaiv Yuva Foundation works through social service, digital empowerment
            under Sadaiv Cyber, and cultural service under Sadaiv Puja. Each pillar
            serves the same community and the same goal: a young, capable, self-reliant Bharat.
          </p>
        </div>

        {/* Pillar tabs */}
        <div className={`${s.tabs} sr`} role="tablist" aria-label="Programme pillars" onKeyDown={onKey}>
          {pillars.map(p => (
            <button
              key={p.id}
              id={`tab-${p.id}`}
              type="button"
              role="tab"
              aria-selected={p.id === activeId}
              aria-controls={`panel-${p.id}`}
              tabIndex={p.id === activeId ? 0 : -1}
              className={`${s.tab} ${p.id === activeId ? s.tabActive : ''}`}
              style={{ '--c': p.color } as CSSProperties}
              onClick={() => setActiveId(p.id)}
            >
              <span className={s.tabIcon}><Icon name={p.icon} size={20} /></span>
              <span className={s.tabText}>
                <span className={s.tabLabel}>{p.label}</span>
                <span className={s.tabShort}>{p.short}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Active pillar */}
        {/* Stable wrapper carries the scroll-reveal class; the keyed panel inside re-mounts on tab change */}
        <div className="sr">
        <div
          key={active.id}
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          className={s.panel}
          style={{ '--c': active.color } as CSSProperties}
        >
          <div className={s.banner}>
            <div className={s.bannerText}>
              <span className={s.eyebrow}>{active.eyebrow}</span>
              <h3 className={s.bannerTitle}>{active.headline}</h3>
              <p className={s.bannerDesc}>{active.text}</p>
              <a href={active.cta.href} className={s.cta}>
                {active.cta.label}
                <Icon name="arrow" size={18} />
              </a>
            </div>
            <div className={s.bannerArt} aria-hidden="true"><Icon name={active.icon} size={150} /></div>
          </div>

          <div className={`${s.grid} ${active.cols === 4 ? s.grid4 : s.grid3}`}>
            {active.programs.map(p => <ProgramCard key={p.title} p={p} />)}
          </div>
        </div>
        </div>

        {/* How we work */}
        <div className={`${s.how} sr d2`}>
          <h3 className={s.howTitle}>How we work</h3>
          <div className={s.howGrid}>
            {principles.map(p => (
              <div key={p.n} className={s.principle}>
                <span className={s.pNum}>{p.n}</span>
                <h4 className={s.pTitle}>{p.title}</h4>
                <p className={s.pText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}