import type { Metadata } from 'next';
import Gallery from '@/components/Gallery';
import { WK, CT } from '@/lib/content';
export const metadata: Metadata = { title: 'دراسات الحالة ونماذج الأعمال', description: 'لقطات حقيقية من أعمال SEO وتحليل الأداء واستراتيجية المحتوى.', alternates: { canonical: '/work' } };
export default function Work() {
  return (<div className="pg on"><section><div className="w"><div className="num">SELECTED WORK</div><h2>دراسات الحالة ونماذج الأعمال</h2>
    <p className="lead">لقطات حقيقية من العمل. اضغط على أي صورة لتكبيرها وتصفّح الباقي بالسحب أو الأسهم.</p>
    <Gallery items={WK.map(([tag, title, src]) => ({ tag, title, src }))} filters={CT} /></div></section></div>);
}
