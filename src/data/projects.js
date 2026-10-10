export const projects = [
  {
    slug: "nexus-agentic-ops",
    title: "Nexus Core — Enterprise AI Workflow Automation Suite",
    client: "Nexus Logistics Group",
    category: "AI Workflows",
    serviceId: "ai-workflows",
    tagline: "Autonomous dispatch, invoice parsing, and discrepancy resolution reducing 40+ manual operator hours weekly.",
    summary: "An end-to-end multi-agent orchestration architecture parsing 14,000+ unstructured customs and freight documents weekly with zero hallucination guarantee.",
    featured: true,
    thumbnail: "/projects/nexus-agentic-ops.jpg",
    statBadge: "88% Processing Speedup",
    year: "2025",
    tags: ["Next.js 15", "FastAPI", "Python", "LangGraph", "Docker", "PostgreSQL"],
    overview: "Nexus Logistics was losing dozens of hours every week manually reconciling cross-border shipping documents. BizzMate architected a fault-tolerant multi-agent intelligence pipeline with continuous audit trails and instant slack notifications.",
    challenge: "Handling unstructured PDFs, varying international freight formats, and multi-currency exchange reconciliations without introducing hallucinated numbers or false flags.",
    solution: "We deployed a dual-LLM consensus architecture: Agent A extracts schema-enforced tabular data while Agent B verifies arithmetic invariants against bank webhooks before committing entries to the ERP.",
    metrics: [
      { label: "Reduction in Review Time", value: "88%" },
      { label: "Documents Handled / Day", value: "14,500+" },
      { label: "Discrepancy Accuracy", value: "99.7%" }
    ],
    timeline: [
      {
        id: "2025-january",
        year: "2025",
        month: "January",
        title: "Architecture & Schema Defense",
        content: "Audited 1,200 sample freight manifests and formulated schema constraints with zero-tolerance mathematical validation rules."
      },
      {
        id: "2025-february",
        year: "2025",
        month: "February",
        title: "Prototype Sprint & Operator Validation",
        content: "Validated document OCR parsing and automated anomaly detection with front-line logistics dispatchers."
      },
      {
        id: "2025-march",
        year: "2025",
        month: "March",
        title: "Agentic Ingestion Pipeline",
        content: "Implemented parallelized OCR workers and deployed localized embedding retrieval with Qdrant vector store."
      },
      {
        id: "2025-april",
        year: "2025",
        month: "April",
        title: "Consensus Layer & Security Audit",
        content: "Deployed dual-model invariant verification cross-checking foreign tax rates and bank webhooks."
      },
      {
        id: "2025-may",
        year: "2025",
        month: "May",
        title: "ERP Integration & Live Staging",
        content: "Connected automated pipelines directly to SAP webhooks with automated fallback to human review queues."
      },
      {
        id: "2025-june",
        year: "2025",
        month: "June",
        title: "Production Stress Testing",
        content: "Simulated 100k document loads across distributed worker queues ensuring latency remained strictly under 400ms."
      },
      {
        id: "2025-july",
        year: "2025",
        month: "July",
        title: "Enterprise Global Rollout",
        content: "Scaled out workers across European and Asian shipping lanes with continuous zero-downtime monitoring."
      }
    ],
    testimonial: {
      quote: "BizzMate completely removed our back-office backlog in less than 90 days. The founders personally oversaw the architecture and delivered flawlessly.",
      author: "Marcus Vance",
      role: "VP of Operations, Nexus Logistics"
    }
  },
  {
    slug: "omni-whatsapp-concierge",
    title: "Aura Health — Automated Patient Concierge & Booking Engine",
    client: "Aura Healthcare Network",
    category: "WhatsApp Automations",
    serviceId: "whatsapp-automations",
    tagline: "HIPAA-conscious appointment scheduler processing 2,400+ bookings monthly with zero operator intervention.",
    summary: "Custom WhatsApp Cloud API solution integrated with Google Calendar and clinic practice software, reducing patient no-shows by 42%.",
    featured: true,
    thumbnail: "/projects/omni-whatsapp-concierge.jpg",
    statBadge: "42% No-Show Reduction",
    year: "2025",
    tags: ["WhatsApp Cloud API", "Node.js", "Redis", "Supabase", "Calendar API"],
    overview: "Aura Dental clinics suffered from high phone abandonment rates during peak hours. BizzMate built a verified WhatsApp Cloud API integration with instant slot booking, reschedule handling, and localized language support.",
    challenge: "Ensuring zero double-bookings across 18 practitioners while complying with strict healthcare data confidentiality and instant response constraints.",
    solution: "We engineered an atomic slot-locking system using Redis mutexes combined with a guided conversational UI using WhatsApp interactive button cards.",
    metrics: [
      { label: "Automated Bookings / Mo", value: "2,400+" },
      { label: "Patient No-Show Rate Drop", value: "42%" },
      { label: "Average Response Time", value: "< 2.4s" }
    ],
    timeline: [
      {
        id: "2025-may",
        year: "2025",
        month: "May",
        title: "Meta Cloud API Verification",
        content: "Secured Tier-2 WhatsApp Business verification, configured webhooks, and drafted approved medical notification templates."
      },
      {
        id: "2025-june",
        year: "2025",
        month: "June",
        title: "Atomic Booking Engine",
        content: "Developed the Redis reservation lock to prevent race conditions during simultaneous booking attempts."
      },
      {
        id: "2025-july",
        year: "2025",
        month: "July",
        title: "Clinic Pilot & Staff Handoff",
        content: "Piloted at flagship clinic with real-time desk notification dashboards and seamless manual operator intervention."
      },
      {
        id: "2025-august",
        year: "2025",
        month: "August",
        title: "Automated Follow-Up Workflows",
        content: "Introduced automated post-treatment care routines and automated Google review collection prompts."
      },
      {
        id: "2025-september",
        year: "2025",
        month: "September",
        title: "Multi-Language Localization",
        content: "Rolled out multilingual dialogue flows across Spanish, German, and French patient bases."
      },
      {
        id: "2025-october",
        year: "2025",
        month: "October",
        title: "EHR Sync Integration",
        content: "Integrated bi-directional patient records syncing directly with internal clinic practice software."
      },
      {
        id: "2025-november",
        year: "2025",
        month: "November",
        title: "Network-Wide Expansion",
        content: "Extended to all 18 regional clinics with unified multi-location staff scheduling and routing."
      }
    ],
    testimonial: {
      quote: "Our front-desk team no longer spends their afternoons chasing phone calls. Patients love the instant WhatsApp confirmations.",
      author: "Dr. Elena Rostova",
      role: "Managing Director, Aura Healthcare"
    }
  },
  {
    slug: "strata-cloud-platform",
    title: "Strata Intelligence — Real-Time Financial Analytics Suite",
    client: "Strata Capital",
    category: "Web Applications",
    serviceId: "web-applications",
    tagline: "Next-gen web application for quantitative equity insights with sub-50ms data streaming.",
    summary: "A high-performance SaaS dashboard featuring real-time WebSockets, custom charts, collaborative workspaces, and automated daily briefs.",
    featured: true,
    thumbnail: "/projects/strata-cloud-platform.jpg",
    statBadge: "Sub-50ms Chart Stream",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "TimescaleDB"],
    overview: "Strata Capital required a blazing-fast internal equity analytics dashboard capable of rendering tens of thousands of tick-level price events without UI degradation or memory leaks.",
    challenge: "Handling continuous high-frequency price feeds, dynamic risk matrices, and multi-tenant authorization without browser stuttering.",
    solution: "We engineered a virtualized data-grid with canvas-accelerated rendering and optimistic UI state management, backed by distributed edge nodes.",
    metrics: [
      { label: "Data Stream Latency", value: "< 50ms" },
      { label: "Concurrent Analysts", value: "3,200+" },
      { label: "Core Web Vitals Score", value: "100/100" }
    ],
    timeline: [
      {
        id: "2024-june",
        year: "2024",
        month: "June",
        title: "High-Frequency Data Architecture",
        content: "Built WebSocket pub/sub microservices with Protobuf serialization for maximum throughput."
      },
      {
        id: "2024-july",
        year: "2024",
        month: "July",
        title: "Canvas & Grid Virtualization",
        content: "Constructed custom charting components that maintain 60 FPS even under heavy market fluctuations."
      },
      {
        id: "2024-august",
        year: "2024",
        month: "August",
        title: "Real-Time Risk Calculation",
        content: "Engineered web-worker portfolio risk engines calculating value-at-risk without blocking UI threads."
      },
      {
        id: "2024-september",
        year: "2024",
        month: "September",
        title: "RBAC & Hardware Token 2FA",
        content: "Implemented strict role hierarchies, hardware token 2FA, and granular workspace permissions."
      },
      {
        id: "2024-october",
        year: "2024",
        month: "October",
        title: "Collaborative Note Sync",
        content: "Added real-time CRDT multi-user annotation directly on candlestick chart intervals."
      },
      {
        id: "2024-november",
        year: "2024",
        month: "November",
        title: "Low-Latency Edge Deployment",
        content: "Deployed distributed edge clusters nearest to London, New York, and Tokyo exchanges."
      },
      {
        id: "2024-december",
        year: "2024",
        month: "December",
        title: "Institutional Production Launch",
        content: "Transitioned all fund managers onto the new portal with zero operational disruption."
      }
    ],
    testimonial: {
      quote: "The speed of Strata is night and day compared to our previous Bloomberg integrations. BizzMate built a true masterpiece.",
      author: "Julian Chen",
      role: "Head of Quantitative Strategies, Strata"
    }
  },
  {
    slug: "hyperion-launch-platform",
    title: "Hyperion AI — High-Converting Product Launch Experience",
    client: "Hyperion Labs",
    category: "Landing Pages",
    serviceId: "landing-pages",
    tagline: "A cinematic interactive landing page generating 38,000 waitlist signups in 72 hours.",
    summary: "Engineered for an AI developer platform launch, featuring 3D interactive hardware simulations, custom scroll triggers, and instant signup flows.",
    featured: true,
    thumbnail: "/projects/hyperion-launch-platform.jpg",
    statBadge: "38K Signups in 72h",
    year: "2025",
    tags: ["Next.js", "Framer Motion", "GSAP", "Tailwind CSS", "Vercel Edge"],
    overview: "Hyperion Labs was preparing to unveil their flagship model API and needed a world-class landing page that would immediately captivate developers and technical investors alike.",
    challenge: "Delivering cinematic visual storytelling and 3D device renders while preserving flawless mobile performance and fast worldwide CDN caching.",
    solution: "We combined vector path animations, progressive lazy hydration, and GPU-accelerated GSAP transforms into a frictionless experience.",
    metrics: [
      { label: "Waitlist Conversion Rate", value: "24.6%" },
      { label: "Viral Launch Signups", value: "38,000+" },
      { label: "First Contentful Paint", value: "0.4s" }
    ],
    timeline: [
      {
        id: "2025-january",
        year: "2025",
        month: "January",
        title: "Narrative & Interactive Prototyping",
        content: "Mapped the visitor journey from curiosity to commitment with interactive Framer motion prototypes."
      },
      {
        id: "2025-february",
        year: "2025",
        month: "February",
        title: "Custom 3D & GSAP Integration",
        content: "Crafted interactive canvas components with responsive fallback shaders for low-power mobile devices."
      },
      {
        id: "2025-march",
        year: "2025",
        month: "March",
        title: "Interactive Terminal Simulation",
        content: "Engineered an in-browser live playground allowing visitors to run model queries in real time."
      },
      {
        id: "2025-april",
        year: "2025",
        month: "April",
        title: "Stress Testing & Global Edge Caching",
        content: "Simulated 50,000 concurrent page loads via k6 to guarantee zero latency degradation on launch day."
      },
      {
        id: "2025-may",
        year: "2025",
        month: "May",
        title: "Viral Referral Mechanism",
        content: "Built unique waitlist leaderboard links multiplying organic sharing across social feeds."
      },
      {
        id: "2025-june",
        year: "2025",
        month: "June",
        title: "International CDN Tuning",
        content: "Pre-rendered static assets across 300+ edge locations achieving 99.8% cache hit ratios."
      },
      {
        id: "2025-july",
        year: "2025",
        month: "July",
        title: "Global Product Hunt & X Launch",
        content: "Achieved #1 Product of the Day with flawless uptime and international press coverage."
      }
    ],
    testimonial: {
      quote: "The landing page was our greatest conversion asset. People kept sharing screenshots of the animations on Twitter. Outstanding execution.",
      author: "Sarah Lindqvist",
      role: "Co-Founder & CMO, Hyperion Labs"
    }
  },
  {
    slug: "synapse-rag-support",
    title: "Synapse Support — Multi-Source Knowledge Base Chatbot",
    client: "Synapse DevOps",
    category: "AI Chatbots",
    serviceId: "ai-chatbots",
    tagline: "Custom RAG bot resolving complex developer inquiries directly inside Slack and web portals.",
    summary: "Context-aware AI support agent trained on 4,000+ technical documentation pages, GitHub issues, and product specifications.",
    featured: false,
    thumbnail: "/projects/synapse-rag-support.jpg",
    statBadge: "84% Deflection Rate",
    year: "2024",
    tags: ["LangChain", "OpenAI", "Pinecone", "Next.js", "Slack Bolt API"],
    overview: "Synapse DevOps engineers were spending 30% of their working hours answering repetitive integration questions from developer customers.",
    challenge: "Eliminating code hallucinations and outdated version replies by indexing versioned SDK changelogs in real time.",
    solution: "We deployed semantic hybrid search (BM25 + Dense Vectors) with strict citation requirements so every AI response links directly to verified source documentation.",
    metrics: [
      { label: "Support Ticket Deflection", value: "84%" },
      { label: "Resolution Satisfaction", value: "4.9 / 5" },
      { label: "Mean Time to Answer", value: "1.8s" }
    ],
    timeline: [
      {
        id: "2024-june",
        year: "2024",
        month: "June",
        title: "Documentation Vectorization",
        content: "Parsed Sphinx and Markdown docs into semantic chunks with metadata tagging by product release version."
      },
      {
        id: "2024-july",
        year: "2024",
        month: "July",
        title: "Hybrid Search & Guardrails",
        content: "Created a cross-encoder reranking layer to guarantee that only strictly relevant snippets enter the LLM context window."
      },
      {
        id: "2024-august",
        year: "2024",
        month: "August",
        title: "Anti-Hallucination Testing",
        content: "Benchmarked 500 edge cases with automated verification against official SDK method signatures."
      },
      {
        id: "2024-september",
        year: "2024",
        month: "September",
        title: "Slack Connect Integration",
        content: "Integrated the bot directly into customer shared Slack Connect channels with instant human dispatch."
      },
      {
        id: "2024-october",
        year: "2024",
        month: "October",
        title: "Web Embed Widget",
        content: "Built a lightweight, unbranded iframe widget for customer documentation pages with instant code snippet copying."
      },
      {
        id: "2024-november",
        year: "2024",
        month: "November",
        title: "Real-Time Feedback Tuning",
        content: "Implemented positive/negative rating loops that dynamically fine-tune vector embeddings."
      },
      {
        id: "2024-december",
        year: "2024",
        month: "December",
        title: "Full Production Deflection",
        content: "Achieved 84% automated resolution rate across 12,000 developer questions in month one."
      }
    ],
    testimonial: {
      quote: "Our engineering leads got their time back. Synapse answers technical questions with exact code examples and pinpoint links.",
      author: "David K.",
      role: "Head of Developer Relations, Synapse"
    }
  },
  {
    slug: "vanguard-digital-flagship",
    title: "Vanguard Partners — Architectural Digital Flagship",
    client: "Vanguard Architecture Group",
    category: "Websites",
    serviceId: "websites",
    tagline: "An editorial portfolio website blending architectural minimalism with dynamic project exploration.",
    summary: "Built for an international architecture studio, featuring smooth WebGL transitions, high-resolution imagery optimization, and interactive floorplan walkthroughs.",
    featured: false,
    thumbnail: "/projects/vanguard-digital-flagship.jpg",
    statBadge: "60 FPS Transitions",
    year: "2024",
    tags: ["Next.js", "GSAP", "Tailwind CSS", "Sanity CMS"],
    overview: "Vanguard wanted to position themselves as the world's most progressive contemporary architectural practice with an immersive digital presence.",
    challenge: "Handling hundreds of 4K architectural photographs without slowing down mobile performance or causing layout shifts.",
    solution: "We developed an adaptive responsive image pipeline with next-gen AVIF conversion, blur-up placeholders, and GSAP smooth scrolling.",
    metrics: [
      { label: "Average Session Time", value: "4m 12s" },
      { label: "Client Inquiry Jump", value: "+115%" },
      { label: "Lighthouse Performance", value: "98/100" }
    ],
    timeline: [
      {
        id: "2024-june",
        year: "2024",
        month: "June",
        title: "Design System & Typography",
        content: "Established architectural grid proportions, generous whitespace rules, and refined typographic contrast."
      },
      {
        id: "2024-july",
        year: "2024",
        month: "July",
        title: "High-Res AVIF Image Pipeline",
        content: "Engineered automated cloud optimization that delivers optimized resolutions tailored to every device viewport."
      },
      {
        id: "2024-august",
        year: "2024",
        month: "August",
        title: "Interactive Floorplan Viewer",
        content: "Constructed SVG interactive architectural overlays showing room dimensions and materials."
      },
      {
        id: "2024-september",
        year: "2024",
        month: "September",
        title: "GSAP Kinetic Page Transitions",
        content: "Tuned fluid route changes ensuring 60 FPS across both desktop and handheld viewports."
      },
      {
        id: "2024-october",
        year: "2024",
        month: "October",
        title: "Headless CMS Editorial Studio",
        content: "Created custom Sanity Studio workflows allowing architects to publish project monographs in minutes."
      },
      {
        id: "2024-november",
        year: "2024",
        month: "November",
        title: "Global CDN Edge Tuning",
        content: "Optimized multi-region image delivery with Cloudflare Workers caching 4K portfolios worldwide."
      },
      {
        id: "2024-december",
        year: "2024",
        month: "December",
        title: "Launch & International Awards",
        content: "Shipped the site to widespread acclaim, winning Awwwards Site of the Day honours."
      }
    ],
    testimonial: {
      quote: "BizzMate delivered a digital presence that matches the precision of our physical buildings. The craft is exceptional.",
      author: "Klaus Meier",
      role: "Design Principal, Vanguard"
    }
  }
];
