const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

const bookingsFile = path.join(__dirname, '..', 'data', 'bookings.json');
const analyticsFile = path.join(__dirname, '..', 'data', 'analytics.json');

// Multer config - store photos with unique names
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    fs.ensureDirSync(uploadsDir);
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `face_${uuidv4()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'), false);
  }
});

// ─── UPLOAD PHOTO ───────────────────────────────────────────────
router.post('/upload-photo', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No photo uploaded' });

    // Track AI scan
    try {
      const analytics = fs.readJsonSync(analyticsFile);
      analytics.aiScans = (analytics.aiScans || 0) + 1;
      fs.writeJsonSync(analyticsFile, analytics);
    } catch(e) {}

    // Read image as base64 for AI analysis
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');
    const mediaType = req.file.mimetype || 'image/jpeg';

    // Call Anthropic API for face analysis
    const analysisResult = await analyzeFaceWithAI(base64Image, mediaType);

    res.json({
      success: true,
      photoId: req.file.filename,
      photoUrl: `/uploads/${req.file.filename}`,
      analysis: analysisResult
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to process photo', details: err.message });
  }
});

// ─── AI FACE ANALYSIS ────────────────────────────────────────────
async function analyzeFaceWithAI(base64Image, mediaType) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Return mock data if no API key
    return getMockAnalysis();
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64Image }
            },
            {
              type: 'text',
              text: `You are a professional barber and style consultant AI. Analyze this person's face carefully.

