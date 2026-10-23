/*
  Save as: src/app/privacy-policy/page.tsx
  Needs:   src/app/legal.module.css   (shared styles, provided separately)
*/
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import s from '../legal.module.css';

const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

/* ── Fill these in. Anything left empty is simply not shown on the page. ── */
const CONTACT = {
  email: '',     // e.g. 'info@yourdomain.org'
  phone: '',     // e.g. '+91 98765 43210'
  address: '',   // registered office address
};
const LAST_UPDATED = '22 October 2026';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sadaiv Yuva Foundation',
  description:
    'How Sadaiv Yuva Foundation collects, uses and protects your personal information when you visit our website, donate, join as a member or contact us.',
};

type Section = { id: string; title: string; body: ReactNode };

const SECTIONS: Section[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        <p>
          Sadaiv Yuva Foundation (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a registered non-profit organisation working with youth and families
          through education, digital skills and community support.
        </p>
        <p>
          This policy explains what personal information we collect through this website, why we collect it, how we look after it, and the choices you have.
          By using the website, donating, joining as a member or contacting us, you agree to the practices described here.
        </p>
      </>
    ),
  },
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    body: (
      <>
        <h3>Information you give us</h3>
        <ul>
          <li><strong>Donations:</strong> your name, email address, phone number, postal address and PAN (needed to issue an 80G donation receipt), and the amount and date of your donation.</li>
          <li><strong>Membership and volunteering:</strong> your name, contact details and any details you choose to share in the form.</li>
          <li><strong>Contact and partnership enquiries:</strong> your name, contact details and the message you send us.</li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>Technical details such as your browser, device type, approximate location (city or region level) and the pages you visit.</li>
          <li>Cookies and similar technologies that help the website work and remember your preferences, such as your chosen language.</li>
        </ul>
        <div data-note>
          <strong>Payments.</strong> Online payments are processed by our payment gateway partners. We do not store your card, UPI PIN or net-banking credentials on our servers.
        </div>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use your information',
    body: (
      <>
        <p>We use personal information only for purposes connected with our work:</p>
        <ul>
          <li>to process your donation and send you a receipt, including an 80G receipt where you are eligible;</li>
          <li>to keep records that the law requires charitable organisations to maintain;</li>
          <li>to respond to your questions, membership requests and partnership enquiries;</li>
          <li>to send updates about our work, but only if you have agreed to receive them;</li>
          <li>to understand how the website is used so that we can improve it and keep it secure.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'consent',
    title: 'Your consent',
    body: (
      <p>
        We collect and use your personal information with your consent, or where the law allows or requires us to do so (for example, to keep tax and accounting records).
        You can withdraw your consent at any time by writing to us. Withdrawing consent does not affect what we did before you withdrew it, and we may still need to keep
        certain records, such as donation receipts, as the law requires.
      </p>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share it with',
    body: (
      <>
        <p><strong>We do not sell your personal information.</strong> We share it only in these limited situations:</p>
        <ul>
          <li><strong>Service providers</strong> who help us run the website, process payments, send emails or host our data. They may use your information only to provide their service to us.</li>
          <li><strong>Authorities and auditors</strong> where required by law, such as income tax filings, statutory audit or a lawful request from a government body.</li>
          <li><strong>Partners and CSR donors</strong> where you or your organisation have asked us to share donation or programme information with them.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cookies-third-party',
    title: 'Cookies and third-party services',
    body: (
      <>
        <p>
          This website uses a small number of cookies to function properly and to remember choices such as your language. You can block or delete cookies in your
          browser settings, though parts of the site may then work less smoothly.
        </p>
        <p>
          The language switcher uses <strong>Google Translate</strong> to show pages in other languages. When you use it, your browser connects to Google and
          Google&rsquo;s own privacy policy applies to that connection. Translations are automatic and may not be perfectly accurate.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    body: (
      <p>
        We keep personal information only as long as we need it for the purpose it was collected, or as long as the law requires. Donation and accounting records are
        kept for the period required under applicable tax and accounting rules. Enquiries and membership details are kept while they remain relevant, and deleted or
        anonymised when they are no longer needed.
      </p>
    ),
  },
  {
    id: 'security',
    title: 'How we protect it',
    body: (
      <p>
        We use reasonable technical and organisational safeguards to protect personal information from loss, misuse and unauthorised access, and we limit access to
        the people who need it for their work. No website or system can be made completely risk-free, so we cannot promise absolute security, but we take care of your
        information as we would our own.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: (
      <>
        <p>Under Indian data protection law, you may ask us to:</p>
        <ul>
          <li>tell you what personal information we hold about you and how we use it;</li>
          <li>correct information that is wrong or out of date;</li>
          <li>erase your information, unless we must keep it by law;</li>
          <li>stop sending you updates, or withdraw a consent you gave earlier;</li>
          <li>consider a grievance if you feel your information has been handled badly.</li>
        </ul>
        <p>To use any of these rights, contact us using the details at the end of this page. We will respond within a reasonable time.</p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        Our website is meant for adults. We do not knowingly collect personal information from anyone under 18 without the consent of a parent or legal guardian.
        If you believe a child has given us information without such consent, please contact us and we will delete it.
      </p>
    ),
  },
  {
    id: 'photos-stories',
    title: 'Photos and stories from our work',
    body: (
      <p>
        We sometimes share photographs and stories from our programmes to show the work we do. We aim to obtain consent from the people shown, and from a parent or
        guardian in the case of children, before publishing. If you appear in something on our website and would like it removed, write to us and we will take it
        down promptly.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy from time to time. When we do, we will change the &ldquo;Last updated&rdquo; date at the top of the page. If a change is significant,
        we will make it clear on the website.
      </p>
    ),
  },
];

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export default function PrivacyPolicyPage() {
  const hasContact = !!(CONTACT.email || CONTACT.phone || CONTACT.address);

  return (
    <main className={`${s.page} ${display.variable}`}>
      {/* Page header */}
      <header className={s.hero}>
        <div className={s.bg} aria-hidden="true" />
        <div className={s.mark} aria-hidden="true">PRIVACY</div>

        <div className="wrap">
          <Link href="/" className={s.back}><BackIcon /> Back to home</Link>

          <p className={s.eyebrow}>
            <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
            Privacy Policy
          </p>

          <h1 className={s.title}>Your privacy, <em>handled with care</em></h1>
          <span className={s.rule} aria-hidden="true" />

          <p className={s.intro}>
            We collect only what we need, we never sell it, and we explain here in plain language how we look after the information you trust us with.
          </p>

          <ul className={s.meta}>
            <li className={s.metaItem}><span className={s.metaLabel}>Last updated</span><span className={s.metaValue}>{LAST_UPDATED}</span></li>
            <li className={s.metaItem}><span className={s.metaLabel}>Applies to</span><span className={s.metaValue}>Our website</span></li>
          </ul>
        </div>
      </header>

      <div className="wrap">
        <div className={s.layout}>
          {/* Table of contents */}
          <aside className={s.toc} aria-label="On this page">
            <p className={s.tocHd}>On this page</p>
            <ol className={s.tocList}>
              {SECTIONS.map((sec, i) => (
                <li key={sec.id}>
                  <a href={`#${sec.id}`} className={s.tocLink}>
                    <span className={s.tocNum}>{String(i + 1).padStart(2, '0')}</span>
                    {sec.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Document */}
          <article className={s.doc}>
            {SECTIONS.map((sec, i) => (
              <section key={sec.id} id={sec.id} className={s.sec} aria-labelledby={`${sec.id}-h`}>
                <h2 id={`${sec.id}-h`} className={s.h2}>
                  <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
                  {sec.title}
                </h2>
                <div className={s.prose}>{sec.body}</div>
              </section>
            ))}

            <div className={s.contact}>
              <p className={s.contactHd}>Questions about your privacy?</p>
              <p className={s.contactText}>
                {hasContact
                  ? 'Write to us and we will get back to you.'
                  : 'Reach us through the contact section on our website and we will get back to you.'}
              </p>
              <ul className={s.contactList}>
                {CONTACT.email && <li><span>Email</span><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>}
                {CONTACT.phone && <li><span>Phone</span><a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a></li>}
                {CONTACT.address && <li><span>Address</span>{CONTACT.address}</li>}
                {!hasContact && <li><span>Contact</span><Link href="/#contact">Go to the contact section</Link></li>}
              </ul>
            </div>
          </article>
        </div>

        <nav className={s.related} aria-label="Related pages">
          <span className={s.relatedHd}>Also see</span>
          <Link href="/terms-of-use" className={s.relatedLink}>Terms of Use</Link>
          <Link href="/80g-certificate" className={s.relatedLink}>80G Certificate</Link>
        </nav>
      </div>
    </main>
  );
}