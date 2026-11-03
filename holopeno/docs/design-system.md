# holopeño design system: scoville terminal

black, bone, and one hologram green. heavy mono, square corners, no friendliness.

- **source of truth:** `lib/tokens.ts`. tailwind (`tailwind.config.ts`), the og and icon renderers, and the live page at `/design-system` all read from it. change a token there and everything follows.
- **live reference:** `/design-system` renders every token, the wordmark, each component, and the rules on this page.
- **brand files:** `/brand/wordmark.svg`, `/brand/wordmark-light.svg`, `/brand/mark.svg`, `/brand/mark-light.svg`. they are outlined from the font file at build time (`lib/brandSvg.ts`), so they don't depend on any installed font.

## name

- always lowercase: **holopeño**. never Holopeño, HOLOPEÑO, or holo-peño.
- ascii fallback for slugs, handles, repos and env vars: **holopeno**.
- the ñ carries the joke: a jalapeño rendered in light. it looks like a pepper and is mostly made of tokens.

## wordmark

`app/components/Wordmark.tsx` (web), `lib/ogArt.tsx` (og/icons), `lib/brandSvg.ts` (svg files). all three use the geometry in `lib/tilde.ts`.

- set in jetbrains mono extrabold, tracking -0.04em, leading 1.
- the tilde is always the hologram wave, never the font's own tilde. it has three layers:
  1. **ink**: one sine wave in the wordmark color (bone on char).
  2. **ghost**: the same wave in holo green, offset (+1.6, -1.3) like a misregistered projection, masked by horizontal scanlines.
  3. **tear**: a thin band of the wave that slips sideways during glitch frames. still images (og, icons, svgs) freeze it mid-tear.
- placement over the n: left 0.012em, top -0.02em, 0.576em x 0.297em. that matches the font's own ñ tilde band (0.065em to 0.22em from the top of the line box), drawn slightly wider.
- motion: a stepped 4.2s clock (`steps(1, end)`). the ghost jumps and the tear fires for about 5% of the cycle. it never eases. it stops under `prefers-reduced-motion`.
- default is bone on char. use char on bone only when the background isn't ours. on bone the ghost switches to skin green, because holo disappears on light.
- clear space: one n-width (0.6em) on every side.
- minimum size: 20px for the wordmark, 16px for the mark.
- **mark** (`Mark.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`): the ñ alone, bone on char. used for the favicon, apple icon, avatar and footer sign-off.
- never: gradients, glows, drop shadows, green base glyphs, outlines, italics, stretching, rounded containers or pills, or peppers, chili icons and flames next to it.

## color

| token      | hex       | on char | use                                                          |
| ---------- | --------- | ------- | ------------------------------------------------------------ |
| `char`     | `#0B0B0A` | canvas  | page background                                              |
| `soot`     | `#151513` | 1.08    | raised surfaces: code, callouts                              |
| `line`     | `#2A2A26` | 1.37    | hairlines, dividers, borders                                 |
| `bone`     | `#F2EFE6` | 17.13   | primary text. off-white, never pure white                    |
| `ash`      | `#9A968C` | 6.67    | secondary text: dates, meta, captions                        |
| `skin`     | `#3E7A1F` | 3.76    | deep jalapeño. **decoration only**: underlines, list markers |
| `jalapeno` | `#4F9A28` | 5.61    | jalapeño green for small labels and eyebrows                 |
| `holo`     | `#C6F432` | 15.37   | hologram accent: links, focus, the tilde, a primary action   |
| `ripe`     | `#FF4A1C` | 5.86    | red jalapeño: heat 5, errors, the 404                        |

rules:

- char and bone carry 95% of every screen. the green only works because it is rare.
- holo is the one loud thing per view. two loud things is zero loud things.
- never set text in skin. it fails body-text contrast.
- ripe is for heat 5, errors and the 404. nothing else.
- selection is holo on char. focus rings are a 2px holo outline, offset 3px.

## type

| family         | weights     | use                                |
| -------------- | ----------- | ---------------------------------- |
| jetbrains mono | 400/700/800 | wordmark, headings, ui, meta, code |
| inter tight    | 400/500/600 | long-form body copy only           |

scale (tailwind class = token name):

