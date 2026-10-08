# BizzMate Brand Style Guide

> **Document type:** Agent-facing design instruction manual
> **Product:** BizzMate — Rental Platform
> **Theme:** Light mode only (no dark mode)
> **Stack:** Next.js 16 + Tailwind CSS v4 + Motion (Framer Motion) + GSAP
> **Last updated:** October 2026

---

## 1. Brand Identity

### 1.1 Brand Essence

BizzMate is a **rental platform** that connects people who own things with people who need them. The brand communicates **trust, modern professionalism, and effortless simplicity**. The interlocking trefoil knot in the logo symbolises connection, partnership, and seamless exchange between two parties.

### 1.2 Logo System

| Variant | File | Usage |
|---------|------|-------|
| Full Logo Horizontal | `Full Logo Horizontal.png` | Primary. Navigation bars, headers, marketing materials |
| Full Logo Vertical | `Full Logo Vertical.png` | Hero sections, splash screens, email headers |
| Logo Mark Only | `Only Logo.png` | Favicons (scaled), app icons, social avatars, loading states |
| Wordmark Only | `Only Text.png` | Inline text references, footer, constrained horizontal spaces |

**Logo clear space:** Minimum padding around the logo mark equals the height of the lowercase "i" in "BizzMate" on all sides.

**Logo minimum size:** The logo mark must never render smaller than 28px in height on screen. The full horizontal logo must never render smaller than 120px in width.

**Logo don'ts:**
- Never rotate, skew, or distort the logo
- Never apply drop shadows or additional effects to the logo
- Never place the logo on a busy background without a subtle backdrop panel
- Never separate the wordmark gradient from the brand gradient
- Never recreate the logo in a single flat colour unless producing a monochrome print asset

---

## 2. Colour Palette

### 2.1 Brand Gradient (Primary)

The BizzMate gradient is the single most recognisable element of the brand. It flows in a **linear direction from left to right (or top-left to bottom-right at 135deg)**, transitioning through three stops:

```
Gradient: linear-gradient(135deg, #a84bff, #266ac1, #57c0e5)
```

| Stop | Hex | RGB | HSL (approx) | Role |
|------|-----|-----|--------------|------|
| 1 — Violet | `#a84bff` | `168, 75, 255` | `271° 100% 65%` | Energy, creativity, premium feel |
| 2 — Royal Blue | `#266ac1` | `38, 106, 193` | `214° 67% 45%` | Trust, stability, professionalism |
| 3 — Sky Blue | `#57c0e5` | `87, 192, 229` | `196° 72% 62%` | Freshness, approachability, openness |

**Gradient usage rules:**
- The gradient is used on **primary CTA buttons, hero accents, brand highlights, and active/selected states**
- Never use the gradient as a full-page background. It is an accent, not a canvas
- Never reverse the gradient order; it always flows violet → blue → sky
- On text, the gradient is applied only to **display headings (H1, H2 max)** via `background-clip: text`. Never on body copy
- The gradient may be used at **10-15% opacity** as a subtle section background tint on light surfaces

### 2.2 Primary Colours (Individual Use)

When the full gradient is inappropriate (small icons, single-state indicators, monochrome contexts), use one of the three brand primaries:

| Name | Hex | Usage |
|------|-----|-------|
| BizzMate Violet | `#a84bff` | Primary interactive accent. Links, active tabs, selected states, focus rings |
| BizzMate Blue | `#266ac1` | Secondary interactive. Informational badges, progress indicators, chart accents |
| BizzMate Sky | `#57c0e5` | Tertiary. Tags, highlights, light accents, illustration fills |

**Primary colour rule:** When only one brand colour is needed, default to **BizzMate Violet `#a84bff`**. It anchors the left side of the gradient and carries the strongest brand recognition.

### 2.3 Secondary Colours

Supporting colours that complement the primary palette without competing with it:

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Deep Indigo | `#1e1b4b` | `30, 27, 75` | Dark text on brand-gradient backgrounds, overlay panels |
| Slate Navy | `#0f172a` | `15, 23, 42` | Primary heading text colour (on white backgrounds) |
| Twilight | `#6366f1` | `99, 102, 241` | Hover state for violet elements, secondary links |
| Soft Lavender | `#ede9fe` | `237, 233, 254` | Light violet tint. Tags, pill backgrounds, selected card backgrounds |
| Ice Blue | `#e0f2fe` | `224, 242, 254` | Light sky tint. Info banners, notification backgrounds |

### 2.4 Neutral Palette

The neutral system is built on a **cool-slate foundation** that harmonises with the blue-violet brand gradient. Never use warm grays (stone, zinc-warm, amber-tinted neutrals).

| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-950` | `#020617` | Deepest text. Use sparingly for maximum emphasis |
| `neutral-900` | `#0f172a` | **Default heading text colour** |
| `neutral-800` | `#1e293b` | Subheadings, strong body text |
| `neutral-700` | `#334155` | **Default body text colour** |
| `neutral-600` | `#475569` | Secondary body text, captions, metadata |
| `neutral-500` | `#64748b` | Placeholder text, disabled labels |
| `neutral-400` | `#94a3b8` | Borders (active), icon fills (secondary) |
| `neutral-300` | `#cbd5e1` | Borders (default), dividers, separator lines |
| `neutral-200` | `#e2e8f0` | Card borders, table borders, subtle separators |
| `neutral-100` | `#f1f5f9` | Card backgrounds, input backgrounds, section alternation |
| `neutral-50` | `#f8fafc` | Page section alternation (off-white), hover backgrounds |

**Page background:** `#ffffff` (pure white). Alternate sections may use `neutral-50` (`#f8fafc`) for visual rhythm.

### 2.5 Semantic Colours

