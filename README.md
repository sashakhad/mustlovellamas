# Must Love LLaMas

Sasha Khadaroo's tech blog. Next.js, MDX, Vercel.

The personal blog stays at [sashakhad/blog-public](https://github.com/sashakhad/blog-public). This repo is the one I point people at for engineering writing.

## Local

```bash
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000)

## Writing

Posts live in `posts/YYYY/MM/*.mdx`.

```bash
pnpm create    # new dated .mdx file
pnpm publish   # git add posts && commit
```

Frontmatter:

```md
---
title: "Title"
date: "2026-09-01"
tags: [nextjs, mdx]
description: "Shown on the index and in RSS."
---
```

Set `draft: true` to keep a file out of the index, RSS, and sitemap. The slug still opens.

## Photos

Put files in `public/images`. In MDX:

```md
![Caption from alt text](/images/shot.png)
```

```mdx
<MdxImage src="/images/shot.png" alt="Shot" width={1400} height={900} caption="Optional caption" />
```

## Deploy

Push to `main`. Vercel builds with `pnpm build`. Set `NEXT_PUBLIC_SITE_URL` to the production domain so RSS, sitemap, and Open Graph URLs stay correct.
