/* ================================================================
   PRIME LOOK BARBER — Main Frontend JS
   ================================================================ */

// ── DATA ─────────────────────────────────────────────────────────
const DATA = {
  services: [
    { id: 'haircut', icon: '✂️', name: 'Precision Haircut', desc: 'Face-shape-based cut with expert scissor and clipper work. Includes wash, style, and product finish.', price: '₹399', duration: '45 min', tag: null },
    { id: 'beard', icon: '🧔', name: 'Beard Sculpting', desc: 'Hot towel shave, precision beard shaping and detailing. Jawline definition that commands respect.', price: '₹249', duration: '30 min', tag: null },
    { id: 'combo', icon: '👑', name: 'Prime Combo', desc: 'Complete transformation: haircut + beard sculpting + styling. Our most requested service.', price: '₹549', duration: '75 min', tag: 'Popular' },
    { id: 'styling', icon: '💈', name: 'Hair Styling', desc: 'Professional blow-dry, wax or clay finish. Walk out looking like you own the room.', price: '₹199', duration: '20 min', tag: null },
    { id: 'color', icon: '🎨', name: 'Hair Color', desc: 'Global color, highlights, or fashion colors. Premium ammonia-free products only.', price: '₹799', duration: '90 min', tag: null },
    { id: 'consult', icon: '🔬', name: 'Face Shape Consult', desc: 'AI-powered analysis + expert barber consultation. Find your perfect style before committing.', price: 'Free', duration: '15 min', tag: 'Free' },
  ],
  hairstyles: [
    { id: 'highfade', icon: '💈', name: 'High Fade', desc: 'Clean, sharp sides with gradual fade to skin' },
    { id: 'textcrop', icon: '✂️', name: 'Textured Crop', desc: 'Casual modern crop with natural texture' },
    { id: 'quiff', icon: '👆', name: 'Classic Quiff', desc: 'Volume on top, neat tapered sides' },
    { id: 'sidepart', icon: '↗️', name: 'Side Part', desc: 'Timeless gentleman style, medium length' },
    { id: 'pompadour', icon: '🌊', name: 'Pompadour', desc: 'Bold swept-back volume with skin fade' },
    { id: 'undercut', icon: '⚡', name: 'Undercut', desc: 'Disconnected sides for a modern edge' },
  ],
  beardStyles: [
    { id: 'stubble', icon: '🌱', name: 'Stubble', desc: 'Effortlessly masculine 3-5mm growth' },
    { id: 'shortbox', icon: '📦', name: 'Short Boxed', desc: 'Clean lines, professional look' },
    { id: 'full', icon: '🧔', name: 'Full Beard', desc: 'Rugged commanding presence' },
    { id: 'fade', icon: '✂️', name: 'Fade Beard', desc: 'Gradual taper from cheeks to skin' },
    { id: 'goatee', icon: '🔻', name: 'Goatee', desc: 'Chin focus with sharp clean lines' },
    { id: 'clean', icon: '🪒', name: 'Clean Shave', desc: 'Sharp, polished, bold look' },
  ],
  gallery: [
    { icon: '✂️', name: 'High Skin Fade', type: 'Haircut', cat: 'haircut' },
    { icon: '🧔', name: 'Full Beard', type: 'Beard', cat: 'beard' },
    { icon: '💈', name: 'Burst Fade', type: 'Fade', cat: 'fade' },
    { icon: '🌊', name: 'Pompadour', type: 'Haircut', cat: 'haircut' },
    { icon: '⚡', name: 'Undercut', type: 'Haircut', cat: 'haircut' },
    { icon: '📦', name: 'Box Beard', type: 'Beard', cat: 'beard' },
    { icon: '😐', name: 'Before', type: 'Before & After', cat: 'transform' },
    { icon: '👆', name: 'Quiff', type: 'Haircut', cat: 'haircut' },
    { icon: '🪒', name: 'Clean Shave', type: 'Shave', cat: 'beard' },
    { icon: '🎨', name: 'Hair Color', type: 'Color', cat: 'color' },
    { icon: '↗️', name: 'Side Part', type: 'Haircut', cat: 'haircut' },
    { icon: '😎', name: 'After', type: 'Before & After', cat: 'transform' },
  ],
  trending: [
    { icon: '💈', name: 'Burst Fade', pop: '🔥 1,240 this month', badge: 'HOT' },
    { icon: '🌊', name: 'Textured Pompadour', pop: '⭐ 980 bookings', badge: '' },
    { icon: '✂️', name: 'French Crop', pop: '📈 Trending +42%', badge: 'RISING' },
    { icon: '🧔', name: 'Fade Beard', pop: '🔥 760 bookings', badge: 'HOT' },
    { icon: '⚡', name: 'Disconnected Undercut', pop: '⭐ 620 bookings', badge: '' },
    { icon: '🎯', name: 'Edgar Cut', pop: '📈 Trending +28%', badge: 'NEW' },
  ],
  reviews: [
    { stars: 5, text: 'Rahul completely transformed my look. He analyzed my face shape and recommended a high fade I never would have chosen myself. Best haircut of my life.', name: 'Arjun Mehta', source: 'Google Review', avatar: '👨' },
    { stars: 5, text: 'The AI tool is genuinely impressive. It correctly identified my round face and the quiff it suggested makes my face look so much sharper. Worth every rupee.', name: 'Dev Sharma', source: 'Google Review', avatar: '🧑' },
    { stars: 5, text: 'I\'ve tried many barbers in Delhi. Prime Look is leagues ahead — the attention to detail, hot towel, and consultation. A complete premium experience.', name: 'Karan Khanna', source: 'Google Review', avatar: '👱' },
    { stars: 5, text: 'Booked via WhatsApp. Got exactly what I saw in the preview. The beard sculpting paired with my haircut was perfect. Monthly client now.', name: 'Rohan Gupta', source: 'Google Review', avatar: '🧔' },
    { stars: 5, text: 'As someone who never knew what hairstyle to ask for, the face shape consultation was a revelation. They know exactly what works for you.', name: 'Vikram Patel', source: 'Google Review', avatar: '👨‍💼' },
    { stars: 5, text: 'Great ambiance, precise cuts, always on time. The combo offer is unbeatable value. Prime Look has earned a lifelong customer.', name: 'Sameer Bose', source: 'Google Review', avatar: '🧑‍💼' }
  ]
};