| State | Hex | Background tint | Usage |
|-------|-----|------------------|-------|
| Success | `#059669` | `#ecfdf5` | Booking confirmed, availability, verification |
| Warning | `#d97706` | `#fffbeb` | Pending actions, expiring listings, moderate alerts |
| Error | `#dc2626` | `#fef2f2` | Failed actions, validation errors, overdue returns |
| Info | `#266ac1` | `#e0f2fe` | Informational tips, help tooltips (uses brand blue) |

**Semantic rule:** Colour is never the **only** indicator of state. Always pair with an icon and/or text label.

### 2.6 Colour Accessibility

| Pairing | Contrast Ratio | WCAG Level |
|---------|----------------|------------|
| `neutral-900` on `#ffffff` | 17.4:1 | AAA |
| `neutral-700` on `#ffffff` | 8.6:1 | AAA |
| `neutral-600` on `#ffffff` | 5.7:1 | AA |
| `#a84bff` on `#ffffff` | 4.6:1 | AA (large text) |
| `#ffffff` on `#a84bff` | 4.6:1 | AA (large text) |
| `#ffffff` on `#266ac1` | 5.4:1 | AA |
| `neutral-900` on `neutral-100` | 14.7:1 | AAA |

**Minimum standards:** All text must meet **WCAG 2.1 AA** (4.5:1 for body text, 3:1 for large text 18px+). Brand violet `#a84bff` may be used for **large text and interactive elements only** on white backgrounds. For small body text on white, use `neutral-700` or darker.

---

## 3. Typography

### 3.1 Font Stack

| Role | Font Family | Weight(s) | Fallback | Source |
|------|-------------|-----------|----------|--------|
| **Display / Brand Font** | **Outfit** | 600 (SemiBold), 700 (Bold), 800 (ExtraBold) | `system-ui, -apple-system, sans-serif` | Google Fonts, self-hosted via `next/font` |
| **Body / UI Font** | **Outfit** | 300 (Light), 400 (Regular), 500 (Medium) | `system-ui, -apple-system, sans-serif` | Google Fonts, self-hosted via `next/font` |
| **Monospace** | **JetBrains Mono** | 400 (Regular), 500 (Medium) | `ui-monospace, 'Courier New', monospace` | Google Fonts, self-hosted via `next/font` |

**Why Outfit:** Outfit is a geometric sans-serif with friendly, rounded terminals that feel approachable yet professional. It carries personality without being decorative. It works across the full weight spectrum so the entire type system uses a single family, ensuring maximum cohesion. It avoids the "AI default" problem of Inter while remaining highly legible.

**Font loading:** Always use `next/font/google` with `display: 'swap'`. Never load fonts via `<link>` tags.

### 3.2 Type Scale

The type scale follows a **1.250 ratio (Major Third)** for natural, harmonious size progression.

| Token | Size (px) | Size (rem) | Line Height | Letter Spacing | Weight | Usage |
|-------|-----------|------------|-------------|----------------|--------|-------|
| `display-xl` | 72px | 4.5rem | 1.05 | -0.03em | 800 | Hero headline. One per page only |
| `display-lg` | 56px | 3.5rem | 1.08 | -0.025em | 700 | Section headlines (major sections) |
| `display-md` | 44px | 2.75rem | 1.1 | -0.02em | 700 | Section headlines (secondary) |
| `heading-lg` | 36px | 2.25rem | 1.15 | -0.015em | 600 | Card group headings, feature titles |
| `heading-md` | 28px | 1.75rem | 1.2 | -0.01em | 600 | Card titles, modal titles |
| `heading-sm` | 22px | 1.375rem | 1.25 | -0.005em | 600 | Subsection headings, sidebar titles |
| `body-lg` | 18px | 1.125rem | 1.65 | 0em | 400 | Lead paragraphs, hero subtext |
| `body-md` | 16px | 1rem | 1.6 | 0em | 400 | **Default body text** |
| `body-sm` | 14px | 0.875rem | 1.55 | 0.005em | 400 | Captions, helper text, metadata |
| `body-xs` | 12px | 0.75rem | 1.5 | 0.01em | 500 | Labels, tags, legal fine print |
| `mono-md` | 14px | 0.875rem | 1.5 | 0em | 400 | Code snippets, technical IDs |
| `eyebrow` | 12px | 0.75rem | 1.5 | 0.12em | 600 | Eyebrow labels (used sparingly, see Section 7) |

### 3.3 Responsive Type Scale

Headlines scale down on smaller viewports. Body text remains constant.

| Token | Desktop (≥1024px) | Tablet (768-1023px) | Mobile (<768px) |
|-------|-------------------|---------------------|-----------------|
| `display-xl` | 72px / 4.5rem | 52px / 3.25rem | 36px / 2.25rem |
| `display-lg` | 56px / 3.5rem | 42px / 2.625rem | 30px / 1.875rem |
| `display-md` | 44px / 2.75rem | 34px / 2.125rem | 26px / 1.625rem |
| `heading-lg` | 36px / 2.25rem | 30px / 1.875rem | 24px / 1.5rem |
| `heading-md` | 28px / 1.75rem | 24px / 1.5rem | 22px / 1.375rem |
| `body-lg` | 18px | 18px | 17px |
| `body-md` | 16px | 16px | 16px (never smaller) |

### 3.4 Typography Rules

