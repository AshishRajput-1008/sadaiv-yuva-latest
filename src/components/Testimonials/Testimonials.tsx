'use client';
import type { CSSProperties } from 'react';
import { Fraunces } from 'next/font/google';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import s from './Testimonials.module.css';

// Same display font as the Navbar, Hero, Programs, Journey and Footer
const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

/* ---------- Icons ---------- */
const ICONS: Record<string, string[]> = {
  message:   ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
  users:     ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  briefcase: ['M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'],
  heart:     ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'],
  lock:      ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  arrow:     ['M5 12h14', 'M13 6l6 6-6 6'],
};

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(ICONS[name] || []).map(d => <path key={d} d={d} />)}
    </svg>
  );
}

/* ---------- Real testimonials go here ----------
   Only add a story that a real person has given you, in their own words,
   and set `consent: true` only after you have their permission to publish it
   (written or recorded). Entries without consent are never shown.

   Example:
   {
     name: 'Full Name',
     role: 'Parent, Village name',
     pillar: 'Social Work',            // 'Social Work' | 'Sadaiv Cyber' | 'Sadaiv Puja' | 'Partner'
     text: 'Their words, lightly edited for spelling only.',
     consent: true,
   },
*/
type Pillar = 'Social Work' | 'Sadaiv Cyber' | 'Sadaiv Puja' | 'Partner';
interface Review {
  name: string;
  role: string;
  pillar: Pillar;
  text: string;
  consent: boolean;
}
const reviews: Review[] = [];

const PILLAR_COLOR: Record<Pillar, string> = {
  'Social Work': '#16803D',
  'Sadaiv Cyber': '#1D4ED8',
  'Sadaiv Puja': '#E8650F',
  'Partner': '#0B1B3F',
};

const prompts = [
  {
    icon: 'heart', title: 'Families & beneficiaries',
    text: 'Tell us what changed for your child, your household or your village, and what we could do better.',
  },
  {
    icon: 'users', title: 'Members & volunteers',
    text: 'Share what it is like to be part of Sadaiv Yuva Foundation, whether you joined for Cyber, Puja or our social work.',
  },
  {
    icon: 'briefcase', title: 'Partners & supporters',
    text: 'If you have seen our work first hand, tell others what you observed, including the gaps we should close.',
  },
];

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');

function Story({ r, featured }: { r: Review; featured?: boolean }) {
  const c = PILLAR_COLOR[r.pillar];
  return (
    <figure className={`${s.story} ${featured ? s.featured : ''}`} style={{ '--c': c } as CSSProperties}>
      <span className={s.pill}>{r.pillar}</span>
      <blockquote className={s.quote}>
        <span className={s.qmark} aria-hidden="true">&ldquo;</span>
        {r.text}
      </blockquote>
      <figcaption className={s.author}>
        <span className={s.avatar} aria-hidden="true">{initials(r.name)}</span>
        <span>
          <strong className={s.name}>{r.name}</strong>
          <span className={s.role}>{r.role}</span>
        </span>
      </figcaption>
      <span className={s.permission}><Icon name="lock" size={13} />Shared with permission</span>
    </figure>
  );
}

export default function Testimonials() {
  const secRef = useScrollReveal();
  const published = reviews.filter(r => r.consent);
  const hasStories = published.length > 0;
  const [featured, ...rest] = published;

  return (
    <section id="testimonials" className={`${s.test} ${display.variable} sec`} ref={secRef}>
      <div className="wrap">
        <div className={`${s.hd} sr`}>
          <span className="chip"><i />Testimonials</span>
          <h2 className="sec-title">Voices from our <em>community</em></h2>
          <p className="sec-sub">
            {hasStories
              ? 'In their own words, shared with their permission. We publish what people tell us, including the parts that help us improve.'
              : 'We are a young foundation and we only publish words that real people have given us. Their stories will appear here as they are shared, with permission.'}
          </p>
        </div>

        {hasStories ? (
          <div className={`${s.stories} sr d2`}>
            <Story r={featured} featured />
            {rest.length > 0 && (
              <div className={s.grid}>
                {rest.map(r => <Story key={r.name + r.text.slice(0, 12)} r={r} />)}
              </div>
            )}
          </div>
        ) : (
          <div className={`${s.invite} sr d2`}>
            <div className={s.inviteMain}>
              <span className={s.inviteIcon}><Icon name="message" size={26} /></span>
              <h3 className={s.inviteTitle}>Your experience can help others trust our work</h3>
              <p className={s.inviteText}>
                If Sadaiv Yuva Foundation, Sadaiv Cyber or Sadaiv Puja has been part of your life,
                we would be grateful to hear from you. Praise is welcome, and so is honest criticism.
              </p>
              <a href="/Contact" className={s.cta}>
                Share your experience
                <Icon name="arrow" size={18} />
              </a>
              <p className={s.note}><Icon name="lock" size={14} />We publish a story only with the written permission of the person who shared it.</p>
            </div>

            <ul className={s.prompts}>
              {prompts.map(p => (
                <li key={p.title} className={s.prompt}>
                  <span className={s.pIcon}><Icon name={p.icon} size={22} /></span>
                  <div>
                    <h4 className={s.pTitle}>{p.title}</h4>
                    <p className={s.pText}>{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}