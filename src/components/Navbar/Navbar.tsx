
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fraunces } from 'next/font/google';

import LanguageSwitcher from '../Languageswitcher/Languageswitcher';
import { useGoogleTranslate } from '../../../Usegoogletranslate';
import s from './Navbar.module.css';

// Same display font as the Hero heading
const display = Fraunces({
  subsets: ['latin'],
  variable: '--f-display',
  display: 'swap',
});

const NAV_LINKS = [
  { href: '/Profile', section: 'Profile', label: 'Profile' },
  { href: '/Program', section: 'Programs', label: 'Programs' },
  { href: '/Partner', section: 'Partners', label: 'Partners' },
   { href: '/Gallery', section: 'gallery', label: 'Gallery' },
  { href: '/Contact', section: 'Contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  const { lang, setLanguage, preload, busy } = useGoogleTranslate();

  // Elevate navbar after a small scroll.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Highlight sections only on the homepage.
  // On separate pages, highlight the link matching the current route.
  useEffect(() => {
    if (pathname !== '/') {
      const currentLink = NAV_LINKS.find(
        (link) => link.href.toLowerCase() === pathname.toLowerCase()
      );

      setActive(currentLink?.href ?? '');
      return;
    }

    const targets = NAV_LINKS
      .map((link) => document.getElementById(link.section))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) {
      setActive('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`/${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
      }
    );

    targets.forEach((target) => observer.observe(target));

    const onTop = () => {
      if (window.scrollY < 120) {
        setActive('');
      }
    };

    window.addEventListener('scroll', onTop, {
      passive: true,
    });

    return () => {
      observer.disconnect();

      window.removeEventListener('scroll', onTop);
    };
  }, [pathname]);

  // Lock body scrolling and close the drawer on Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  // Close the mobile drawer when switching to desktop.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 901px)');

    const onChange = () => {
      if (mediaQuery.matches) {
        setMenuOpen(false);
      }
    };

    mediaQuery.addEventListener('change', onChange);

    return () => {
      mediaQuery.removeEventListener('change', onChange);
    };
  }, []);

  // Close the drawer when navigating.
  const close = () => {
    setMenuOpen(false);
  };

  // Use real Next.js routes on other pages and section anchors on the homepage.
// Always navigate to actual Next.js pages.
const getHref = (href: string) => href;

  return (
    <>
      <a href="#hero" className={s.skip}>
        Skip to content
      </a>

      <header
        className={`${s.nav} ${display.variable} ${
          scrolled || menuOpen ? s.scrolled : ''
        }`}
      >
        <nav className="wrap" aria-label="Main navigation">
          <div className={s.bar}>
            {/* Brand */}
            <Link
              href="/"
              className={s.brand}
              aria-label="Sadaiv Yuva Foundation, home"
              onClick={close}
            >
              <Image
                src="/logo.png"
                alt="Sadaiv Yuva Foundation logo"
                width={96}
                height={96}
                className={s.logo}
                priority
              />

              <span className={s.brandText}>
                <span
                  className={`${s.brandMain} notranslate`}
                  translate="no"
                >
                  Sadaiv Yuva Foundation
                </span>

                <span className={s.brandSub}>
                  12A / 80G / CSR Fund Approved Foundation
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <ul className={s.links}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                href={getHref(link.href)}
                    className={`${s.link} ${
                      active === link.href ? s.linkActive : ''
                    }`}
                    aria-current={
                      active === link.href ? 'page' : undefined
                    }
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className={s.actions}>
              <LanguageSwitcher
                className={s.langHeader}
                lang={lang}
                onSelect={setLanguage}
                onOpen={preload}
                busy={busy}
              />

              <a
                href={pathname === '/' ? '#membership' : '/#membership'}
                className={s.memberBtn}
                onClick={close}
              >
                <span className={s.memberLead}>Join</span>
                <span className={s.memberAccent}>Membership</span>
              </a>

              <a
                href={pathname === '/' ? '#donate' : '/#donate'}
                className={s.donateBtn}
                onClick={close}
              >
                Donate now
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                className={`${s.ham} ${menuOpen ? s.open : ''}`}
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div
          id="mobile-menu"
          className={`${s.drawer} ${
            menuOpen ? s.drawerOpen : ''
          }`}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <div className={`wrap ${s.drawerInner}`}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
          href={getHref(link.href)}
                className={s.drawerLink}
                onClick={close}
                aria-current={
                  active === link.href ? 'page' : undefined
                }
              >
                {link.label}
              </Link>
            ))}

            <a
              href={pathname === '/' ? '#membership' : '/#membership'}
              className={s.drawerMember}
              onClick={close}
            >
              Become a member
            </a>

            <a
              href={pathname === '/' ? '#donate' : '/#donate'}
              className={s.drawerCta}
              onClick={close}
            >
              Donate now
            </a>
          </div>
        </div>
      </header>

      {/* Hidden mount point for Google Translate */}
      <div
        id="google_translate_element"
        className="notranslate"
        aria-hidden="true"
        style={{ display: 'none' }}
      />

      {/* Mobile drawer backdrop */}
      {menuOpen && (
        <button
          type="button"
          className={s.scrim}
          aria-label="Close menu"
          onClick={close}
          tabIndex={-1}
        />
      )}
    </>
  );
}
