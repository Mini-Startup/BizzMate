export const projects = [
  {
    slug: "nexus-agentic-ops",
    title: "Nexus Core — Enterprise AI Workflow Automation",
    client: "Nexus Logistics Group",
    category: "AI Automations",
    serviceId: "ai-automations",
    tagline: "Replacing 45 hours of manual invoice verification with autonomous multi-agent pipelines.",
    summary: "A production multi-agent system that ingests global shipping manifests, cross-references customs ledgers, and flags discrepancy alerts in real time.",
    featured: true,
    thumbnail: "/Full Logo Horizontal.png",
    statBadge: "88% Processing Speedup",
    year: "2025",
    tags: ["Python", "FastAPI", "LangChain", "Qdrant", "PostgreSQL"],
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
        id: "stage-1",
        year: "2025",
        month: "January",
        title: "Architecture & Schema Defense",
        content: "Audited 1,200 sample freight manifests and formulated schema constraints with zero-tolerance mathematical validation rules."
      },
      {
        id: "stage-2",
        year: "2025",
        month: "February",
        title: "Agentic Ingestion Pipeline",
        content: "Implemented parallelized OCR workers and deployed localized embedding retrieval with Qdrant vector store."
      },
      {
        id: "stage-3",
        year: "2025",
        month: "March",
        title: "ERP Integration & Live Staging",
        content: "Connected the automated pipelines directly to SAP webhooks with automated fallback to human review queues."
      },
      {
        id: "stage-4",
        year: "2025",
        month: "April",
        title: "Enterprise Global Rollout",
        content: "Scaled out workers across European and Asian shipping lanes with continuous latency monitoring under 400ms."
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
    title: "Aura Dental — Autonomous WhatsApp Booking & Care Engine",
    client: "Aura Healthcare Network",
    category: "WhatsApp Automations",
    serviceId: "whatsapp-automations",
    tagline: "Automating 2,400 monthly patient bookings with real-time calendar and EHR synchronization.",
    summary: "Official WhatsApp Cloud API conversational assistant that books appointments, issues automated prep instructions, and collects post-op feedback.",
    featured: true,
    thumbnail: "/Full Logo Horizontal.png",
    statBadge: "3.2x Booking Conversion",
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
        id: "stage-1",
        year: "2025",
        month: "May",
        title: "Meta Cloud API Verification",
        content: "Secured Tier-2 WhatsApp Business verification, configured webhooks, and drafted approved medical notification templates."
      },
      {
        id: "stage-2",
        year: "2025",
        month: "June",
        title: "Atomic Booking Engine",
        content: "Developed the Redis reservation lock to prevent race conditions during simultaneous booking attempts."
      },
      {
        id: "stage-3",
        year: "2025",
        month: "July",
        title: "Clinic Pilot & Staff Handoff",
        content: "Piloted at flagship clinic with real-time desk notification dashboards and seamless manual operator intervention."
      },
      {
        id: "stage-4",
        year: "2025",
        month: "August",
        title: "Network-Wide Expansion",
        content: "Extended to all 8 regional clinics with automated post-treatment care flows and Google review collection prompts."
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
    thumbnail: "/Full Logo Horizontal.png",
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
        id: "stage-1",
        year: "2024",
        month: "September",
        title: "High-Frequency Data Architecture",
        content: "Built WebSocket pub/sub microservices with Protobuf serialization for maximum throughput."
      },
      {
        id: "stage-2",
        year: "2024",
        month: "October",
        title: "Canvas & Grid Virtualization",
        content: "Constructed custom charting components that maintain 60 FPS even under heavy load."
      },
      {
        id: "stage-3",
        year: "2024",
        month: "November",
        title: "RBAC & Security Audits",
        content: "Implemented strict role hierarchies, hardware token 2FA, and granular workspace permissions."
      },
      {
        id: "stage-4",
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
    thumbnail: "/Full Logo Horizontal.png",
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
        id: "stage-1",
        year: "2025",
        month: "January",
        title: "Narrative & Interactive Prototyping",
        content: "Mapped the visitor journey from curiosity to commitment with interactive Framer motion prototypes."
      },
      {
        id: "stage-2",
        year: "2025",
        month: "January",
        title: "Custom 3D & GSAP Integration",
        content: "Crafted interactive canvas components with responsive fallback shaders for low-power mobile devices."
      },
      {
        id: "stage-3",
        year: "2025",
        month: "February",
        title: "Stress Testing & Global Edge Caching",
        content: "Simulated 50,000 concurrent page loads via k6 to guarantee zero latency degradation on launch day."
      },
      {
        id: "stage-4",
        year: "2025",
        month: "February",
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
    thumbnail: "/Full Logo Horizontal.png",
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
        id: "stage-1",
        year: "2024",
        month: "July",
        title: "Documentation Vectorization",
        content: "Parsed Sphinx and Markdown docs into semantic chunks with metadata tagging by product release version."
      },
      {
        id: "stage-2",
        year: "2024",
        month: "August",
        title: "Hybrid Search & Guardrails",
        content: "Created a cross-encoder reranking layer to guarantee that only strictly relevant snippets enter the LLM context window."
      },
      {
        id: "stage-3",
        year: "2024",
        month: "September",
        title: "Slack & Widget Deployment",
        content: "Launched real-time bot inside customer Slack Connect channels with instant human escalation commands."
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
    thumbnail: "/Full Logo Horizontal.png",
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
        id: "stage-1",
        year: "2024",
        month: "October",
        title: "Design System & Typography",
        content: "Established architectural grid proportions, generous whitespace rules, and refined typographic contrast."
      },
      {
        id: "stage-2",
        year: "2024",
        month: "November",
        title: "Sanity CMS & Media Engine",
        content: "Engineered automated cloud optimization that delivers optimized resolutions tailored to every device viewport."
      },
      {
        id: "stage-3",
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
