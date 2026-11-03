# holopeño

spicy notes on llms and shipping software. a tech blog by sasha.

next.js 15 (app router) · mdx via `next-mdx-remote` · tailwind 3 · pnpm · vercel.

this directory is self-contained. it moves as-is to its own repo, `sashakhad/holopeno`, and production deploys from that repo's `main` on vercel.

## local

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm type-check
pnpm build && pnpm start
```

## writing

posts live in `posts/YYYY/MM/*.mdx`:

```md
---
title: 'lowercase title'
date: '2026-11-03'
tags: [llms]
heat: 3
description: 'shown on the index, in rss and og.'
draft: false
---
```

- `heat` (optional, 1-5) is the scoville rating of the take.
- `draft: true` keeps a post out of the index, rss and sitemap. the slug still opens, with noindex.
- the slug comes from the filename, or from an explicit `slug:` in frontmatter. treat it as permanent.
- mdx can use `<Callout tone='note' | 'hot' label='...'>` and `<HeatMeter level={n} />`.

## design system

see [`docs/design-system.md`](docs/design-system.md) and the live page at `/design-system`.

- tokens: `lib/tokens.ts`, the single source for tailwind, og images, icons and the docs page.
- wordmark: jetbrains mono extrabold. the ñ tilde is a hologram wave (`lib/tilde.ts`).
- brand files: `/brand/wordmark.svg`, `/brand/wordmark-light.svg`, `/brand/mark.svg`, `/brand/mark-light.svg`.
- all site copy lives in `lib/site.ts` (name, tagline, author, x handle placeholder).

## feeds + seo

- `/rss.xml`: guids are `holopeno:<slug>` with `isPermaLink="false"` (`lib/feed.ts`), so a domain change never re-sends old posts to readers.
- `/sitemap.xml`, `/robots.txt`, per-page canonicals, generated og images per post.
- site url: `NEXT_PUBLIC_SITE_URL`, else `VERCEL_PROJECT_PRODUCTION_URL`, else `VERCEL_URL`, else localhost.

## code rules

- typescript with explicit types. function declarations. no `reduce`, no needless casts.
- named exports. one PascalCase file per component in `app/components/`.
- imports are relative (no `@/` alias). this keeps the directory portable and stops it colliding with a parent project's path aliases.

## deploy

- vercel project linked to `sashakhad/holopeno`, production branch `main`. every other branch gets a preview.
- changes land via pull request into `main`. no force-pushes, no `--no-verify`.
- set `NEXT_PUBLIC_SITE_URL` for production once the domain is attached.
