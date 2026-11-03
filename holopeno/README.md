# holopeño

spicy notes on llms and shipping software. sasha k's tech blog.

next.js 15 (app router), mdx via `next-mdx-remote`, tailwind 3, pnpm, vercel.

> this directory is temporary. it was copied from must love llamas and lives here on the
> `holopeno` branch until it moves to its own repo, `sashakhad/holopeno`. it is a standalone
> app: its own `package.json`, lockfile, and config. it does not touch the must love llamas app.

## local

```bash
cd holopeno
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm type-check
pnpm build && pnpm start
```

## design system

[`docs/design-system.md`](docs/design-system.md). tokens are in [`design/tokens.ts`](design/tokens.ts). `/design` renders them live.

## writing

posts live in `posts/YYYY/MM/*.mdx`.

```bash
pnpm create    # new dated .mdx file
pnpm publish   # git add posts && commit
```

```md
---
title: 'lowercase title'
date: '2026-11-02'
tags: [llms]
description: 'shown on the index, in rss and og.'
canonical: 'https://mustlovellamas.com/posts/original-slug' # optional
---
```

`draft: true` keeps a post out of the index, rss, and sitemap. the slug still opens, noindexed.

photos go in `public/images`. `![alt becomes the caption](/images/shot.png)` or `<MdxImage src=... width={1400} height={900} caption="..." />`.

## imports

imports inside this app are relative, not `@/`. while it lives inside the mustlovellamas checkout, that repo's root `tsconfig.json` also type-checks these files, and its `@/` alias points at the root app. switch to `@/` after the move.

## deploy

not deployed yet. after the move: a vercel project linked to `sashakhad/holopeno`, production from `main`, `NEXT_PUBLIC_SITE_URL` set to the production domain so rss, sitemap, and og urls are absolute and correct.
