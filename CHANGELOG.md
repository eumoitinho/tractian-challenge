# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### To Do

- Typed i18n message interfaces (`types/messages.ts`) to replace `Record<string, unknown>` casts
- Unit tests for lead pipeline (`scoreLead`, `validateLeadForm`, `isDuplicate`)
- Accessibility improvements (focus trap on modals, `aria-expanded` on accordion items)

## [1.2.0] - 2026-02-21

### Fixed

- Sticky header broken by `overflow-x-hidden` on ancestor elements — replaced with `overflow-x: clip` on `html`, `body`, and layout wrapper div
- Header dropdown z-index and pointer-events conflicts between overlapping panels
- Removed redundant `overflow-x-hidden` from nav element

### Changed

- Header nav positioning refined for consistent sticky behavior across breakpoints
- Mobile menu close button stroke width reduced from 2.5 to 1 for visual consistency
- Testimonials progress indicator height and border-radius adjusted to match production
- Removed commented-out code and redundant background color from Testimonials

## [1.1.0] - 2026-02-21 · PR [#5](https://github.com/eumoitinho/tractian-challenge/pull/5) `refactor/reduce-complexity`

### Added

- Mobile nav content components: `SolutionsMobileContent`, `WhoWeServeMobileContent`, `ResourcesMobileContent`, `CompanyMobileContent`, `PricingMobileContent`, `LanguageMobileContent`
- `MobileNavSection` accordion wrapper component with chevron animation
- Language switcher with country flag icons (US, BR, ES) and proper locale labels
- `trackNavClick` analytics events on all mobile nav items
- Design document and implementation plan for header refactoring (`docs/plans/`)

### Changed

- **Header decomposed** from monolithic 687-line file into modular subdirectory structure:
  - `desktop/` — `DesktopDropdowns`, `DesktopSolutionsDropdown`
  - `mobile/` — `MobileMenu`, `MobileNavSection`, `content/*`
  - `shared/` — `HeaderIcons`, `IconBox`, `TractianLogo`, `LanguageSwitcher`, `constants`
  - `Header.tsx` retained as thin orchestrator
- Mobile nav sections styled to match production: `bg-slate-100` backgrounds, white icon boxes (`bg-white`), `text-base text-slate-500` section titles, `w-4 h-4` chevrons
- Company mobile section uses `h-[90px] w-[160px]` rectangular image thumbnails (matching production)
- CookieBanner and PrivacyModal responsive layout improvements
- Hero simplified layout and responsive styling
- Typography and layout consistency across all page sections

## [1.0.0] - 2026-02-20 · PR [#4](https://github.com/eumoitinho/tractian-challenge/pull/4) `fix/responsive-polish`

### Fixed

- Layout overflow issues with `overflow-x-hidden` on all page sections
- Spanish locale hero images now correctly point to ES-specific versions
- Logo carousel removed unintended grayscale filter
- Hamburger menu icon color corrected to blue-600
- Hero image centered properly on mobile viewports

### Added

- Mobile menu with expandable accordion sections for all nav categories
- Mobile language selector as expandable section within mobile menu
- Hero responsive image handling with separate mobile/desktop sources
- Testimonials auto-advancing carousel with touch swipe support and progress indicators
- CookieBanner responsive styling adjustments
- README with project overview, architecture decisions, and mermaid flowcharts

### Changed

- Heading font sizes standardized across all sections for consistency
- Testimonials component simplified: cleaner auto-advancing logic, improved responsive layout
- General UI polish across multiple sections (spacing, borders, transitions)

## [0.3.0] - 2026-02-20 · PR [#3](https://github.com/eumoitinho/tractian-challenge/pull/3) `feat/martech-analytics`

### Added

