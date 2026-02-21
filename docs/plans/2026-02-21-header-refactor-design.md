# Header Refactor Design

Decompose `Header.tsx` (~450 lines) into focused sub-components within `src/components/layout/Header/`. Target: Header.tsx under 150 lines.

## File Structure

| File | Status | Purpose |
|------|--------|---------|
| `Header.tsx` | Modified | Orchestrator. Owns hooks, data fetching, top bar layout, overlay backdrop. ~120-140 lines. |
| `MobileMenu.tsx` | New | Full-screen mobile menu with accordion sections + bottom CTA buttons |
| `LanguageSwitcher.tsx` | New | Desktop globe button + locale dropdown |
| `DesktopDropdowns.tsx` | New | Exports `WhoDropdown`, `ResourcesDropdown`, `CompanyDropdown`, `PricingDropdown` |
| `DesktopSolutionsDropdown.tsx` | Unchanged | Already extracted |
| `IconBox.tsx` | Unchanged | |
| `TractianLogo.tsx` | Unchanged | |
| `HeaderIcons.tsx` | Unchanged | |
| `constants.ts` | Unchanged | |
| `index.ts` | Unchanged | Only exports `Header` externally |

## Component Props

### MobileMenu

```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  onLocaleChange: (locale: string) => void;
  onDemoClick: () => void;
  solutionsData: SolutionColumn[];
  industriesData: IndustriesData;
  resourcesData: ResourcesData;
  companyData: CompanyData;
  pricingData: string[];
  translations: {
    solutions: string;
    whoWeServe: string;
    resources: string;
    company: string;
    pricing: string;
    login: string;
    getDemo: string;
  };
}
```

- Owns `useState` for `expandedSection`
- Owns `useEffect` for `document.body.style.overflow` lock with cleanup
- Calls `trackNavClick` on every navigation link click

### LanguageSwitcher

```typescript
interface LanguageSwitcherProps {
  locale: string;
  isOpen: boolean;
  onToggle: () => void;
  onLocaleChange: (locale: string) => void;
}
```

- Stateless. Open/close state managed by Header.

### DesktopDropdowns (4 named exports)

```typescript
interface WhoDropdownProps { isOpen: boolean; industriesData: IndustriesData; }
interface ResourcesDropdownProps { isOpen: boolean; resourcesData: ResourcesData; }
interface CompanyDropdownProps { isOpen: boolean; companyData: CompanyData; }
interface PricingDropdownProps { isOpen: boolean; pricingData: string[]; }
```

- Each handles its own layout
- All share the open/close animation pattern via `cn()` with `opacity-0 invisible` / `opacity-100 visible`
- All call `trackNavClick` on link clicks

### Header.tsx (after refactor)

Keeps: `useHeaderDropdowns()` hook, translations, data fetching, `DesktopNavItems` (~15 lines), overlay backdrop, desktop top bar layout.

Delegates: mobile menu, language selector, all 5 dropdown panels.

## Analytics Integration

Add `trackNavClick(label, href)` from `@/lib/analytics/events` to:

- Desktop dropdown links (all 5 panels)
- Mobile accordion links (all sections)
- Desktop/Mobile "Login" link (`"login"`, `"https://app.tractian.com"`)

Skip "Get Demo" button (tracked by form analytics system).

## Code Quality Standards

- Zero comments in all touched/created files
- `cn()` for all conditional classNames
- Props destructured in function signatures
- `handle*` prefix for event handlers
- Explicit TypeScript interfaces, no `any`
- `"use client"` on MobileMenu, DesktopDropdowns, LanguageSwitcher
- `useEffect` cleanup for body overflow lock in MobileMenu
