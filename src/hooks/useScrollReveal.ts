'use client';
import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const els = el.querySelectorAll<Element>('.sr, .sr-l, .sr-r');
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('on');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach(e => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  return ref as React.RefObject<HTMLElement>;
}