- **Maximum line length:** 65 characters for body text (`max-w-[65ch]`). Headlines have no character cap but must not exceed 2 lines on desktop
- **Heading hierarchy:** Every page has exactly **one H1**. Section headings are H2. Sub-sections are H3. Never skip levels
- **Heading colour:** `neutral-900` (`#0f172a`) on white backgrounds
- **Body text colour:** `neutral-700` (`#334155`) on white backgrounds
- **No serif fonts.** The brand is geometric sans-serif. Serif is not appropriate for a rental platform
- **Emphasis:** Use `font-weight: 500 (Medium)` or `600 (SemiBold)` for emphasis within body text. Use **italic only** for proper names or editorial emphasis, never for decorative variety
- **Gradient text:** The brand gradient may be applied to H1 or H2 elements via `background-clip: text` for hero and major section headings. It must never be applied to body text, captions, or labels
- **Underlines on links:** Body text links use `text-decoration: underline` with `text-underline-offset: 4px`. Navigation links do not use underlines

---

## 4. Spacing System

### 4.1 Base Unit

The spacing system is built on a **4px base unit**. All spacing values are multiples of 4.

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | — |
| `space-1` | 4px | Tight inline gaps. Icon-to-label spacing inside buttons |
| `space-2` | 8px | Compact gaps. Tag padding, badge padding |
| `space-3` | 12px | Input internal padding, tight card padding |
| `space-4` | 16px | Default gap between sibling elements. Grid gap (mobile) |
| `space-5` | 20px | Card internal padding (compact) |
| `space-6` | 24px | **Default card internal padding.** Grid gap (desktop) |
| `space-8` | 32px | Gap between content blocks within a section |
| `space-10` | 40px | — |
| `space-12` | 48px | Gap between a section heading and its content |
| `space-16` | 64px | Gap between distinct content groups within a section |
| `space-20` | 80px | **Default vertical section padding** (top and bottom) |
| `space-24` | 96px | Large section padding for hero/CTA sections |
| `space-32` | 128px | Maximum vertical breathing room between major page zones |

### 4.2 Section Spacing

| Section Type | Vertical Padding (Desktop) | Vertical Padding (Mobile) |
|--------------|---------------------------|--------------------------|
| Hero | `96px` top / `80px` bottom | `64px` top / `48px` bottom |
| Standard content section | `80px` top and bottom | `48px` top and bottom |
| CTA / Banner section | `80px` top and bottom | `48px` top and bottom |
| Footer | `64px` top / `48px` bottom | `48px` top / `32px` bottom |
| Divider between sections | Sections alternate between `#ffffff` and `neutral-50` backgrounds. No visible `<hr>` or border dividers |

### 4.3 Container

| Property | Value |
|----------|-------|
| Max width | `1280px` (`max-w-7xl`) |
| Horizontal padding (desktop) | `32px` per side |
| Horizontal padding (tablet) | `24px` per side |
| Horizontal padding (mobile) | `16px` per side |
| Centering | `margin: 0 auto` |

**Container consistency:** Every section on the page uses the same `max-w-7xl` container. Never mix container widths.

---

## 5. Component Standards

### 5.1 Corner Radius System

BizzMate uses a **soft-rounded** design language. The system has exactly four radius tiers:

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | `6px` | Tags, badges, small pills, tooltips |
| `radius-md` | `10px` | Input fields, dropdowns, text areas |
| `radius-lg` | `14px` | **Cards, modals, image containers, sections** |
| `radius-full` | `9999px` | Primary CTA buttons, avatar circles, toggle pills |

**Shape consistency rule:** These four values are the only radii allowed. No arbitrary values. All buttons use `radius-full`. All cards use `radius-lg`. All inputs use `radius-md`.

### 5.2 Buttons

| Variant | Background | Text Colour | Border | Radius | Height |
|---------|-----------|-------------|--------|--------|--------|
| **Primary** | Brand gradient (`135deg, #a84bff, #266ac1, #57c0e5`) | `#ffffff` | None | `radius-full` | `48px` |
| **Secondary** | `#ffffff` | `neutral-900` | `1px solid neutral-300` | `radius-full` | `48px` |
| **Ghost** | `transparent` | `#a84bff` | None | `radius-full` | `48px` |
| **Danger** | `#dc2626` | `#ffffff` | None | `radius-full` | `48px` |
| **Small** | Same as above | Same | Same | `radius-full` | `36px` |
| **Large** | Same as above | Same | Same | `radius-full` | `56px` |

**Button rules:**
- Horizontal padding: `24px` (default), `16px` (small), `32px` (large)
- Font: `body-sm` (14px) for small, `body-md` (16px) for default, `body-lg` (18px) for large
- Font weight: `500 (Medium)` always
- **Button text must fit on one line.** If it wraps, shorten the label or widen the button
- Maximum of **3 words** per primary CTA label
- Buttons always have `cursor: pointer`
- Disabled state: `opacity: 0.5`, `cursor: not-allowed`, no hover effects
- Loading state: replace label text with a subtle spinner. Disable pointer events

**Button hover/active states:**

| Variant | Hover | Active (pressed) |
|---------|-------|-------------------|
| Primary | Increase brightness by 8%, add `box-shadow: 0 4px 20px rgba(168, 75, 255, 0.3)` | `scale(0.97)`, shadow reduces |
| Secondary | Background → `neutral-50`, border → `neutral-400` | `scale(0.97)` |
| Ghost | Background → `soft-lavender` (`#ede9fe`) | `scale(0.97)` |

### 5.3 Cards

| Property | Value |
|----------|-------|
| Background | `#ffffff` |
| Border | `1px solid neutral-200` (`#e2e8f0`) |
| Border radius | `radius-lg` (`14px`) |
| Padding | `24px` (default), `20px` (compact), `32px` (spacious) |
| Shadow (resting) | `0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)` |
| Shadow (hover) | `0 8px 24px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)` |
| Transition | `box-shadow 200ms ease, transform 200ms ease` |