// ── STATE ──────────────────────────────────────────────────────────
const STATE = {
  booking: { service: '', servicePrice: '', hairstyle: '', beardStyle: '', date: '', time: '', name: '', phone: '', notes: '' },
  ai: { photoId: null, photoUrl: null, faceShape: '', analysis: null, selectedHair: '', selectedBeard: '' },
  bookingStep: 1,
  previewDebounce: { hair: null, beard: null }
};

// ── INIT ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNav();
  renderServices();
  renderGallery();
  renderTrending();
  renderTransformations();
  renderReviews();
  renderBookingStylePickers();
  initScrollReveal();
  initOfferTimer();
  initDragDrop();
  setMinDate();
});

// ── LOADER ────────────────────────────────────────────────────────
function initLoader() {
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader) { loader.style.opacity = '0'; setTimeout(() => loader.remove(), 500); }
  }, 1600);
}

// ── NAV ───────────────────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    // Update active nav link
    const sections = ['home','services','gallery','ai-tool','booking','reviews','location'];
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 200) current = id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── RENDER SERVICES ───────────────────────────────────────────────
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  grid.innerHTML = DATA.services.map((s, i) => `
    <div class="service-card reveal reveal-d${(i%3)+1}">
      ${s.tag ? `<div class="svc-tag">${s.tag}</div>` : ''}
      <div class="svc-icon">${s.icon}</div>
      <div class="svc-name">${s.name}</div>
      <div class="svc-desc">${s.desc}</div>
      <div class="svc-price">${s.price} <span>onwards</span></div>
      <div class="svc-duration">⏱ ${s.duration}</div>
    </div>
  `).join('');
  reinitReveal();
}

// ── RENDER GALLERY ────────────────────────────────────────────────
function renderGallery(filter = 'all') {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  const items = filter === 'all' ? DATA.gallery : DATA.gallery.filter(g => g.cat === filter);
  grid.innerHTML = items.map(g => `
    <div class="gallery-item reveal">
      <div class="gallery-thumb">
        <div class="gallery-thumb-inner">
          <span class="gallery-thumb-icon">${g.icon}</span>
          <span class="gallery-thumb-label">${g.name}</span>
        </div>
      </div>
      <div class="gallery-hover">
        <div class="gh-name">${g.name}</div>
        <div class="gh-type">${g.type}</div>
      </div>
    </div>
  `).join('');
  reinitReveal();
}