Return ONLY a valid JSON object — no markdown, no explanation, just raw JSON:
{
  "faceShape": "oval|round|square|diamond|triangle|oblong",
  "faceShapeConfidence": 85,
  "jawlineStrength": 7.8,
  "widthToLengthRatio": 0.74,
  "hairDensity": "high|medium|low",
  "hairTexture": "straight|wavy|curly|coily",
  "skinTone": "fair|medium|olive|dark",
  "ageRange": "18-25|25-35|35-45|45+",
  "topHairstyles": [
    { "name": "High Fade + Textured Top", "score": 96, "reason": "Specific reason why this suits their face", "maintenance": "low|medium|high" },
    { "name": "Classic Side Part", "score": 91, "reason": "Specific reason", "maintenance": "medium" },
    { "name": "Modern Quiff", "score": 88, "reason": "Specific reason", "maintenance": "medium" },
    { "name": "Textured Crop", "score": 85, "reason": "Specific reason", "maintenance": "low" },
    { "name": "Undercut", "score": 82, "reason": "Specific reason", "maintenance": "low" }
  ],
  "topBeardStyles": [
    { "name": "Short Boxed Beard", "score": 94, "reason": "Specific reason for this person", "maintenance": "medium" },
    { "name": "Stubble", "score": 90, "reason": "Specific reason", "maintenance": "low" },
    { "name": "Full Beard", "score": 85, "reason": "Specific reason", "maintenance": "high" },
    { "name": "Goatee", "score": 80, "reason": "Specific reason", "maintenance": "medium" },
    { "name": "Clean Shave", "score": 75, "reason": "Specific reason", "maintenance": "low" }
  ],
  "stylingTips": [
    "Tip 1 specific to their features",
    "Tip 2 specific to their features",
    "Tip 3 specific to their features"
  ],
  "avoidStyles": ["Style to avoid 1", "Style to avoid 2"],
  "overallStylePersonality": "Classic & Refined|Bold & Modern|Casual & Effortless|Rugged & Masculine"
}`
            }
          ]
        }]
      })
    });

    const data = await response.json();
    const raw = data.content?.map(c => c.text || '').join('') || '';
    const clean = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch(err) {
    console.error('AI analysis error:', err);
    return getMockAnalysis();
  }
}

function getMockAnalysis() {
  return {
    faceShape: 'oval',
    faceShapeConfidence: 88,
    jawlineStrength: 7.8,
    widthToLengthRatio: 0.74,
    hairDensity: 'high',
    hairTexture: 'straight',
    skinTone: 'medium',
    ageRange: '25-35',
    topHairstyles: [
      { name: 'High Fade + Textured Top', score: 96, reason: 'Oval faces suit virtually any style — a high fade with textured top creates perfect balance', maintenance: 'low' },
      { name: 'Classic Side Part', score: 91, reason: 'Clean, timeless look that complements your balanced proportions', maintenance: 'medium' },
      { name: 'Modern Quiff', score: 88, reason: 'Volume on top works beautifully with your face structure', maintenance: 'medium' },
      { name: 'Textured Crop', score: 85, reason: 'Effortless style that highlights your natural features', maintenance: 'low' },
      { name: 'Undercut', score: 82, reason: 'Sharp contrast between sides and top creates a modern edge', maintenance: 'low' }
    ],
    topBeardStyles: [
      { name: 'Short Boxed Beard', score: 94, reason: 'Defines your jawline and adds masculine structure', maintenance: 'medium' },
      { name: 'Stubble', score: 90, reason: 'Effortlessly masculine, requires minimal upkeep', maintenance: 'low' },
      { name: 'Full Beard', score: 85, reason: 'Adds rugged character and presence', maintenance: 'high' },
      { name: 'Goatee', score: 80, reason: 'Focuses attention on chin, adds sharp definition', maintenance: 'medium' },
      { name: 'Clean Shave', score: 75, reason: 'Sharp and polished, showcases your bone structure', maintenance: 'low' }
    ],
    stylingTips: [
      'Use a matte clay for natural-looking texture with medium hold',
      'Ask for a skin fade at the temples for maximum sharpness',
      'Trim beard every 2 weeks to maintain clean lines'
    ],
    avoidStyles: ['Bowl Cut', 'Very long center-parted styles'],
    overallStylePersonality: 'Bold & Modern'
  };
}

// ─── GENERATE STYLE PREVIEW (AI text description) ────────────────
router.post('/style-preview', async (req, res) => {
  try {
    const { styleName, styleType, faceShape, photoId } = req.body;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    let imageContent = null;
    if (photoId) {
      const photoPath = path.join(__dirname, '..', 'uploads', photoId);
      if (fs.existsSync(photoPath)) {
        const buf = fs.readFileSync(photoPath);
        imageContent = { base64: buf.toString('base64'), mediaType: 'image/jpeg' };
      }
    }

    if (!apiKey) {
      return res.json(getMockStylePreview(styleName, styleType, faceShape));
    }

    const messages = [];
    const contentBlocks = [];

    if (imageContent) {
      contentBlocks.push({ type: 'image', source: { type: 'base64', media_type: imageContent.mediaType, data: imageContent.base64 } });
    }

    const promptType = styleType === 'beard' ? 'beard style' : 'hairstyle';
    contentBlocks.push({
      type: 'text',
      text: `Professional barber consultant. Customer has ${faceShape} face shape and selected "${styleName}" ${promptType}.
${imageContent ? 'Analyze the uploaded photo to give personalized advice.' : ''}

