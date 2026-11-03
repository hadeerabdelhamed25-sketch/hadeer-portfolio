'use client';
import { useEffect, useRef, ElementType, ReactNode } from 'react';
export default function Reveal({ children, className = '', as: T = 'div', ...rest }: { children: ReactNode; className?: string; as?: ElementType; [k: string]: unknown }) {
  const r = useRef<HTMLElement>(null); const Tag: any = T; // eslint-disable-line @typescript-eslint/no-explicit-any
  useEffect(() => {
    const el = r.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('v'); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <Tag ref={r} className={`rv ${className}`} {...rest}>{children}</Tag>;
}
