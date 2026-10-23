'use client';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { LANGUAGES, type LangCode } from '../../../Usegoogletranslate';
import s from './Languageswitcher.module.css';

interface Props {
  lang: LangCode;
  onSelect: (code: LangCode) => void;
  onOpen?: () => void;
  busy?: boolean;
  className?: string;
}

function Globe() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function Chevron() {
  return (
    <svg className={s.chev} viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
  );
}
function Check() {
  return (
    <svg className={s.check} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
  );
}

export default function LanguageSwitcher({ lang, onSelect, onOpen, busy, className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0];

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  // Move focus to the selected language when the menu opens
  useEffect(() => {
    if (!open) return;
    const el = panelRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    el?.focus();
  }, [open]);

  const toggle = () => {
    setOpen(o => {
      if (!o) onOpen?.();
      return !o;
    });
  };

  const onListKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(panelRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? []);
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); items[(i + 1) % items.length]?.focus(); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')   { e.preventDefault(); items[(i - 1 + items.length) % items.length]?.focus(); }
    if (e.key === 'Home') { e.preventDefault(); items[0]?.focus(); }
    if (e.key === 'End')  { e.preventDefault(); items[items.length - 1]?.focus(); }
  };

  const choose = (code: LangCode) => {
    setOpen(false);
    onSelect(code);
  };

  return (
    <div ref={wrapRef} className={`${s.wrap} ${className} notranslate`} translate="no">
      <button
        ref={btnRef}
        type="button"
        className={`${s.trigger} ${open ? s.triggerOpen : ''} ${busy ? s.busy : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.name}. Change language`}
        onClick={toggle}
      >
        <Globe />
        <span style={{fontSize:"14px"}} className={s.code}>{current.short}</span>
        <Chevron />
      </button>

      <div
        ref={panelRef}
        className={`${s.panel} ${open ? s.panelOpen : ''}`}
        role="listbox"
        aria-label="Choose language"
        onKeyDown={onListKey}
      >
        <div className={s.head}>
          <span>Choose language</span>
          <span className={s.headHi}>भाषा चुनें</span>
        </div>
        <div className={s.grid}>
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === lang}
              tabIndex={open ? 0 : -1}
              className={`${s.option} ${l.code === lang ? s.optionActive : ''}`}
              onClick={() => choose(l.code)}
            >
              <span className={s.native}>{l.native}</span>
              <span className={s.eng}>{l.name}</span>
              {l.code === lang && <Check />}
            </button>
          ))}
        </div>
        <p className={s.note}>Translated automatically by Google Translate. Some terms may not be exact.</p>
      </div>
    </div>
  );
}