/**
 * server.js
 * خادم Node.js (Express) يستقبل صوتاً base64 ويرسل إلى Google Speech-to-Text.
 *
 * قبل التشغيل:
 * 1) قم بإنشاء Service Account في Google Cloud مع صلاحية Cloud Speech-to-Text.
 * 2) حمّل ملف JSON لمفتاح الخدمة وضع مساره في متغير البيئة GOOGLE_APPLICATION_CREDENTIALS
 *    أو عدّل keyFilename في SpeechClient below.
 *
 * تشغيل محلي:
 * npm install
 * node server.js
 *
 * ملاحظة أمان: لا تقم بوضع مفتاح الخدمة داخل مشروعك المفتوح للعامة.
 */

const express = require('express');
const bodyParser = require('body-parser');
const {SpeechClient} = require('@google-cloud/speech');
const fs = require('fs');

const app = express();
app.use(bodyParser.json({limit: '25mb'})); // allow large uploads

// Speech client will use GOOGLE_APPLICATION_CREDENTIALS env var if set.
// const client = new SpeechClient({ keyFilename: 'service-account.json' });
const client = new SpeechClient();

app.post('/speech-to-text', async (req, res) => {
  try {
    const { audio, mimeType } = req.body;
    if (!audio) return res.status(400).json({ error: 'لا يوجد حقل audio' });

    const audioBytes = audio;
    const request = {
      audio: { content: audioBytes },
      config: {
        // We leave encoding unspecified to let Google auto-detect.
        languageCode: 'ar-SA',
        // If you know the sampleRateHertz, set it. Otherwise omitted for autodetect.
      },
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(r => r.alternatives[0]?.transcript || '')
      .join('\n');
    res.json({ text: transcription });
  } catch (err) {
    console.error('Recognition error:', err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

app.use(express.static('public')); // serve frontend if placed in 'public' folder

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server listening on http://localhost:${PORT}`));
