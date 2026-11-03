'use client';
import { FormEvent, useState } from 'react';
import { EMAIL } from '@/lib/site';
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
export default function ContactForm() {
  const [msg, setMsg] = useState(ENDPOINT ? '' : 'عند الإرسال سيُفتح تطبيق البريد لديك برسالة جاهزة موجّهة إلى هدير، ثم تضغط «إرسال» هناك.');
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const fd = new FormData(e.currentTarget);
    const [n, em, s, m] = ['name', 'email', 'subject', 'message'].map(k => String(fd.get(k) || ''));
    if (!ENDPOINT) {
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(`الاسم: ${n}\nالبريد: ${em}\n\n${m}`)}`;
      setMsg(`تم فتح تطبيق البريد برسالتك. اضغط «إرسال» هناك لإتمام الإرسال. وإن لم يفتح، راسلني مباشرة على ${EMAIL}`); return;
    }
    setBusy(true);
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: n, email: em, subject: s, message: m }) });
      if (!r.ok) throw new Error(); setMsg('وصلتني رسالتك، شكرًا لك. سأرد عليك قريبًا.'); e.currentTarget.reset();
    } catch { setMsg(`تعذّر الإرسال الآن. يمكنك مراسلتي مباشرة على ${EMAIL}`); }
    setBusy(false);
  }
  return (
    <form className="cd" onSubmit={submit}><h3>أرسل رسالة</h3>
      <div><label htmlFor="n">الاسم</label><input id="n" name="name" required autoComplete="name" /></div>
      <div><label htmlFor="e">البريد الإلكتروني</label><input id="e" name="email" type="email" required autoComplete="email" dir="ltr" /></div>
      <div><label htmlFor="s">الموضوع</label><input id="s" name="subject" required /></div>
      <div><label htmlFor="m">الرسالة</label><textarea id="m" name="message" rows={5} required /></div>
      <button className="btn" type="submit" disabled={busy}>لنبدأ حوارًا جديدًا</button>
      <p className="note" role="status" aria-live="polite">{msg}</p>
    </form>
  );
}
