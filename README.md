# Sporting FC Pallippadi

The website of Sporting FC Pallippadi, an arts and sports club in Mankada Pallipuram, Malappuram. Static and mobile-first: Next.js 16, Tailwind CSS 4, hosted on Vercel at https://sporting-fc-pallippadi.vercel.app

There is no backend, database or CMS. Every piece of content is a file in this repo, so updating the site means editing a file and committing it.

## Develop

Requirements: Node 24 (the scripts run TypeScript directly, which needs Node 22.18 or newer). ffmpeg is needed only to encode reels (Windows: `winget install Gyan.FFmpeg`).

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000 and the design styleguide at http://localhost:3000/styleguide.

| Command | What it does |
| --- | --- |
| `npm run dev` | Checks the data files, builds image variants, starts the dev server |
| `npm run build` | The same checks, then the production build |
| `npm run check` | Validates `src/data`; add `-- --strict` before launch so placeholders and missing files fail |
| `npm run images` | Rebuilds image variants after adding photos while the dev server is running |
| `npm run videos` | Encodes reels from `inputs/reels/` into `public/videos/` |
| `npm run lint`, `npm run typecheck` | ESLint and TypeScript |

## Updating content

Edit the file, run `npm run check` (it names the file and field of any mistake), commit to `main`. Vercel rebuilds the live site in about a minute.

### Add a photo album

