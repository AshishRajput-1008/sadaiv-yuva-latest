'use client';

import Image from 'next/image';
import { Fraunces } from 'next/font/google';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import s from './Partners.module.css';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--f-display',
  display: 'swap',
});

const partners = [
  {
    index: '01',
    logo: '/logo-puja.png',
    logoBg: '#fff',
    name: 'Sadaiv',
    nameAccent: 'Puja',
    href: 'https://www.sadaivpuja.com/',
    tagline: 'Divine Services at Every Doorstep',
    accent: '#E05A14',
    accent2: '#F59A23',
    accentPale: 'rgba(224,90,20,.07)',
    accentBorder: 'rgba(224,90,20,.22)',
    accentShadow: 'rgba(224,90,20,.35)',
    desc: 'Through Sadaiv Yuva Foundation, Sadaiv Puja brings authentic, sacred religious ceremonies right to your home, conducted by experienced, certified Panditji. We believe devotion should never be a luxury; our services are affordably priced so every family can observe their rituals with full vidhi-vidhaan and divine grace.',
    badge: 'Faith · Tradition · Affordability',
    services: [
      'Ghar Puja',
      'Havan & Yagya',
      'Satyanarayana Katha',
      'Vivah Puja',
      'Griha Pravesh',
      'Namkaran Ceremony',
      'Mundan Sanskar',
      'Navratri Anushthan',
      'Bhagwat Katha',
      'Satyanarayan Puja',
    ],
    perks: [
      'Experienced, verified Panditji',
      'Samagri arranged on request',
      'Flexible timing',
      'Available across UP',
      'Pocket-friendly, no hidden charges',
    ],
    cta: 'Book a Puja',
    className: 'sr-l',
  },
  {
    index: '02',
    logo: '/logo-cyber.png',
    logoBg: '#0d1b3e',
    name: 'Sadaiv',
    nameAccent: 'Cyber',
    href: 'https://sadaivcyber.com/',
    tagline: 'Empowering Youth in the Digital Age',
    accent: '#1D4ED8',
    accent2: '#38BDF8',
    accentPale: 'rgba(29,78,216,.07)',
    accentBorder: 'rgba(29,78,216,.22)',
    accentShadow: 'rgba(29,78,216,.35)',
    desc: "Sadaiv Cyber is dedicated to bridging India's digital divide, offering free and affordable computer education, cyber safety workshops, and professional digital skills to youth across rural & semi-urban India. Because digital literacy is not a privilege; it is a fundamental right every young Indian deserves.",
    badge: 'Education · Digital · Awareness',
    services: [
      'Computer Basics',
      'Digital Literacy',
      'Cyber Safety',
      'Social Media Safety',
      'Coding for Beginners',
      'MS Office & Tools',
      'Online Fraud Awareness',
      'e-Governance Services',
      'Digital Business Skills',
      'AI & Future Skills',
    ],
    perks: [
      'Free & subsidised courses',
      'Hindi-medium teaching',
      'Certified trainers & hands-on labs',
      'Special rural workshops',
      'Government scheme guidance',
    ],
    cta: 'Enroll / Learn More',
    className: 'sr-r',
  },
];

const Check = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="12"
    height="12"
    aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Partners() {
  const secRef = useScrollReveal();

  return (
    <section
      id="partners"
      className={`${s.partners} ${display.variable}`}
      ref={secRef}
      aria-labelledby="partners-title"
    >
      <div className={s.bg} aria-hidden="true" />

      <div className="wrap">
        <header className={`${s.hd} sr`}>
          <p className={s.eyebrow}>
            <span className={s.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Our Ecosystem
          </p>

          <h2 id="partners-title" className={s.title}>
            Sister <em>Organisations</em>
          </h2>

          <span className={s.rule} aria-hidden="true" />

          <p className={s.sub}>
            Beyond our core programs, Sadaiv Yuva Foundation proudly supports two
            specialist partner organisations dedicated to serving India with
            excellence and affordability.
          </p>
        </header>

        <div className={s.grid}>
          {partners.map((p) => (
            <article
              key={p.nameAccent}
              className={`${s.card} ${p.className}`}
              style={
                {
                  '--pc': p.accent,
                  '--pc2': p.accent2,
                  '--pc-pale': p.accentPale,
                  '--pc-bd': p.accentBorder,
                  '--pc-sh': p.accentShadow,
                } as React.CSSProperties
              }
            >
              <div className={s.top}>
                <span className={s.index} aria-hidden="true">
                  {p.index}
                </span>

                <div className={s.logoRow}>
                  <div className={s.logoBox} style={{ background: p.logoBg }}>
                    <Image
                      src={p.logo}
                      alt={`${p.name} ${p.nameAccent}`}
                      width={120}
                      height={48}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>

                  <div>
                    <h3 className={s.name}>
                      {p.name} <span>{p.nameAccent}</span>
                    </h3>
                    <p className={s.tagline}>{p.tagline}</p>
                  </div>
                </div>

                <p className={s.desc}>{p.desc}</p>
                <p className={s.badge}>
                  <i aria-hidden="true" />
                  {p.badge}
                </p>
              </div>

              <div className={s.body}>
                <p className={s.svcTitle}>Our Services</p>

                <ul className={s.services}>
                  {p.services.map((sv) => (
                    <li className={s.svc} key={sv}>
                      {sv}
                    </li>
                  ))}
                </ul>

                <ul className={s.perks}>
                  {p.perks.map((pk) => (
                    <li key={pk}>
                      <span className={s.tick}>
                        <Check />
                      </span>
                      {pk}
                    </li>
                  ))}
                </ul>

                <a
                  href={p.href}
                  className={s.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.cta} <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}