**Card rules:**
- Cards lift on hover: `translateY(-2px)` combined with the hover shadow
- Cards always have `cursor: pointer` when they link to something
- Never nest cards inside cards
- Use cards only when **elevation communicates hierarchy**. For flat lists, use `border-b` separators or spacing alone
- Image inside a card: image fills the top of the card edge-to-edge (no internal padding on image), with `border-radius` matching the card's top corners. Content below the image gets the standard `24px` padding
- Shadow colour is always tinted to the neutral palette (cool-slate). Never use pure black `rgba(0,0,0,x)` shadows

### 5.4 Input Fields

| Property | Value |
|----------|-------|
| Height | `48px` (default), `40px` (compact) |
| Background | `neutral-50` (`#f8fafc`) |
| Border | `1px solid neutral-300` (`#cbd5e1`) |
| Border (focus) | `2px solid #a84bff` (brand violet) |
| Border radius | `radius-md` (`10px`) |
| Padding | `12px 16px` |
| Text | `body-md` (16px), `neutral-900` |
| Placeholder | `body-md` (16px), `neutral-500` |
| Focus ring | `box-shadow: 0 0 0 3px rgba(168, 75, 255, 0.15)` |
| Label | `body-sm` (14px), `neutral-700`, `font-weight: 500`. Positioned ABOVE the input, gap `8px` |
| Helper text | `body-xs` (12px), `neutral-600`, positioned below input, gap `4px` |
| Error text | `body-xs` (12px), `#dc2626`, positioned below input, gap `4px` |

**Input rules:**
- Label is always above the input. Never use placeholder-as-label
- Error state: border → `#dc2626`, focus ring → `rgba(220, 38, 38, 0.15)`
- Never use `neutral-400` or lighter for placeholder text on `neutral-50` backgrounds (contrast violation)

### 5.5 Tables

| Property | Value |
|----------|-------|
| Header background | `neutral-50` (`#f8fafc`) |
| Header text | `body-sm` (14px), `neutral-600`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.05em` |
| Row text | `body-md` (16px), `neutral-700` |
| Row border | `border-bottom: 1px solid neutral-200` |
| Row hover | Background → `neutral-50` |
| Cell padding | `16px horizontal`, `14px vertical` |
| Border radius (wrapper) | `radius-lg` (14px) on the table container |
| Alternating rows | Not used. Use hover highlight instead |

### 5.6 Avatars

| Size | Dimensions | Usage |
|------|-----------|-------|
| `xs` | 28px | Inline mentions, compact lists |
| `sm` | 36px | Comment threads, table rows |
| `md` | 44px | Card headers, list items |
| `lg` | 56px | Profile headers, testimonials |
| `xl` | 80px | Profile pages, hero sections |

All avatars use `border-radius: 9999px` (circle). Fallback: initials on a `soft-lavender` (`#ede9fe`) background in `neutral-900` text.

### 5.7 Badges and Tags

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Default | `neutral-100` | `neutral-700` | None |
| Brand | `soft-lavender` (`#ede9fe`) | `#a84bff` | None |
| Success | `#ecfdf5` | `#059669` | None |
| Warning | `#fffbeb` | `#d97706` | None |
| Error | `#fef2f2` | `#dc2626` | None |
| Outlined | `transparent` | `neutral-700` | `1px solid neutral-300` |

Padding: `4px 10px`. Radius: `radius-sm` (6px). Font: `body-xs` (12px), `font-weight: 500`.

### 5.8 Navigation Bar

| Property | Value |
|----------|-------|
| Height | `68px` (desktop), `60px` (mobile) |
| Position | Fixed, top of viewport |
| Background | `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(12px) saturate(150%)` |
| Border | `border-bottom: 1px solid rgba(226, 232, 240, 0.6)` (subtle, blurred) |
| Z-index | `50` |
| Container | Same `max-w-7xl` as page content |
| Logo placement | Left-aligned |
| Nav links | Center or right-aligned. `body-md` (16px), `neutral-700`, `font-weight: 500` |
| Nav link hover | Colour → `#a84bff`, no underline |
| Active nav link | Colour → `#a84bff`, `font-weight: 600`, optionally a subtle bottom indicator (2px gradient line) |
| CTA button in nav | Primary button, small variant (`36px` height) |

**Nav rules:**
- Navigation must render on **a single line** at desktop. Max height: `68px`
- The nav uses a floating glassmorphic bar: apply `top: 12px`, `left: 16px`, `right: 16px` (or equivalent margin insets), with `border-radius: radius-lg` (14px) for a floating pill appearance
- Mobile: hamburger menu at `< 768px`. Slide-in panel from right, same glassmorphic style

### 5.9 Modals and Overlays

| Property | Value |
|----------|-------|
| Backdrop | `rgba(15, 23, 42, 0.5)` with `backdrop-filter: blur(4px)` |
| Modal background | `#ffffff` |
| Modal radius | `radius-lg` (14px), `16px` on mobile (bottom sheet) |
| Modal shadow | `0 24px 48px rgba(15, 23, 42, 0.12)` |
| Max width | `520px` (default), `720px` (wide), `90vw` (mobile) |
| Padding | `32px` (desktop), `24px` (mobile) |
| Entry animation | `opacity: 0 → 1` + `scale: 0.95 → 1` + `y: 8px → 0`, duration `250ms`, ease `[0.16, 1, 0.3, 1]` |
| Exit animation | Reverse of entry, duration `150ms` |

### 5.10 Tooltips

Background: `neutral-900` (`#0f172a`). Text: `#ffffff`, `body-xs` (12px). Radius: `radius-sm` (6px). Padding: `6px 10px`. Max width: `240px`. Arrow: 6px CSS triangle matching background. Delay before show: `400ms`. Transition: `opacity 150ms`.

---