document.addEventListener('click', e => {
  if (e.target.closest('.filter-btn')) {
    const btn = e.target.closest('.filter-btn');
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  }
});

// ── RENDER TRENDING ────────────────────────────────────────────────
function renderTrending() {
  const rail = document.getElementById('trendingRail');
  if (!rail) return;
  rail.innerHTML = DATA.trending.map(t => `
    <div class="trend-card">
      <div class="trend-thumb">${t.icon}</div>
      <div class="trend-info">
        ${t.badge ? `<div class="trend-badge">${t.badge}</div>` : ''}
        <div class="trend-name">${t.name}</div>
        <div class="trend-pop">${t.pop}</div>
      </div>
    </div>
  `).join('');
}

// ── RENDER TRANSFORMATIONS ─────────────────────────────────────────
function renderTransformations() {
  const grid = document.getElementById('transformGrid');
  if (!grid) return;
  const transforms = [
    { before: '😐', after: '😎', title: 'High Skin Fade', type: 'Haircut Transformation' },
    { before: '🙍', after: '🧔', title: 'Full Beard Sculpt', type: 'Beard Transformation' },
    { before: '😑', after: '🤵', title: 'Prime Combo', type: 'Complete Makeover' },
    { before: '😕', after: '💁', title: 'Hair Color + Cut', type: 'Color Transformation' },
  ];
  grid.innerHTML = transforms.map((t, i) => `
    <div class="transform-card reveal reveal-d${(i%2)+1}">
      <div class="tc-images">
        <div class="tc-side">
          <span class="tc-emoji">${t.before}</span>
          <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--light-grey)">Before</span>
          <div class="tc-badge before">Before</div>
        </div>
        <div class="tc-side">
          <span class="tc-emoji">${t.after}</span>
          <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--light-grey)">After</span>
          <div class="tc-badge after">After</div>
        </div>
      </div>
      <div class="tc-info">
        <div class="tc-title">${t.title}</div>
        <div class="tc-type">${t.type}</div>
      </div>
    </div>
  `).join('');
  reinitReveal();
}

// ── RENDER REVIEWS ─────────────────────────────────────────────────
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  grid.innerHTML = DATA.reviews.map((r, i) => `
    <div class="review-card reveal reveal-d${(i%3)+1}">
      <div class="rc-stars">${'★'.repeat(r.stars)}</div>
      <div class="rc-text">"${r.text}"</div>
      <div class="rc-reviewer">
        <div class="rc-avatar">${r.avatar}</div>
        <div>
          <div class="rc-name">${r.name}</div>
          <div class="rc-source">${r.source}</div>
        </div>
      </div>
    </div>
  `).join('');
  reinitReveal();
}

// ── PHOTO UPLOAD & AI ──────────────────────────────────────────────
function initDragDrop() {
  const zone = document.getElementById('uploadDrop');
  if (!zone) return;
  ['dragenter','dragover'].forEach(e => zone.addEventListener(e, ev => { ev.preventDefault(); zone.classList.add('dragging'); }));
  ['dragleave','dragend'].forEach(e => zone.addEventListener(e, () => zone.classList.remove('dragging')));
  zone.addEventListener('drop', ev => {
    ev.preventDefault(); zone.classList.remove('dragging');
    const file = ev.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  });
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('uploadPreviewImg').src = e.target.result;
    document.getElementById('uploadPreview').style.display = 'block';
    document.getElementById('uploadDrop').style.display = 'none';
    document.getElementById('uploadStatus').className = 'upload-status ok';
    document.getElementById('uploadStatus').innerHTML = '✅ Photo ready — click Analyze to start';
    document.getElementById('analyzeBtn').style.display = 'inline-flex';
  };
  reader.readAsDataURL(file);
  // Also save file ref for upload
  window._uploadFile = file;
}

document.addEventListener('change', e => {
  if (e.target.id === 'photoFileInput' && e.target.files[0]) handleFile(e.target.files[0]);
});

