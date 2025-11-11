import { useEffect, useState } from 'react';

interface UseThemeResult {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  reducedMotion: boolean;
}

export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  });

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore persistence errors (private mode, etc.)
    }
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handle = () => setReducedMotion(mq.matches);
    handle();
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme, reducedMotion };
}