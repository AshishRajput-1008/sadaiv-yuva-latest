'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { Fraunces } from 'next/font/google';
import { SITE } from '../../../config/siteConfig';
import s from './Contactpage.module.css';

// Same display font used across the rest of the site
const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

const INTERESTS = [
  { value: 'volunteer',  label: 'Volunteering' },
  { value: 'donate',     label: 'Donating / Sponsoring' },
  { value: 'membership', label: 'Membership' },
  { value: 'csr',        label: 'CSR Partnership' },
  { value: 'puja',       label: 'Sadaiv Puja' },
  { value: 'cyber',      label: 'Sadaiv Cyber' },
  { value: 'info',       label: 'General enquiry' },
];

const FAQ = [
  {
    q: 'How can I volunteer with the foundation?',
    a: 'Choose Volunteering in the form and tell us where you are based and what you would like to help with. We will write back with the next steps.',
  },
  {
    q: 'Can my organisation partner with you for CSR?',
    a: 'Yes. Choose CSR Partnership and share a few lines about your organisation and what you have in mind. We will reply to talk about how we can work together.',
  },
  {
    q: 'How do I donate or sponsor a programme?',
    a: 'Choose Donating / Sponsoring in the form, or write to the donations address listed on this page. We will reply with how to go ahead.',
  },
  {
    q: 'Who answers questions about Sadaiv Puja and Sadaiv Cyber?',
    a: 'Each has its own team and its own email address, listed on this page. If you use the form, pick the matching topic so your message reaches the right team.',
  },
];

const EMPTY = { name: '', email: '', phone: '', message: '', website: '' }; // `website` is a hidden spam trap
type Status = 'idle' | 'sending' | 'ok' | 'mailto' | 'err';

const Send = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);

