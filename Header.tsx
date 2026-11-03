'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ROUTES } from '@/lib/site';
export default function Header() {
  const p = usePathname(); const [o, setO] = useState(false);
  return (
    <header><div className="w">
      <Link href="/" aria-label="الرئيسية"><Image src="/images/logo.png" alt="شعار هدير عبد الحميد" width={99} height={60} priority style={{ height: 60, width: 'auto' }} /></Link>
      <nav className={o ? 'o' : ''} aria-label="التنقل الرئيسي">
        {ROUTES.map(([h, t]) => <Link key={h} href={h} className={p === h ? 'on' : ''} onClick={() => setO(false)}>{t}</Link>)}
      </nav>
      <button className="menu" aria-expanded={o} aria-label="القائمة" onClick={() => setO(!o)}>القائمة</button>
    </div></header>
  );
}
