'use client';
import { useState } from 'react';
import { Fraunces } from 'next/font/google';
import { SITE } from '../../../config/siteConfig';
import s from './Donate.module.css';

// Same display font as the Navbar, Hero, Programs, Journey and Footer
const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

/* ---------- Icons ---------- */
const ICONS: Record<string, string[]> = {
  shield:  ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'],
  file:    ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8'],
  message: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
  users:   ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  heart:   ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'],
  copy:    ['M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'],
  check:   ['M20 6L9 17l-5-5'],
  arrow:   ['M5 12h14', 'M13 6l6 6-6 6'],
};
function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(ICONS[name] || []).map(d => <path key={d} d={d} />)}
    </svg>
  );
}

const PRESETS = [100, 500, 1000, 5000];
const inr = (n: number) => n.toLocaleString('en-IN');

const trust = [
  { icon: 'shield',  title: 'Registered NGO',          text: 'Registered in Madhya Pradesh, with 12A and 80G approval.' },
  { icon: 'file',    title: 'Receipt for your gift',   text: 'Share your name and PAN and we will send an 80G receipt.' },
  { icon: 'message', title: 'Ask before you give',     text: 'Questions about our work or how funds are used? Write to us and a person will reply.' },
  { icon: 'users',   title: 'Time counts too',         text: 'Cannot give money right now? Volunteering with us is just as valuable.' },
];

function CopyRow({ label, value }: { label: string; value: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch { /* clipboard blocked: the value stays visible to copy by hand */ }
  };
  return (
    <div className={s.detail}>
      <div>
        <span className={s.dLabel}>{label}</span>
        <span className={s.dValue}>{value}</span>
      </div>
      <button type="button" className={s.copy} onClick={copy} aria-label={`Copy ${label}`}>
        <Icon name={done ? 'check' : 'copy'} size={16} />
        <span>{done ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}

export default function Donate() {
  const [preset, setPreset] = useState<number | null>(500);
  const [custom, setCustom] = useState('');

  const amount = custom !== '' ? Number(custom) : preset ?? 0;
  const valid = amount >= 1;

  const { paymentUrl, upiId, bank, registrations } = SITE.donation;
  const hasBank = bank.accountNumber && bank.ifsc;
  const hasOther = upiId || hasBank;

  const mailHref =
    `mailto:${SITE.emails.donate}` +
    `?subject=${encodeURIComponent('Donation to Sadaiv Yuva Foundation')}` +
    `&body=${encodeURIComponent(
      `Hello,\n\nI would like to donate ₹${inr(amount || 0)} to ${SITE.name}. Please share the payment details.\n\n` +
      `Name:\nPhone:\nPAN (optional, for an 80G receipt):\n`
    )}`;
  const ctaHref = paymentUrl || mailHref;

  const regs = [
    registrations.g80 && `80G: ${registrations.g80}`,
    registrations.a12 && `12A: ${registrations.a12}`,
    registrations.pan && `PAN: ${registrations.pan}`,
  ].filter(Boolean) as string[];

  return (
    <section id="donate" className={`${s.donate} ${display.variable}`}>
      <div className={s.topBar} aria-hidden="true"><span /><span /><span /></div>
      <div className={`wrap ${s.inner}`}>
        {/* Left: honest message */}
        <div className={s.copyCol}>
          <span className={s.eyebrow}>Support our work</span>
          <h2 className={s.title}>Help young people lead change in their own villages.</h2>
          <p className={s.sub}>
            Your contribution supports education, digital-skills and community programmes in
            Madhya Pradesh. We are a young foundation, and we will always tell you plainly
            what we do and how your support is used.
          </p>

          <ul className={s.trust}>
            {trust.map(t => (
              <li key={t.title} className={s.trustItem}>
                <span className={s.tIcon}><Icon name={t.icon} size={20} /></span>
                <div>
                  <h3 className={s.tTitle}>{t.title}</h3>
                  <p className={s.tText}>{t.text}</p>
                </div>
              </li>
            ))}
          </ul>

          {regs.length > 0 && <p className={s.regs}>{regs.join('  ·  ')}</p>}
        </div>

        {/* Right: donation card */}
        <div className={s.card}>
          <h3 className={s.cardTitle}>Choose an amount</h3>
          <div className={s.amts} role="group" aria-label="Donation amount">
            {PRESETS.map(a => (
              <button
                key={a} type="button"
                className={`${s.amt} ${custom === '' && preset === a ? s.active : ''}`}
                aria-pressed={custom === '' && preset === a}
                onClick={() => { setPreset(a); setCustom(''); }}
              >
                ₹{inr(a)}
              </button>
            ))}
          </div>

          <label className={s.customLabel} htmlFor="d-custom">Or enter another amount</label>
          <div className={`${s.customWrap} ${custom !== '' ? s.customOn : ''}`}>
            <span className={s.rupee}>₹</span>
            <input
              id="d-custom" className={s.customInput} inputMode="numeric" autoComplete="off" placeholder="Amount"
              value={custom}
              onChange={e => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 8);
                setCustom(v);
                if (v) setPreset(null);
              }}
            />
          </div>

          <div className={s.summary}>
            <span>Your gift</span>
            <strong>{valid ? `₹${inr(amount)}` : '—'}</strong>
          </div>

          <a
            href={valid ? ctaHref : undefined}
            aria-disabled={!valid}
            className={`${s.cta} ${!valid ? s.ctaOff : ''}`}
            {...(paymentUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Icon name="heart" size={18} />
            {paymentUrl ? 'Continue to payment' : 'Request payment details'}
            <Icon name="arrow" size={18} />
          </a>
          <p className={s.hint}>
            {paymentUrl
              ? 'You can adjust the amount on the secure payment page.'
              : 'This opens an email to us. We will reply with the payment details and an 80G receipt.'}
          </p>

          {hasOther && (
            <div className={s.other}>
              <h4 className={s.otherTitle}>Other ways to give</h4>
              {upiId && <CopyRow label="UPI ID" value={upiId} />}
              {hasBank && (
                <>
                  {bank.accountName && <CopyRow label="Account name" value={bank.accountName} />}
                  <CopyRow label="Account number" value={bank.accountNumber} />
                  <CopyRow label="IFSC" value={bank.ifsc} />
                  {bank.bankName && <CopyRow label="Bank" value={bank.bankName} />}
                </>
              )}
              <p className={s.hint}>After transferring, email us your name and PAN to receive your receipt.</p>
            </div>
          )}

          <p className={s.tax}>
            Donations are eligible for deduction under Section 80G of the Income Tax Act, subject to applicable law.
          </p>
        </div>
      </div>

      <div className={s.volRow}>
        <span>Prefer to give your time?</span>
        <a href="/Contact" className={s.volLink}>Volunteer with us<Icon name="arrow" size={16} /></a>
      </div>
    </section>
  );
}