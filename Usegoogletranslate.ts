import { useCallback, useEffect, useState } from 'react';

/* English is the page's source language. Add or remove Indian languages here;
   `code` must be a language code supported by Google Translate. */
export const LANGUAGES = [
  { code: 'en', short: 'EN', name: 'English',  native: 'English' },
  { code: 'hi', short: 'HI', name: 'Hindi',    native: 'हिन्दी' },
  { code: 'mr', short: 'MR', name: 'Marathi',  native: 'मराठी' },
  { code: 'gu', short: 'GU', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'bn', short: 'BN', name: 'Bengali',  native: 'বাংলা' },
  { code: 'ta', short: 'TA', name: 'Tamil',    native: 'தமிழ்' },
  { code: 'te', short: 'TE', name: 'Telugu',   native: 'తెలుగు' },
  { code: 'kn', short: 'KN', name: 'Kannada',  native: 'ಕನ್ನಡ' },
] as const;

export type LangCode = (typeof LANGUAGES)[number]['code'];

const INCLUDED = LANGUAGES.filter(l => l.code !== 'en').map(l => l.code).join(',');
const COOKIE = 'googtrans';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google?: any;
    googleTranslateElementInit?: () => void;
    __gtPatched?: boolean;
  }
}

/* ---------- Cookie helpers (Google Translate remembers the choice in `googtrans`) ---------- */
function readLang(): LangCode {
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]*)`));
  if (!m) return 'en';
  const code = decodeURIComponent(m[1]).split('/')[2];
  return (LANGUAGES.find(l => l.code === code)?.code ?? 'en') as LangCode;
}

function writeCookie(value: string | null) {
  const host = window.location.hostname;
  const base = value
    ? `${COOKIE}=${value}; path=/`
    : `${COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  document.cookie = base;
  if (host.includes('.')) {
    document.cookie = `${base}; domain=${host}`;
    document.cookie = `${base}; domain=.${host}`;
  }
}

/* ---------- Script loader (runs once, only when needed) ---------- */
let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: INCLUDED, autoDisplay: false },
        'google_translate_element'
      );
      resolve();
    };
    const el = document.createElement('script');
    el.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    el.async = true;
    el.onerror = () => { scriptPromise = null; reject(new Error('Google Translate failed to load')); };
    document.body.appendChild(el);
  });
  return scriptPromise;
}

function waitForCombo(timeout = 5000): Promise<HTMLSelectElement | null> {
  return new Promise(resolve => {
    const start = Date.now();
    const tick = () => {
      const el = document.querySelector<HTMLSelectElement>('select.goog-te-combo');
      if (el) return resolve(el);
      if (Date.now() - start > timeout) return resolve(null);
      setTimeout(tick, 100);
    };
    tick();
  });
}

/* Google Translate rewrites text nodes, which can make React throw on later updates
   ("removeChild" / "insertBefore" errors). These guards make those two calls safe. */
function patchDomForTranslate() {
  if (window.__gtPatched) return;
  window.__gtPatched = true;

  const origRemove = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return origRemove.call(this, child) as T;
  };

  const origInsert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return node;
    return origInsert.call(this, node, ref) as T;
  };
}

export function useGoogleTranslate() {
  const [lang, setLang] = useState<LangCode>('en');
  const [busy, setBusy] = useState(false);

  // Restore a previously chosen language (the cookie survives page loads)
  useEffect(() => {
    patchDomForTranslate();
    const saved = readLang();
    setLang(saved);
    if (saved !== 'en') {
      document.documentElement.lang = saved;
      loadScript().catch(() => {});
    }
  }, []);

  // Warm up the script the first time someone opens the language menu
  const preload = useCallback(() => { loadScript().catch(() => {}); }, []);

  const setLanguage = useCallback(async (code: LangCode) => {
    if (code === lang) return;

    // Back to English: clear the cookie and reload to restore the original page
    if (code === 'en') {
      setBusy(true);
      writeCookie(null);
      window.location.reload();
      return;
    }

    setBusy(true);
    writeCookie(`/en/${code}`);
    try {
      await loadScript();
      const combo = await waitForCombo();
      if (combo) {
        combo.value = code;
        combo.dispatchEvent(new Event('change'));
        document.documentElement.lang = code;
        setLang(code);
        setBusy(false);
        return;
      }
    } catch { /* fall through to the reload fallback */ }

    // Fallback: the cookie is already set, so the widget translates on load
    window.location.reload();
  }, [lang]);

  return { lang, setLanguage, preload, busy };
}