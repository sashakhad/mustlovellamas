# holopeño design system

dry, spicy, confident. a terminal that grew a pepper. black and bone do the work; one hot green does the talking.

- token source: [`design/tokens.ts`](../design/tokens.ts) (consumed by `tailwind.config.ts`, the next/og renders, and `lib/utils.ts`)
- tilde geometry: [`lib/tilde.ts`](../lib/tilde.ts)
- live reference: `/design` (noindex, disallowed in robots, not in the sitemap). it renders the real tokens and components.

## brand

- the name is always lowercase: **holopeño**. never "Holopeño", never "HOLOPEÑO", never `uppercase` on any element that can contain it. ascii form for slugs, handles, package names: `holopeno`.
- voice: lowercase, short, deadpan. one joke per surface, max. no exclamation marks, no emoji, no "✨". confident over cute: "this page was hallucinated." not "oopsie!".
- the pun stays in the name (jalapeño × hologram). copy may reference heat and scoville sparingly; don't explain the joke.

## color

dark only. `color-scheme: dark`.

| token    | hex       | role                                                        |
| -------- | --------- | ----------------------------------------------------------- |
| `char`   | `#0B0B0A` | page background                                             |
| `soot`   | `#151513` | raised surface: inputs, inline code                         |
| `line`   | `#2A2A26` | hairlines, borders, dividers                                |
| `smoke`  | `#6B6860` | placeholders, counts. never body text (3.5:1)               |
| `ash`    | `#A29E93` | secondary text, meta (7.3:1 on char)                        |
| `bone`   | `#F2EFE6` | primary text, the wordmark                                  |
| `pepper` | `#3E7A1F` | jalapeño skin: rules, list markers, `#`/`//` glyphs, og bar |
| `seed`   | `#C6F432` | the heat: links, hover, focus, selection, active state      |
| `heat`   | `#FF4D1A` | capsaicin: drafts and errors only                           |

rules:

- one accent per view. `seed` is for things you can act on (links, focus rings, active tags) plus the tilde ghost. never as a large fill behind body text.
- `pepper` is 3.7:1 on char: large text and decoration only, never small text.
- `heat` never appears on a normal published page. if you see red, something is a draft or broken.
- no gradients, no pastels, no glow/blur. the only "effect" is the hologram tilde.

## type

two families, both via `next/font/google`:

- **mono** (`font-mono`, JetBrains Mono 400/700/800): wordmark, headings, titles, nav, meta, labels, buttons. it does the talking.
- **sans** (`font-sans`, Inter Tight 400–600): body copy and descriptions. it does the reading.

| token     | size / line-height               | tracking | use                               |
| --------- | -------------------------------- | -------- | --------------------------------- |
| `hero`    | clamp(3rem, 11vw, 6.5rem) / 0.95 | -0.05em  | wordmark hero, 404                |
| `display` | 2.5rem / 2.75rem                 | -0.04em  | page and post titles (mono 800)   |
| `title`   | 1.375rem / 1.875rem              | -0.02em  | post rows, h2 (mono 800)          |
| `body`    | 1.0625rem / 1.875rem             | 0        | prose (sans)                      |
| `meta`    | 0.8125rem / 1.25rem              | 0        | dates, tags, nav, buttons (mono)  |
| `micro`   | 0.6875rem / 1rem                 | 0.16em   | `// kicker` labels, footer (mono) |

rules: headings are mono `font-extrabold`, lowercase via content (h2-h4 in prose are forced `lowercase`). dates render as `yyyy.mm.dd`. body measure is `max-w-measure` (42rem).

## spacing, layout, radius, elevation

- spacing: stock tailwind 4px scale, unmodified. page gutter `px-5`, section rhythm `py-14`, row rhythm `py-7`.
- widths: `max-w-page` (64rem) for chrome and the index grid, `max-w-measure` (42rem) for reading.
- radius: none. everything is square. `rounded-hair` (2px) exists for inline code only. no pills.
- elevation: no soft shadows. `shadow-slab` (4px hard offset in `seed`) is the one lift, used on hover of solid buttons. `shadow-slab-sm` (2px) for small chips if ever needed.
- borders do the structure: `border-line` hairlines between rows, around inputs, around the gallery grids.