function removePhoto() {
  STATE.ai = { photoId: null, photoUrl: null, faceShape: '', analysis: null, selectedHair: '', selectedBeard: '' };
  document.getElementById('uploadPreview').style.display = 'none';
  document.getElementById('uploadDrop').style.display = 'block';
  document.getElementById('uploadStatus').innerHTML = '';
  document.getElementById('uploadStatus').className = 'upload-status';
  document.getElementById('analyzeBtn').style.display = 'none';
  document.getElementById('aiAnalysisOverlay').classList.remove('show');
  document.getElementById('aiResults').classList.remove('show');
  document.getElementById('hairPreviewPanel').classList.remove('show');
  document.getElementById('beardPreviewPanel').classList.remove('show');
  window._uploadFile = null;
}

async function analyzePhoto() {
  if (!window._uploadFile) return;

  const overlay = document.getElementById('aiAnalysisOverlay');
  const fill = document.getElementById('analysisFill');
  const msgEl = document.getElementById('analysisMsg');
  const results = document.getElementById('aiResults');

  document.getElementById('uploadCard').querySelector('.upload-card').style.pointerEvents = 'none';
  overlay.classList.add('show');
  results.classList.remove('show');

  const msgs = ['Detecting face landmarks...','Measuring proportions...','Analyzing hair density...','Matching style database...','Generating recommendations...'];
  let pct = 0, mi = 0;
  const ticker = setInterval(() => {
    pct = Math.min(pct + 18, 95);
    fill.style.width = pct + '%';
    if (mi < msgs.length) msgEl.textContent = msgs[mi++];
  }, 500);

  try {
    const formData = new FormData();
    formData.append('photo', window._uploadFile);

    const resp = await fetch('/api/upload-photo', { method: 'POST', body: formData });
    const data = await resp.json();

    clearInterval(ticker);
    fill.style.width = '100%';

    if (data.success) {
      STATE.ai.photoId = data.photoId;
      STATE.ai.photoUrl = data.photoUrl;
      STATE.ai.analysis = data.analysis;
      STATE.ai.faceShape = data.analysis.faceShape;

      setTimeout(() => {
        overlay.classList.remove('show');
        document.getElementById('uploadCard').querySelector('.upload-card').style.pointerEvents = '';
        renderAIResults(data.analysis);
        results.classList.add('show');
        results.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 600);
    } else {
      throw new Error(data.error || 'Analysis failed');
    }
  } catch(err) {
    clearInterval(ticker);
    overlay.classList.remove('show');
    document.getElementById('uploadCard').querySelector('.upload-card').style.pointerEvents = '';
    showToast('Analysis failed. Please try again.', 'error');
    console.error(err);
  }
}

function renderAIResults(analysis) {
  // Face badge
  document.getElementById('faceShapeBadge').textContent = `${analysis.faceShape?.toUpperCase()} FACE`;
  document.getElementById('jawScore').textContent = analysis.jawlineStrength?.toFixed(1) || '—';
  document.getElementById('hairDensity').textContent = analysis.hairDensity || '—';
  document.getElementById('hairTexture').textContent = analysis.hairTexture || '—';
  document.getElementById('stylePersonality').textContent = analysis.overallStylePersonality || '—';

  // Hairstyles
  const hairGrid = document.getElementById('hairStylesGrid');
  hairGrid.innerHTML = (analysis.topHairstyles || DATA.hairstyles.map(h => ({ name: h.name, score: 85, reason: h.desc, maintenance: 'medium' }))).slice(0, 6).map(h => `
    <div class="style-card" onclick="selectHairStyle(this, '${h.name.replace(/'/g,"\\'")}')">
      <div class="sc-icon">${DATA.hairstyles.find(d => d.name.toLowerCase().includes(h.name.toLowerCase().split(' ')[0]))?.icon || '✂️'}</div>
      <div class="sc-name">${h.name}</div>
      <div class="sc-score">
        <div class="sc-bar"><div class="sc-fill" style="width:${h.score}%"></div></div>
        <span class="sc-pct">${h.score}%</span>
      </div>
      <div class="sc-reason">${h.reason}</div>
    </div>
  `).join('');

  // Beard styles
  const beardGrid = document.getElementById('beardStylesGrid');
  beardGrid.innerHTML = (analysis.topBeardStyles || DATA.beardStyles.map(b => ({ name: b.name, score: 82, reason: b.desc, maintenance: 'medium' }))).slice(0, 6).map(b => `
    <div class="style-card" onclick="selectBeardStyle(this, '${b.name.replace(/'/g,"\\'")}')">
      <div class="sc-icon">${DATA.beardStyles.find(d => d.name.toLowerCase().includes(b.name.toLowerCase().split(' ')[0]))?.icon || '🧔'}</div>
      <div class="sc-name">${b.name}</div>
      <div class="sc-score">
        <div class="sc-bar"><div class="sc-fill" style="width:${b.score}%"></div></div>
        <span class="sc-pct">${b.score}%</span>
      </div>
      <div class="sc-reason">${b.reason}</div>
    </div>
  `).join('');

  // Styling tips
  const tips = analysis.stylingTips || [];
  document.getElementById('stylingTips').innerHTML = tips.map(t => `<div class="pp-tip">• ${t}</div>`).join('') || '<div class="pp-tip">Consult our barber for personalized styling advice.</div>';
}

// ── STYLE SELECTION WITH AI PREVIEW ───────────────────────────────
function selectHairStyle(el, name) {
  document.querySelectorAll('#hairStylesGrid .style-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  STATE.ai.selectedHair = name;
  STATE.booking.hairstyle = name;

  clearTimeout(STATE.previewDebounce.hair);
  STATE.previewDebounce.hair = setTimeout(() => generateStylePreview('hair', name), 350);
}

function selectBeardStyle(el, name) {
  document.querySelectorAll('#beardStylesGrid .style-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  STATE.ai.selectedBeard = name;
  STATE.booking.beardStyle = name;

  clearTimeout(STATE.previewDebounce.beard);
  STATE.previewDebounce.beard = setTimeout(() => generateStylePreview('beard', name), 350);
}

async function generateStylePreview(type, styleName) {
  const panelId = type === 'hair' ? 'hairPreviewPanel' : 'beardPreviewPanel';
  const panel = document.getElementById(panelId);
  const body = document.getElementById(panelId + 'Body');

  panel.classList.add('show');
  body.innerHTML = `<div class="pp-loading"><div class="pp-spinner"></div><div class="pp-loading-text">AI generating your personalized preview...</div></div>`;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  try {
    const resp = await fetch('/api/style-preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        styleName,
        styleType: type,
        faceShape: STATE.ai.faceShape || 'oval',
        photoId: STATE.ai.photoId
      })
    });

    const info = await resp.json();
    const score = info.compatibilityScore || 88;
    const photoUrl = STATE.ai.photoUrl;

    body.innerHTML = `
      <div class="pp-content">
        <div class="pp-photo">
          ${photoUrl ? `<img src="${photoUrl}" alt="Your photo" onerror="this.style.display='none'">` : '<div style="width:120px;height:160px;background:var(--dark3);display:flex;align-items:center;justify-content:center;font-size:40px;">' + (type==='hair'?'✂️':'🧔') + '</div>'}
          <div class="pp-photo-label">Your Photo</div>
        </div>
        <div class="pp-info">
          <div class="pp-style-name">${info.title || styleName}</div>
          <div class="pp-tagline">"${info.tagline || 'Your signature look'}"</div>
          <div class="pp-score-row">
            <div class="pp-score-label">${type === 'hair' ? 'Fit Score' : 'Jawline Score'}</div>
            <div class="pp-score-bar"><div class="pp-score-fill" style="width:${score}%"></div></div>
            <div class="pp-score-num">${score}%</div>
          </div>
          <div class="pp-desc">${info.personalizedDesc || info.description || ''}</div>
          <div class="pp-tags">${(info.tags || []).map(t => `<span class="pp-tag">${t}</span>`).join('')}</div>
          <div class="pp-tips">
            <div class="pp-tip"><strong>Visual Description</strong>${info.visualDesc || ''}</div>
            <div class="pp-tip"><strong>Maintenance Tip</strong>${info.maintenanceTip || ''}</div>
            <div class="pp-tip"><strong>Best Product</strong>${info.bestProduct || ''}</div>
            ${info.bookingNote ? `<div class="pp-tip"><strong>Tell Your Barber</strong>${info.bookingNote}</div>` : ''}
          </div>
        </div>
      </div>
      <div style="padding:0 24px 20px;display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn btn-gold btn-sm" onclick="document.getElementById('booking').scrollIntoView({behavior:'smooth'})">📅 Book This Style</button>
        <button class="btn btn-outline btn-sm" onclick="document.getElementById('${panelId}').classList.remove('show')">✕ Close Preview</button>
      </div>
    `;
  } catch(err) {
    body.innerHTML = `<div class="pp-loading"><div style="font-size:32px;margin-bottom:12px;">${type==='hair'?'✂️':'🧔'}</div><div class="pp-loading-text" style="color:var(--light-grey)">Preview generated. Ask your barber about <strong style="color:var(--gold)">${styleName}</strong>.</div></div>`;
  }
}

