
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import { usePathname } from 'next/navigation';
import s from './Footer.module.css';

// Same display font as the Navbar and Hero heading
const display = Fraunces({
  subsets: ['latin'],
  variable: '--f-display',
  display: 'swap',
});

const navLinks = [
  { label: 'Profile', href: '/Profile' },
  { label: 'Impact', href: '/Profile#impact' },
  { label: 'Programs', href: '/Program' },
  { label: 'Partners', href: '/Partner' },
  { label: 'Gallery', href: '/Gallery' },
  { label: 'Contact', href: '/Contact' },
];

const programs = [
  'Shiksha Uday',
  'Swasthya Mitra',
  'Nari Shakti',
  'Rozgar Shakti',
  'Harit Bharat',
  'Yuva Netritva',
];

const partners = [
  { label: 'Sadaiv Puja', href: '/Partner' },
  { label: 'Sadaiv Cyber', href: '/Partner' },
];

const involved = [
  { label: 'Donate Now', href: '/#donate' },
  { label: 'Volunteer', href: '/Contact' },
  { label: 'CSR Partnership', href: '/Contact' },
  { label: 'Internships', href: '/Contact' },
];

// Feather-style stroke icons
const socials = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/',
    paths: [
      'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    ],
  },
  {
    name: 'Twitter',
    href: 'https://x.com/',
    paths: [
      'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
    ],
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/',
    paths: [
      'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
      'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z',
      'M17.5 6.5h.01',
    ],
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    paths: [
      'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z',
      'M2 9h4v12H2z',
      'M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Send visitors to the homepage section from any route.
  const getSectionHref = (section: string) =>
    pathname === '/' ? `#${section}` : `/#${section}`;

  return (
    <footer id="footer" className={`${s.footer} ${display.variable}`}>
      <div className={s.topBar} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="wrap">
        {/* Call-to-action band */}
        <section className={s.cta} aria-label="Join the mission">
          <div className={s.ctaText}>
            <span className={s.eyebrow}>Be part of the change</span>

            <h2 className={s.ctaTitle}>
              Help us build a stronger, more equitable Bharat.
            </h2>

            <p className={s.ctaSub}>
              Become a member or support a village today. Every contribution
              moves a young person forward.
            </p>
          </div>

          <div className={s.ctaActions}>
            <Link
            href="/Contact"
              className={s.memberBtn}
            >
              <span className={s.memberLead}>Join</span>
              <span className={s.memberAccent}>Membership</span>
            </Link>

            <Link
              href="/Contact"
              className={s.donateBtn}
            >
              Donate now
            </Link>
          </div>
        </section>

        {/* Main columns */}
        <div className={s.top}>
          {/* Brand */}
          <div className={s.brand}>
            <Link
              href="/"
              className={s.brandRow}
              aria-label="Sadaiv Yuva Foundation, home"
            >
              <Image
                src="/logo.png"
                alt="Sadaiv Yuva Foundation logo"
                width={72}
                height={72}
                className={s.logo}
              />

              <span className={s.brandText}>
                <span className={s.bName}>
                  Sadaiv Yuva Foundation
                </span>

                <span className={s.bSub}>
                  12A / 80G / CSR Fund Approved Foundation
                </span>
              </span>
            </Link>

            <p className={s.desc}>
              Empowering youth, uplifting communities and building a stronger,
              equitable Bharat, one village at a time.
            </p>

            <div className={s.socials}>
              {socials.map(({ name, href, paths }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.soc}
                  aria-label={`Visit us on ${name}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="17"
                    height="17"
                    aria-hidden="true"
                  >
                    {paths.map((path) => (
                      <path key={path} d={path} />
                    ))}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={s.colTitle}>Quick Links</h3>

            <nav className={s.links} aria-label="Quick links">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={s.link}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Programs and partners */}
          <div>
            <h3 className={s.colTitle}>Programs</h3>

            <nav className={s.links} aria-label="Programs">
              {programs.map((program) => (
                <Link
                  key={program}
                  href="/Program"
                  className={s.link}
                >
                  {program}
                </Link>
              ))}
            </nav>

            <h3 className={`${s.colTitle} ${s.colTitleGap}`}>
              Our Partners
            </h3>

            <nav className={s.links} aria-label="Partners">
              {partners.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={s.link}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Get involved */}
          <div>
            <h3 className={s.colTitle}>Get Involved</h3>

            <nav className={s.links} aria-label="Get involved">
              {involved.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={s.link}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className={s.cert}>
              <svg
                className={s.certIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="22"
                height="22"
                aria-hidden="true"
              >
                <path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3z" />
                <path d="M8.5 12l2.5 2.5L15.5 10" />
              </svg>

              <div>
                <p className={s.certTitle}>
                  80G &amp; 12A Certified
                </p>

                <p className={s.certDesc}>
                  Donations are eligible for tax exemption under Section 80G
                  of the IT Act.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={s.bottom}>
          <p>
            © {year} Sadaiv Yuva Foundation. All rights reserved. Registered
            under the Societies Registration Act, MP.
          </p>

          <div className={s.legal}>
            <Link href="/Privacy">Privacy Policy</Link>
            <Link href="/Terms">Terms of Use</Link>
            <Link href="/80G-Certificate">80G Certificate</Link>
          </div>
        </div>
      </div>

      <div className={s.footBar} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </footer>
  );
}
