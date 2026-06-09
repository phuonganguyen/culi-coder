# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # start dev server at localhost:3000
yarn build        # production build
yarn start        # serve production build
yarn type-check   # run tsc --noEmit
```

No test suite is configured. Type checking is the primary correctness tool.

## Architecture

Personal blog / portfolio site built with **Next.js 12 + TypeScript + Tailwind CSS**.

### Data layer

All content (blog posts, experience entries, tags) lives in **Hygraph (GraphCMS)**. `src/services/index.ts` contains all GraphQL queries using `graphql-request`. The endpoint is set via `NEXT_PUBLIC_GRAPHCMS_ENDPOINT`.

Pages that fetch from Hygraph use `getStaticProps` with ISR (`revalidate: 10`).

### Additional integrations

- **Spotify** — `src/utils/spotify.ts` fetches the currently-playing track using the client credentials flow. Three env vars required: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`. The API route is `src/pages/api/now-playing.ts`.
- **Utterances** — blog post comments; configured via `NEXT_PUBLIC_UTTERANCES_REPO`.

### Path alias

`@/` resolves to `src/` (set in `tsconfig.json`).

### Key files

| File | Purpose |
|---|---|
| `src/data/siteMetadata.ts` | Site-wide config (title, author, social links, comment provider) |
| `src/data/headerNavLinks.ts` | Navigation links rendered in the header |
| `src/services/index.ts` | All Hygraph GraphQL queries |
| `src/components/CommandBar.tsx` | kbar command palette (opens with Cmd+K) |
| `src/pages/_app.tsx` | App shell: wraps everything in `CommandBar` → `ThemeProvider` → `Layout` |
| `next.config.js` | Image domain allowlist (`ap-southeast-2.graphassets.com`), SVG via `@svgr/webpack` |

### Content model (Hygraph)

`experiences` fields used by `src/components/Experience.tsx`:
- `title`, `company`, `companyUrl`, `companyLogo.url`
- `startDate`, `endDate`, `current`
- `description.text` — newline-separated role bullets (split on `\n` at render time)

`posts` fields: `slug`, `title`, `excerpt`, `tags[].slug`, `featuredImage.url`, `createdAt`, `content.html`

### Theming

`next-themes` with `attribute="class"`. Dark mode classes follow Tailwind's `dark:` prefix convention. Default theme is `system` (set in `siteMetadata.ts`).
