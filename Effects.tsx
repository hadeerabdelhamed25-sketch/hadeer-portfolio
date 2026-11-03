'use client';
import { useEffect } from 'react';
import { useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
// Hero parallax (Framer Motion scroll value -> CSS variable) + 3D tilt on cards (mouse devices only).
export default function Effects() {
  const reduce = useReducedMotion(); const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', v => { if (!reduce) document.querySelector<HTMLElement>('.hero')?.style.setProperty('--py', String(Math.min(v, 900))); });
  useEffect(() => {
    if (reduce || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const card = (t: EventTarget | null) => (t as Element | null)?.closest?.('.cd,.it') as HTMLElement | null;
    const mv = (e: PointerEvent) => { const c = card(e.target); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 8 + 'deg'); c.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 8 + 'deg'); };
    const out = (e: PointerEvent) => { const c = card(e.target); if (c) { c.style.setProperty('--ry', '0deg'); c.style.setProperty('--rx', '0deg'); } };
    document.addEventListener('pointermove', mv); document.addEventListener('pointerout', out);
    return () => { document.removeEventListener('pointermove', mv); document.removeEventListener('pointerout', out); };
  }, [reduce]);
  return null;
}