// ── BOOKING SYSTEM ─────────────────────────────────────────────────
function renderBookingStylePickers() {
  // Hairstyle picker
  const hp = document.getElementById('bookHairPicker');
  if (hp) hp.innerHTML = DATA.hairstyles.map(h => `
    <div class="spm-item" onclick="selectBookingStyle(this,'hair','${h.name}')">
      <div class="spm-icon">${h.icon}</div>
      <div class="spm-name">${h.name}</div>
    </div>
  `).join('');

  // Beard picker
  const bp = document.getElementById('bookBeardPicker');
  if (bp) bp.innerHTML = DATA.beardStyles.map(b => `
    <div class="spm-item" onclick="selectBookingStyle(this,'beard','${b.name}')">
      <div class="spm-icon">${b.icon}</div>
      <div class="spm-name">${b.name}</div>
    </div>
  `).join('');
}

function selectBookingStyle(el, type, name) {
  const container = el.closest('.style-picker-mini');
  container.querySelectorAll('.spm-item').forEach(i => i.classList.remove('sel'));
  el.classList.add('sel');
  if (type === 'hair') STATE.booking.hairstyle = name;
  else STATE.booking.beardStyle = name;
  updateBookingSummary();
}

function selectService(el, id, name, price) {
  document.querySelectorAll('.sp-item').forEach(i => i.classList.remove('sel'));
  el.classList.add('sel');
  STATE.booking.service = name;
  STATE.booking.servicePrice = price;
  updateBookingSummary();
}