| token     | size / line height | use                         |
| --------- | ------------------ | --------------------------- |
| `micro`   | 12 / 16            | eyebrows, meta, footer      |
| `small`   | 14 / 22            | nav, captions, descriptions |
| `body`    | 17 / 30            | post body (sans)            |
| `lead`    | 20 / 30            | list titles, intros         |
| `h3`      | 22 / 30            | post h3                     |
| `h2`      | 28 / 36            | post h2                     |
| `h1`      | 40 / 46            | page and post titles        |
| `display` | 64 / 64            | wordmark, 404               |

- headings are mono extrabold with tight tracking. body is sans.
- everything is lowercase, including headings, nav, buttons and tags.
- eyebrows (`SectionLabel`) are lowercase, tracked 0.15em, jalapeño, and prefixed with a slash like a path: `/posts`.

## spacing, layout, radius

- tailwind's 4px grid. use only these named steps: hair `1` (4px), tight `2` (8px), snug `3` (12px), base `5` (20px, page gutter), loose `8` (32px), section `14` (56px, page top and bottom), chapter `24` (96px, empty states and the 404).
- one column. `max-w-content` (48rem) for pages, `max-w-prose` (42rem) for reading.
- structure comes from hairline rules in `line`. no cards, no shadows.
- radius: `rounded-none` everywhere. `rounded-nick` (2px) only on inline code and tags.

## motion

- `duration-snap` 120ms: hover color, underline.
- `duration-move` 200ms: anything that changes position.
- `ease-snap` `cubic-bezier(0.2, 0, 0, 1)`: all ui transitions.
- glitch: 4.2s on `steps(1, end)`. it's only used on the tilde.
- everything decorative stops under `prefers-reduced-motion`.

## components

all live in `app/components/`, one PascalCase file per component, named exports.

| component      | what it is                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| `Wordmark`     | the logo. `animated` defaults to true.                                                                    |
| `Mark`         | the standalone ñ. sized by `w-*` and `text-*`.                                                            |
| `TildeWave`    | the hologram tilde svg on its own. the building block for the two above.                                  |
| `ButtonLink`   | square mono link-button. `variant`: `solid` (holo, one per view), `outline` (default), `bare`.            |
| `NavLink`      | ash link that goes holo on hover. uses a plain `<a>` for feeds and external urls.                         |
| `Tag`          | `#tag` chip with a 2px nick.                                                                              |
| `HeatMeter`    | five-cell scoville rating, 1 (mild) to 5 (do not touch your eyes). level 5 goes ripe.                     |
| `SectionLabel` | the `/eyebrow`.                                                                                           |
| `Callout`      | mdx aside. `tone`: `note` (holo rule) or `hot` (ripe rule). at most one per post.                         |
| `PostList`     | index rows: date, title, description, reading time, heat.                                                 |
| `RuleList`     | rule and reason rows, used on `/design-system`.                                                           |
| `MdxContent`   | renders post mdx with the holopeño code theme (`lib/codeTheme.ts`) and exposes `Callout` and `HeatMeter`. |

prose styling is the `.prose-holo` class in `app/globals.css`.

## posts and heat

frontmatter takes an optional `heat: 1-5`. it rates how spicy the take is, not how good the post is. it shows on the index, the post header and the post's og image.

## voice

- deadpan, short declarative sentences. the joke lands harder when nobody is winking.
- one food pun per page, maximum.
- no exclamation marks, no emoji.
- error copy stays in character: the 404 says "this page was hallucinated."

## generated assets

| route                           | source                                 |
| ------------------------------- | -------------------------------------- |
| `/icon` (32px png favicon)      | `app/icon.tsx`                         |
| `/apple-icon` (180px png)       | `app/apple-icon.tsx`                   |
| `/opengraph-image` (1200x630)   | `app/opengraph-image.tsx`              |
| `/posts/<slug>/opengraph-image` | `app/posts/[slug]/opengraph-image.tsx` |
| `/brand/*.svg`                  | `app/brand/[asset]/route.ts`           |

og frame: char field with faint soot scanlines, an 8px holo rule on the left edge, a `/eyebrow` in jalapeño, and the wordmark or post title in extrabold. fonts are jetbrains mono regular and extrabold from `assets/fonts/` (ofl, see `assets/fonts/OFL.txt`).
