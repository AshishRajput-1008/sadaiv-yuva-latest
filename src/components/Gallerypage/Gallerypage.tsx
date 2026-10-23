'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import s from './Gallerypage.module.css';

import g1 from '../../../public/gallery/Volunteers Packing Community Donations.webp';
import g2 from '../../../public/gallery/Many Hands, One Harvest.webp';
import g3 from '../../../public/gallery/cyber-digital-india-1.jpg';
import g4 from '../../../public/gallery/ng0-3.webp';
import g5 from '../../../public/gallery/ngo-4.webp';
import g6 from '../../../public/gallery/ngo-5.webp';
import g7 from '../../../public/gallery/ngo-12.webp';
import g8 from '../../../public/gallery/cyber-digital-india-2.jpg';
import g9 from '../../../public/gallery/cyber-digital-india-3.jpg';

// Same display font used across the rest of the site
const display = Fraunces({ subsets: ['latin'], variable: '--f-display', display: 'swap' });

type Cat = 'community' | 'digital';
type Photo = { src: StaticImageData; alt: string; caption: string; cat: Cat };

const FILTERS: { value: 'all' | Cat; label: string }[] = [
  { value: 'all', label: 'All moments' },
  { value: 'community', label: 'Community work' },
  { value: 'digital', label: 'Digital safety' },
];

/* Captions follow the file names of your photos. Edit them freely to match each picture. */
const PHOTOS: Photo[] = [
  { src: g1, cat: 'community', caption: 'Community donation drive', alt: 'Volunteers packing community donations' },
  { src: g3, cat: 'digital',   caption: 'Digital India awareness', alt: 'Digital India and cyber awareness initiative' },
  { src: g2, cat: 'community', caption: 'Many hands, one harvest', alt: 'Community members working together during harvest' },
  { src: g4, cat: 'community', caption: 'Community outreach', alt: 'Sadaiv Yuva Foundation community outreach' },
  { src: g8, cat: 'digital',   caption: 'Cyber Suraksha', alt: 'Cyber safety and digital literacy awareness' },
  { src: g5, cat: 'community', caption: 'Social welfare work', alt: 'Community welfare and social service' },
  { src: g6, cat: 'community', caption: 'Volunteer service', alt: 'Volunteers supporting the community' },
  { src: g9, cat: 'digital',   caption: 'Cyber awareness campaign', alt: 'Cyber awareness campaign' },
  { src: g7, cat: 'community', caption: 'Community development', alt: 'Community development initiative' },
];

/* Measures the real fixed header height (any screen size) so the hero never sits under it */
function useHeaderOffset() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const measure = () => {
      let bottom = 0;
      document.querySelectorAll<HTMLElement>('header, nav, [class*="avbar" i]').forEach(el => {
        if (ref.current?.contains(el)) return; // ignore this page's own hero <header>
        if (getComputedStyle(el).position !== 'fixed') return;
        const r = el.getBoundingClientRect();
        if (r.top < 40 && r.height > 0) bottom = Math.max(bottom, r.bottom);
      });
      if (bottom && ref.current) ref.current.style.setProperty('--nav-h', `${Math.ceil(bottom) + 8}px`);
    };
    measure();
    const t = window.setTimeout(measure, 400);
    window.addEventListener('resize', measure);
    return () => { window.clearTimeout(t); window.removeEventListener('resize', measure); };
  }, []);
  return ref;
}

export default function GalleryPage() {
  const pageRef = useHeaderOffset();
  const [filter, setFilter] = useState<'all' | Cat>('all');
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => { document.title = 'Gallery | Sadaiv Yuva Foundation'; }, []);

  const list = useMemo(() => (filter === 'all' ? PHOTOS : PHOTOS.filter(p => p.cat === filter)), [filter]);
  const count = (v: 'all' | Cat) => (v === 'all' ? PHOTOS.length : PHOTOS.filter(p => p.cat === v).length);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => {
    setOpen(i => (i === null ? i : (i + d + list.length) % list.length));
  }, [list.length]);

  // Keyboard controls + page scroll lock while the viewer is open
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open, close, step]);

  const current = open !== null ? list[open] : null;

  return (
    <div className={`${s.page} ${display.variable}`} ref={pageRef}>
      {/* ───────── Hero ───────── */}
      <header className={s.hero}>
        <div className={s.watermark} aria-hidden="true">GALLERY</div>
        <div className="wrap">
          <span className={s.chip}>
            <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
            Gallery
          </span>
          <h1 className={s.h1}>
            Moments from
            <em>the ground.</em>
          </h1>
          <span className={s.rule} aria-hidden="true" />
          <p className={s.lead}>
            A look at the people we work with and the communities we serve, from donation drives and village outreach
            to digital safety awareness. Every photo here is part of the day-to-day work of our volunteers.
          </p>
        </div>
      </header>

      {/* ───────── Gallery ───────── */}
      <section className={s.main} aria-label="Photo gallery">
        <div className="wrap">
          <div className={s.toolbar}>
            <div className={s.filters} role="group" aria-label="Filter photos">
              {FILTERS.map(f => (
                <button
                  type="button" key={f.value}
                  className={`${s.filter} ${filter === f.value ? s.filterOn : ''}`}
                  aria-pressed={filter === f.value}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}<span className={s.filterCount}>{count(f.value)}</span>
                </button>
              ))}
            </div>
            <p className={s.total} aria-live="polite">Showing {list.length} {list.length === 1 ? 'photo' : 'photos'}</p>
          </div>

          <div className={s.masonry}>
            {list.map((p, i) => (
              <button
                type="button" key={p.caption}
                className={s.card}
                onClick={() => setOpen(i)}
                aria-label={`Open photo: ${p.caption}`}
              >
                <Image
                  src={p.src} alt={p.alt} className={s.img}
                  placeholder="blur" loading="lazy"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                />
                <span className={s.cap}>
                  <span className={s.capTitle}>{p.caption}</span>
                  <span className={s.capTag}>{p.cat === 'digital' ? 'Digital safety' : 'Community work'}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Closing ───────── */}
      <section className={s.closing}>
        <div className="wrap">
          <div className={s.closingBox}>
            <div>
              <h2 className={s.closingTitle}>Be part of the next photo</h2>
              <p className={s.closingText}>
                Volunteer with us, support a programme, or bring your organisation on board. Tell us how you would like to help.
              </p>
            </div>
            <div className={s.closingActions}>
              <Link href="/contact?topic=volunteer" className={s.btnPrimary}>Volunteer with us</Link>
              <Link href="/partner" className={s.btnGhost}>Partner with us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Viewer ───────── */}
      {current && (
        <div
          className={s.lb} role="dialog" aria-modal="true" aria-label="Photo viewer"
          onClick={close}
          onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <button type="button" className={s.lbClose} onClick={close} aria-label="Close photo viewer" autoFocus>&times;</button>
          {list.length > 1 && (
            <>
              <button type="button" className={`${s.lbNav} ${s.lbPrev}`} onClick={e => { e.stopPropagation(); step(-1); }} aria-label="Previous photo">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
              </button>
              <button type="button" className={`${s.lbNav} ${s.lbNext}`} onClick={e => { e.stopPropagation(); step(1); }} aria-label="Next photo">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
          <figure className={s.lbFig} onClick={e => e.stopPropagation()}>
            <Image
              src={current.src} alt={current.alt} className={s.lbImg}
              placeholder="blur" sizes="92vw" priority
              style={{ width: 'auto', height: 'auto' }}
            />
            <figcaption className={s.lbCap}>
              <span>{current.caption}</span>
              <span className={s.lbCount}>{(open ?? 0) + 1} / {list.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}