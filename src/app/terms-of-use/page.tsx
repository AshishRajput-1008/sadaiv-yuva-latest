/*
  Save as: src/app/terms-of-use/page.tsx
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
const JURISDICTION = 'Bhopal, Madhya Pradesh';   // courts named in the "Governing law" section
const LAST_UPDATED = '22 October 2026';

export const metadata: Metadata = {
  title: 'Terms of Use | Sadaiv Yuva Foundation',
  description:
    'The terms that apply when you use the Sadaiv Yuva Foundation website, make a donation, join as a member or volunteer with us.',
};

type Section = { id: string; title: string; body: ReactNode };

const SECTIONS: Section[] = [
  {
    id: 'acceptance',
    title: 'Accepting these terms',
    body: (
      <p>
        Welcome to the website of Sadaiv Yuva Foundation (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By visiting or using this website you agree to these Terms of Use and to our
        Privacy Policy. If you do not agree, please do not use the website.
      </p>
    ),
  },
  {
    id: 'about-website',
    title: 'About this website',
    body: (
      <p>
        This website shares information about our work and lets you donate, join as a member, volunteer, partner with us or get in touch. We work to keep the information
        accurate and up to date, but we may change, pause or remove parts of the website at any time without notice.
      </p>
    ),
  },
  {
    id: 'using-website',
    title: 'Using the website',
    body: (
      <>
        <p>You agree to use the website lawfully and respectfully. You must not:</p>
        <ul>
          <li>provide false information, or use another person&rsquo;s details without their permission;</li>
          <li>try to damage, overload, probe or gain unauthorised access to the website or its systems;</li>
          <li>copy content automatically (scraping) or use the website to send spam or harmful code;</li>
          <li>use our name, logo or content in a way that suggests we endorse you, without our written permission.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'donations',
    title: 'Donations',
    body: (
      <>
        <ul>
          <li><strong>Voluntary.</strong> Every donation is made freely, and we are grateful for it.</li>
          <li><strong>Use of funds.</strong> Donations are used for the foundation&rsquo;s charitable objects. Where you have asked for a donation to support a particular programme, we will use it for that purpose wherever possible; if that is no longer possible, we will use it for a closely related purpose.</li>
          <li><strong>Receipts.</strong> We issue a receipt for every donation. To receive a receipt that you can use for tax purposes, please give your full name, address and PAN accurately.</li>
          <li><strong>Refunds.</strong> Donations are generally non-refundable. If you were charged twice or made a payment by mistake, contact us as soon as possible and we will review the request in good faith.</li>
        </ul>
        <div data-note>
          <strong>Tax benefit.</strong> Eligibility for a deduction under Section 80G of the Income Tax Act, 1961 depends on the law in force, your tax regime and your own
          circumstances. Please speak to a tax professional. See our <Link href="/80g-certificate">80G Certificate</Link> page for our registration details.
        </div>
      </>
    ),
  },
  {
    id: 'membership-volunteering',
    title: 'Membership and volunteering',
    body: (
      <p>
        Applications to become a member or volunteer are reviewed by the foundation, and we may accept or decline them at our discretion. Members and volunteers are
        expected to act with integrity, to respect the people we serve, and to follow the foundation&rsquo;s guidelines. Volunteering is unpaid unless agreed otherwise in writing.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Our content',
    body: (
      <p>
        The text, design, logo, photographs and other material on this website belong to Sadaiv Yuva Foundation or are used with permission. You may view the website and
        share links to it. You may not copy, publish or use our content, name or logo for commercial purposes without our written permission.
      </p>
    ),
  },
  {
    id: 'your-submissions',
    title: 'What you send us',
    body: (
      <p>
        When you send us a message, photo or story, you confirm that you have the right to share it. You allow us to use it for the purpose you sent it for, such as
        replying to you or telling a story from our work. We will not publish personal stories or photographs without your consent.
      </p>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-party links and services',
    body: (
      <p>
        The website may link to other websites and uses services such as payment gateways and Google Translate. We do not control these and are not responsible for their
        content or practices. Automatic translations are provided for convenience and may contain errors; the English text is the reference version.
      </p>
    ),
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    body: (
      <p>
        The website and its content are provided &ldquo;as is&rdquo;. The information is of a general nature and is not legal, financial or tax advice. We do not promise that
        the website will always be available, free of errors or free of harmful components.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limits on our responsibility',
    body: (
      <p>
        To the extent the law allows, Sadaiv Yuva Foundation, its trustees, members and volunteers are not liable for any indirect or consequential loss arising from your
        use of, or inability to use, the website. Nothing in these terms limits any right you have under law that cannot be limited.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of India. Any dispute will be subject to the jurisdiction of the courts at {JURISDICTION}.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these terms from time to time. The &ldquo;Last updated&rdquo; date at the top of the page shows when they last changed. By continuing to use the website
        after a change, you accept the updated terms.
      </p>
    ),
  },
];

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export default function TermsOfUsePage() {
  const hasContact = !!(CONTACT.email || CONTACT.phone || CONTACT.address);

  return (
    <main className={`${s.page} ${display.variable}`}>
      {/* Page header */}
      <header className={s.hero}>
        <div className={s.bg} aria-hidden="true" />
        <div className={s.mark} aria-hidden="true">TERMS</div>

        <div className="wrap">
          <Link href="/" className={s.back}><BackIcon /> Back to home</Link>

          <p className={s.eyebrow}>
            <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
            Terms of Use
          </p>

          <h1 className={s.title}>Simple terms, <em>fairly written</em></h1>
          <span className={s.rule} aria-hidden="true" />

          <p className={s.intro}>
            The ground rules for using our website, donating, joining as a member or volunteering with us, written to be read and understood.
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
              <p className={s.contactHd}>Questions about these terms?</p>
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
          <Link href="/privacy-policy" className={s.relatedLink}>Privacy Policy</Link>
          <Link href="/80g-certificate" className={s.relatedLink}>80G Certificate</Link>
        </nav>
      </div>
    </main>
  );
}