## 6. Imagery and Visual Assets

### 6.1 Photography Style

- **Tone:** Bright, clean, natural light. Slightly warm but never orange-tinted. Professional but approachable
- **Subjects:** Real people using rental items, clean product shots of rental inventory, lifestyle contexts (events, workspaces, outdoor activities)
- **Treatment:** No heavy filters. Slight contrast boost (+5-10%). White balance: neutral-cool
- **Overlay text on images:** Always use a subtle gradient scrim (`linear-gradient(to top, rgba(15, 23, 42, 0.6), transparent)`) when placing text over photography. Never place text directly on unmodified photos

### 6.2 Illustrations and Icons

- **Icon library:** Use `@phosphor-icons/react` as the primary icon set. One icon family across the entire product
- **Icon size:** Default `24px` (24x24 viewBox). Use `20px` for compact UI, `28px` for headers, `32px` or `40px` for feature showcases
- **Icon colour:** `neutral-600` by default. `#a84bff` for active/brand-highlighted states. `#ffffff` when on gradient backgrounds
- **Stroke width:** `1.5` globally
- **No emoji in the UI.** Use proper SVG icons from the icon library
- **No hand-rolled SVG illustrations.** Use the image generation tool or real photography

### 6.3 Image Containers

- All standalone images use `border-radius: radius-lg` (14px)
- Images inside cards inherit the card's top radius
- All images use `object-fit: cover` unless showing a full product shot
- Lazy load all images below the fold via `loading="lazy"` and `next/image` component
- Always provide meaningful `alt` text. Never leave `alt=""` on meaningful content images (empty alt is reserved for decorative images only)

---

## 7. Layout Principles

### 7.1 Grid System

| Property | Value |
|----------|-------|
| Grid type | CSS Grid (`display: grid`) |
| Default columns | 12 columns (desktop), 6 (tablet), 4 (mobile) |
| Grid gap | `24px` (desktop), `20px` (tablet), `16px` (mobile) |
| Common patterns | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for card grids |
| | `grid-cols-1 lg:grid-cols-12` for asymmetric layouts |

**Grid rule:** Never use complex flexbox percentage math (`w-[calc(33%-1rem)]`). Always CSS Grid.

### 7.2 Visual Hierarchy Principles

1. **Size communicates importance.** The most important element on the page (the value proposition) gets the largest type size. Secondary information gets progressively smaller. Never have a subheading visually compete with the main heading
2. **Weight establishes levels.** Bold (700-800) for headings, SemiBold (600) for sub-headings, Regular (400) for body. The weight difference between heading and body must be at least 200 units
3. **Colour creates depth.** Use `neutral-900` for primary content, `neutral-700` for supporting content, `neutral-500` for tertiary/meta content. The three tiers are always clearly distinct
4. **Spacing defines groups.** Elements that belong together have tight spacing (8-16px). Distinct groups are separated by wider spacing (32-64px). This is the Gestalt principle of proximity
5. **One focal point per viewport.** When a user lands on any section, their eye should be drawn to exactly one element first (usually the heading or a hero image). Two equally dominant elements competing for attention = failed hierarchy

### 7.3 Alignment Rules

- **Left-align body text.** Never centre-align body paragraphs (more than 2 lines). Centred body text is only acceptable for single-line captions or one-sentence descriptions
- **Centre-align section headings** when the section is a full-width centred layout. Left-align section headings when using split/asymmetric layouts
- **Consistent alignment per section.** If a section's heading is left-aligned, all content in that section is left-aligned. Do not mix centre and left within the same section
- **Right-alignment** is used only for numerical data in tables and price displays

### 7.4 Section Layout Diversity

A landing page with N sections must use at least `ceil(N / 2)` **different** layout families. Never repeat the same layout structure in consecutive sections.

**Layout families available:**
1. Full-width centred (heading + subtext + CTA, centred)
2. Split screen 50/50 (text left, visual right, or reversed)
3. Asymmetric split (60/40 or 40/60)
4. Card grid (2-col, 3-col, or 4-col)
5. Bento grid (mixed cell sizes)
6. Full-width media (image or video spanning the container)
7. Testimonial carousel / quote block
8. Horizontal scroll-snap strip
9. Sticky scroll-stack (GSAP pinned cards)
10. Stats / metrics row (large numbers + labels)

**Zigzag cap:** Maximum 2 consecutive sections using image+text split. The 3rd must break the pattern.

### 7.5 Eyebrow Restraint

Eyebrows (small uppercase labels above section headings like `HOW IT WORKS`) are limited to **1 per 3 sections**. A page with 9 sections may have at most 3 eyebrows. If section A has an eyebrow, the next 2 sections must not.

---

## 8. Animation and Motion Philosophy

### 8.1 Core Principle

BizzMate's motion language communicates **fluid trust and effortless connection**. Every animation serves a purpose: guiding attention, confirming actions, or revealing content with natural timing. Motion should feel like water flowing, not like machinery clicking.

**No animation exists "because it looks cool."** Before adding any animation, articulate in one sentence what it communicates:
- "This fade-in reveals features sequentially so the user processes them in order" (storytelling)
- "This hover lift confirms the card is clickable" (feedback)
- "This progress bar shows the upload completing" (state transition)

### 8.2 Motion Tokens

| Token | Duration | Ease | Usage |
|-------|----------|------|-------|
| `motion-instant` | 100ms | `ease-out` | Micro-feedback: checkbox toggles, radio selections |
| `motion-fast` | 150ms | `ease-out` | Hover states, button feedback, tooltip show |
| `motion-normal` | 250ms | `cubic-bezier(0.16, 1, 0.3, 1)` | **Default.** Card hover lift, dropdown open, tab switch |
| `motion-smooth` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Page transitions, modal entry, section reveal on scroll |
| `motion-slow` | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero entry animation, staggered list reveal |
| `motion-spring` | n/a | `type: "spring", stiffness: 120, damping: 20` | Magnetic hover effects, bouncy interactions (used sparingly) |

