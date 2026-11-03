'use client';
import { useEffect, useRef, useState } from 'react';
export default function Counter({ n, prefix = '', suffix = '' }: { n: number; prefix?: string; suffix?: string }) {
  const r = useRef<HTMLElement>(null); const [v, setV] = useState(n);
  useEffect(() => {
    const el = r.current; if (!el || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect(); let t0 = 0;
      const f = (t: number) => { t0 = t0 || t; const k = Math.min((t - t0) / 1200, 1); setV(Math.round(n * k)); if (k < 1) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [n]);
  return <b ref={r}>{prefix}{v}{suffix}</b>;
}