export default function ContactPage() {
  const [interest, setInterest] = useState('info');

  useEffect(() => {
    document.title = 'Contact Us | Sadaiv Yuva Foundation';
    // /contact?topic=puja (used by the About page) pre-selects the topic
    const topic = new URLSearchParams(window.location.search).get('topic') ?? '';
    if (INTERESTS.some(i => i.value === topic)) setInterest(topic);
  }, []);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const upd = (k: keyof typeof EMPTY, v: string) => setForm(f => ({ ...f, [k]: v }));

  // Real details only: anything left empty in siteConfig is hidden
  const channels = [
    { label: 'General enquiries', value: SITE.emails.general, href: `mailto:${SITE.emails.general}` },
    { label: 'Phone / WhatsApp', value: SITE.phone, href: SITE.phone ? `tel:${SITE.phone.replace(/\s/g, '')}` : '' },
    { label: 'Sadaiv Puja', value: SITE.emails.puja, href: `mailto:${SITE.emails.puja}` },
    { label: 'Sadaiv Cyber', value: SITE.emails.cyber, href: `mailto:${SITE.emails.cyber}` },
    { label: 'Donations', value: SITE.emails.donate, href: `mailto:${SITE.emails.donate}` },
    { label: 'Where we work', value: [SITE.address, SITE.region].filter(Boolean).join(', '), href: '' },
  ].filter(c => c.value);

  const inboxFor = (i: string) =>
    i === 'puja' ? SITE.emails.puja
    : i === 'cyber' ? SITE.emails.cyber
    : i === 'donate' ? SITE.emails.donate
    : SITE.emails.general;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.website) { setStatus('ok'); setForm(EMPTY); return; } // bot filled the hidden field

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email and message.'); setStatus('err'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.'); setStatus('err'); return;
    }

    const label = INTERESTS.find(i => i.value === interest)?.label ?? 'General enquiry';
    setError('');

    // 1) Real delivery through your form service / API route, if configured
    if (SITE.formEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(SITE.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.name, email: form.email, phone: form.phone, interest: label, message: form.message,
            _subject: `Website enquiry: ${label}`,
          }),
        });
        if (!res.ok) throw new Error('Request failed');
        setStatus('ok'); setForm(EMPTY);
      } catch {
        setError(`We could not send your message just now. Please email us directly at ${inboxFor(interest)}.`);
        setStatus('err');
      }
      return;
    }

    // 2) No endpoint set: open the visitor's email app with the message ready
    const body = `${form.message}\n\n—\nName: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ''}`;
    window.location.href =
      `mailto:${inboxFor(interest)}?subject=${encodeURIComponent(`Website enquiry: ${label}`)}&body=${encodeURIComponent(body)}`;
    setStatus('mailto');
  };

  return (
    <div className={`${s.page} ${display.variable}`}>
      {/* ───────── Hero ───────── */}
      <header className={s.hero}>
        <div className={s.watermark} aria-hidden="true">CONTACT</div>
        <div className="wrap">
          <span className={s.chip}>
            <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
            Contact us
          </span>
          <h1 className={s.h1}>
            Write to us.
            <em>A real person will reply.</em>
          </h1>
          <span className={s.rule} aria-hidden="true" />
          <p className={s.lead}>
            Whether you want to volunteer, give, join as a member, partner with us for CSR, or learn more about
            Sadaiv Cyber and Sadaiv Puja, tell us a little about yourself and we will get back to you.
          </p>
        </div>
      </header>

      {/* ───────── Channels + form ───────── */}
      <section className={s.main}>
        <div className={`wrap ${s.mainGrid}`}>
          <aside className={s.panel} aria-label="Contact details">
            <h2 className={s.panelTitle}>Reach the right team</h2>
            <p className={s.panelSub}>Write to the team that fits your question, or use the form and we will route it.</p>
            <dl className={s.channels}>
              {channels.map(c => (
                <div className={s.channel} key={c.label}>
                  <dt className={s.chLabel}>{c.label}</dt>
                  <dd className={s.chValue}>
                    {c.href ? <a href={c.href} className={s.chLink}>{c.value}</a> : c.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>

          <form className={s.form} onSubmit={submit} noValidate>
            <h2 className={s.formTitle}>Send us a message</h2>
            <span className={s.ruleSm} aria-hidden="true" />

            <fieldset className={s.fieldset}>
              <legend className={s.label}>What would you like to talk about?</legend>
              <div className={s.topics}>
                {INTERESTS.map(i => (
                  <label className={s.topic} key={i.value}>
                    <input
                      type="radio" name="interest" value={i.value} className={s.topicInput}
                      checked={interest === i.value} onChange={() => setInterest(i.value)}
                    />
                    <span className={s.topicLabel}>{i.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={s.row}>
              <div className={s.group}>
                <label className={s.label} htmlFor="c-name">Full name <b>*</b></label>
                <input id="c-name" className={s.input} type="text" autoComplete="name" placeholder="Your full name"
                  value={form.name} onChange={e => upd('name', e.target.value)} required />
              </div>
              <div className={s.group}>
                <label className={s.label} htmlFor="c-email">Email <b>*</b></label>
                <input id="c-email" className={s.input} type="email" autoComplete="email" placeholder="you@example.com"
                  value={form.email} onChange={e => upd('email', e.target.value)} required />
              </div>
            </div>

            <div className={s.group}>
              <label className={s.label} htmlFor="c-phone">Phone <span>(optional)</span></label>
              <input id="c-phone" className={s.input} type="tel" autoComplete="tel" placeholder="Phone or WhatsApp number"
                value={form.phone} onChange={e => upd('phone', e.target.value)} />
            </div>

            <div className={s.group}>
              <label className={s.label} htmlFor="c-msg">Message <b>*</b></label>
              <textarea id="c-msg" className={s.textarea} rows={5}
                placeholder="Tell us how you would like to get involved, or what you would like to know."
                value={form.message} onChange={e => upd('message', e.target.value)} required />
            </div>

            {/* Hidden spam trap: real people never see or fill this */}
            <div className={s.trap} aria-hidden="true">
              <label>Leave this empty<input tabIndex={-1} autoComplete="off" value={form.website} onChange={e => upd('website', e.target.value)} /></label>
            </div>

            <div aria-live="polite">
              {status === 'err' && <p className={s.err} role="alert">{error}</p>}
              {status === 'ok' && <p className={s.ok}>Thank you. Your message has been sent and we will reply to {form.email || 'you'} soon.</p>}
              {status === 'mailto' && (
                <p className={s.ok}>Your email app should now open with your message ready to send. If it does not, write to us directly at {inboxFor(interest)}.</p>
              )}
            </div>

            <button type="submit" className={s.submit} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : <>Send message <Send /></>}
            </button>
            <p className={s.privacy}>
              We use your details only to reply to you. Read our <a href="/privacy-policy" className={s.privacyLink}>privacy policy</a>.
            </p>
          </form>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className={s.faq} aria-labelledby="faq-title">
        <div className={`wrap ${s.faqGrid}`}>
          <div className={s.faqHead}>
            <h2 id="faq-title" className={s.h2}>Before you write</h2>
            <span className={s.ruleSm} aria-hidden="true" />
            <p className={s.faqSub}>Quick answers to the questions we hear most often.</p>
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
    </div>
  );
}