1. Export the photos at 2000 px on the long edge, JPEG quality 80. Nothing larger goes in the repo.
2. Create a folder `public/gallery/<year>-<event>/` in lowercase with hyphens, for example `public/gallery/2026-spl-final/`. Name the files in words with no spaces: `001-spl-2026-final-mankada-pallipuram.jpg`.
3. Add the album to `src/data/albums.json`: `slug` (the folder name), `kind` (`captures` for the yearly black-and-white album, `memories` for the Marikkals-ground album, otherwise leave it out), `title`, `date` (YYYY-MM-DD), `cover` (one of the album's images), `description`, and `images`, each with `src` and `alt`. Alt text names the event, place and year: "SPL 2026 final, Pallippadi turf".
4. Run `npm run images`, or restart `npm run dev`. The script writes WebP files at 400, 800, 1200 and 1600 px plus a blur placeholder; nothing to do by hand.

### Add a reel

1. Put the original video in `inputs/reels/`, named in words: `spl-2026-final-goal.mp4`.
2. Run `npm run videos`. It writes `public/videos/<name>.mp4` and a `<name>.poster.webp` cover (the clearest of five frames), and prints the size and duration. Keep each reel under 3 MB; if one is over, rerun just that one with `npm run videos -- --only <name> --crf 30 --force` (31 to 34 for long reels).
3. Add it to `src/data/videos.json`: `slug`, `title`, `description` (one line), `date`, `src`, `poster`, `instagramUrl`, `duration` (seconds). Twelve at most; drop the oldest.

### Add a sponsor

1. Save the logo (a white-background version, SVG or PNG) as `public/sponsors/<name>.svg`.
2. Add an entry to `src/data/sponsors.json`: `name`, `tier` (`title`, `main`, `partner` or `supporter`), `role` (the label under the logo, like "Kit partner"; not needed for supporters), `logo`, `link` (Google Maps, Instagram or website), `since` (year), `active`. One title sponsor and four main sponsors at most.
3. When a sponsorship ends, set `active` to `false` instead of deleting the entry. Past sponsors stay on the Sponsors page by year.

### Add or change a member

`src/data/members.json`: `name`, `role`, `photo` (optional, `/members/<name>.jpg`, only with that person's consent), `since`, `officeBearer`, `order` (office bearers are listed in this order).

### Change the home page photos

`src/data/home.json` → `hero.slides`: the photos beside the crest, which crossfade one after another (`hero.seconds` each, 6 by default). Pick them from any gallery folder: each needs `image` (its path under `public/gallery/`) and `alt`. Up to 8; every slide is downloaded when the page opens, so fewer is faster. The first one is the photo search engines and slow connections see.

### Change Off the pitch

The section right after the hero shows every photo in `public/gallery/casual-team-images/` (winners' visits, weddings, outings) as two rows that drift sideways; hovering pauses a row and any photo opens full screen. There is no list to edit.

- **Add a photo:** export it at 2000 px on the long edge, drop it in that folder and run `npm run images` (or restart `npm run dev`). Photos alternate between the two rows in file-name order.
- **Captions:** `src/data/home.json` → `moments.captions` maps a file name to its alt text; `moments.title` is the heading.
- Videos in that folder are not shown; this section is photos only.

### The menu

The menu links to sections of the home page: Off the pitch, Squads, World Cup and Sponsors (`src/lib/site.ts` → `nav`, each pointing at a section `id`). The header stays at the top while scrolling.

### Change Tournament squads

The section shows every photo in `public/gallery/football-team/` (squads and trophies from other clubs' tournaments) as a staggered wall with no gaps, under one heading. There is no list to edit. The wall mixes portrait, square and landscape photos so it never lines up in rows; within each shape, photos keep their file-name order.

- **Add a photo:** export it at 2000 px on the long edge (phone originals are 4–6 MB), drop it in that folder and run `npm run images` (or restart `npm run dev`). Until then the dev server skips it with a warning.
- **Captions:** `src/data/home.json` → `squads.captions` maps a file name to its alt text, for example "Junior squad with the trophy at the Manjeri sevens". Files without one get "Tournament squads, photo 5".
- **Settings:** `squads.title` is the heading; `squads.initial` is how many photos show before the "Show all" button (12).

### Change the World Cup wall

The wall shows every photo and video in `public/gallery/2026-world-cup-fans/`, in file-name order. Nothing is grouped or sorted, and there is no list to edit.

- **A photo:** drop the JPEG in that folder and run `npm run images` (or restart `npm run dev`).
- **A video:** put the original in `inputs/reels/world-cup-fans/`, then run
  `npm run videos -- --in inputs/reels/world-cup-fans --out public/gallery/2026-world-cup-fans`.
  It writes the MP4 (under 3 MB) and its `.poster.webp` cover into the folder. Long videos need a higher `--crf`, as in "Add a reel".
- **Order:** files show in name order, so rename a file to move it.
- **Captions:** `src/data/home.json` → `fanZone.captions` maps a file name to its alt text (photos) or spoken label (videos). Files without one get "World Cup fan show, photo 3". `npm run check` flags a caption whose file is gone.
- **Heading and background:** `fanZone` also holds the `eyebrow`, `title`, `lead`, the `folder`, and `background`: the section's background photo, kept in its own gallery folder (`public/gallery/2026-world-cup-bg/`) so it does not show up on the wall.

### Change Next up

`src/data/next.json` is a list. Add the upcoming match, tournament or event with `title`, `date` (YYYY-MM-DD), `time` (HH:MM, 24-hour), `venue`, and optionally `mapLink`, `posterImage` and `presentedBy`. The card shows the soonest entry whose date has not passed, so old entries can stay.

### Post an update

Markdown files in `src/content/updates/`, named `<date>-<slug>.md`, with frontmatter: `title`, `date`, `description` (under 155 characters) and optionally `cover`. Four to six a year: SPL dates, champions, Nabi Dinam, the new ground, sponsor welcomes. (The `/updates` pages are built in the Build phase.)

### Replace the crest or the Drox.dev wordmark

1. Save the new file as `assets/brand/crest.png` (a large square PNG on a white background; an SVG export from the designer is even better) or `assets/brand/droxdev-wordmark.png` (a PNG with a transparent background).
2. Run `npm run brand`. It cuts the crest out of its white background, trims both files, writes the sizes the site uses and the browser and phone icons.
3. Commit everything it changed.

Don't put files in `public/img/`: that folder is rebuilt by the image script, which deletes anything it did not create.

### Club details

- `src/data/club.json`: tagline, email, WhatsApp number, address and PIN, the two grounds.
- `src/data/intents.json`: the five cards on the Contact page (donate, sponsor, host an event, help, report a case), each with its WhatsApp number and prefilled message.
- `src/data/spl.json`, `events.json`, `area.json`, `packages.json`: the SPL page, the community timeline, the Our area page and the sponsorship packages.

## Deploy

The Vercel project (Hobby plan) builds from the `main` branch of `ziyadmangalasseri/Sporting-FC`: every push to `main` goes live, and every other branch or pull request gets a preview URL. Vercel detects Next.js and runs `npm run build`, which runs the data check and the image script first; no settings to change.

The domain `sportingfc.droxdev.com` is a CNAME record in droxdev.com's DNS, pointing at the value Vercel shows under Project → Settings → Domains.

## Project documents

- `CLAUDE.md`: the build SOP and the repo notes. Claude Code reads it at the start of every session.
- `docs/plan.md`: the full plan, with the Instagram study, the reference research and the SEO plan.
- `inputs/facts.md`: the club facts and files still to collect.