**Never use `linear` easing** for UI motion. Linear motion feels robotic. All UI transitions use deceleration curves (ease-out family).

### 8.3 Scroll-Triggered Animations

**Library hierarchy:**
1. **Motion (Framer Motion)** `whileInView` for simple reveal-on-scroll (fade up, stagger). Lightweight, no scroll hijacking
2. **GSAP ScrollTrigger** for advanced pinned/scrubbed animations (sticky-stack, horizontal pan). Used only when scroll position must drive animation progress
3. **CSS `scroll-driven` animations** for simple parallax and progress indicators where no JS is needed

**Scroll reveal defaults:**
- Initial state: `opacity: 0`, `translateY: 24px`
- Animate to: `opacity: 1`, `translateY: 0`
- Duration: `600ms`
- Ease: `cubic-bezier(0.16, 1, 0.3, 1)`
- Stagger between siblings: `60ms`
- `viewport: { once: true, amount: 0.3 }` (trigger once when 30% visible)

**GSAP usage rules:**
- Every GSAP animation in a `useEffect` must have a cleanup function that calls `ctx.revert()`
- ScrollTrigger pinning always uses `start: "top top"`, not `"top center"` or `"top 80%"`
- Maximum 1 horizontal marquee per page
- Maximum 1 scroll-hijacked section (sticky-stack or horizontal pan) per page

### 8.4 Hover and Interaction Effects

| Element | Hover Effect | Active (Pressed) | Transition |
|---------|-------------|-------------------|------------|
| Primary button | Brightness increase, gradient glow shadow | `scale(0.97)` | `200ms ease` |
| Secondary button | Background fill change | `scale(0.97)` | `200ms ease` |
| Card | `translateY(-2px)` + enhanced shadow | `translateY(0)` + `scale(0.99)` | `200ms ease` |
| Nav link | Colour changes to brand violet | n/a | `150ms ease` |
| Text link | Underline opacity increase | n/a | `150ms ease` |
| Icon button | Background shows `neutral-100` circle | `scale(0.92)` | `150ms ease` |
| Image | `scale(1.03)` within `overflow: hidden` container | n/a | `400ms ease` |

**Hover rules:**
- Hover states must **never cause layout shift**. Use `transform` only, never `padding`, `margin`, or `width` changes
- All hoverable elements have `cursor: pointer`
- Image zoom hovers are contained within `overflow: hidden` parents so they don't break layout

### 8.5 Page Load Animation Sequence

1. **Nav bar:** Fades in from `opacity: 0`, duration `300ms`, delay `0ms`
2. **Hero headline:** Slides up from `y: 20px` + fades in, duration `600ms`, delay `100ms`
3. **Hero subtext:** Same as above, delay `200ms`
4. **Hero CTA:** Same as above, delay `300ms`
5. **Hero image/visual:** Fades in + slight `scale(0.97 to 1)`, duration `700ms`, delay `200ms`
6. **Below-the-fold sections:** Reveal on scroll (not on page load). Use `whileInView` with `{ once: true }`

### 8.6 Reduced Motion

All motion above micro-feedback (150ms hover states) **must respect `prefers-reduced-motion`**:
- Wrap Motion animations with `useReducedMotion()` check
- GSAP animations: skip registration entirely when reduced motion is preferred
- Fallback: elements render in their final state immediately. No motion, no delay
- This is **non-negotiable accessibility**

---

## 9. Shadows and Elevation

### 9.1 Shadow Scale

All shadows use **cool-slate tinted colours**, never pure black.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-xs` | `0 1px 2px rgba(15, 23, 42, 0.03)` | Inputs (resting), subtle depth |
| `shadow-sm` | `0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)` | **Cards (resting)**, dropdowns (closed) |
| `shadow-md` | `0 4px 12px rgba(15, 23, 42, 0.06), 0 2px 4px rgba(15, 23, 42, 0.03)` | Dropdowns (open), popovers, hover cards |
| `shadow-lg` | `0 8px 24px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)` | **Cards (hover)**, floating action bars |
| `shadow-xl` | `0 16px 40px rgba(15, 23, 42, 0.1), 0 4px 12px rgba(15, 23, 42, 0.05)` | Modals, large floating panels |
| `shadow-glow` | `0 4px 20px rgba(168, 75, 255, 0.25)` | Brand-accented hover states (primary button hover) |

### 9.2 Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | 0 | Default content |
| `z-above` | 10 | Sticky elements within scroll flow, floating labels |
| `z-dropdown` | 20 | Dropdown menus, popovers, tooltips |
| `z-sticky` | 30 | Sticky headers within sections |
| `z-nav` | 50 | Main navigation bar |
| `z-modal-backdrop` | 60 | Modal overlay background |
| `z-modal` | 70 | Modal content |
| `z-toast` | 80 | Toast notifications |
| `z-max` | 100 | Critical overlays (cookie consent, system alerts) |

---

## 10. Breakpoints and Responsiveness

### 10.1 Breakpoint Scale

| Name | Min-width | Design target |
|------|-----------|--------------|
| `mobile` | 0px | Phones (portrait). Single column |
| `sm` | 640px | Large phones (landscape), small tablets |
| `md` | 768px | Tablets (portrait). Two-column layouts begin |
| `lg` | 1024px | Tablets (landscape), small desktops. Full desktop layout |
| `xl` | 1280px | Standard desktops. Content at `max-w-7xl` |
| `2xl` | 1536px | Wide displays. Content remains at `max-w-7xl`, centred |

### 10.2 Responsive Rules

- **Mobile-first CSS.** Write base styles for mobile, use `md:` and `lg:` prefixes to add desktop behaviour
- **No horizontal scroll** on any viewport. Content must always fit within the viewport width
- **Body text never smaller than 16px** on any device. This prevents iOS Safari zoom issues and ensures readability
- **Touch targets: minimum 44x44px** on mobile for all interactive elements
- **Hero uses `min-h-[100dvh]`**, never `h-screen` (prevents iOS Safari address bar layout shift)
- **Single column** below `768px` for all card grids and multi-column layouts. No 2-column card grids on mobile
- **Navigation collapses** to hamburger below `768px`

---

## 11. Accessibility Standards

### 11.1 Requirements Level: WCAG 2.1 AA

| Criterion | Requirement |
|-----------|-------------|
| Colour contrast (text) | 4.5:1 minimum for body text, 3:1 for large text (18px+ or 14px bold+) |
| Colour contrast (UI) | 3:1 minimum for interactive component boundaries and states |
| Focus indicators | Visible focus ring on all interactive elements. `outline: 2px solid #a84bff` with `outline-offset: 2px` |
| Keyboard navigation | Tab order matches visual order. All functionality available via keyboard |
| Alt text | All meaningful images have descriptive alt text. Decorative images use `alt=""` |
| ARIA labels | All icon-only buttons have `aria-label` |
| Form labels | Every input has a visible `<label>` with `for` attribute |
| Colour-only indicators | Never use colour as the sole means of conveying information. Always pair with icon + text |
| Reduced motion | Respect `prefers-reduced-motion: reduce` for all animations |
| Heading structure | One H1 per page, logical H2 to H3 to H4 hierarchy, no skipped levels |
| Link text | Descriptive link text. Never "click here" or "read more" as standalone link text |