function nextBookingStep(to) {
  if (to === 2 && !STATE.booking.service) { showToast('Please select a service first', 'error'); return; }
  if (to === 5 && (!STATE.booking.date || !STATE.booking.time)) { showToast('Please select date and time', 'error'); return; }

  // If AI picked a style, pre-select it in booking
  if (to === 3 && STATE.ai.selectedHair) {
    const items = document.querySelectorAll('#bookHairPicker .spm-item');
    items.forEach(item => {
      if (item.querySelector('.spm-name')?.textContent === STATE.ai.selectedHair) {
        selectBookingStyle(item, 'hair', STATE.ai.selectedHair);
      }
    });
  }
  if (to === 4 && STATE.ai.selectedBeard) {
    const items = document.querySelectorAll('#bookBeardPicker .spm-item');
    items.forEach(item => {
      if (item.querySelector('.spm-name')?.textContent === STATE.ai.selectedBeard) {
        selectBookingStyle(item, 'beard', STATE.ai.selectedBeard);
      }
    });
  }

  document.querySelectorAll('.booking-step').forEach(s => s.classList.remove('active'));
  document.getElementById('bstp' + to).classList.add('active');
  STATE.bookingStep = to;

  // Update progress
  for (let i = 1; i <= 5; i++) {
    document.getElementById('bp' + i).classList.toggle('active', i <= to);
  }
  updateBookingSummary();
}

function setMinDate() {
  const el = document.getElementById('bookDate');
  if (el) el.min = new Date().toISOString().split('T')[0];
}

