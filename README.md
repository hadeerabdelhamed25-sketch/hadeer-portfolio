# موقع هدير عبد الحميد | Portfolio (Next.js)

Next.js 15 (App Router) + TypeScript + Three.js. العربية (RTL) هي الافتراضية. لا يعتمد على Tailwind؛ التنسيق في `app/globals.css` بنفس ألوان الهوية.

## التشغيل
```bash
npm install
cp .env.example .env.local   # ثم عدّلي القيم
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## الهيكل
- `app/` الصفحات: `/` `/about` `/expertise` `/experience` `/work` `/partners` `/education` `/contact` + `sitemap.ts` و`robots.ts`
- `components/` Header, Footer, Gallery (فلاتر + Lightbox), Hero3D (محمّل كسولًا), ContactForm, Counter, Reveal
- `lib/content.ts` كل النصوص والبيانات (خبرات، أعمال، شهادات، شركاء). `lib/site.ts` بيانات التواصل والمسارات.
- `public/images/` الصور (الصورة الشخصية `photo.jpg`، اللوجو `logo.png`، اللقطات `3`–`15`، الشهادات `16`–`22`)

## استبدال الصور والشهادات
ضعي الملف الجديد في `public/images/` بنفس الاسم، أو غيّري المسار في `lib/content.ts` (المصفوفات `WK` للأعمال و`ED` و`CR` للشهادات). كل عنصر: `[التصنيف, العنوان, المسار]`.
الشهادات 16 و17 و19 مغطّاة الأرقام الحساسة، والصورة 15 مغطّاة الأسماء. لا تستبدليها بنسخ غير مغطّاة.

## نموذج التواصل
- بدون إعداد: يفتح تطبيق البريد برسالة جاهزة (ولا يدّعي الإرسال).
- للإرسال المباشر: أنشئي نموذجًا على Formspree وضعي رابطه في `NEXT_PUBLIC_FORM_ENDPOINT`.

## النشر على Vercel
1. ارفعي المجلد إلى GitHub. 2. من Vercel: Add New Project واختاري المستودع (Next.js يُكتشف تلقائيًا).
3. في Environment Variables ضعي `NEXT_PUBLIC_SITE_URL` (دومينك النهائي) و`NEXT_PUBLIC_FORM_ENDPOINT` إن وُجد. 4. Deploy.
`NEXT_PUBLIC_SITE_URL` يحدد الروابط الأساسية (canonical) وخريطة الموقع وOpen Graph.

## ملاحظات
- مكتبة three تُحمَّل فقط في الهيرو، وتتوقف على الشاشات الصغيرة وعند تفعيل تقليل الحركة، ويبقى بديل CSS ثابت.
- البيانات المهيكلة (Person) تتضمن فقط الاسم والمسمى والبريد ولينكدإن والمدينة.

## الحركات و3D
- `Hero3D`: كرة ذهبية ومجسم على مدار حول الصورة (للشاشات الكبيرة فقط).
- `TimelineOrb`: مجسم 3D صغير يتحرك على خط المنهجية مع التمرير، ويرسم الخط الذهبي (يعمل على الجوال أيضًا).
- `Effects`: Parallax للهيرو (Framer Motion) وإمالة 3D للبطاقات على الأجهزة التي فيها ماوس.
- `app/template.tsx`: انتقال Framer Motion عند كل تنقل بين الصفحات.
كلها تتوقف عند تفعيل «تقليل الحركة» في الجهاز.