### 11.2 Focus Style

```
Default: outline: 2px solid #a84bff; outline-offset: 2px;
On dark backgrounds: outline: 2px solid #57c0e5; outline-offset: 2px;
```

Focus styles are visible on `:focus-visible` only (not on mouse click).

---

## 12. Tone of Voice

### 12.1 Brand Personality

BizzMate speaks as a **knowledgeable friend who happens to be an expert in renting**. Not a faceless corporation. Not a hipster startup. A reliable, approachable partner who makes the complex feel simple.

| Trait | What this means | What this does NOT mean |
|-------|----------------|------------------------|
| **Trustworthy** | Clear, honest, no hidden terms. Speak plainly about pricing, policies, and protection | Formal, legal-sounding, bureaucratic, cold |
| **Approachable** | Warm, conversational, human. Use "you" and "your." Address the user directly | Slang-heavy, overly casual, "bro" tone, childish |
| **Confident** | Assertive about the value BizzMate provides. State benefits clearly | Arrogant, boastful, comparative attacks on competitors |
| **Helpful** | Anticipate questions. Explain without being asked. Guide, don't lecture | Condescending, over-explaining the obvious, tutorial-heavy |
| **Modern** | Current language, no dated phrases. Brief and precise | Buzzword-heavy, jargon-filled, "disrupting" or "revolutionising" |

### 12.2 Writing Guidelines

| Element | Guideline | Example |
|---------|-----------|---------|
| **Headlines** | Clear benefit statement. 8 words or fewer. Active voice. No clever wordplay that obscures meaning | "Rent anything, anytime, anywhere" not "Empowering the circular economy" |
| **Subtext** | Explain the headline in plain terms. 20 words or fewer. One idea per sentence | "Browse thousands of items near you. Book in seconds. Return when you're done." |
| **CTA buttons** | Action verb + object. 2-3 words max | "Browse Items", "List Your Item", "Start Renting" |
| **Error messages** | Say what happened + what to do next. No blame | "That email is already registered. Try signing in instead." |
| **Empty states** | Acknowledge the emptiness + guide to action | "No listings yet. Create your first listing to start earning." |
| **Success messages** | Confirm what happened. Brief celebration | "Booking confirmed! Check your email for details." |
| **Legal / policy** | Plain language first, legal precision in linked documents | "Your deposit is fully refundable if the item is returned in the same condition." |

### 12.3 Trust-Building Patterns

Trust is the single most important conversion factor for a rental platform. Strangers are exchanging money and physical goods.

1. **Social proof placement:** Testimonials, review counts, and trust badges appear within the first 2 scroll-depths of any critical page (homepage, listing detail, checkout). Not buried in the footer
2. **Specificity over vagueness:** "4,800+ verified renters in Mumbai" is more trustworthy than "Thousands of happy users"
3. **Protection clarity:** Insurance, deposit, and damage policies must be visible **before** the user commits to a transaction. Never hide these behind "Terms and Conditions" links
4. **Verified indicators:** Use success-green badges with checkmarks on user profiles, item listings, and reviews. Verification reduces friction
5. **Transparent pricing:** Show total cost (including fees, deposit) upfront. Never surprise the user at checkout with hidden charges
6. **Human touch:** Show real user photos (with permission), real names, real review dates. Stock photos and "User123" destroy trust
7. **Response time indicators:** "Usually responds within 2 hours" on owner profiles sets expectations and reduces anxiety

### 12.4 Tone Spectrum by Context

| Context | Tone Slider | Example |
|---------|-------------|---------|
| Marketing / Homepage | Warm + Confident | "Everything you need, nothing you don't own." |
| Onboarding | Helpful + Encouraging | "Let's set up your profile. It takes about 2 minutes." |
| Transaction flow | Clear + Reassuring | "Your payment is secure. The deposit will be refunded within 48 hours of return." |
| Error / Problem | Empathetic + Solution-focused | "Something went wrong with the payment. Let's try a different method." |
| Support / Help | Patient + Thorough | "Here's how deposit refunds work, step by step." |
| Legal / Policy | Plain + Precise | "Renters are responsible for returning items in the condition they received them." |

