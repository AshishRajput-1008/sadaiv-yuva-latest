/*
  Save as: src/app/80g-certificate/page.tsx
  Needs:   src/app/80g-certificate/certificate.module.css   (this page's styles)
           src/app/legal.module.css                          (shared page header + "Also see" links)
*/
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import h from '../legal.module.css';
import s from '../certificate.module.css';

const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

/* ── Fill these in with your real details. Anything left empty is simply not shown. ── */
const DETAILS = {
  name: 'Sadaiv Yuva Foundation',
  reg80G: '',            // 80G registration number (URN)
  approvalDate: '',      // e.g. '12 March 2025'
  validity: '',          // e.g. 'AY 2026-27 to AY 2030-31'
  reg12A: '',            // 12A / 12AB registration number
  pan: '',               // organisation PAN
  csr1: '',              // CSR-1 registration number, if you have one
  address: '',           // registered office
};
/* Put your real certificate files in /public/documents/ and set the paths, e.g.
   image: '/documents/80g-certificate.jpg', pdf: '/documents/80g-certificate.pdf' */
const CERTIFICATE = { image: '', pdf: '' };

export const metadata: Metadata = {
  title: '80G Certificate | Sadaiv Yuva Foundation',
  description:
    'View the Section 80G approval of Sadaiv Yuva Foundation, our registration details, and how 80G works for donors.',
};

const STEPS = [
  {
    title: 'Donate',
    text: 'Give online or contact us for other ways to donate. Please share your full name, address and PAN accurately.',
    icon: <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5 6.4 5c2 0 3.5 1.1 5.6 3.2C14.1 6.1 15.6 5 17.6 5 21 5 22.8 8.6 21.5 11.8 19.5 16.4 12 21 12 21z" />,
  },
  {
    title: 'Get your receipt',
    text: 'We issue a donation receipt in your name, which you keep as your record of the gift.',
    icon: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" /><path d="M9 8h6M9 12h6" /></>,
  },
  {
    title: 'Claim when you file',
    text: 'If you are eligible, you can claim the deduction while filing your income tax return. Keep the receipt safe.',
    icon: <><rect x="4" y="3.5" width="16" height="17" rx="2.5" /><path d="M8 8h8M8 12h5M8 16h3" /></>,
  },
];

const FAQ = [
  {
    q: 'Is every donation eligible for a deduction?',
    a: 'Not necessarily. Eligibility depends on the Income Tax Act, the category of approval stated on our certificate, your tax regime and the way you pay. Please check with your tax advisor.',
  },
  {
    q: 'How much can I deduct?',
    a: 'The rate and any limit depend on the approval category shown on our 80G certificate and on your total income. The certificate and your tax advisor are the best sources.',
  },
  {
    q: 'Can I claim it under the new tax regime?',
    a: 'Deductions under Section 80G are generally available only if you file under the old tax regime. Please confirm with a tax professional for your own situation.',
  },
  {
    q: 'Do cash donations qualify?',
    a: 'Cash donations above ₹2,000 are not eligible for a deduction under Section 80G. We encourage donating by bank transfer, UPI, cheque, demand draft or card.',
  },
  {
    q: 'What details do you need for the receipt?',
    a: 'Your full name, postal address and PAN, exactly as they appear in your tax records, so that your receipt is accepted when you file.',
  },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
    <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
  </svg>
);