- **Consent management** — 4-category `ConsentState` with `localStorage` persistence, consent-gated dispatch
- **Analytics dispatcher** — GTM-compatible `window.dataLayer` push, pending events queue flushed on consent
- **Event tracking** — `page_view`, `cta_click`, `form_submit`, `section_view`, `consent_update`, `faq_expand`, `nav_click`
- **UTM capture** — extracts 5 UTM params from URL, persists in `sessionStorage`
- **Section tracking** — `useSectionTracking` hook with `IntersectionObserver` (50% threshold, 1s min)
- **Form analytics** — `useFormAnalytics` hook tracking field focus timing, form start/abandonment
- **Lead validation** — required fields check, email regex, business email detection (10 free providers)
- **Deduplication** — fingerprint-based (email + company) with 30-min sliding window
- **Enrichment** — UTM, locale, referrer, landing page, device type, form timing metrics
- **Scoring** — weighted model (max 100) across email type, plant size, job title, UTM, engagement; tier classification (hot >=70, warm >=40, cold <40)
- **CRM routing** — simulated webhook with exponential backoff retry (3 attempts), idempotency keys

## [0.2.0] - 2026-02-20 · PR [#2](https://github.com/eumoitinho/tractian-challenge/pull/2) `feat/page-sections`

### Added

- **Header** — responsive navbar with 5 mega-dropdown panels (Solutions, Who We Serve, Resources, Company, Pricing), locale switcher, demo CTA button
- **Hero** — split mobile/desktop layout with background image overlay, CTA, and testimonial quote card
- **WhyChoose** — left-side accordion with animated expand/collapse, right-side image swap per active tab
- **Features** — tabbed interface with directional slide animation, dynamic content from locale JSON
- **ValueProps** — 3-card layout with inline SVG icons, responsive row/column
- **Testimonials** — carousel with Swiper.js, auto-advance and pagination dots
- **LogoCarousel** — CSS-only infinite marquee on mobile, static grid on desktop
- **Steps** — 4-step numbered timeline, responsive column/row
- **CtaSection** — background image with dark overlay and CTA
- **FAQ** — accordion with animated expand/collapse, first item open by default
- **Footer** — link groups, certification badges from TRACTIAN CDN, social icons, privacy toggle

## [0.1.0] - 2026-02-19 · PR [#1](https://github.com/eumoitinho/tractian-challenge/pull/1) `feat/i18n-configuration`

### Added

- Next.js 14.2.35 project initialization with App Router and TypeScript strict mode
- Project dependencies: `next-intl`, `swiper`, `framer-motion`, `lucide-react`, `zod`, `clsx`, `tailwind-merge`
- `next-intl` configuration with routing, middleware, and locale-aware pathnames
- Locale layout with metadata generation and `NextIntlClientProvider`
- Remote image patterns for `imgix.tractian.com` and `tractian-webpage.s3.amazonaws.com`
- Three locale JSON files: `en.json`, `pt.json`, `es.json`
- URL routing matching TRACTIAN production paths:
  - `/en/who-we-serve/plant-manager`
  - `/solucoes-para-gerentes-industriais` (PT default, no prefix)
  - `/es/who-we-serve/plant-manager`

### Technical Decisions

- **App Router over Pages Router** — server components by default, layouts handle locale providers without prop drilling
- **Remote images from TRACTIAN CDN** — no local asset duplication, same sources as production
- **CSS-only logo carousel** — `@keyframes marquee` with duplicated DOM, zero JS, zero layout thrashing
- **Client-side form validation only** — as specified in requirements, Zod schemas with controlled inputs
- **Consent-gated analytics** — events queued until consent granted, strictly necessary always dispatched
- **Lead pipeline as client-side simulation** — demonstrates architecture (validation, dedup, enrichment, scoring, routing) without backend dependency

[Unreleased]: https://github.com/eumoitinho/tractian-challenge/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/eumoitinho/tractian-challenge/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/eumoitinho/tractian-challenge/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/eumoitinho/tractian-challenge/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/eumoitinho/tractian-challenge/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/eumoitinho/tractian-challenge/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/eumoitinho/tractian-challenge/releases/tag/v0.1.0