---

## 13. Anti-Patterns (What This Website Must Never Do)

### 13.1 Visual Anti-Patterns

| Never Do | Why | Do Instead |
|----------|-----|------------|
| Use the brand gradient as a full-page background | Overwhelms the eye, reduces impact of accent uses | White page background, gradient reserved for CTAs and accents |
| Use pure black (`#000000`) for text | Too harsh on white backgrounds, causes eye strain | Use `neutral-900` (`#0f172a`) for headings, `neutral-700` for body |
| Mix warm and cool grays | Creates visual dissonance, looks unintentional | Stick to the cool-slate neutral palette exclusively |
| Apply shadows with pure black (`rgba(0,0,0,x)`) | Looks flat and artificial | Use neutral-tinted shadows (`rgba(15, 23, 42, x)`) |
| Use more than 1 accent colour family per page | Fragments the brand, reduces visual coherence | BizzMate Violet is the accent. Everything else is neutral or semantic |
| Centre-align body paragraphs | Hard to read beyond 1-2 lines, looks amateur | Left-align all body text |
| Use emojis as icons | Inconsistent rendering across devices, unprofessional | Use Phosphor Icons SVGs |
| Nest cards inside cards | Creates confusing depth hierarchy | Flatten the structure; use borders or spacing instead |
| Use `h-screen` for hero sections | iOS Safari address bar causes layout jump | Use `min-h-[100dvh]` |
| Add scroll cue text ("Scroll to explore") | Patronising; users know how to scroll | Let content hierarchy naturally invite scrolling |

### 13.2 Content Anti-Patterns

| Never Do | Do Instead |
|----------|------------|
| Use "Click here" or "Read more" as link text | Descriptive link text: "View rental details" |
| Use "disrupting," "revolutionising," "game-changing" | Plain benefit language: "A simpler way to rent" |
| Use "Lorem ipsum" in production or demos | Write real copy, even if placeholder-quality |
| Fake precise numbers ("92% satisfaction") without source | Either use real metrics or don't show numbers |
| Show "Jane Doe" or "John Smith" as example users | Use realistic, diverse names |
| Use stock phrases like "Trusted by thousands" without evidence | Show specific: "Trusted by 4,800 renters in 12 cities" |

### 13.3 Interaction Anti-Patterns

| Never Do | Do Instead |
|----------|------------|
| Animate layout-triggering properties (`width`, `height`, `top`, `left`) | Animate `transform` and `opacity` only |
| Use `window.addEventListener("scroll")` for scroll effects | Use Motion's `useScroll()`, GSAP `ScrollTrigger`, or `IntersectionObserver` |
| Use `useState` for continuous pointer/scroll values | Use `useMotionValue` / `useTransform` from Motion |
| Use `linear` easing for UI animations | Use deceleration curves (`ease-out`, `cubic-bezier(0.16, 1, 0.3, 1)`) |
| Add infinite-loop animations to static informational content | Reserve perpetual motion for active status indicators only |
| Disable scroll or hijack scroll aggressively | Use GSAP pinning sparingly, max 1 hijacked section per page |

---

## 14. File and Asset Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `RentalCard.jsx`, `HeroSection.jsx` |
| Pages / Routes | kebab-case | `listing-detail/page.js` |
| CSS modules | camelCase suffix | `heroSection.module.css` |
| Images | kebab-case, descriptive | `hero-rental-lifestyle.webp` |
| Icons | kebab-case | `icon-calendar.svg` |
| Design tokens | kebab-case with category prefix | `color-brand-violet`, `space-section-y` |

---

## 15. Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| Largest Contentful Paint (LCP) | < 2.5 seconds | Lighthouse |
| Interaction to Next Paint (INP) | < 200ms | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Total Blocking Time (TBT) | < 200ms | Lighthouse |
| First Contentful Paint (FCP) | < 1.8 seconds | Lighthouse |
| Image format | WebP (with PNG/JPEG fallback) | n/a |
| Font loading | `next/font` with `display: swap` | n/a |
| Bundle size | Tree-shake icons, code-split routes | n/a |

---

## 16. Quick Reference Summary

```
Brand:           BizzMate — Rental Platform
Mode:            Light only
Gradient:        linear-gradient(135deg, #a84bff, #266ac1, #57c0e5)
Primary accent:  #a84bff (Violet)
Heading text:    #0f172a (Slate 900)
Body text:       #334155 (Slate 700)
Background:      #ffffff, alternating #f8fafc
Font:            Outfit (all weights)
Mono:            JetBrains Mono
Display size:    72px desktop, 36px mobile
Body size:       16px (never smaller)
Line height:     1.05 display, 1.6 body
Container:       max-w-7xl (1280px), centred
Card radius:     14px
Button radius:   Full pill (9999px)
Input radius:    10px
Section padding: 80px vertical (desktop), 48px (mobile)
Grid gap:        24px
Shadow tint:     rgba(15, 23, 42, x) — cool slate
Motion easing:   cubic-bezier(0.16, 1, 0.3, 1)
Motion duration: 250ms default, 600ms reveal
Icon library:    @phosphor-icons/react
Nav height:      68px, floating glassmorphic bar
Z-nav:           50
Tone:            Trustworthy, approachable, confident, helpful
```

---

*This document is the single source of truth for BizzMate's visual and verbal identity. Every component, page, and interaction built for BizzMate must conform to the standards defined here. When in doubt, refer back to this guide.*