## motion

| token                  | value                      | use                                  |
| ---------------------- | -------------------------- | ------------------------------------ |
| `duration-snap`        | 80ms                       | buttons, tags, archive               |
| `duration-quick`       | 160ms                      | link color, input focus              |
| `ease-out`             | cubic-bezier(0.2, 0, 0, 1) | all ui transitions                   |
| `animate-holo-flicker` | 4.2s, steps(1)             | the tilde's green ghost              |
| `animate-holo-tear`    | 4.2s, steps(1)             | the tilde's top row tearing sideways |

rules: ui moves fast or not at all. the only ambient motion on the site is the tilde glitch, and it is off under `prefers-reduced-motion`. no fades on page load, no scroll effects.

## the wordmark

`<Wordmark />` (`app/components/Wordmark.tsx`): "holope" + "n" + "o" in JetBrains Mono ExtraBold, with the ñ tilde drawn over the n as a hologram:

- a 6×2 pixel wave (`.##..#` / `#..##.`), exactly one monospace advance (0.6em) wide.
- each pixel is split into two scanlines (`scanlines`, on by default). below ~48px, pass `scanlines={false}` for solid pixels; the header does this.
- a `seed` ghost copy sits 0.34 px-cells to the right, like chromatic aberration. when animated it flickers and the top row tears sideways every ~4s.
- placement lives in `tildePlacement` (`lib/tilde.ts`), in em. the html wordmark, og wordmark, and app mark all read it, so they can't drift.

usage:

- bone on char by default. char on bone is allowed (static, `animated={false}`). never on `seed` or `pepper`.
- the ghost is always `seed`. don't recolor it.
- min size 20px. clear space: 0.5em on all sides.
- never set the name in another font, never add a tagline lockup to the wordmark itself, never use a real `ñ` glyph in place of the drawn tilde in the mark (plain text in copy is fine).
- the app mark (`<Mark />`, used by `icon.tsx` and `apple-icon.tsx`) is the lone ñ on char.

## components

all in `app/components/`, PascalCase files, named exports.

| component                  | notes                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `Wordmark`                 | see above. `animated`, `scanlines`, `className` (set size with a `text-*` class)             |
| `Tilde`                    | the pixel tilde as svg. works in the dom and in next/og (satori-safe attributes only)        |
| `Mark`                     | square app mark for icons (next/og)                                                          |
| `OgWordmark`, `OgCard`     | 1200×630 og layouts for the site and each post                                               |
| `Kicker`                   | `// label` section header. `as` sets the element                                             |
| `Button`                   | `solid` / `outline` / `text`; `active` renders solid with `aria-pressed`                     |
| `Tag`                      | `#tag`. interactive (square, toggles, `aria-pressed`) when given `onSelect`, else plain text |
| `Heat`                     | reading time as a 5-pip scoville meter, one pip per ~3 min                                   |
| `SearchForm`               | react-hook-form, `>` prompt, "grep" placeholder                                              |
| `PostRow`                  | index row: stamp column, title, description, heat, tags                                      |
| `PostList`                 | home: intro, search, tag cloud, filtered list, pagination, archive                           |
| `ArchiveNav`, `Pagination` | archive by year/month; zero-padded page buttons                                              |
| `MdxContent`, `MdxImage`   | mdx rendering (`vitesse-black` code theme) and figures                                       |

prose lives in `.prose-holo` (`app/globals.css`): `##` prefix on h2 in pepper, square list markers in pepper, seed links with pepper underline, `~ ~ ~` for `<hr>`.

## seo, feeds, icons

- `/rss.xml`: `<guid isPermaLink="false">holopeno:post:<slug></guid>`. slug-based, independent of domain, so moving domains never re-sends posts. don't change a slug after publishing.
- `/sitemap.xml`, `/robots.txt` (disallows `/design`), `/manifest.webmanifest`.
- `/opengraph-image` (site) and `/posts/<slug>/opengraph-image` (per post), both static at build.
- `/icon` (32px) and `/apple-icon` (180px), rendered from `<Mark />`.
- optional `canonical:` frontmatter points a post's canonical at its original (e.g. a must love llamas url).
