import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cron from 'node-cron';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// ----------------------------
// Paths / static
// ----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

// ----------------------------
// Database (SQLite)
// ----------------------------
const dbPath = path.join(__dirname, '..', 'database', 'smilevista.db');
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const db = new sqlite3.Database(dbPath);

const dbRun = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });

const dbAll = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

const dbGet = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });

await dbRun(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    source TEXT NOT NULL,
    service TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    createdAt TEXT NOT NULL
  )
`);

await dbRun(`
  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    beforeUrl TEXT NOT NULL,
    afterUrl TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )
`);

// ----------------------------
// Gallery migration (before/after -> single imageUrl)
// ----------------------------
async function ensureGallerySchema() {
  const info = await dbAll(`PRAGMA table_info(gallery)`);
  const hasImageUrl = info.some((c) => c.name === 'imageUrl');
  if (hasImageUrl) return;

  // Migrate old schema to new schema with single imageUrl
  await dbRun(`
    CREATE TABLE IF NOT EXISTS gallery_new (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);

  await dbRun(`
    INSERT INTO gallery_new (id, category, title, imageUrl, createdAt)
    SELECT id, category, title, COALESCE(beforeUrl, afterUrl, '') as imageUrl, createdAt
    FROM gallery
  `);

  await dbRun(`DROP TABLE gallery`);
  await dbRun(`ALTER TABLE gallery_new RENAME TO gallery`);
}

await ensureGallerySchema();

// In-memory storage (non-persistent)
let appointments = [];
let assessments = [];
let chatHistory = [];

// ----------------------------
// Admin auth (fixed creds)
// ----------------------------
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'smilevista-dev-secret';
const JWT_EXPIRES_IN = '7d';

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || '';
  const [type, token] = auth.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ success: false, error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload?.role !== 'admin') return res.status(403).json({ success: false, error: 'Forbidden' });
    req.admin = payload;
    return next();
  } catch (e) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
}

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
  const token = jwt.sign({ role: 'admin', username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return res.json({ success: true, token });
});

// ----------------------------
// Uploads (gallery)
// ----------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const safeBase = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const unique = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}_${safeBase}`);
  }
});
const upload = multer({ storage });

