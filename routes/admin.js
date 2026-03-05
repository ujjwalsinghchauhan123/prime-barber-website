const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs-extra');

const bookingsFile = path.join(__dirname, '..', 'data', 'bookings.json');
const analyticsFile = path.join(__dirname, '..', 'data', 'analytics.json');

// Simple auth middleware
function adminAuth(req, res, next) {
  const { username, password } = req.query;
  const validUser = process.env.ADMIN_USERNAME || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'primelook2025';
  if (username === validUser && password === validPass) return next();
  // Check header auth
  const authHeader = req.headers['x-admin-auth'];
  if (authHeader === `${validUser}:${validPass}`) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// Get all bookings
router.get('/bookings', adminAuth, (req, res) => {
  try {
    const bookings = fs.readJsonSync(bookingsFile);
    res.json({ success: true, bookings, total: bookings.length });
  } catch(err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get analytics
router.get('/analytics', adminAuth, (req, res) => {
  try {
    const analytics = fs.readJsonSync(analyticsFile);
    const bookings = fs.readJsonSync(bookingsFile);

    const today = new Date().toISOString().split('T')[0];
    const todayBookings = bookings.filter(b => b.date === today);
    const thisWeek = bookings.filter(b => {
      const d = new Date(b.createdAt);
      const now = new Date();
      const diff = (now - d) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    });

    // Service breakdown
    const serviceCounts = {};
    bookings.forEach(b => {
      serviceCounts[b.service] = (serviceCounts[b.service] || 0) + 1;
    });

    // Revenue estimate
    const servicePrices = {
      'Precision Haircut': 399, 'Beard Sculpting': 249,
      'Prime Combo': 549, 'Hair Styling': 199,
      'Hair Color': 799, 'Face Shape Consult': 0
    };
    const totalRevenue = bookings.reduce((sum, b) => sum + (servicePrices[b.service] || 0), 0);

    res.json({
      success: true,
      analytics: {
        ...analytics,
        totalBookings: bookings.length,
        todayBookings: todayBookings.length,
        weekBookings: thisWeek.length,
        serviceCounts,
        totalRevenue,
        confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
        cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
        recentBookings: bookings.slice(0, 5)
      }
    });
  } catch(err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Update booking status
router.patch('/bookings/:id', adminAuth, (req, res) => {
  try {
    const { status, notes } = req.body;
    const bookings = fs.readJsonSync(bookingsFile);
    const idx = bookings.findIndex(b => b.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Booking not found' });

    bookings[idx].status = status || bookings[idx].status;
    if (notes !== undefined) bookings[idx].adminNotes = notes;
    bookings[idx].updatedAt = new Date().toISOString();

    fs.writeJsonSync(bookingsFile, bookings, { spaces: 2 });
    res.json({ success: true, booking: bookings[idx] });
  } catch(err) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Delete booking
router.delete('/bookings/:id', adminAuth, (req, res) => {
  try {
    let bookings = fs.readJsonSync(bookingsFile);
    const initial = bookings.length;
    bookings = bookings.filter(b => b.id !== req.params.id);
    if (bookings.length === initial) return res.status(404).json({ error: 'Not found' });
    fs.writeJsonSync(bookingsFile, bookings, { spaces: 2 });
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

// Verify admin credentials
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const validUser = process.env.ADMIN_USERNAME || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'primelook2025';
  if (username === validUser && password === validPass) {
    res.json({ success: true, token: `${username}:${password}` });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
