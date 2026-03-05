require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
fs.ensureDirSync(path.join(__dirname, 'uploads'));
fs.ensureDirSync(path.join(__dirname, 'data'));

// Init data files
const bookingsFile = path.join(__dirname, 'data', 'bookings.json');
const analyticsFile = path.join(__dirname, 'data', 'analytics.json');
if (!fs.existsSync(bookingsFile)) fs.writeJsonSync(bookingsFile, []);
if (!fs.existsSync(analyticsFile)) fs.writeJsonSync(analyticsFile, { visits: 0, bookings: 0, aiScans: 0 });

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Track page visits
app.use((req, res, next) => {
  if (req.path === '/' || req.path === '/index.html') {
    try {
      const analytics = fs.readJsonSync(analyticsFile);
      analytics.visits = (analytics.visits || 0) + 1;
      fs.writeJsonSync(analyticsFile, analytics);
    } catch(e) {}
  }
  next();
});

// Routes
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Cleanup old uploads (> 2 hours old) - privacy protection
setInterval(() => {
  const uploadsDir = path.join(__dirname, 'uploads');
  const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
  try {
    const files = fs.readdirSync(uploadsDir);
    files.forEach(file => {
      const filePath = path.join(uploadsDir, file);
      const stat = fs.statSync(filePath);
      if (stat.mtime.getTime() < twoHoursAgo) {
        fs.removeSync(filePath);
      }
    });
  } catch(e) {}
}, 30 * 60 * 1000); // run every 30 minutes

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║   Prime Look Barber Server           ║
║   Running on: http://localhost:${PORT}  ║
║   Admin:      http://localhost:${PORT}/admin ║
╚══════════════════════════════════════╝
  `);
});
