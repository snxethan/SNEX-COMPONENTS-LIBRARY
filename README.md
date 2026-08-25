# @snxethan/snex-components

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

Shared React components extracted from [ethantownsend.dev](https://ethantownsend.dev).

The portfolio is the source of truth: components are promoted out of it, with
anything site-specific (data, endpoints, copy) lifted into props. Nothing here
imports `next/*`, so the same build runs in Next.js, Vite, Electron, or CRA.

## Install

No npm registry publish — install straight from git:

```bash
npm install github:snxethan/snex-components
```

A `prepare` script builds `dist/` during install, so the repo carries no build
output. Pin a branch or tag with `github:snxethan/snex-components#v0.3.0`.

Peer dependencies: `react` and `react-dom` (18, 19, or 20).

## Styles

Components are styled with Tailwind utilities, but **consumers do not need
Tailwind**. The build compiles every utility the components use into a
self-contained stylesheet, with preflight disabled so it never resets your app.

```js
import '@snxethan/snex-components/styles.css'
```

If your app already runs Tailwind v4 and you would rather it generate the
utilities itself, skip that import and point Tailwind at the package instead:

```css
@import "tailwindcss";
@source "../node_modules/@snxethan/snex-components/dist";
```

Going that route, you also need these custom classes in your own CSS, since
Tailwind cannot generate them: `animate-fade-in-up`, `animate-fade-out-down`,
`animate-elastic-in`, `animate-elastic-out`, `animate-pin-bounce`,
`animate-tag-extend`, `animate-tag-hide`, `animate-sort-menu-in`,
`animate-sort-menu-out`, `footer-links`, and `scroll-edge-fade`. Copy them from
[`src/styles.css`](src/styles.css).

## Framework adapters

Components that render images resolve one from context rather than importing a
framework. Without a provider they fall back to a plain `<img>`, which is all a
Vite or Electron app needs.

Next.js apps should hand over `next/image` to keep optimisation:

```tsx
import Image from 'next/image'
import { SnexUIProvider } from '@snxethan/snex-components'

<SnexUIProvider imageComponent={Image}>{children}</SnexUIProvider>
```

## Components

| Component | Notes |
| --- | --- |
| `Navbar` | Pinnable nav with hover/long-press context menus. `brand`, `tabs`, `subItems`, and `pinStorageKey` are props; defaults match the portfolio. Publishes its height as `--navbar-height`. |
| `Footer` | Social icons, avatar, copyright, domain links. `onAvatarClick` makes the avatar a button. |
| `Avatar` | Seasonal avatar. `seasonal` takes date rules; resolved after mount to avoid hydration mismatch. |
| `Timeline` | Experience/education/project entries with tag filtering and an image carousel. |
| `PageTabs` | Controlled tab strip. |
| `SearchFilterBar` | Fully controlled search + tag filter + sort. |
| `ScrollArrows` | Edge arrows driving a horizontal scroller via `containerRef`. |
| `ResponsiveCardSkeletonGrid` | 1/2/3-column skeleton slots. |
| `TooltipWrapper` | Tooltip with PDF and image preview popovers. |
| `PDFModalViewer` | PDF or image modal; falls back to a new tab where inline preview is unreliable. |
| `SecurityPolicyModal` | Policy modal. `sections` is a prop. |
| `HealthModal` | Probes `endpoints` with GET and reports status/latency. |
| `ContactFormModal` | Contact form POSTing to `endpoint` (default `/api/contact`). |
| `ExternalLinkHandler` | Provider + `useExternalLink()` for external-link interstitials. |

Utilities: `isPdfPreviewSupported`, `scrollElementIntoViewWithNavbarOffset`,
`setTimedItem` / `getTimedItem` / `removeTimedItem`.

## Example

```tsx
import {
  SnexUIProvider, ExternalLinkHandler, Navbar, Footer, HealthModal,
} from '@snxethan/snex-components'
import '@snxethan/snex-components/styles.css'

export default function App() {
  const [health, setHealth] = useState(false)

  return (
    <SnexUIProvider>
      <ExternalLinkHandler>
        <Navbar
          brand="example.dev"
          activePage="about"
          activeTab={null}
          onTabChange={(page, tab) => router.push(`/${page}?tab=${tab ?? ''}`)}
        />
        <main>…</main>
        <Footer onAvatarClick={() => setHealth(true)} avatarLabel="Show API health" />
        {health && (
          <HealthModal endpoints={['/api/health']} onClose={() => setHealth(false)} />
        )}
      </ExternalLinkHandler>
    </SnexUIProvider>
  )
}
```

## Development

```bash
npm run build       # tsup (ESM + CJS + .d.ts), then the Tailwind CSS build
npm run typecheck
```

`build:css` must run after `tsup`, which cleans `dist/`.
