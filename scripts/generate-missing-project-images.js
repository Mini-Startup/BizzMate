const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outputDir = path.resolve('public/projects');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Synapse Support RAG image (AI Chatbot Knowledge Base Dashboard)
const synapseSvg = `
<svg width="1200" height="750" viewBox="0 0 1200 750" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="synapseGlow" cx="20%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#090d16" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a84bff"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2dd4bf"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="750" fill="#090d16"/>
  <rect width="1200" height="750" fill="url(#synapseGlow)"/>

  <!-- Top App Navigation Bar -->
  <g transform="translate(60, 40)">
    <rect width="1080" height="60" rx="16" fill="#111827" stroke="#1f2937" stroke-width="1.5"/>
    <circle cx="36" cy="30" r="12" fill="url(#purpleGrad)"/>
    <text x="60" y="36" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="800">Synapse Support AI</text>
    <text x="240" y="36" fill="#6b7280" font-family="system-ui, sans-serif" font-size="13" font-weight="500">/ Multi-Source Knowledge Base • Slack Connect</text>
    
    <rect x="880" y="16" width="160" height="28" rx="14" fill="#1e1b4b" stroke="#6366f1" stroke-width="1"/>
    <circle cx="900" cy="30" r="4" fill="#a84bff"/>
    <text x="914" y="34" fill="#c7d2fe" font-family="monospace" font-size="11" font-weight="700">84% Deflected</text>
  </g>

  <!-- Left: Chatbot Interface Dialog -->
  <g transform="translate(60, 124)">
    <rect width="640" height="560" rx="20" fill="#111827" stroke="#1f2937" stroke-width="1.5"/>
    <text x="32" y="44" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1">LIVE CUSTOMER INQUIRY</text>
    <text x="32" y="74" fill="#ffffff" font-family="system-ui, sans-serif" font-size="20" font-weight="800">Automated SDK Authentication Flow</text>

    <!-- User message card -->
    <rect x="32" y="104" width="576" height="74" rx="14" fill="#1f2937"/>
    <text x="52" y="132" fill="#93c5fd" font-family="monospace" font-size="12" font-weight="700">Developer (Client Slack #dev-support):</text>
    <text x="52" y="156" fill="#f3f4f6" font-family="system-ui, sans-serif" font-size="14">How do I rotate OAuth refresh tokens without invalidating active sessions?</text>

    <!-- AI Bot Response card -->
    <rect x="32" y="196" width="576" height="320" rx="14" fill="#182234" stroke="#2563eb" stroke-width="1.2"/>
    <circle cx="56" cy="226" r="10" fill="url(#purpleGrad)"/>
    <text x="76" y="230" fill="#a84bff" font-family="system-ui, sans-serif" font-size="13" font-weight="800">Synapse Autonomous Bot</text>
    <text x="440" y="230" fill="#10b981" font-family="monospace" font-size="11" font-weight="700">• Verified in Docs v3.4</text>

    <!-- Code Block -->
    <rect x="52" y="252" width="536" height="180" rx="10" fill="#0b1120"/>
    <text x="72" y="280" fill="#e2e8f0" font-family="monospace" font-size="13"><tspan fill="#ec4899">const</tspan> { token } = <tspan fill="#ec4899">await</tspan> client.auth.<tspan fill="#38bdf8">rotateRefreshToken</tspan>({</text>
    <text x="92" y="306" fill="#e2e8f0" font-family="monospace" font-size="13">gracePeriodMs: <tspan fill="#f59e0b">30000</tspan>,</text>
    <text x="92" y="332" fill="#e2e8f0" font-family="monospace" font-size="13">preserveActiveSession: <tspan fill="#10b981">true</tspan></text>
    <text x="72" y="358" fill="#e2e8f0" font-family="monospace" font-size="13">});</text>
    <text x="72" y="394" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12">Source: docs.synapse.dev/security/oauth#graceful-rotation [Citation #1]</text>

    <!-- Citation pill -->
    <rect x="52" y="450" width="220" height="36" rx="18" fill="#1e293b"/>
    <text x="72" y="473" fill="#60a5fa" font-family="system-ui, sans-serif" font-size="12" font-weight="600">• 4,200 Pages Hybrid Index</text>
  </g>

  <!-- Right: Vector Stats Card -->
  <g transform="translate(720, 124)">
    <rect width="420" height="260" rx="20" fill="#111827" stroke="#1f2937" stroke-width="1.5"/>
    <text x="28" y="44" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1">PINECONE VECTOR TELEMETRY</text>
    
    <text x="28" y="90" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="36" font-weight="900">1.8s</text>
    <text x="28" y="114" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12">Mean Resolution Latency</text>

    <text x="220" y="90" fill="#34d399" font-family="system-ui, sans-serif" font-size="36" font-weight="900">99.4%</text>
    <text x="220" y="114" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12">Citation Accuracy</text>

    <rect x="28" y="150" width="364" height="76" rx="12" fill="#182234" stroke="#1e3a8a" stroke-width="1"/>
    <text x="44" y="180" fill="#bfdbfe" font-family="system-ui, sans-serif" font-size="13" font-weight="700">BM25 + Dense Re-ranker</text>
    <text x="44" y="204" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12">Zero hallucinated code snippets</text>
  </g>

  <!-- Right Lower: Satisfaction Pill -->
  <g transform="translate(720, 404)">
    <rect width="420" height="280" rx="20" fill="#111827" stroke="#1f2937" stroke-width="1.5"/>
    <text x="28" y="44" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1">DEVELOPER SATISFACTION</text>
    <text x="28" y="96" fill="#ffffff" font-family="system-ui, sans-serif" font-size="44" font-weight="900">4.9 <tspan fill="#f59e0b" font-size="28">/ 5.0</tspan></text>
    <text x="28" y="126" fill="#9ca3af" font-family="system-ui, sans-serif" font-size="13">Based on 1,480+ in-Slack ratings</text>

    <text x="48" y="196" fill="#c7d2fe" font-family="system-ui, sans-serif" font-size="14" font-weight="700">"Answers technical questions instantly."</text>
    <text x="48" y="222" fill="#a84bff" font-family="system-ui, sans-serif" font-size="12">- Head of Developer Relations, Synapse</text>
  </g>
</svg>
`;

