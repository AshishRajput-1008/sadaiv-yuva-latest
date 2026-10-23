'use client';
import { useState, type FormEvent } from 'react';
import { Fraunces } from 'next/font/google';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SITE } from '../../../config/siteConfig';
import s from './Contact.module.css';

// Same display font as the Navbar, Hero, Programs, Journey, Donate and Footer
const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

/* ---------- Icons ---------- */
const ICONS: Record<string, string[]> = {
  pin:     ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
  phone:   ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z'],
  mail:    ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M22 6l-10 7L2 6'],
  sun:     ['M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z', 'M12 1v2', 'M12 21v2', 'M4.22 4.22l1.42 1.42', 'M18.36 18.36l1.42 1.42', 'M1 12h2', 'M21 12h2', 'M4.22 19.78l1.42-1.42', 'M18.36 5.64l1.42-1.42'],
  monitor: ['M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M8 21h8', 'M12 17v4'],
  send:    ['M22 2L11 13', 'M22 2l-7 20-4-9-9-4 20-7z'],
  lock:    ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z', 'M7 11V7a5 5 0 0 1 10 0v4'],
};
function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(ICONS[name] || []).map(d => <path key={d} d={d} />)}
    </svg>
  );
}

const INTERESTS = [
  { value: 'volunteer',  label: 'Volunteering' },
  { value: 'donate',     label: 'Donating / Sponsoring' },
  { value: 'membership', label: 'Membership' },
  { value: 'csr',        label: 'CSR Partnership' },
  { value: 'puja',       label: 'Sadaiv Puja' },
  { value: 'cyber',      label: 'Sadaiv Cyber' },
  { value: 'info',       label: 'General enquiry' },
];

const EMPTY = { name: '', email: '', phone: '', interest: '', message: '', website: '' }; // `website` is a hidden spam trap
type Status = 'idle' | 'sending' | 'ok' | 'mailto' | 'err';

export default function Contact() {
  const secRef = useScrollReveal();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const upd = (k: keyof typeof EMPTY, v: string) => setForm(f => ({ ...f, [k]: v }));

  // Real details only: anything left empty in siteConfig is hidden
  const info = [
    { icon: 'pin', label: 'Where we work', value: [SITE.address, SITE.region].filter(Boolean).join(', ') },
    { icon: 'phone', label: 'Phone / WhatsApp', value: SITE.phone, href: SITE.phone ? `tel:${SITE.phone.replace(/\s/g, '')}` : '' },
    { icon: 'mail', label: 'Email', value: SITE.emails.general, href: `mailto:${SITE.emails.general}` },
    { icon: 'sun', label: 'Sadaiv Puja', value: SITE.emails.puja, href: `mailto:${SITE.emails.puja}` },
    { icon: 'monitor', label: 'Sadaiv Cyber', value: SITE.emails.cyber, href: `mailto:${SITE.emails.cyber}` },
  ].filter(i => i.value);

  const inboxFor = (interest: string) =>
    interest === 'puja' ? SITE.emails.puja
    : interest === 'cyber' ? SITE.emails.cyber
    : interest === 'donate' ? SITE.emails.donate
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

    const label = INTERESTS.find(i => i.value === form.interest)?.label ?? 'General enquiry';
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
        setError(`We could not send your message just now. Please email us directly at ${inboxFor(form.interest)}.`);
        setStatus('err');
      }
      return;
    }

    // 2) No endpoint set: open the visitor's email app with the message ready
    const body = `${form.message}\n\n—\nName: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ''}`;
    window.location.href =
      `mailto:${inboxFor(form.interest)}?subject=${encodeURIComponent(`Website enquiry: ${label}`)}&body=${encodeURIComponent(body)}`;
    setStatus('mailto');
  };

  return (
    <section id="contact" className={`${s.contact} ${display.variable} sec`} ref={secRef}>
      <div className="wrap">
        <div className={s.grid}>
          {/* Left */}
          <div className="sr-l">
            <span className="chip"><i />Get In Touch</span>
            <h2 className="sec-title">Let&rsquo;s build a better <em>Bharat</em> together</h2>
            <p className="sec-sub">
              Whether you would like to volunteer, give, join as a member, partner with us for CSR,
              or learn more about Sadaiv Cyber and Sadaiv Puja, write to us. A person from our team will reply.
            </p>

            <ul className={s.infoList}>
              {info.map(it => (
                <li className={s.infoItem} key={it.label}>
                  <span className={s.ico}><Icon name={it.icon} size={20} /></span>
                  <div>
                    <span className={s.lbl}>{it.label}</span>
                    {it.href
                      ? <a className={s.val} href={it.href}>{it.value}</a>
                      : <span className={s.val}>{it.value}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="sr-r">
            <form className={s.form} onSubmit={submit} noValidate>
              <h3 className={s.formTitle}>Send us a message</h3>

              <div className={s.row}>
                <div className={s.group}>
                  <label className={s.label} htmlFor="f-name">Full name <b>*</b></label>
                  <input id="f-name" className={s.input} type="text" autoComplete="name" placeholder="Your full name"
                         value={form.name} onChange={e => upd('name', e.target.value)} required />
                </div>
                <div className={s.group}>
                  <label className={s.label} htmlFor="f-email">Email <b>*</b></label>
                  <input id="f-email" className={s.input} type="email" autoComplete="email" placeholder="you@example.com"
                         value={form.email} onChange={e => upd('email', e.target.value)} required />
                </div>
              </div>

              <div className={s.row}>
                <div className={s.group}>
                  <label className={s.label} htmlFor="f-phone">Phone <span>(optional)</span></label>
                  <input id="f-phone" className={s.input} type="tel" autoComplete="tel" placeholder="Phone or WhatsApp number"
                         value={form.phone} onChange={e => upd('phone', e.target.value)} />
                </div>
                <div className={s.group}>
                  <label className={s.label} htmlFor="f-int">I&rsquo;m interested in</label>
                  <select id="f-int" className={s.sel} value={form.interest} onChange={e => upd('interest', e.target.value)}>
                    <option value="">Choose…</option>
                    {INTERESTS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
                  </select>
                </div>
              </div>

              <div className={s.group}>
                <label className={s.label} htmlFor="f-msg">Message <b>*</b></label>
                <textarea id="f-msg" className={s.textarea} rows={5} placeholder="Tell us how you would like to get involved, or what you would like to know."
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
                  <p className={s.ok}>Your email app should now open with your message ready to send. If it does not, write to us directly at {inboxFor(form.interest)}.</p>
                )}
              </div>

              <button type="submit" className={s.submit} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : <>Send message<Icon name="send" size={18} /></>}
              </button>
              <p className={s.privacy}><Icon name="lock" size={14} />We use your details only to reply to you.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}