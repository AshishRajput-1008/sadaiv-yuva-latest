'use client';
import { Fraunces } from 'next/font/google';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import s from './Journey.module.css';

// Same display font as the Navbar, Hero, Programs and Footer
const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

/* ---------- Icons (same stroke family as the rest of the site) ---------- */
const ICONS: Record<string, string[]> = {
  leaf:   ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z', 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'],
  users:  ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  star:   ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
  arrow:  ['M5 12h14', 'M13 6l6 6-6 6'],
};

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(ICONS[name] || []).map(d => <path key={d} d={d} />)}
    </svg>
  );
}

/* ---------- Content ----------
   Kept free of invented numbers on purpose. Add real figures, dates and photos
   here only when you can stand behind them. */
const milestones = [
  {
    year: '2023', tag: 'The beginning', icon: 'leaf', bg: 'linear-gradient(135deg,#FF8A2B,#E85A04)',
    title: 'A small group, a simple belief',
    desc: 'Sadaiv Yuva Foundation began with a few young volunteers in Madhya Pradesh who believed that young people can lead change in their own villages. The first steps were modest: study support for children and awareness drives in nearby communities.',
  },
  {
    year: '2024', tag: 'Registration', icon: 'shield', bg: 'linear-gradient(135deg,#1D4ED8,#16306B)',
    title: 'Becoming a registered NGO',
    desc: 'We were formally registered in Madhya Pradesh, giving our work a legal and transparent footing. We then worked towards the 12A, 80G and CSR approvals that today allow donors and companies to support us with confidence.',
  },
  {
    year: '2025', tag: 'Three pillars', icon: 'users', bg: 'linear-gradient(135deg,#16803D,#0F5E2C)',
    title: 'Growing into three pillars',
    desc: 'Alongside our social programmes in education, health, women’s empowerment, livelihood and the environment, Sadaiv Cyber began bringing digital skills and online safety to families, and Sadaiv Puja began serving the community’s cultural and spiritual needs.',
  },
  {
    year: '2026', tag: 'Today', icon: 'star', bg: 'linear-gradient(135deg,#E8650F,#1D4ED8)', current: true,
    title: 'Opening our doors to members',
    desc: 'We now invite supporters to join as members and become part of the movement, not just donors. Our programmes continue in the villages we serve, shaped by what the people there tell us they need.',
  },
];

const next = {
  title: 'What comes next',
  desc: 'Deeper work in the villages we already serve, more partners who share our values, and openly sharing what we spend and what we achieve.',
};

export default function Journey() {
  const secRef = useScrollReveal();

  return (
    <section id="journey" className={`${s.journey} ${display.variable} sec`} ref={secRef}>
      <div className="wrap">
        <div className={`${s.hd} sr`}>
          <span className="chip"><i />Our Journey</span>
          <h2 className="sec-title">Built step by step, <em>since</em> 2023</h2>
          <p className="sec-sub">
            We are a young foundation, and we would rather be honest about that than
            exaggerate. Here is how Sadaiv Yuva Foundation has grown so far.
          </p>
        </div>

        <ol className={s.tl}>
          {milestones.map((m, i) => (
            <li
              key={m.year}
              className={`${s.item} ${i % 2 === 0 ? s.left : s.right} ${m.current ? s.current : ''} sr d${Math.min(i + 1, 6)}`}
            >
              <div className={s.node} aria-hidden="true">
                <span className={s.dot} style={{ background: m.bg }}><Icon name={m.icon} size={22} /></span>
              </div>
              <div className={s.card}>
                <div className={s.meta}>
                  <span className={s.year}>{m.year}</span>
                  <span className={s.tag}>{m.tag}</span>
                </div>
                <h3 className={s.title}>{m.title}</h3>
                <p className={s.desc}>{m.desc}</p>
              </div>
            </li>
          ))}

          {/* What's next */}
          <li className={`${s.item} ${s.left} ${s.next} sr d5`}>
            <div className={s.node} aria-hidden="true">
              <span className={`${s.dot} ${s.dotNext}`}><Icon name="arrow" size={22} /></span>
            </div>
            <div className={s.card}>
              <div className={s.meta}>
                <span className={s.year}>Ahead</span>
                <span className={s.tag}>Our promise</span>
              </div>
              <h3 className={s.title}>{next.title}</h3>
              <p className={s.desc}>{next.desc}</p>
            </div>
          </li>
        </ol>

        {/* Closing call to action */}
        <div className={`${s.join} sr d3`}>
          <div>
            <h3 className={s.joinTitle}>Every journey needs fellow travellers</h3>
            <p className={s.joinText}>Join us as a member, volunteer or supporter, and help write the next chapter.</p>
          </div>
          <div className={s.joinActions}>
            <a href="/Contact" className={s.memberBtn}>
              <span className={s.memberLead}>Join</span>
              <span className={s.memberAccent}>Membership</span>
            </a>
            <a href="/Contact" className={s.donateBtn}>As a Partner</a>
          </div>
        </div>
      </div>
    </section>
  );
}