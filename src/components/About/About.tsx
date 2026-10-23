'use client';
import Image from 'next/image';
import { Fraunces } from 'next/font/google';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import s from './About.module.css';

const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

const pills = [
  'Education First',
  'Women Power',
  'Sustainability',
  'Inclusivity',
  'Health for All',
  'Digital India',
];

/* Desktop-only filler between the "Founded" pill and the photo.
   Everything here is taken from the About copy on this page. */
const PILLARS = [
  {
    title: 'Grassroots social work',
    text: 'Working with youth and families in villages, where the need is greatest.',
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
    title: 'Sadaiv Cyber',
    text: 'Digital safety education that helps people stay safe online.',
    icon: (
      <>
        <path d="M12 3l7 3v5.5c0 4.3-2.9 8-7 9.5-4.1-1.5-7-5.2-7-9.5V6l7-3z" />
        <path d="M9 12l2.2 2.2L15.2 10" />
      </>
    ),
  },
  {
    title: 'Sadaiv Puja',
    text: 'Preserving and sharing our cultural traditions.',
    icon: (
      <>
        <path d="M12 3c1 3.5 4.5 5 4.5 9.2A4.5 4.5 0 0 1 12 17a4.5 4.5 0 0 1-4.5-4.8C7.5 9.800 9 8.500 10 7c.5 1.200 1 1.800 2 2 0-2.500 0-4 0-6z" />
        <path d="M6 20.500h12" />
      </>
    ),
  },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function About() {
  const secRef = useScrollReveal();
  return (
    <section id="about" className={`${s.about} ${display.variable}`} ref={secRef} aria-labelledby="about-title">
      <div className={s.bg} aria-hidden="true" />
      <div className={s.watermark} aria-hidden="true">YUVA</div>

      <div className="wrap">
        <div className={s.grid}>
          {/* Visual column.
              Desktop: "Founded" pill on top, pillars card in the middle, photo at the bottom.
              Mobile: the pill floats over the photo; pillars card and years card are hidden. */}
          <div className={`${s.imgSide} sr-l`}>
            <p className={s.since}>
              <span className={s.flag} aria-hidden="true" />
              Founded in Bhopal, 2024
            </p>

            <div className={s.pillars}>
              <p className={s.pillarsHd}>What we do</p>
              <ul className={s.pillarList}>
                {PILLARS.map((p, i) => (
                  <li className={`${s.pillar} ${s[`p${i}`]}`} key={p.title}>
                    <span className={s.pIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
                        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {p.icon}
                      </svg>
                    </span>
                    <span className={s.pBody}>
                      <strong className={s.pTitle}>{p.title}</strong>
                      <span className={s.pText}>{p.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.imgWrap}>
              <div className={s.deco} aria-hidden="true" />

              <div className={s.imgBox}>
                <Image
                  src="/hero/about-us.jpg"
                  alt="Sadaiv Yuva Foundation volunteers standing together in a village beneath the foundation banner"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={s.img}
                />
              </div>

              {/* Desktop only (hidden on mobile in the CSS) */}
              <div className={s.years}>
                <span className={s.yearsNum}>3+</span>
                <span className={s.yearsTxt}>Years of dedicated service</span>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className={`${s.copy} sr-r`}>
            <p className={s.eyebrow}>
              <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
              About Us
            </p>

            <h2 id="about-title" className={s.title}>
              Driven by <em>Purpose</em>,<br />Guided by <em>Compassion</em>
            </h2>
            <span className={s.rule} aria-hidden="true" />

            <p className={s.lead}>
              Founded in 2024 by a group of passionate youth volunteers from Lucknow, Sadaiv Yuva Foundation
              was born from a single belief: <strong>every young Indian deserves the tools to reach their full potential.</strong>{' '}
              We work at the grassroots, where need is greatest and impact is most profound.
            </p>

            <p className={s.text}>
              Sadaiv Yuva Foundation is a multidimensional non-profit organization committed to holistic societal growth.
              By seamlessly uniting grassroots social work, cutting-edge digital safety education via <b>Sadaiv Cyber</b>,
              and cultural preservation through <b>Sadaiv Puja</b>, we empower individuals across all stages of life.
            </p>

            <blockquote className={s.quote}>
              &ldquo;Sadaiv Yuva: Always Youthful. Because our spirit to serve is forever young
              and our commitment to Bharat never fades.&rdquo;
            </blockquote>

            <ul className={s.pills}>
              {pills.map((label, i) => (
                <li className={`${s.tag} ${s[`t${i % 4}`]} sr d${i + 1}`} key={label}>
                  <i aria-hidden="true" />{label}
                </li>
              ))}
            </ul>

            <a href="/Contact" className={s.cta}>
              Partner With Us <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}