// 2. Vanguard Digital Flagship (Architectural Studio Website)
const vanguardSvg = `
<svg width="1200" height="750" viewBox="0 0 1200 750" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="vanguardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="750" fill="url(#vanguardBg)"/>

  <!-- Top Editorial Nav -->
  <g transform="translate(60, 44)">
    <text x="0" y="30" fill="#ffffff" font-family="system-ui, sans-serif" font-size="22" font-weight="800" letter-spacing="4">VANGUARD</text>
    <text x="180" y="30" fill="#64748b" font-family="system-ui, sans-serif" font-size="13" font-weight="500">PARTNERS • ARCHITECTURAL PRACTICE</text>
    <text x="960" y="30" fill="#94a3b8" font-family="monospace" font-size="12">ZURICH / LONDON / TOKYO</text>
  </g>

  <!-- Editorial Hero Graphic -->
  <g transform="translate(60, 110)">
    <!-- Architectural grid mockup -->
    <rect width="700" height="570" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    
    <!-- Floorplan & Modern Villa isometric outline -->
    <path d="M60 480 L350 200 L640 480 Z" fill="#0f172a" stroke="#475569" stroke-width="2"/>
    <path d="M160 480 L350 290 L540 480 Z" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
    <rect x="250" y="360" width="200" height="120" fill="#020617" stroke="#94a3b8" stroke-width="1"/>
    
    <!-- Big Headline over image -->
    <text x="50" y="90" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="38" font-weight="900" letter-spacing="-1">KANDALAMA RESIDENCE</text>
    <text x="50" y="124" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="16" font-weight="500">Monolithic Concrete • Lake Biwa, Japan • 2024</text>
    
    <!-- Award badge -->
    <rect x="50" y="150" width="180" height="32" rx="16" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1"/>
    <text x="70" y="171" fill="#fcd34d" font-family="system-ui, sans-serif" font-size="12" font-weight="700">• Awwwards Site of the Day</text>
  </g>

  <!-- Right: Architecture Performance Metrics -->
  <g transform="translate(780, 110)">
    <rect width="360" height="270" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="32" y="44" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1">LIGHTHOUSE BENCHMARKS</text>

    <text x="32" y="98" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="44" font-weight="900">98/100</text>
    <text x="32" y="126" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">Performance Score across 4K imagery</text>

    <text x="32" y="180" fill="#34d399" font-family="system-ui, sans-serif" font-size="44" font-weight="900">60 FPS</text>
    <text x="32" y="208" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">WebGL Page Transitions &amp; GSAP Scroll</text>
  </g>

  <!-- Right Lower: Inquiry Jump -->
  <g transform="translate(780, 410)">
    <rect width="360" height="270" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="32" y="44" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1">BUSINESS VALUE DELIVERED</text>

    <text x="32" y="110" fill="#a84bff" font-family="system-ui, sans-serif" font-size="52" font-weight="900">+115%</text>
    <text x="32" y="144" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Jump in Global Client Inquiries</text>
    <text x="32" y="172" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13">4m 12s average session time on portfolio</text>
  </g>
</svg>
`;

async function run() {
  await sharp(Buffer.from(synapseSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, 'synapse-rag-support.jpg'));
  console.log('Generated synapse-rag-support.jpg');

  await sharp(Buffer.from(vanguardSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, 'vanguard-digital-flagship.jpg'));
  console.log('Generated vanguard-digital-flagship.jpg');
}

run().catch(console.error);