Respond ONLY in JSON (no markdown):
{
  "title": "${styleName}",
  "tagline": "5-8 word punchy tagline",
  "personalizedDesc": "2-3 sentences: how this ${promptType} looks specifically on ${imageContent ? 'this person' : `a ${faceShape} face shape`}. Be specific and enthusiastic.",
  "visualDesc": "Vivid 2-sentence description of the exact look: length, texture, fade level, finish.",
  "compatibilityScore": 89,
  "maintenanceLevel": "low|medium|high",
  "maintenanceTip": "One specific home care tip.",
  "bestProduct": "Specific product type (e.g. matte clay, beard balm)",
  "tags": ["Professional", "Modern", "Low Maintenance", "Bold"],
  "bookingNote": "What to tell the barber when booking"
}`
    });

    messages.push({ role: 'user', content: contentBlocks });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 800, messages })
    });

    const data = await response.json();
    const raw = data.content?.map(c => c.text || '').join('') || '';
    const clean = raw.replace(/```json|```/g, '').trim();
    res.json(JSON.parse(clean));
  } catch(err) {
    console.error('Style preview error:', err);
    res.json(getMockStylePreview(req.body.styleName, req.body.styleType, req.body.faceShape));
  }
});

function getMockStylePreview(styleName, styleType, faceShape) {
  return {
    title: styleName,
    tagline: `The signature look that defines you`,
    personalizedDesc: `The ${styleName} is an exceptional choice for your ${faceShape} face shape. It creates perfect visual balance while highlighting your best features with precision and character.`,
    visualDesc: `Sharp, clean lines frame the face with expert precision. The contrast between the faded sides and styled top creates a modern masculine silhouette.`,
    compatibilityScore: 88,
    maintenanceLevel: 'medium',
    maintenanceTip: 'Use a small amount of product on towel-dried hair for best results.',
    bestProduct: styleType === 'beard' ? 'Beard balm with light hold' : 'Matte clay for natural texture',
    tags: ['Masculine', 'Modern', 'Versatile', 'Sharp'],
    bookingNote: `Ask for "${styleName}" — show this preview to your barber`
  };
}

// ─── SAVE BOOKING ────────────────────────────────────────────────
router.post('/booking', (req, res) => {
  try {
    const { name, phone, service, hairstyle, beardStyle, date, time, photoId, notes } = req.body;

    if (!name || !phone || !service || !date || !time) {
      return res.status(400).json({ error: 'Missing required booking fields' });
    }

    const booking = {
      id: uuidv4(),
      name: name.trim(),
      phone: phone.trim(),
      service,
      hairstyle: hairstyle || 'Any',
      beardStyle: beardStyle || 'Any',
      date,
      time,
      photoId: photoId || null,
      photoUrl: photoId ? `/uploads/${photoId}` : null,
      notes: notes || '',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const bookings = fs.readJsonSync(bookingsFile);
    bookings.unshift(booking); // newest first
    fs.writeJsonSync(bookingsFile, bookings, { spaces: 2 });

    // Update analytics
    try {
      const analytics = fs.readJsonSync(analyticsFile);
      analytics.bookings = (analytics.bookings || 0) + 1;
      fs.writeJsonSync(analyticsFile, analytics);
    } catch(e) {}

    // Build WhatsApp URL
    const wa = process.env.WHATSAPP_NUMBER || '919876543210';
    const msg = `🏆 *New Booking - Prime Look Barber*\n\n👤 *Name:* ${booking.name}\n📱 *Phone:* ${booking.phone}\n✂️ *Service:* ${booking.service}\n💈 *Hairstyle:* ${booking.hairstyle}\n🧔 *Beard:* ${booking.beardStyle}\n📅 *Date:* ${booking.date}\n⏰ *Time:* ${booking.time}\n${booking.notes ? `📝 *Notes:* ${booking.notes}\n` : ''}\n_Booking ID: ${booking.id.slice(0,8)}_`;

    const whatsappUrl = `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;

    res.json({ success: true, booking, whatsappUrl });
  } catch(err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

// ─── GET AVAILABLE TIME SLOTS ─────────────────────────────────────
router.get('/slots', (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'Date required' });

    const bookings = fs.readJsonSync(bookingsFile);
    const bookedTimes = bookings
      .filter(b => b.date === date && b.status !== 'cancelled')
      .map(b => b.time);

    const allSlots = [
      '9:00 AM','9:45 AM','10:30 AM','11:15 AM','12:00 PM',
      '1:00 PM','2:00 PM','2:45 PM','3:30 PM','4:15 PM',
      '5:00 PM','5:45 PM','6:30 PM','7:15 PM','8:00 PM'
    ];

    const slots = allSlots.map(t => ({
      time: t,
      available: !bookedTimes.includes(t)
    }));

    res.json({ date, slots });
  } catch(err) {
    res.status(500).json({ error: 'Failed to fetch slots' });
  }
});

// ─── DELETE PHOTO (privacy) ────────────────────────────────────────
router.delete('/photo/:photoId', (req, res) => {
  try {
    const photoPath = path.join(__dirname, '..', 'uploads', req.params.photoId);
    if (fs.existsSync(photoPath)) {
      fs.removeSync(photoPath);
      res.json({ success: true });
    } else {
      res.json({ success: true, note: 'File not found (may already be deleted)' });
    }
  } catch(err) {
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

module.exports = router;
