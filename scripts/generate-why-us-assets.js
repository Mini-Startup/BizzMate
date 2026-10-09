const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDir = path.resolve('public/why-us');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateAssets() {
  // 1. Crop hero-founder.jpg for Card B (Convenient App portrait)
  const heroFounderPath = path.resolve('public/hero-founder.jpg');
  if (fs.existsSync(heroFounderPath)) {
    const metadata = await sharp(heroFounderPath).metadata();
    // Crop around top-center to focus on founder smiling with beanie, shirt and phone in hand
    await sharp(heroFounderPath)
      .extract({
        left: Math.round(metadata.width * 0.25),
        top: Math.round(metadata.height * 0.02),
        width: Math.round(metadata.width * 0.52),
        height: Math.round(metadata.height * 0.96),
      })
      .resize(640, 800, { fit: 'cover' })
      .jpeg({ quality: 95 })
      .toFile(path.join(outputDir, 'convenient-app.jpg'));
    console.log('Generated convenient-app.jpg');

    // Also extract founder avatar face
    await sharp(heroFounderPath)
      .extract({
        left: Math.round(metadata.width * 0.38),
        top: Math.round(metadata.height * 0.04),
        width: Math.round(metadata.width * 0.24),
        height: Math.round(metadata.width * 0.24),
      })
      .resize(120, 120)
      .jpeg({ quality: 95 })
      .toFile(path.join(outputDir, 'avatar-founder.jpg'));
    console.log('Generated avatar-founder.jpg');

    // Avatars 2, 3, 4 (clean minimal specialist portraits in SVG/JPEG)
    const avatars = [
      { name: 'avatar-specialist-1.jpg', bg: '#ede9fe', hair: '#1e293b', shirt: '#a84bff' },
      { name: 'avatar-specialist-2.jpg', bg: '#e0f2fe', hair: '#334155', shirt: '#266ac1' },
      { name: 'avatar-specialist-3.jpg', bg: '#f1f5f9', hair: '#0f172a', shirt: '#57c0e5' },
    ];
    for (const av of avatars) {
      const avSvg = `
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" fill="${av.bg}"/>
        <circle cx="60" cy="46" r="22" fill="${av.hair}"/>
        <circle cx="60" cy="48" r="18" fill="#fed7aa"/>
        <path d="M42 42 C42 30, 78 30, 78 42 Z" fill="${av.hair}"/>
        <path d="M26 112 C26 86, 94 86, 94 112 Z" fill="${av.shirt}"/>
      </svg>
      `;
      await sharp(Buffer.from(avSvg)).jpeg({ quality: 95 }).toFile(path.join(outputDir, av.name));
    }
  }

  // 2. Brand Wave (16:9) for Card C (100% Code & IP Ownership)
  const brandWaveSvg = `
  <svg width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fdf4ff"/>
        <stop offset="40%" stop-color="#ede9fe"/>
        <stop offset="70%" stop-color="#e0f2fe"/>
        <stop offset="100%" stop-color="#f0fdfa"/>
      </linearGradient>
      <linearGradient id="wave1" x1="0%" y1="30%" x2="100%" y2="70%">
        <stop offset="0%" stop-color="#c084fc" stop-opacity="0.9"/>
        <stop offset="45%" stop-color="#a84bff" stop-opacity="0.95"/>
        <stop offset="75%" stop-color="#6366f1" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="wave2" x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stop-color="#818cf8" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="#266ac1" stop-opacity="0.75"/>
        <stop offset="100%" stop-color="#57c0e5" stop-opacity="0.85"/>
      </linearGradient>
      <linearGradient id="wave3" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="#f472b6" stop-opacity="0.5"/>
        <stop offset="50%" stop-color="#c084fc" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#60a5fa" stop-opacity="0.65"/>
      </linearGradient>
      <filter id="softBlur" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="12" result="blur"/>
      </filter>
    </defs>
    <rect width="1200" height="675" fill="url(#bgGrad)"/>
    
    <!-- Flowing Satin Ribbons -->
    <path d="M-100 450 C200 650, 400 150, 800 350 S1100 500, 1300 200 L1300 750 L-100 750 Z" fill="url(#wave2)" opacity="0.65"/>
    <path d="M-50 200 C300 100, 500 550, 850 280 S1150 150, 1300 400 L1300 700 L-50 700 Z" fill="url(#wave1)" filter="url(#softBlur)" opacity="0.75"/>
    <path d="M-80 320 C250 500, 550 180, 900 420 S1180 300, 1280 480" stroke="url(#wave1)" stroke-width="65" stroke-linecap="round" fill="none" opacity="0.85"/>
    <path d="M0 240 C350 420, 650 100, 1000 340 S1200 200, 1300 380" stroke="url(#wave3)" stroke-width="45" stroke-linecap="round" fill="none" opacity="0.7"/>
    <path d="M-50 400 C280 200, 620 500, 950 220 S1200 450, 1300 300" stroke="#ffffff" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.45" filter="url(#softBlur)"/>
  </svg>
  `;

  await sharp(Buffer.from(brandWaveSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, 'brand-wave.jpg'));
  console.log('Generated brand-wave.jpg');

  // 3. Ice Wave (1:1) for Card D (99.9% Production Uptime SLA)
  const iceWaveSvg = `
  <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iceBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f0fdfa"/>
        <stop offset="50%" stop-color="#e0f2fe"/>
        <stop offset="100%" stop-color="#f8fafc"/>
      </linearGradient>
      <linearGradient id="iceWave1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="#2dd4bf" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#0284c7" stop-opacity="0.7"/>
      </linearGradient>
      <linearGradient id="iceWave2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#57c0e5" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#a7f3d0" stop-opacity="0.6"/>
      </linearGradient>
      <filter id="iceBlur" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="10" result="blur"/>
      </filter>
    </defs>
    <rect width="800" height="800" fill="url(#iceBg)"/>
    <path d="M-50 550 C150 700, 350 300, 550 500 S750 350, 850 600 L850 850 L-50 850 Z" fill="url(#iceWave2)" opacity="0.6"/>
    <path d="M-100 300 C200 450, 450 150, 700 400 S850 250, 900 500" stroke="url(#iceWave1)" stroke-width="70" stroke-linecap="round" fill="none" filter="url(#iceBlur)" opacity="0.75"/>
    <path d="M-50 420 C250 550, 500 280, 750 480" stroke="#ffffff" stroke-width="16" stroke-linecap="round" fill="none" opacity="0.55"/>
    <path d="M50 220 C300 120, 550 400, 850 240" stroke="url(#iceWave2)" stroke-width="35" stroke-linecap="round" fill="none" opacity="0.5"/>
  </svg>
  `;

  await sharp(Buffer.from(iceWaveSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, 'ice-wave.jpg'));
  console.log('Generated ice-wave.jpg');

  // 4. Lavender Wave (3:4) for Card E (Comprehensive Consultation)
  const lavenderWaveSvg = `
  <svg width="800" height="1067" viewBox="0 0 800 1067" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lavenderBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#faf5ff"/>
        <stop offset="40%" stop-color="#f3e8ff"/>
        <stop offset="70%" stop-color="#ede9fe"/>
        <stop offset="100%" stop-color="#e0e7ff"/>
      </linearGradient>
      <linearGradient id="lavenderWave1" x1="0%" y1="20%" x2="100%" y2="80%">
        <stop offset="0%" stop-color="#d8b4fe" stop-opacity="0.85"/>
        <stop offset="40%" stop-color="#c084fc" stop-opacity="0.9"/>
        <stop offset="70%" stop-color="#a84bff" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#818cf8" stop-opacity="0.75"/>
      </linearGradient>
      <linearGradient id="lavenderWave2" x1="100%" y1="10%" x2="0%" y2="90%">
        <stop offset="0%" stop-color="#f472b6" stop-opacity="0.6"/>
        <stop offset="60%" stop-color="#c084fc" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#6366f1" stop-opacity="0.6"/>
      </linearGradient>
      <filter id="lavenderBlur" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="14" result="blur"/>
      </filter>
    </defs>
    <rect width="800" height="1067" fill="url(#lavenderBg)"/>
    <path d="M-80 700 C200 950, 450 450, 750 750 S900 600, 950 900 L950 1150 L-80 1150 Z" fill="url(#lavenderWave2)" opacity="0.55"/>
    <path d="M-100 450 C200 680, 500 250, 750 600 S850 400, 900 700" stroke="url(#lavenderWave1)" stroke-width="85" stroke-linecap="round" fill="none" filter="url(#lavenderBlur)" opacity="0.8"/>
    <path d="M-50 320 C250 520, 550 180, 850 450" stroke="url(#lavenderWave2)" stroke-width="50" stroke-linecap="round" fill="none" opacity="0.65"/>
    <path d="M-20 520 C280 720, 580 380, 820 620" stroke="#ffffff" stroke-width="20" stroke-linecap="round" fill="none" opacity="0.5" filter="url(#lavenderBlur)"/>
  </svg>
  `;

  await sharp(Buffer.from(lavenderWaveSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, 'lavender-wave.jpg'));
  console.log('Generated lavender-wave.jpg');
}

generateAssets().catch(err => {
  console.error(err);
  process.exit(1);
});
