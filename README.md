# محول الصوت إلى نص - Google Speech-to-Text (مشروع جاهز)

هذا المشروع يحتوي على واجهة أمامية بسيطة وخادم Node.js يرسل ملفات الصوت إلى **Google Speech-to-Text API** ثم يعيد النص المحول.

## مكونات المشروع
- `public/index.html` - الواجهة الأمامية (HTML + JS). اضبطه حسب رغبتك.
- `server.js` - خادم Express الذي يتلقى الصوت (Base64) ويستدعي Google Speech API.
- `package.json` - تبعيات المشروع.
- تعليمات النشر وملفات إضافية.

## الإعداد المحلي
1. ثبت Node.js 18+.
2. انسخ المشروع إلى جهازك.
3. افتح Google Cloud Console:
   - أنشئ مشروعًا وفعّل **Speech-to-Text API**.
   - أنشئ Service Account مع صلاحية Cloud Speech-to-Text.
   - حمّل ملف JSON للمفتاح (مثلاً `service-account.json`).
4. عيّن متغير البيئة:
   - Linux / macOS:
     ```bash
     export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
     ```
   - Windows (PowerShell):
     ```powershell
     $env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\service-account.json"
     ```
5. ثبّت التبعيات:
   ```bash
   npm install
   ```
6. شغّل الخادم:
   ```bash
   npm start
   ```
7. افتح المتصفح إلى `http://localhost:3000` وستجد الواجهة.

## نشر على Google Cloud Run (سريع)
1. أنشئ ملف `Dockerfile` أو اتبع دليل Cloud Run لنشر تطبيق Node.js.
2. تأكد من تعيين صلاحيات الخدمة وإضافة متغير البيئة `GOOGLE_APPLICATION_CREDENTIALS` بطريقة آمنة أو ربط المشروع بخدمة الحساب.

## ملاحظات أمان
- لا ترفع ملف مفاتيح الخدمة إلى GitHub علناً.
- استخدم Secret Manager أو سياسات IAM عند النشر.

## تخصيصات
- لتغيير اللغة: عدّل `languageCode` في `server.js` (مثلاً `en-US`).
- لتحسين الدقة: أضف `sampleRateHertz` و`encoding` عند معرفة صيغة الملف.

---

إذا رغبت، أستطيع:
- تجهيز إصدار مُحسّن بواجهة React وواجهة خلفية على Cloud Run مع ملف نشر تلقائي.
- أو أن أرفع المشروع مباشرة على خدمة استضافة (مثل Vercel + Cloud Run) إذا وفرت لي صلاحيات النشر أو رغبت بإرشاد تفصيلي خطوة بخطوة.
