# 💈 Prime Look Barber — Full Stack Website

A complete, production-ready premium barber shop website with AI-powered face analysis, booking system, WhatsApp integration, and admin dashboard.

## 🚀 Quick Start

### 1. Install dependencies
```bash
cd primelook
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and add:
- `ANTHROPIC_API_KEY` — Your Anthropic API key (for AI face analysis)
- `WHATSAPP_NUMBER` — Your WhatsApp number with country code (e.g. `919876543210`)
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — Admin dashboard credentials

### 3. Run the server
```bash
# Production
npm start

# Development (auto-reload)
npm run dev
```

### 4. Open in browser
- **Website:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin

---

## 📁 Project Structure

```
primelook/
├── server.js              # Express server entry point
├── package.json
├── .env.example           # Environment variables template
├── routes/
│   ├── api.js             # Public API (booking, upload, AI analysis)
│   └── admin.js           # Admin API (bookings, analytics)
├── data/
│   ├── bookings.json      # Auto-created — stores all bookings
│   └── analytics.json     # Auto-created — tracks visits & scans
├── uploads/               # Client photos (auto-deleted after 2hrs)
└── public/
    ├── index.html         # Main website
    ├── admin.html         # Admin dashboard
    ├── css/
    │   ├── style.css      # Main website styles
    │   └── admin.css      # Admin dashboard styles
    └── js/
        └── main.js        # Frontend JavaScript
```

---

## ✨ Features

### 🌐 Website
- Premium dark gold design — mobile-first responsive
- Hero with animated stats
- Limited-time offer countdown timer
- Services section (6 services with prices)
- Gallery with filter categories
- Trending hairstyles horizontal scroll
- Before & After transformations
- Google Reviews section
- Google Maps location embed
- Floating WhatsApp button

### 🤖 AI Style Advisor
- Client photo upload with drag & drop
- Real AI face shape detection (Claude API)
- Jawline strength scoring
- Hair density & texture analysis
- Top 5 hairstyle recommendations with match %
- Top 5 beard recommendations with match %
- **Live AI preview** — click any style to get a personalized AI-written description of how it looks on the client's specific face
- Privacy: photos auto-deleted after 2 hours

### 📅 Booking System
- 5-step booking flow
- Service selection with prices
- Hairstyle + beard style picker (pre-fills from AI recommendations)
- Date picker with live time slot availability
- Real-time slot management (no double bookings)
- WhatsApp confirmation message auto-generated

### 💬 WhatsApp Integration
- Booking confirmation sent to barber via WhatsApp
- Quick book button
- Floating WhatsApp CTA
- Client reminder via admin dashboard

### 🔧 Admin Dashboard
- Secure login (username/password)
- **Overview** — Stats cards, service breakdown chart, recent bookings
- **All Bookings** — Search, filter, view, cancel, delete
- **Today's Queue** — Today's appointments in time order
- **Client Photos** — Grid view of all uploaded photos + selected styles
- **Analytics** — Revenue by service, conversion rate, visit tracking
- View client's uploaded photo alongside their selected hairstyle/beard
- WhatsApp client directly from admin

---

## 🔌 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload-photo` | Upload photo + AI face analysis |
| POST | `/api/style-preview` | Get AI style preview for selected style |
| POST | `/api/booking` | Create a booking |
| GET | `/api/slots?date=YYYY-MM-DD` | Get available time slots |
| DELETE | `/api/photo/:photoId` | Delete a photo |

### Admin (requires auth header)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/login` | Verify admin credentials |
| GET | `/admin/bookings` | Get all bookings |
| GET | `/admin/analytics` | Get analytics data |
| PATCH | `/admin/bookings/:id` | Update booking status |
| DELETE | `/admin/bookings/:id` | Delete booking |

---

## 🔑 Admin Login
- Default username: `admin`
- Default password: `primelook2025`
- Change in `.env` file: `ADMIN_USERNAME` and `ADMIN_PASSWORD`

---

## 🛠 Tech Stack
- **Backend:** Node.js + Express
- **AI:** Anthropic Claude API (face analysis + style previews)
- **Storage:** JSON files (easily swap for MongoDB/PostgreSQL)
- **File Uploads:** Multer
- **Frontend:** Vanilla HTML/CSS/JavaScript
- **Fonts:** Playfair Display, Josefin Sans, Cormorant Garamond
- **Maps:** Google Maps Embed

---

## 📱 SEO & Performance
- Meta tags optimized for Delhi barber keywords
- Mobile-first responsive design
- Lazy-loaded map
- CSS animations via IntersectionObserver (no layout thrash)
- No heavy frameworks — fast load times

---

## 🔒 Privacy & Security
- Client photos auto-deleted after 2 hours (cleanup runs every 30min)
- Admin routes protected with auth header
- File upload validation (images only, 10MB max)
- No third-party tracking

---

## 📞 Customization

### Update shop details
Edit in `public/index.html`:
- Shop name, address, phone
- WhatsApp number
- Google Maps embed URL
- Working hours

### Update pricing
Edit in `public/js/main.js` → `DATA.services` array

### Change admin password
Edit `.env` file: `ADMIN_PASSWORD=yournewpassword`