async function loadTimeSlots() {
  const date = document.getElementById('bookDate').value;
  if (!date) return;
  STATE.booking.date = date;
  updateBookingSummary();

  const slotsDiv = document.getElementById('timeSlots');
  slotsDiv.innerHTML = '<div style="padding:16px;font-size:12px;color:var(--light-grey);">Loading slots...</div>';
  document.getElementById('timeSlotsGroup').style.display = 'block';

  try {
    const resp = await fetch(`/api/slots?date=${date}`);
    const data = await resp.json();
    slotsDiv.innerHTML = data.slots.map(s => `
      <div class="ts-slot ${s.available ? '' : 'taken'}" onclick="${s.available ? `selectTimeSlot(this,'${s.time}')` : ''}">
        ${s.time}${!s.available ? ' <span style="font-size:9px">✕</span>' : ''}
      </div>
    `).join('');
  } catch(e) {
    // Fallback static slots
    const slots = ['9:00 AM','9:45 AM','10:30 AM','11:15 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM'];
    slotsDiv.innerHTML = slots.map(s => `<div class="ts-slot" onclick="selectTimeSlot(this,'${s}')">${s}</div>`).join('');
  }
}

function selectTimeSlot(el, time) {
  document.querySelectorAll('.ts-slot').forEach(s => s.classList.remove('sel'));
  el.classList.add('sel');
  STATE.booking.time = time;
  updateBookingSummary();
}

function updateBookingSummary() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || '—'; };
  set('bsService', STATE.booking.service);
  set('bsHair', STATE.booking.hairstyle);
  set('bsBeard', STATE.booking.beardStyle);
  set('bsDate', STATE.booking.date);
  set('bsTime', STATE.booking.time);
  set('bsPrice', STATE.booking.servicePrice);
}

async function confirmBooking() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const notes = document.getElementById('custNotes').value.trim();

  if (!name || !phone) { showToast('Please fill in your name and phone', 'error'); return; }
  if (!STATE.booking.service) { showToast('Please select a service', 'error'); return; }
  if (!STATE.booking.date || !STATE.booking.time) { showToast('Please select date and time', 'error'); return; }

  STATE.booking.name = name;
  STATE.booking.phone = phone;
  STATE.booking.notes = notes;

  const submitBtn = document.getElementById('submitBookingBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Confirming...';

  try {
    const resp = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, phone, notes,
        service: STATE.booking.service,
        hairstyle: STATE.booking.hairstyle,
        beardStyle: STATE.booking.beardStyle,
        date: STATE.booking.date,
        time: STATE.booking.time,
        photoId: STATE.ai.photoId
      })
    });

    const data = await resp.json();

    if (data.success) {
      // Fill confirmation modal
      const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || '—'; };
      set('confName', name);
      set('confPhone', phone);
      set('confService', STATE.booking.service);
      set('confHair', STATE.booking.hairstyle);
      set('confBeard', STATE.booking.beardStyle);
      set('confDate', STATE.booking.date);
      set('confTime', STATE.booking.time);
      set('confId', data.booking.id.slice(0,8).toUpperCase());

      const waLink = document.getElementById('confWaLink');
      if (waLink && data.whatsappUrl) waLink.href = data.whatsappUrl;

      openModal('bookingConfirmModal');
    } else {
      throw new Error(data.error);
    }
  } catch(err) {
    showToast('Booking failed. Please try WhatsApp instead.', 'error');
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Confirm Booking ✓';
  }
}

// ── OFFER TIMER ────────────────────────────────────────────────────
function initOfferTimer() {
  let secs = 2 * 3600 + 47 * 60 + 33;
  const tick = () => {
    if (secs <= 0) { secs = 4 * 3600; return; }
    secs--;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const fmt = n => String(n).padStart(2,'0');
    const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = fmt(val); };
    el('tH', h); el('tM', m); el('tS', s);
  };
  setInterval(tick, 1000);
}

// ── SCROLL REVEAL ──────────────────────────────────────────────────
function initScrollReveal() {
  reinitReveal();
}

function reinitReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

// ── MODAL ──────────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeModal(id) { document.getElementById(id).classList.remove('open'); document.body.style.overflow = ''; }

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) closeModal(e.target.id);
});

// ── TOAST ──────────────────────────────────────────────────────────
function showToast(msg, type = '') {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.className = `toast ${type} show`;
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ── WHATSAPP QUICK BOOK ────────────────────────────────────────────
function quickWhatsApp() {
  const wa = '919876543210';
  const msg = encodeURIComponent('Hello Prime Look! 👋\nI\'d like to book an appointment.\n\nPlease confirm availability.');
  window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
}
