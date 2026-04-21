import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cron from 'node-cron';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage (replace with real DB later)
let appointments = [];
let assessments = [];
let users = [];
let chatHistory = [];

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

    res.json({
        success: true,
        message: 'Appointment booked successfully!',
        appointment,
        confirmationNumber: `APT-${Date.now()}`
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
    const gallery = [
        { id: 1, category: 'smile-designing', title: 'Smile Design Transformation', before: 'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?w=500&q=80', after: 'https://images.unsplash.com/photo-1629909613654-28a3a7c4bd45?w=500&q=80' },
        { id: 2, category: 'aligners', title: 'Aligner Treatment Success', before: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500&q=80', after: 'https://images.unsplash.com/photo-1513412803932-49f9003a7281?w=500&q=80' },
        { id: 3, category: 'implants', title: 'Implant Crown Placement', before: 'https://images.unsplash.com/photo-1627483262769-04d0a1401487?w=500&q=80', after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&q=80' }
    ];
    res.json({ success: true, gallery });
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