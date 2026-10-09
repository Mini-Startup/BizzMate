const sharp = require('sharp');
const path = require('path');

const svg = `
<svg width="1200" height="900" viewBox="0 0 1200 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow1" cx="30%" cy="20%" r="65%">
      <stop offset="0%" stop-color="#3b0764" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#0a0f1d" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="bgGlow2" cx="80%" cy="85%" r="55%">
      <stop offset="0%" stop-color="#1e1b4b" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#0a0f1d" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a84bff"/>
      <stop offset="50%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#161f33" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0f1626" stop-opacity="0.98"/>
    </linearGradient>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="900" fill="#0a0f1d"/>
  <rect width="1200" height="900" fill="url(#bgGlow1)"/>
  <rect width="1200" height="900" fill="url(#bgGlow2)"/>

  <!-- Top App Navigation Bar -->
  <g transform="translate(60, 48)">
    <rect width="1080" height="64" rx="16" fill="#131b2e" stroke="#1e293b" stroke-width="1.5"/>
    <circle cx="32" cy="32" r="10" fill="url(#brandGrad)"/>
    <text x="54" y="38" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" letter-spacing="-0.5">Hyperion AI</text>
    <text x="180" y="38" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500">/ Developer Platform / Model API</text>

    <!-- Status badge -->
    <rect x="850" y="18" width="104" height="28" rx="14" fill="#064e3b" stroke="#059669" stroke-width="1"/>
    <circle cx="866" cy="32" r="4" fill="#34d399"/>
    <text x="878" y="36" fill="#34d399" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700">Edge Online</text>

    <!-- Latency badge -->
    <rect x="966" y="18" width="90" height="28" rx="14" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1"/>
    <text x="982" y="36" fill="#c7d2fe" font-family="monospace" font-size="12" font-weight="700">12ms TTFT</text>
  </g>

  <!-- Main Grid Stage -->
  <!-- Left Panel: Neural Mesh Pipeline -->
  <g transform="translate(60, 132)">
    <rect width="660" height="460" rx="20" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>
    
    <text x="32" y="44" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1">DISTRIBUTED MODEL RUNTIME</text>
    <text x="32" y="74" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="800">Multi-Node Speculative Decoding</text>

    <!-- Connections -->
    <path d="M120 220 C220 160, 280 160, 360 220 S520 280, 520 220" stroke="#a84bff" stroke-width="3.5" fill="none" filter="url(#neonGlow)" opacity="0.8"/>
    <path d="M120 220 C220 280, 280 280, 360 220 S520 160, 520 220" stroke="#38bdf8" stroke-width="3.5" fill="none" filter="url(#neonGlow)" opacity="0.8"/>

    <!-- Node 1 -->
    <g transform="translate(60, 185)">
      <rect width="110" height="74" rx="14" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5"/>
      <text x="18" y="32" fill="#c7d2fe" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700">Worker 01</text>
      <text x="18" y="54" fill="#38bdf8" font-family="monospace" font-size="13" font-weight="800">Edge Ingest</text>
    </g>

    <!-- Node 2 (Center) -->
    <g transform="translate(305, 180)">
      <rect width="130" height="84" rx="16" fill="#311042" stroke="#c084fc" stroke-width="2.5"/>
      <text x="18" y="34" fill="#f3e8ff" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700">Core Runtime</text>
      <text x="18" y="58" fill="#a84bff" font-family="monospace" font-size="14" font-weight="800">Llama-3 70B</text>
    </g>

    <!-- Node 3 -->
    <g transform="translate(485, 185)">
      <rect width="110" height="74" rx="14" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
      <text x="18" y="32" fill="#a7f3d0" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700">Streamer</text>
      <text x="18" y="54" fill="#34d399" font-family="monospace" font-size="13" font-weight="800">SSE Chunk</text>
    </g>

    <!-- Stream stats below nodes -->
    <g transform="translate(32, 320)">
      <rect width="596" height="106" rx="14" fill="#0b101d" stroke="#1e293b" stroke-width="1"/>
      <text x="24" y="38" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600">Token Throughput</text>
      <text x="24" y="76" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="800">142.6 <tspan fill="#a84bff" font-size="16">tok/s</tspan></text>

      <line x1="220" y1="20" x2="220" y2="86" stroke="#1e293b" stroke-width="1"/>
      <text x="244" y="38" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600">TTFT Latency</text>
      <text x="244" y="76" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="800">84 <tspan fill="#94a3b8" font-size="16">ms</tspan></text>

      <line x1="410" y1="20" x2="410" y2="86" stroke="#1e293b" stroke-width="1"/>
      <text x="434" y="38" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600">Cache Hit Rate</text>
      <text x="434" y="76" fill="#34d399" font-family="system-ui, -apple-system, sans-serif" font-size="30" font-weight="800">99.4<tspan fill="#94a3b8" font-size="16">%</tspan></text>
    </g>
  </g>

  <!-- Right Panel: SDK & Terminal Snippet -->
  <g transform="translate(740, 132)">
    <rect width="400" height="460" rx="20" fill="#0d1424" stroke="#1e293b" stroke-width="1.5"/>
    
    <!-- Code Editor Header -->
    <circle cx="28" cy="28" r="6" fill="#ef4444"/>
    <circle cx="48" cy="28" r="6" fill="#f59e0b"/>
    <circle cx="68" cy="28" r="6" fill="#10b981"/>
    <text x="96" y="32" fill="#64748b" font-family="monospace" font-size="12">client.stream.ts</text>

    <!-- Code Block -->
    <g transform="translate(24, 60)" font-family="monospace" font-size="13">
      <text y="24" fill="#818cf8">import <tspan fill="#f8fafc">{ Hyperion }</tspan> from <tspan fill="#38bdf8">"@hyperion/sdk"</tspan>;</text>
      <text y="58" fill="#64748b">// Initialize edge stream client</text>
      <text y="92" fill="#a84bff">const <tspan fill="#f8fafc">client</tspan> = new Hyperion({</text>
      <text y="126" fill="#94a3b8">  apiKey: process.env.KEY,</text>
      <text y="160" fill="#94a3b8">  region: <tspan fill="#38bdf8">"iad-east-1"</tspan>,</text>
      <text y="194" fill="#a84bff">});</text>
      <text y="238" fill="#64748b">// Low-latency model completion</text>
      <text y="272" fill="#818cf8">const <tspan fill="#f8fafc">stream</tspan> = await client.complete({</text>
      <text y="306" fill="#94a3b8">  model: <tspan fill="#38bdf8">"hyperion-70b-v2"</tspan>,</text>
      <text y="340" fill="#94a3b8">  stream: <tspan fill="#34d399">true</tspan>,</text>
      <text y="374" fill="#818cf8">});</text>
    </g>
  </g>

  <!-- Bottom Metric Strip -->
  <g transform="translate(60, 614)">
    <rect width="1080" height="236" rx="20" fill="url(#cardGrad)" stroke="#1e293b" stroke-width="1.5"/>

    <text x="32" y="44" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1">PRODUCTION SCALE &amp; TRAFFIC METRICS</text>

    <!-- 4 Metric Cards -->
    <g transform="translate(32, 68)">
      <!-- Metric 1 -->
      <g transform="translate(0, 0)">
        <rect width="232" height="130" rx="14" fill="#0c1220" stroke="#1e293b" stroke-width="1"/>
        <text x="22" y="36" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="13">Waitlist Signups</text>
        <text x="22" y="82" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900">38,400+</text>
        <text x="22" y="110" fill="#a84bff" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700">In First 72 Hours</text>
      </g>
      <!-- Metric 2 -->
      <g transform="translate(254, 0)">
        <rect width="232" height="130" rx="14" fill="#0c1220" stroke="#1e293b" stroke-width="1"/>
        <text x="22" y="36" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="13">Conversion Rate</text>
        <text x="22" y="82" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900">24.6%</text>
        <text x="22" y="110" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600">Visitor to Waitlist</text>
      </g>
      <!-- Metric 3 -->
      <g transform="translate(508, 0)">
        <rect width="232" height="130" rx="14" fill="#0c1220" stroke="#1e293b" stroke-width="1"/>
        <text x="22" y="36" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="13">API Invocations</text>
        <text x="22" y="82" fill="#c084fc" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900">8.2M+</text>
        <text x="22" y="110" fill="#a84bff" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600">Launch Week Volume</text>
      </g>
      <!-- Metric 4 -->
      <g transform="translate(762, 0)">
        <rect width="254" height="130" rx="14" fill="#0c1220" stroke="#1e293b" stroke-width="1"/>
        <text x="22" y="36" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="13">Edge Uptime SLA</text>
        <text x="22" y="82" fill="#34d399" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900">99.99%</text>
        <text x="22" y="110" fill="#059669" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700">Zero Downtime</text>
      </g>
    </g>
  </g>
</svg>
`;

const outputPath = path.resolve('public/projects/hyperion-launch-platform.jpg');

sharp(Buffer.from(svg))
  .jpeg({ quality: 95 })
  .toFile(outputPath)
  .then(() => console.log('Successfully generated ' + outputPath))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
