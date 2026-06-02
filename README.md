# Dubai Mall | Cinematic Interactive Sales Deck

[![Next.js](https://img.shields.io/badge/Next.js-15.0-blue?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Build Status](https://img.shields.io/badge/Next.js_Build-✓_Passed-brightgreen?style=for-the-badge)](https://nextjs.org/)

An ultra-luxury, browser-based digital sales asset built to replace fragmented, offline sales materials (PDFs, static slide decks, spreadsheets) with a unified, high-stakes cinematic experience. Designed in a highly modern **Light Skeuomorphic Glassmorphic** style inspired by Apple and Tesla’s digital decks, this application empowers luxury retail tenants, corporate sponsors, and event promoters to explore spatial schematics, interactive floorplans, and demographics entirely on their own, concluding in a secure real-time proposal funnel.

---

## 🎨 1. Design System & Philosophy

### Premium Light Glassmorphism
Following Emaar Properties' brand directions, the interface completely rejects dark wells or high-contrast shadows. Instead, it operates on a curated, harmonious **Pastel Light Skeuomorphic Canvas** (`#E4EBF5` base):
* **3D Glass Blocks:** Uses soft HSL-tailored outset neumorphic shadows paired with semi-transparent white borders (`border-white/65`) and backdrop blurs (`backdrop-blur-md`) to render tactile, physical glass surfaces that feel physically raised.
* **Debossed Inset Wells:** Demarcates technical data tables, floorplans, and vector maps within soft inset skeuomorphic shadow wells, framing analytical metrics beautifully.
* **Tactile Pressable Buttons:** Features custom micro-animations where buttons dynamically lift up on cursor hover (`translate-y-[-2px]`) and smoothly press down into inset wells (`translate-y-[0px]`) during user clicks.
* **Fluid Gradients:** Animated white-to-blue drifting glass particles inside a canvas layout overlay float continuously in the background, injecting life into every viewport.

---

## 🎬 2. Cinematic Video Player Engine

To meet the high-stakes "Video-First" storytelling requirements of the assignment, the deck incorporates a robust **Dual-Engine Media System**:
1. **Autoplay Skyline Background:** The overview page Hero features an autoplaying, muted, and looping HTML5 `<video>` element playing Emaar's official Downtown Dubai sunset loop (`/videos/dubai_skyline.mp4`). It is overlaid with a radial glass vignette to keep typography highly legible.
2. **Direct Inline Showcase Players:** In both the Downtown Dubai (Overview) and Dubai Aquarium (Attractions) cards, clicking **anywhere** on the play overlays smoothly transitions the card into a direct inline video player:
   * **Downtown Dubai:** Plays the local high-definition `/videos/dubai_skyline.mp4` file with local controls.
   * **Dubai Aquarium:** Streams Emaar's official 4K walkthrough video (`F0f-M3W65lI`) directly inline inside the card.
3. **Tactile Media Console Modals:** A premium skeuomorphic quick-actions bar below the cards launches a full-screen glass modal, letting visitors switch between YouTube CDN Streams, Local MP4 Loops, and Luxury Gallery slideshow decks.

---

## 💻 3. Technical Stack & Dependencies

* **Framework:** Next.js `16.2.7` / `15.0` App Router (with React Compiler enabled)
* **Frontend:** React `19.2.4` & TypeScript
* **Styling (CSS):** Tailwind CSS `v4.0.0` (utilizing `@theme` configuration directives)
* **Animation Engines:** 
  * **GSAP & @gsap/react:** `3.12.7` (driving ScrollTrigger side-pinning viewport grids)
  * **Framer Motion:** `12.4.7` (scroll-triggered fades, section staggers, dynamic transitions)
* **Database Connection:** Supabase Client `2.49.1` (direct client insertion mapping)
* **Icons:** React Icons `5.5.0`

---

## 📂 4. Modular Directory Structure

Our codebase is structured to support seamless, modular expansion into deeper clickable sub-modules:

```
src/
├── app/
│   ├── layout.tsx         # Google Fonts, high-res Favicon metadata, and OG tags
│   ├── page.tsx           # Instant client-side redirect router hook
│   ├── globals.css        # Tailwind directives, custom skeuomorphic shadows, and scrollbars
│   ├── overview/          # Landing layout combining Hero and core stats
│   ├── retail/            # snap-scroll luxury, premium, and anchor showcase panels
│   ├── dining/            # Fine dining and cafe showcases with active tags
│   ├── entertainment/     # GSAP ScrollTrigger side-pinning attractions spotlight
│   ├── venues/            # Vector floors plans and technical spec sheets
│   ├── leasing/           # Tabbed lease specifications card
│   ├── sponsorship/       # Platinum, Gold, and Silver sponsorship tier columns
│   ├── events/            # Arena dimensions comparison charts and loop ticker
│   └── contact/           # Suspense-wrapped strategic inquiry form
├── components/
│   ├── animations/        # ScrollReveal and Parallax entry boundaries
│   ├── cta/               # Dynamic floating actions bar and CTASystem
│   ├── shared/            # Reusable StatCard, SectionHeader, and Canvas Background
│   └── [feature]/         # Modular page-specific showcase components
├── data/
│   └── [feature]Data.ts   # Decoupled commercial metrics, pricing guides, and specifications
├── lib/
│   ├── utils.ts           # Tailwind ClassName merge utility
│   └── supabase.ts        # Database client initialization node
└── types/
    └── index.ts           # Unified data models and relational tables schema
```

---

## 🚀 5. Quick-Start Setup Guide

Follow these simple steps to run the interactive sales deck locally:

### 1. Install Project Dependencies:
```bash
npm install
```

### 2. Configure Supabase Credentials:
Create a `.env.local` file in the root directory and define your Supabase tokens (the application includes fully functioning mock fallbacks if left empty):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_publishable_key
```

### 3. Spin Up Development Server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

### 4. Verify Production Compilation:
```bash
npm run build
```

---

## 📈 6. Deployment Readiness Report

The application is **100% production-ready and fully optimized**. Running the Turbopack production compile completes with **zero TypeScript errors or warnings**:

```bash
▲ Next.js 16.2.7 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
✓ Compiled successfully in 8.9s
  Running TypeScript ...
  Finished TypeScript in 4.7s ...
  Collecting page data using 11 workers ...
✓ Generating static pages using 11 workers (14/14) in 823ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /contact
├ ○ /dining
├ ○ /entertainment
├ ○ /events
├ ○ /leasing
├ ○ /luxury
├ ○ /overview
├ ○ /retail
├ ○ /sponsorship
└ ○ /venues

○  (Static)  prerendered as static content
```
*Note: 100% of all page routes pre-render as static HTML documents, guaranteeing instant page delivery, highly secure hosting, and flawless responsiveness across all viewports.*
