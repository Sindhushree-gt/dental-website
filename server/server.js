import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// STEP 3: AI Smile Preview API
app.post('/api/smile-preview', (req, res) => {
    // Logic for AI processing would go here
    // Currently simulating a successful response
    res.json({
        success: true,
        message: 'Image processed successfully',
        transformedImage: req.body.image // Simplified placeholder
    });
});

// Hello Route
app.get('/', (req, res) => {
    res.send('SmileVista Dental API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});