// ============================================
// STEP 3: AI SMILE PREVIEW API
// ============================================
app.post('/api/smile-preview', (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Image processed successfully',
            transformedImage: req.body.image,
            recommendations: [
                'Teeth Whitening - to brighten your smile',
                'Veneers - for a more elegant look',
                'Smile Designing - for perfect proportions'
            ]
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ============================================
// STEP 4: TREATMENT RECOMMENDATION API
// ============================================
app.post('/api/recommend-treatment', (req, res) => {
    const { answers } = req.body;
    let recommendedTreatment = 'General Checkup';

    if (answers) {
        if (answers.missingTeeth && answers.missingTeeth > 0) {
            recommendedTreatment = 'Dental Implants';
        } else if (answers.teeth === 'crooked') {
            recommendedTreatment = 'Aligners & Braces';
        } else if (answers.teeth === 'discolored') {
            recommendedTreatment = 'Teeth Whitening + Smile Designing';
        } else if (answers.smile === 'not-happy') {
            recommendedTreatment = 'Digital Smile Designing';
        }
    }

    const assessment = {
        id: assessments.length + 1,
        recommendedTreatment,
        details: answers,
        createdAt: new Date()
    };
    
    assessments.push(assessment);

    res.json({
        success: true,
        recommendedTreatment,
        estimatedCost: Math.floor(Math.random() * 5000) + 1000,
        timeframe: '3-6 months',
        assessmentId: assessment.id
    });
});

// ============================================
// STEP 5: APPOINTMENTS API
// ============================================
app.post('/api/appointments', (req, res) => {
    const { name, phone, email, date, time, service, issue } = req.body;
    
    if (!name || !phone || !date || !time) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const appointment = {
        id: appointments.length + 1,
        name,
        phone,
        email,
        date,
        time,
        service,
        issue,
        status: 'pending',
        createdAt: new Date()
    };

    appointments.push(appointment);

    // Store as a lead (persistent)
    dbRun(
      `INSERT INTO leads (name, phone, email, source, service, message, status, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        phone,
        email || null,
        'booking',
        service || null,
        issue || null,
        'new',
        new Date().toISOString()
      ]
    )
      .then(() => {
        res.json({
          success: true,
          message: 'Appointment booked successfully!',
          appointment,
          confirmationNumber: `APT-${Date.now()}`
        });
      })
      .catch((error) => {
        console.error('Lead insert error:', error);
        res.json({
          success: true,
          message: 'Appointment booked successfully!',
          appointment,
          confirmationNumber: `APT-${Date.now()}`
        });
      });
});

app.get('/api/appointments', (req, res) => {
    res.json({ success: true, appointments });
});

app.get('/api/available-slots', (req, res) => {
    const slots = [
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
    ];
    res.json({ success: true, slots });
});

// ============================================
// STEP 6: GALLERY API
// ============================================
app.get('/api/gallery', (req, res) => {
    dbAll(`SELECT id, category, title, imageUrl, createdAt FROM gallery ORDER BY id DESC`)
      .then((rows) => {
        const gallery = rows.map((r) => ({
          id: r.id,
          category: r.category,
          title: r.title,
          image: r.imageUrl,
          createdAt: r.createdAt
        }));
        res.json({ success: true, gallery });
      })
      .catch((error) => {
        console.error('Gallery fetch error:', error);
        res.json({ success: true, gallery: [] });
      });
});

// ============================================
// ADMIN: LEADS API
// ============================================
app.get('/api/leads', requireAdmin, (req, res) => {
  dbAll(`SELECT * FROM leads ORDER BY datetime(createdAt) DESC`)
    .then((rows) => res.json({ success: true, leads: rows }))
    .catch((error) => {
      console.error('Leads fetch error:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch leads' });
    });
});

app.patch('/api/leads/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  if (!status) return res.status(400).json({ success: false, error: 'Missing status' });
  dbRun(`UPDATE leads SET status = ? WHERE id = ?`, [status, id])
    .then(() => res.json({ success: true }))
    .catch((error) => {
      console.error('Lead update error:', error);
      res.status(500).json({ success: false, error: 'Failed to update lead' });
    });
});

// ============================================
// ADMIN: GALLERY UPLOAD API
// ============================================
app.post(
  '/api/admin/gallery',
  requireAdmin,
  upload.single('image'),
  (req, res) => {
    const { category, title } = req.body || {};
    const imageFile = req.file;

    if (!category || !title || !imageFile) {
      if (imageFile?.path) fs.unlink(imageFile.path, () => {});
      return res.status(400).json({ success: false, error: 'Missing required fields/files' });
    }

    const imageUrl = `/uploads/${imageFile.filename}`;
    const createdAt = new Date().toISOString();

    dbRun(
      `INSERT INTO gallery (category, title, imageUrl, createdAt) VALUES (?, ?, ?, ?)`,
      [category, title, imageUrl, createdAt]
    )
      .then(({ lastID }) => {
        res.json({
          success: true,
          item: { id: lastID, category, title, image: imageUrl, createdAt }
        });
      })
      .catch((error) => {
        console.error('Gallery insert error:', error);
        fs.unlink(imageFile.path, () => {});
        res.status(500).json({ success: false, error: 'Failed to save gallery item' });
      });
  }
);

app.delete('/api/admin/gallery/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const item = await dbGet(`SELECT imageUrl FROM gallery WHERE id = ?`, [id]);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });

    await dbRun(`DELETE FROM gallery WHERE id = ?`, [id]);

    const imgPath = path.join(uploadsDir, path.basename(item.imageUrl || ''));
    if (fs.existsSync(imgPath)) fs.unlink(imgPath, () => {});

    return res.json({ success: true });
  } catch (error) {
    console.error('Gallery delete error:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete gallery item' });
  }
});

// ============================================
// STEP 8: CHATBOT API
// ============================================
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    
    const responses = {
        'hello': 'Hello! Welcome to SmileVista Dental. How can we help?',
        'booking': 'You can book an appointment by visiting our Booking page. We have flexible time slots!',
        'treatments': 'We offer Smile Designing, Aligners & Braces, and Dental Implants.',
        'cost': 'Treatment costs vary. Schedule a consultation for a personalized quote!',
        'default': 'I\'m here to help! Try asking about our treatments, booking, or costs.'
    };

    const lowerMessage = message.toLowerCase();
    let reply = responses.default;

    Object.keys(responses).forEach(key => {
        if (lowerMessage.includes(key) && key !== 'default') {
            reply = responses[key];
        }
    });

    const chat = { message, reply, timestamp: new Date() };
    chatHistory.push(chat);

    res.json({ success: true, reply });
});

// ============================================
// STEP 9: TRANSLATIONS API
// ============================================
app.get('/api/translations/:language', (req, res) => {
    const translations = {
        en: { services: 'Services', booking: 'Book Appointment', smile: 'Your Perfect Smile Awaits' },
        es: { services: 'Servicios', booking: 'Reservar Cita', smile: 'Tu Sonrisa Perfecta Te Espera' }
    };
    const lang = req.params.language || 'en';
    res.json({ success: true, translations: translations[lang] || translations.en });
});

// ============================================
// STEP 10: FAQ API
// ============================================
app.get('/api/faqs', (req, res) => {
    const faqs = [
        { id: 1, category: 'general', question: 'How long do treatments take?', answer: 'Treatment duration varies by procedure. Schedule a consultation for details.' },
        { id: 2, category: 'implants', question: 'Are dental implants safe?', answer: 'Yes, implants are FDA-approved and have a 95%+ success rate.' },
        { id: 3, category: 'aligners', question: 'Can I eat with aligners?', answer: 'Remove aligners before eating. Wear them 22 hours daily for best results.' }
    ];
    res.json({ success: true, faqs });
});

// ============================================
// STEP 11: REMINDER SYSTEM (Cron Job)
// ============================================
// Send reminder emails at 9 AM daily
cron.schedule('0 9 * * *', () => {
    console.log('📧 Running appointment reminder job...');
    // In production, send emails via nodemailer
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const reminders = appointments.filter(apt => apt.date === tomorrow);
    console.log(`💬 Sending ${reminders.length} reminders for tomorrow...`);
});

// ============================================
// HEALTH CHECK & ROOT
// ============================================
app.get('/', (req, res) => {
    res.json({
        message: 'SmileVista Dental API is running',
        version: '1.0.0',
        endpoints: [
            '/api/smile-preview',
            '/api/recommend-treatment',
            '/api/appointments',
            '/api/available-slots',
            '/api/gallery',
            '/api/chat',
            '/api/translations/:language',
            '/api/faqs'
        ]
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('✅ All APIs ready for SmileVista Dental');
});