import Image from 'next/image';
import { Fraunces, Noto_Serif_Devanagari } from 'next/font/google';
import s from './Hero.module.css';


const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });
const deva = Noto_Serif_Devanagari({ subsets: ['devanagari'], weight: ['700'], variable: '--f-deva', display: 'swap' });

const STATS = [
  { num: '10K+', label: 'Lives touched' },
  { num: '70+', label: 'Villages reached' },
  { num: '3+',  label: 'Years of service' },
  { num: '6',    label: 'Active programs' },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="16" height="16" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Hero() {
  return (
    <section id="hero" className={`${s.hero} ${display.variable} ${deva.variable}`} aria-labelledby="hero-title">
      {/* Giant faded brand name behind the content.
          Desktop: English + Hindi. Mobile: only the Hindi line is shown (see CSS). */}
      <div className={s.brandMark} aria-hidden="true">
        <span>SADAIV YUVA</span>
        <small>Foundation</small>
        <b lang="hi">सदैव युवा फाउंडेशन</b>
      </div>

      <div className={`wrap ${s.top}`}>
        {/* Message (on mobile this wrapper is "display: contents" so the image can sit between the text and the buttons) */}
        <div className={s.copy}>
          <p className={s.badge}>
            <span className={s.flag} aria-hidden="true" />
            Registered NGO in Madhya Pradesh, since 2024
          </p>

          <h1 id="hero-title" className={s.title}>
            Where young people lead, villages rise.
          </h1>
          <span className={s.rule} aria-hidden="true" />

          <p className={s.lead}>
            Sadaiv Yuva Foundation works alongside youth and families in more than 200 villages,
            through education, digital skills and community support that last.
          </p>

          <div className={s.actions}>
            <a href="/Contact" className={s.btnPrimary}>
              <span className={s.btnIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M12 21.2l-1.45-1.32C5.4 15.2 2 12.1 2 8.3 2 5.2 4.4 3 7.4 3c1.7 0 3.4.8 4.6 2.1C13.2 3.8 14.9 3 16.6 3 19.6 3 22 5.2 22 8.3c0 3.8-3.4 6.9-8.55 11.6L12 21.2z" />
                </svg>
              </span>
              Support our mission
            </a>
            <a href="/Profile" className={s.btnGhost}>
              Learn more <Arrow />
            </a>
          </div>
        </div>

        {/* Photo collage (the old inline margins moved into the CSS: desktop only) */}
        <div className={s.collage}>
          <span className={s.watermark} aria-hidden="true">सदैव</span>

          {/* Mobile only: faint Hindi brand text sitting behind the photo */}
          <div className={s.bgText} aria-hidden="true" lang="hi">
            <span>सदैव युवा</span>
            <span>फाउंडेशन</span>
          </div>

          <div className={`${s.photo} ${s.pMain}`}>
            <Image src="/hero/boss.png" alt="Youth volunteers leading a village programme" fill priority
              sizes="(max-width: 960px) 180px, 260px" className={s.img} />
          </div>
          {/* <div className={`${s.photo} ${s.pBot}`}>
            <Image src="/hero/havan.svg" alt="Community havan ceremony with volunteers" fill
              sizes="(max-width: 960px) 150px, 220px" className={s.img} />
          </div> */}

          <div className={s.reach}>
            <span className={s.reachIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 12.5 7 12.5S19 14.2 19 9a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
            </span>
            {/* <span className={s.reachText}>
              <strong>200+ villages</strong>
              <small>across Uttar Pradesh</small>
            </span> */}
          </div>

        </div>
      </div>

      {/* Impact strip */}
      <div className={`wrap ${s.statsRow}`}>
        <dl className={s.stats} aria-label="Our impact in numbers">
          {STATS.map((st, i) => (
            <div className={`${s.stat} ${s[`tone${i}`]}`} key={st.label}>
              <dt className={s.statLabel}>{st.label}</dt>
              <dd className={s.statNum}>{st.num}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}