import Link from 'next/link';
import Image from 'next/image';
import { WA } from '@/lib/site';
export default function Footer() {
  return (<>
    <footer><div className="w">
      <div className="lg"><Image src="/images/logo.png" alt="شعار هدير عبد الحميد" width={77} height={46} style={{ height: 46, width: 'auto' }} /></div>
      <div>© {new Date().getFullYear()} هدير عبد الحميد · <span className="en">SEO-led Digital Growth Strategist</span></div>
      <div><Link href="/contact">تواصل معي</Link></div>
    </div></footer>
    <a className="wa" href={WA} target="_blank" rel="noopener noreferrer">تواصل معي عبر واتساب</a>
  </>);
}
