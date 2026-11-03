'use client';
import { useEffect, useState } from 'react';
import Reveal from './Reveal';
export type Item = { title: string; src: string; tag?: string };
export default function Gallery({ items, contain = false, filters }: { items: Item[]; contain?: boolean; filters?: Record<string, string> }) {
  const [f, setF] = useState('all'); const [open, setOpen] = useState<number | null>(null);
  const list = f === 'all' ? items : items.filter(i => i.tag === f);
  const mv = (d: number) => setOpen(o => (o === null ? o : (o + d + list.length) % list.length));
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowLeft') mv(1); if (e.key === 'ArrowRight') mv(-1); };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  });
  let tx = 0;
  return (<>
    {filters && <div className="fl">{Object.entries(filters).map(([k, t]) => <button key={k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{t}</button>)}</div>}
    <div className="gal">{list.map((it, i) => (
      <Reveal key={it.src + i} className={`it ${contain ? 'c' : ''}`} role="button" tabIndex={0} onClick={() => setOpen(i)} onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && setOpen(i)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src={it.src} alt={it.title} />
        <div>{!contain && it.tag && <small>{(filters?.[it.tag] || '').toUpperCase()}</small>}{it.title}</div>
      </Reveal>))}</div>
    {open !== null && list[open] && (
      <div id="lb" className="on" role="dialog" aria-modal="true" aria-label="معاينة الصورة" onClick={e => e.target === e.currentTarget && setOpen(null)}
        onTouchStart={e => { tx = e.touches[0].clientX; }} onTouchEnd={e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) mv(d < 0 ? 1 : -1); }}>
        <button id="lc" aria-label="إغلاق" onClick={() => setOpen(null)}>✕</button>
        <button id="lp" aria-label="التالي" onClick={() => mv(1)}>›</button>
        <button id="ln" aria-label="السابق" onClick={() => mv(-1)}>‹</button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={list[open].src} alt={list[open].title} />
        <div id="lt">{list[open].title}</div>
      </div>)}
  </>);
}
