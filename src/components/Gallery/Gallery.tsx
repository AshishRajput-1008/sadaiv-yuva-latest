
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import s from './Gallery.module.css';

import g1 from '../../../public/gallery/Volunteers Packing Community Donations.webp';
import g2 from '../../../public/gallery/Many Hands, One Harvest.webp';
import g3 from '../../../public/gallery/cyber-digital-india-1.jpg';
import g4 from '../../../public/gallery/ng0-3.webp';
import g5 from '../../../public/gallery/ngo-4.webp';
import g6 from '../../../public/gallery/ngo-5.webp';
import g7 from '../../../public/gallery/ngo-12.webp';
import g8 from '../../../public/gallery/cyber-digital-india-2.jpg';
import g9 from '../../../public/gallery/cyber-digital-india-3.jpg';
import g10 from '../../../public/gallery/cyber-digital-india-1.jpg';

type Photo = {
  src: StaticImageData;
  alt: string;
  caption: string;
  span: string;
};

const photos: Photo[] = [
  {
    src: g1,
    alt: 'Volunteers packing community donations',
    caption: 'Community Donation Drive',
    span: 'span2x2',
  },
  {
     src: g9,
    alt: 'Community members working together during harvest',
    caption: 'Many Hands, One Harvest',
    span: '',
  },
  {
    src: g3,
    alt: 'Digital India and cyber awareness initiative',
    caption: 'Digital India Awareness',
    span: '',
  },
  {
    src: g4,
    alt: 'NGO community outreach initiative',
    caption: 'Community Outreach',
    span: 'span2',
  },
  {
    src: g5,
    alt: 'Community welfare and social service',
    caption: 'Social Welfare Initiative',
    span: '',
  },
  {
    src: g6,
    alt: 'NGO volunteers supporting the community',
    caption: 'Volunteer Service',
    span: 'spanRow2',
  },
  {
    src: g7,
    alt: 'Community development initiative',
    caption: 'Community Development',
    span: 'span2',
  },
  {
    src: g8,
    alt: 'Cyber safety and digital literacy awareness',
    caption: 'Cyber Suraksha',
    span: '',
  },
  {
    src: g2,
    alt: 'Digital literacy and online safety awareness',
    caption: 'Digital Literacy for All',
    span: '',
  },
  {
    src: g10,
    alt: 'Cyber awareness initiative',
    caption: 'Cyber Awareness Campaign',
    span: '',
  },
];

export default function Gallery() {
  const [lb, setLb] = useState<Photo | null>(null);
  const secRef = useScrollReveal();

  return (
    <section
      id="gallery"
      className={`${s.gallery} sec`}
      ref={secRef}
    >
      <div className="wrap">
        <div
          className={`${s.hd} sr`}
          style={{
            textAlign: 'center',
            maxWidth: 640,
            marginInline: 'auto',
          }}
        >
          <span className="chip">
            <i />
            Gallery
          </span>

          <h2 className="sec-title">
            Moments of <em>Impact</em>
          </h2>

          <p
            className="sec-sub"
            style={{
              marginInline: 'auto',
              textAlign: 'center',
            }}
          >
            A glimpse into the lives we touch and the communities we serve
            — on the ground, every day.
          </p>
        </div>

        <div className={s.masonry}>
          {photos.map((p, i) => (
            <div
              key={`${p.caption}-${i}`}
              className={`${s.item} ${p.span ? s[p.span] : ''} sr d${Math.min(i + 1, 6)}`}
              onClick={() => setLb(p)}
              role="button"
              tabIndex={0}
              aria-label={`View ${p.alt}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLb(p);
                }
              }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                className={s.img}
                loading="lazy"
                placeholder="blur"
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              <div className={s.overlay}>
                <span className={s.caption}>{p.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lb && (
        <div
          className={s.lb}
          onClick={() => setLb(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
        >
          <button
            type="button"
            className={s.lbClose}
            onClick={() => setLb(null)}
            aria-label="Close image preview"
          >
            &times;
          </button>

          <div onClick={(e) => e.stopPropagation()}>
            <Image
              src={lb.src}
              alt={lb.alt}
              className={s.lbImg}
              placeholder="blur"
              sizes="95vw"
              priority
            />

            <p className={s.caption}>{lb.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