export default function Certificate80GPage() {
  // Only rows that you have filled in appear on the page
  const rows = [
    { label: 'Organisation', value: DETAILS.name },
    { label: 'Registration under', value: 'Section 80G, Income Tax Act, 1961' },
    { label: '80G registration no.', value: DETAILS.reg80G },
    { label: 'Approval date', value: DETAILS.approvalDate },
    { label: 'Valid for', value: DETAILS.validity },
    { label: '12A registration no.', value: DETAILS.reg12A },
    { label: 'Organisation PAN', value: DETAILS.pan },
    { label: 'CSR-1 registration no.', value: DETAILS.csr1 },
    { label: 'Registered office', value: DETAILS.address },
  ].filter(r => r.value);

  return (
    <main className={`${s.page} ${display.variable}`}>
      {/* Page header */}
      <header className={h.hero}>
        <div className={h.bg} aria-hidden="true" />
        <div className={h.mark} aria-hidden="true">80G</div>

        <div className="wrap">
          <Link href="/" className={h.back}><BackIcon /> Back to home</Link>

          <p className={h.eyebrow}>
            <span className={h.dots} aria-hidden="true"><i /><i /><i /></span>
            Tax Exemption
          </p>

          <h1 className={h.title}>80G <em>Certificate</em></h1>
          <span className={h.rule} aria-hidden="true" />

          <p className={h.intro}>
            Sadaiv Yuva Foundation is approved under Section 80G of the Income Tax Act, 1961. Here is our certificate, our registration details,
            and how it works for you as a donor.
          </p>

          <ul className={h.meta}>
            <li className={h.metaItem}><span className={h.metaLabel}>Status</span><span className={h.metaValue}>Approved under 80G</span></li>
          </ul>
        </div>
      </header>

      <div className="wrap">
        {/* Certificate + details */}
        <div className={s.top}>
          <div className={s.viewer}>
            <div className={s.frame}>
              {CERTIFICATE.image ? (
                <Image
                  src={CERTIFICATE.image}
                  alt="Section 80G approval certificate of Sadaiv Yuva Foundation"
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
                  className={s.certImg}
                />
              ) : (
                <div className={s.empty}>
                  <span className={s.emptyIcon} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 3h8l4 4v14H7V3z" /><path d="M15 3v4h4M10 12h6M10 16h6" />
                    </svg>
                  </span>
                  <p className={s.emptyTitle}>Certificate copy</p>
                  <p className={s.emptyText}>
                    A scanned copy of our 80G certificate is available on request. Write to us from the contact section and we will share it.
                  </p>
                </div>
              )}
            </div>
            <span className={s.seal}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l7 3v5.5c0 4.3-2.9 8-7 9.5-4.1-1.5-7-5.2-7-9.5V6l7-3z" /><path d="M9 12l2.2 2.2L15.2 10" />
              </svg>
              Section 80G
            </span>
          </div>

          <div className={s.details}>
            <p className={s.detailsHd}>Registration details</p>
            <dl className={s.dl}>
              {rows.map(r => (
                <div className={s.row} key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>

            <div className={s.btns}>
              {CERTIFICATE.pdf && (
                <a href={CERTIFICATE.pdf} className={s.btnPrimary} download>
                  <DownloadIcon /> Download certificate
                </a>
              )}
              <Link href="/#donate" className={s.btnGhost}>
                Donate now <Arrow />
              </Link>
            </div>
            <p className={s.small}>You can verify our registration with the Income Tax Department using the details above.</p>
          </div>
        </div>

        {/* How it works */}
        <section className={s.block} aria-labelledby="how-title">
          <h2 id="how-title" className={s.h2}>How 80G works for <em>you</em></h2>
          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li className={`${s.step} ${s[`st${i}`]}`} key={st.title}>
                <span className={s.stepIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {st.icon}
                  </svg>
                </span>
                <span className={s.stepNum}>Step {i + 1}</span>
                <h3 className={s.stepTitle}>{st.title}</h3>
                <p className={s.stepText}>{st.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className={s.block} aria-labelledby="faq-title">
          <h2 id="faq-title" className={s.h2}>Common <em>questions</em></h2>
          <div className={s.faq}>
            {FAQ.map(item => (
              <details className={s.qa} key={item.q}>
                <summary className={s.q}>
                  <span>{item.q}</span>
                  <i className={s.plus} aria-hidden="true" />
                </summary>
                <p className={s.a}>{item.a}</p>
              </details>
            ))}
          </div>
          <p className={s.disclaimer}>
            This page is general information, not tax advice. Please consult a qualified tax professional about your own situation.
          </p>
        </section>

        {/* Closing band */}
        <div className={s.band}>
          <div>
            <p className={s.bandHd}>Every gift goes to work in the community.</p>
            <p className={s.bandText}>Thank you for standing with young people and families in villages across the region.</p>
          </div>
          <Link href="/#donate" className={s.bandBtn}>Support our mission <Arrow /></Link>
        </div>

        <nav className={h.related} aria-label="Related pages">
          <span className={h.relatedHd}>Also see</span>
          <Link href="/privacy-policy" className={h.relatedLink}>Privacy Policy</Link>
          <Link href="/terms-of-use" className={h.relatedLink}>Terms of Use</Link>
        </nav>
      </div>
    </main>
  );
}