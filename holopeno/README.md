# holopeño

spicy notes on llms and shipping software. a tech blog by sasha.

next.js 15 (app router) · mdx via `next-mdx-remote` · tailwind 3 · pnpm · vercel.

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
title: "lowercase title"
date: "2026-11-02"
tags: [llms]
description: "shown on the index, in rss and og."
draft: false
---
```

`draft: true` keeps a post out of the index, rss and sitemap (the slug still opens, noindex).

## brand

- name is always lowercase: `holopeño`. ascii slug/handle: `holopeno`.
- direction a, "scoville terminal": char `#0B0B0A`, bone `#F2EFE6`, ash `#9A968C`, pepper `#3E7A1F`, seed `#C6F432`.
- wordmark: jetbrains mono extrabold; the ñ tilde is an svg sine wave doubled in seed green with a slight flicker (`app/components/Wordmark.tsx`, off under reduced motion).
- og image, favicon and apple icon are generated with `next/og` (`app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`) from `assets/fonts/JetBrainsMono-ExtraBold.ttf` (ofl, see `assets/fonts/OFL.txt`).
- all site copy lives in `lib/site.ts` (name, tagline, author, x handle placeholder).

## feeds + seo

- `/rss.xml`: guids are `holopeno:<slug>` with `isPermaLink="false"`, so a domain change never re-sends old posts to readers.
- `/sitemap.xml`, `/robots.txt`, per-page canonicals.
- site url: `NEXT_PUBLIC_SITE_URL`, else `VERCEL_PROJECT_PRODUCTION_URL`, else `VERCEL_URL`, else localhost.
- cross-posting from must love llamas: set the copy's `alternates.canonical` to the original url.

## deploy

- vercel project linked to `sashakhad/holopeno`, production branch `main`. production deploys only from `main`; every other branch gets a preview.
- changes land via pull request into `main`. no force-pushes, no `--no-verify`.
- set `NEXT_PUBLIC_SITE_URL=https://holopeno.com` for production once the domain is attached.
