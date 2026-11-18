# Sporting FC Pallippadi — Website SOP Prompt & Plan

Nov 8, 2026 · @XYZ

## 1. Project brief

The site is a frontend-only, mobile-first showcase for Sporting FC Pallippadi that does four jobs: carry the club's brand, honour its sponsors, show its gallery, and rank on Google for the club's name and locality.

| Item | Detail |
| --- | --- |
| Club | Sporting FC Pallippadi — arts and sports club, formed about two years ago (2024) |
| Roots | Grew out of Marikkals FC, the village's first club; Marikkals FC still runs under the senior members and fully backs Sporting FC. The site tells this as pride in both clubs |
| Address | Mankada Pallipuram (Google Maps spelling; the club writes Pallippuram), Malappuram district, Kerala, India; the club serves Mankada, Pallipuram, Anakkayam, Koottilangadi, Padinhattummuri and Manjeri |
| Instagram | [@sportingfc.ppd](https://www.instagram.com/sportingfc.ppd) |
| Domain | sportingfc.droxdev.com (a subdomain of Drox.dev's site; no domain purchase for now), hosted on Vercel's free plan |
| Scope (v1) | Static frontend only: no backend, no CMS, no media-storage service. Images and a curated set of reels live in the repo, text content in JSON/Markdown files |
| Out of scope (v1) | Logins, member registration with storage, live scores, payments, admin panel, any form that stores data |
| Audience | Local members and youth players, families in the villages above, local businesses (current and future sponsors), expat members in the Gulf, visitors to tournaments and arts events |
| Language | English only; no Malayalam text anywhere on the site |
| Credit | "Built by Drox.dev" in the footer; Drox.dev listed as technology partner among the sponsors |
| Success | First page of Google for "Sporting FC Pallippadi" and "club Mankada Pallipuram" searches, Lighthouse scores of 90+ on mobile, under 2 s load on 4G |

Build order follows the frontend-first workflow: a clickable prototype to finalise the UI, then the production frontend, with a backend only if a later phase needs one.

## 2. Brand & identity (what the Instagram page tells us)

Sporting FC Pallippadi presents itself as a tight brotherhood that plays 7s football, runs its own league, celebrates World Cup fan culture with giant flex boards, and shows up for the community on Nabi Dinam, Eid and members' weddings. The page is image-first with emoji captions, so the website has to carry the words Instagram leaves out.

**Profile facts (as of 8 Nov 2026).** Handle [@sportingfc.ppd](https://www.instagram.com/sportingfc.ppd), display name SPORTING FC PALLIPPADI, 212 followers, 2 following. Bio: "WELCOME · official page of.. · HOME TOWN · MANKADA PALLIPPURAM, PALLIPPADI · #manjeri #malppuram #pallippadi". Posts run from September 2025 to October 2026, with collaborations tagged with @stories\_of\_plprm (പള്ളിപ്പുറക്കാര്), @paaddam and ഞങ്ങൾ ♡.

**Crest.** A white shield with a green border, "SPORTING FC" arched across the top in deep green, a crimson eagle with spread wings at the centre, and "PALLIPPADI" on a ribbon at the base. The three colours (deep green, crimson, white) and the eagle are the brand; the 20 December 2025 post captioned 💚✊🏻 points to green as the club colour.

**Story highlights.** Home 💎 · SPL 💥 (poster reads "PALLIPPADI LEAGUE" with a football: the club's own tournament) · ❤️‍🔥💎 · നബി ദിനം 💜 · 🏆💗.

| Content theme | What the posts show | What it means for the site |
| --- | --- | --- |
| 7s football | Night turf matches under floodlights, team photos in Argentina, Brazil and Portugal jerseys, "Just a 7s night" (25 Jan 2026) | A Matches/7s section and floodlit-turf photography as the hero mood |
| SPL (Pallippadi League) | Own highlight, league poster, January 2026 posts | SPL needs its own page: format, editions, champions, sponsors |
| World Cup fan culture | June 2026 flex boards and cut-outs for Brazil, Portugal, Argentina and France branded "PALLIPPADI", fireworks reels | A "Fan culture" gallery album; this is the most shareable, most Malappuram-specific content the club has |
| Community and faith | Nabi Dinam food distribution (5 Sep 2026), Eid group photos in traditional dress, a member's wedding (7 Oct 2026) | The "Arts & community" half of the club identity; events timeline and a values statement |
| Year in review | "Captures 2025" collage, caption "one last time" (28 Dec 2025), gold lettering on black and white | A yearly "Captures" album pattern the gallery can repeat |

**Tone.** Captions are one to three emojis (🫶🏻, 💚✊🏻, 🇧🇷😮‍💨), Malayalam and English mixed, warm and informal. Posts draw 40 to 84 likes against 212 followers, roughly 20 to 40 percent engagement, which points to a close-knit audience, not a broad one.

**Visual style.** Natural photography: floodlit green turf at night, coconut palms and monsoon skies, hand-painted flex-board art, black-and-white collages with a single gold accent. No stock imagery anywhere.

**Seen but unconfirmed.** A hardware-shop sponsor board stands behind one team photo; the name is not legible without logging in. The club should confirm the sponsor list (section 11).

Source: [instagram.com/sportingfc.ppd](https://www.instagram.com/sportingfc.ppd), viewed in the browser on 8 Nov 2026 (first 24 posts, profile and highlights; deeper posts sit behind a login wall).

## 3. Reference research: club websites at three levels

The clear gap is at the local level: Kerala's village arts-and-sports clubs live on Instagram and Facebook and almost none has a website, so a well-built one for Sporting FC Pallippadi would have little competition in search. The professional sites show what to borrow (a strong tagline, a next-event block, a tiered sponsor wall) and what to avoid (walls of text, cluttered footers).

| Site | Level | What works | What to avoid |
| --- | --- | --- | --- |
| [Sporting CP](https://sporting.pt/) (Lisbon, multi-sport, 1906) | International | Numbered nav (00 Home … 08 Clube), one green theme colour (#027F56), a full-bleed hero with a single "Join the family" call, a next-match countdown block, a scrolling marquee "SPORTING CLUBE DE PORTUGAL ✳ DESDE 1906 ✳", an icon grid of 33 sports, a Clube page built on four values (Esforço, Dedicação, Devoção e Glória), only three partner logos in the footer | Nothing for a small club to avoid; the scale of ticketing and shop is simply not needed |
| [FC St. Pauli](https://www.fcstpauli.com/en) (Hamburg, multi-sport, 1910) | International | Three-item nav (Home, Football, Club), the tagline "Causing good trouble." in the header, two main sponsors beside the logo, a sponsor carousel on the home page, Guiding Principles and Membership as first-class pages, an Easy Read accessibility version, DE/EN toggle | Consent banners blocking embedded video |
| [Clapton Community FC](https://www.claptoncfc.co.uk/) (London, fan-owned, 2018) | International grassroots | Tagline "100% fan-owned football in East London" under the logo, a "Next up at the ground" strip, admission info in plain numbers (£5, pay what you can, under-13s free), a contact form with a "which committee?" selector, awards listed as proof, affiliate logos in the footer, gallery outsourced to Flickr | A seven-level Teams menu; WordPress-default fixture tables that look like spreadsheets |
| [Kerala Blasters FC](https://keralablastersfc.in/) (Kochi, ISL) | Kerala professional | A tiered sponsor wall with a role label under every logo (Title Partner, Principal Partner, Associate, Official; "Official Kit Partner", "Official Hydration Partner"), kit stories built on Kerala identity (Theyyam, Neelakurinji), fan initiatives (The Yellow Heart) as nav items | A footer that lists 40 monthly archives and a "Recent Comments: none" widget; about 20 logos that compete for attention |
| [Gokulam Kerala FC](https://www.gokulamkeralafc.com/) (Kozhikode, I-League) | Kerala professional | A plain stadium section with capacity, year built and record attendance | An About page that is seven unbroken paragraphs; no visual hierarchy |
| Village clubs in Malappuram and Kerala | Local | Presence is an Instagram grid, a WhatsApp group and flex boards; some appear only in NGO directories such as [give.do](https://discover.give.do/I5O/srishti-arts-and-sports-club) with a registered address and a one-line mission | No website means no Google presence beyond Maps |

**Patterns that repeat across the good sites.** A one-line identity statement next to the logo. One hero, one primary call to action. A "next event" block that answers "what is happening and when" without a click. Values written as a short list, not a paragraph. Sponsors shown with a role, not just a logo. Plain-number practical details (venue, timing, cost). A footer that is short.

**Context that shapes the design.** Malappuram is the hub of Sevens football in Kerala, and almost all sevens tournaments in the district are now played under floodlights ([olympics.com](https://olympics.com/en/news/what-is-sevens-football-kerala-history), [Indian Football blog](https://indianfootball15.blogspot.com/2014/05/malappuram-and-its-affair-with.html)); the club's turf-at-night photography fits this. The whole Malabar region is gripped during global football events such as the FIFA World Cup ([Federal](https://federaldbsite.hocalwire.in/the-eighth-column/how-a-group-of-men-in-kerala-is-kicking-in-a-sevens-football-league-circuit)), which is why the June 2026 flex boards are the club's most distinctive content. Local sevens tournaments are run by local committees without government support, backed by the people of the village ([Youth Ki Awaaz](https://youthkiawaaz.com/2024/03/sevens-football-in-kerala-legacy-of-colonial-struggle-and-love/amp)); that is exactly the sponsor model the site needs to support.

**Where Sporting FC Pallippadi can be different.** No reference site treats arts and community work as equal to the sport; every one of them is football-first. A site that holds football, fan culture and community life as three equal pillars, in the club's own green-crimson-white, English-only but local in every photo and place name, would be unlike anything at the local or state level.

Sources: pages opened on 8 Nov 2026: [sporting.pt](https://sporting.pt/), [fcstpauli.com/en](https://www.fcstpauli.com/en), [claptoncfc.co.uk](https://www.claptoncfc.co.uk/), [keralablastersfc.in](https://keralablastersfc.in/), [gokulamkeralafc.com](https://www.gokulamkeralafc.com/), [olympics.com on Sevens football](https://olympics.com/en/news/what-is-sevens-football-kerala-history), [Youth Ki Awaaz on Sevens](https://youthkiawaaz.com/2024/03/sevens-football-in-kerala-legacy-of-colonial-struggle-and-love/amp).

## 4. UI/UX direction: "Floodlight"

The concept is a dark, floodlit site: a near-black green base lit by white type and crimson accents, so the club's night-turf photography, flex-board art and crest sit in their natural light instead of on a white template. Three equal pillars (Football, Fan culture, Community) replace the usual football-only hierarchy.

**Design principles**

1. Mobile first, because the audience arrives from Instagram on phones. Every section is designed at 390 px first and widened second.
2. Photos carry the site; type stays out of their way. Big, few, full-bleed images; no stock photography anywhere.
3. One identity line everywhere: "Arts & Sports Club · Pallippadi, Malappuram" under the crest, plus a short English tagline the club chooses.
4. Three pillars, equal weight: Football (7s, SPL), Fan culture (World Cup flex boards, jersey nights), Community (Nabi Dinam, Eid, arts programmes, member milestones).
5. Sponsors are treated as members of the club, not as a footer afterthought (section 6).
6. Nothing that needs a server: no forms that store data, no login; contact goes through WhatsApp and Instagram deep links.

**Design system**

| Token | Value | Use |
| --- | --- | --- |
| Green 900 | #061F14 | Page background |
| Green 700 | #0E5C3A | Crest green, section bands, links |
| Crimson 500 | #B3202E | Primary buttons, eagle accent, live badges |
| Off-white | #F4F1EA | Body text on dark |
| Floodlight white | #FFFFFF at 8 to 12 percent opacity | Card surfaces, dividers |
| Gold 400 | #D9A441 | Only for the "Captures" yearly album and trophy moments |
| Display type | Bebas Neue or Anton (condensed, uppercase) | Hero and section titles |
| Body type | Inter or Manrope | Paragraphs, UI; the only two font families loaded |
| Credit mark | Drox.dev wordmark, monochrome off-white at 60 percent | Footer line "Built by Drox.dev" linking to droxdev.com, on every page |
| Radius | 4 px cards, 999 px pills | Sharp, athletic feel |
| Grid | 4-column mobile, 12-column desktop, 1200 px max |  |

The exact hex values should be sampled from the real crest file once the club supplies it; the ones above are read from the Instagram profile image and are a starting point.

**Signature components (what makes it unique)**

- Crest hero: the eagle crest centred on a floodlit turf photo with a slow light-sweep animation, the identity line under it, one button ("Follow on Instagram" until a "Join" flow exists).
- Marquee strip: "SPORTING FC PALLIPPADI ✳ MANKADA PALLIPPURAM ✳ EST. \[year\]" scrolling in condensed type, as Sporting CP does; cheap to build, strong brand feel.
- Pillar cards: three tall cards with a photo, a label and a one-line description, linking to Football, Fan culture and Community.
- Next up: one card with the next match, tournament or event (date, venue, time) read from a JSON file; hidden automatically when the date has passed.
- Flex-board wall: a horizontal scroll of the World Cup boards, each with the team name and year; this becomes the most shared section of the site.
- Sponsor wall: tiered logo grid with a role label under each, Drox.dev as technology partner among them (section 6).
- Roots and home: a two-column block on the Grounds page, the Marikkals FC ground where the club grew up on the left as a memories album, the new ground on the right with its map pin; written as pride in both clubs and both grounds.
- Reach-us strip: five intent cards (Donate, Sponsor, Host an event with us, Need help in Mankada Pallippuram, Report a case), each opening WhatsApp with a prefilled message; shown on the Contact page and as a compact row at the foot of Community.
- Captures: a yearly black-and-white album with one gold accent, matching the "Captures 2025" collage.
- Footer: crest, address with a Google Maps link, Instagram and WhatsApp buttons, sponsor line, "Built by Drox.dev" credit, copyright. Nothing else.

**Motion.** Scroll-reveal fades on sections, a 0.2 s hover lift on cards, the hero light sweep, the marquee. All motion disabled under prefers-reduced-motion. No full-screen loaders.

**Accessibility.** Text contrast of at least 4.5:1 on the dark base, alt text on every gallery image, keyboard-reachable lightbox, focus rings visible, a visible skip link.

## 5. Sitemap and page-by-page content

Seven top-level pages are enough: the three pillars, the gallery, the sponsors, the story and a contact page that carries the local-SEO details.

&#91;embedded content: sitemap · 7 top-level pages, 8 sub-pages\]

Every page is a static route; the sub-pages under Football, Gallery and About have their own URLs, the rest are sections on the parent page. A small Updates section (/updates) for dated posts is linked from the footer and left off the map.

| Page | URL | Must contain | One primary action |
| --- | --- | --- | --- |
| Home | / | Crest hero, identity line, marquee, three pillar cards, Next up card, flex-board wall teaser, sponsor strip, Captures teaser, footer with Drox.dev credit | Follow on Instagram |
| Football | /football | What 7s is in one paragraph, floodlit-turf photos, the SPL block, recent results if the club keeps them, how to book a friendly | WhatsApp the team secretary |
| SPL | /football/spl | Full name, format (teams, nights, venue), past editions and champions, SPL sponsors, poster gallery | View this year's fixtures (PDF or image) |
| Fan culture | /fan-culture | Flex boards by World Cup year with team and year labels, jersey-night photos, embedded reels (lite embed, click to load) | Share this page |
| Community | /community | Nabi Dinam, Eid, arts programmes, member milestones, a values list of four lines, a yearly events timeline, the Reach-us strip | Host an event with us (WhatsApp) |
| Gallery | /gallery and /gallery/\[album\] | Album grid, one album per event or year, lightbox, Captures yearly album with gold accent, the old-ground memories album | Open album |
| Sponsors | /sponsors | Tiered wall with role labels, Partners row (Drox.dev technology partner and others), a line of thanks, three sponsorship packages, a Become a sponsor WhatsApp button | Become a sponsor |
| About | /about | Founding story (formed in 2024 by members of Marikkals FC, which still runs under the senior members and backs the club), the identity line, values, a timeline of milestones, links to Members, Grounds and Our area | Contact the club |
| Members | /about/members | President, Secretary, Treasurer and other office bearers with role and photo, then the member grid (names, optional photos) | Join the club (WhatsApp) |
| Grounds | /about/grounds | "Roots and home": the Marikkals FC ground where the club grew up, as a memories album with its Maps link, then the new ground with photos, map pin and how to reach it | Open in Maps |
| Contact | /contact | Full postal address (Mankada Pallippuram), map embed, WhatsApp, Instagram, email, directions from Manjeri, and the five intent cards: Donate, Sponsor, Host an event, Need help in Mankada Pallippuram, Report a case | WhatsApp |
| Our area | /about/area | A map, then one heading per place (Mankada, Pallippuram, Anakkayam, Koottilangadi, Padinhattummuri, Manjeri) with two or three true sentences each and a link to a related album; the page that carries the place-name searches | Get directions |
| Updates | /updates and /updates/\[slug\] | Dated Markdown posts, four to six a year (SPL dates, champions, Nabi Dinam, new ground, sponsor welcomes), newest first, RSS feed | Follow on Instagram |
| Videos | /videos | A curated set of 8 to 12 reels as vertical players that autoplay muted when in view, one at a time, tap for sound; each with a title, date and a Watch on Instagram link; the full reel list links out to Instagram | Watch on Instagram |

## 6. Sponsors: make them feel like part of the club

Sponsors of a village club are local shops and Gulf-based members, and what they want is to be seen by the village, named with respect, and linked. The sponsor section should do those three things on every page, not only on a sponsors page.

**Tiers.** Three tiers keep it simple and give the club something to sell. Names are suggestions; the club sets the amounts.

| Tier | Where the logo appears | Logo size | Extras |
| --- | --- | --- | --- |
| Title sponsor (1) | Beside the crest in the header on every page, hero of the Sponsors page, SPL page banner | Large, full colour | A one-line "Presented by" on the Next up card; a dedicated thank-you post template for Instagram |
| Main sponsors (up to 4) | Sponsor strip on the home page, Sponsors page, SPL page | Medium | Role label under the logo ("Kit partner", "Turf partner") |
| Partners (Drox.dev as technology partner, plus any others) | Partners row on the Sponsors page; Drox.dev also in the footer credit on every page | Medium, monochrome | Role label ("Technology partner"); Drox.dev links to droxdev.com, which also earns Drox.dev a real backlink and a portfolio case |
| Supporters (any number) | Sponsors page grid, footer line of names | Small, greyscale with colour on hover | Name and link only, no role |

**Presentation rules**

- Every logo carries a role label under it, as Kerala Blasters does; a role turns a logo into a story ("Official hydration partner" reads better than a bare logo).
- Logos sit on a light card on the dark base so coloured logos stay legible; supply a white-background version of each.
- Each logo links to the sponsor's Google Maps listing, Instagram page or website, whichever they have, with rel="sponsored".
- One line of thanks above the wall, written by the club.
- Past sponsors by year live at the bottom of the Sponsors page so nobody is ever removed; that loyalty is itself a selling point.
- A "Become a sponsor" block with three packages, each with a price and a list of what it includes, and a WhatsApp button that opens a prefilled message to the club secretary. No form, no server.

**Data shape (frontend only).** One file, `src/data/sponsors.json`, one entry per sponsor: name, tier, role, logo path, link, since-year, active flag. The build reads it and lays out every tier; the club updates one file to add a sponsor.

**Rate card to prepare.** Visibility numbers sell sponsorships: Instagram reach per post, number of SPL nights and expected crowd, number of members, website visits once live. Collect these before approaching new sponsors (section 11).

## 7. Gallery without a backend

The gallery is a folder of images in the repository plus one JSON manifest per album; the build step resizes every image into WebP at several widths, so the site stays fast and no media server or CMS is needed. This handles a few hundred photos comfortably; past that, phase 2 moves originals to object storage (Cloudflare R2 or Bunny) without changing the page.

**Folder structure**

```
public/
  gallery/
    2025-captures/        one folder per album, prefixed with the year
      001-team-photo.jpg
      002-spl-final.jpg
    2026-world-cup-boards/
    2026-nabi-dinam/
src/data/albums.json      title, slug, date, cover, one line of description, image list with alt text
```

**Rules that keep it fast**

1. Originals are exported from the phone at 2000 px on the long edge, JPEG quality 80, before they enter the repo; nothing larger is committed.
2. The scripts/images.ts step (sharp) generates 400, 800, 1200 and 1600 px WebP and a blur placeholder and serves them with `srcset` and `sizes`, so a phone downloads the 400 px file, not the original.
3. Every image is lazy-loaded except the hero and the first row of each album; each has width and height set so the layout never jumps.
4. A blurred 20 px placeholder (LQIP) shows while an image loads.
5. Alt text is written per image in the manifest, in English, naming the event and year ("SPL 2026 final, Pallippadi turf"), because that is what image search indexes.
6. Total images per album page are capped at 60; longer albums paginate.

**Layout.** Album grid on /gallery: cover photo, title, date, photo count. Inside an album: a masonry grid (CSS columns on mobile, 3 or 4 columns on desktop), a lightbox with swipe, keyboard arrows and a download button, and a share button that copies the album URL. The yearly Captures album gets the gold title treatment.

**Videos (reels).** Self-host a curated set of 8 to 12 reels as small MP4 files in the repo and autoplay them muted when they scroll into view; link the full reel archive to Instagram. Instagram's own embed cannot autoplay, loads Instagram's script, and breaks whenever a reel is deleted, so it is used only as a click-to-load fallback for reels the club does not want to re-encode.

| Rule | Detail |
| --- | --- |
| Source | The original video exported from the phone or downloaded from the club's own Instagram (the club owns them) |
| Encoding | ffmpeg: H.264, 720×1280 (9:16), CRF 28, 30 fps, AAC audio kept for tap-to-unmute, `-movflags +faststart`; a 15 s reel lands at 1.5 to 3 MB; a WebP poster frame for each |
| Player | `<video autoplay muted loop playsinline preload="none" poster=…>`; a small client component starts the one video in view and pauses the rest (IntersectionObserver), a tap on the video toggles sound, a tap on the title opens the reel on Instagram |
| Respect | No autoplay when `prefers-reduced-motion` is set or the Save-Data header is present; show the poster with a play button instead |
| Bandwidth | About 1,000 visits a month × 3 autoplayed reels × 2.5 MB ≈ 7.5 GB, well inside Vercel Hobby's 100 GB; watch it in Vercel's usage page after SPL weeks |
| Repo size | 12 reels ≈ 30 MB, fine in Git; past about 300 MB of video move the files to Cloudflare R2 (10 GB free, no egress fee) and change only the `src` |
| Data | `src/data/videos.json`: slug, title, date, src, poster, instagramUrl, duration |

The Videos page is a vertical grid of these players; the home page can show the newest one in the Fan culture pillar card.

**Updating the gallery.** Add a folder, add the album to `albums.json`, commit; the host rebuilds in about a minute. A one-page runbook for the committee member who does this goes in the repo README.

**When a backend becomes worth it.** More than about 500 images, more than one person uploading, or a wish to let members submit photos. At that point a headless CMS (Sanity, Payload or Decap on Git) can replace the JSON files without redesigning the pages.

## 8. SEO plan

On sportingfc.droxdev.com the club can own every search that contains "Sporting FC Pallippadi" or "Pallippadi" within weeks; the place searches (Mankada Pallippuram, Anakkayam, Koottilangadi, Padinhattummuri, Manjeri, Malappuram) and the broad ones (arts and sports club Malappuram, 7s football, Kerala culture) need a Google Business Profile at the new ground, an "Our area" page, local mentions and fresh SPL content. Starting on a subdomain is fine; it changes two things, explained first.

**Running on sportingfc.droxdev.com**

- Google treats the subdomain as its own site: it borrows almost no authority from droxdev.com, and droxdev.com's own rankings are not affected either way. Rankings will come from the club's content and local signals, not from the parent domain.
- Add the subdomain as its own property in Google Search Console and Bing Webmaster Tools; the Google Business Profile website field, the Instagram bio and every listing must use exactly `https://sportingfc.droxdev.com`.
- Keep URLs clean and stable (`/football/spl`, no `.html`, no trailing-slash mix) so a later move to the club's own domain is a one-file 301 map plus Search Console's change-of-address; an `.in` domain costs a few hundred rupees a year when the club is ready.
- Drox.dev gets a real, contextual backlink from the footer credit and can publish a case study on droxdev.com linking back; both count.

**Keyword map (English only)**

| Page | Primary phrase | Supporting phrases |
| --- | --- | --- |
| Home | Sporting FC Pallippadi | arts and sports club Malappuram, arts and sports club Kerala, Pallippadi club, SFC Pallippadi, sportingfc.ppd |
| Football | 7s football Malappuram | 7s football club Manjeri, sevens football Mankada Pallippuram, football club Anakkayam |
| SPL | Pallippadi League | SPL Pallippadi, 7s tournament Malappuram, sevens tournament near Manjeri |
| Fan culture | Malappuram World Cup flex boards | Pallippadi flex board, Kerala football fan culture, Argentina Brazil fans Malappuram |
| Community | Kerala culture club Malappuram | Nabi Dinam Pallippadi, community club Mankada, arts club Manjeri |
| Our area (new page) | sports club near Anakkayam, Koottilangadi, Padinhattummuri | Mankada Pallippuram club, Manjeri sports club, Malappuram village club |
| Members | Sporting FC Pallippadi members | club president, secretary, treasurer Pallippadi |
| Grounds | Sporting FC Pallippadi ground | Marikkals FC ground, football ground Mankada Pallipuram, 7s turf near Manjeri |
| Contact | Sporting FC Pallippadi address | Mankada Pallippuram, Malappuram, Kerala |

Spelling matters because Google matches strings. Google Maps (checked 8 Nov 2026) spells the places Anakkayam, Koottilangadi, Padinhattummuri and Mankada Pallipuram (one p), and the parent club Marikkals FC; the club itself writes Pallippuram. Use the Maps spelling in the address line, headings and schema, mention the club's spelling and the other variants once in body text (Pallippuram, Kootilangadi, Padinjattummuri, Padinnattummuri), and keep "Pallippadi" exactly as the club writes it because it is the brand.

**Place strategy without doorway pages.** One page, `/about/area`, carries the place phrases: a map at the top, then one H2 per place (Mankada, Pallippuram, Anakkayam, Koottilangadi, Padinhattummuri, Manjeri) with two or three true sentences each (members from there, matches played there, distance and route to the ground) and a link to a related album. Never one page per place with the same text; Google demotes that pattern. The footer address line (name, Mankada Pallippuram, Malappuram, Kerala, PIN) appears on every page, which is the consistent NAP local search looks for.

**Google Business Profile.** The old ground's Maps listing belongs to the parent club ("Marikkals FC Football Ground" at 11.0609, 76.1217), so the new ground needs its own listing named "Sporting FC Pallippadi Ground" at its exact pin. Create the profile as Sports club (secondary: Football club, Association or organization), with the full address, the subdomain as website, ten gallery photos, opening hours if the ground has them, a first post about SPL, and Q&A seeded with "How do I join?" and "How do I sponsor?". Ask members to leave reviews that mention the place. This is what puts the club in Maps and in "near me" results for every village around.

**On-page checklist (every page)**

- Unique title under 60 characters, ending "| Sporting FC Pallippadi", with a place name where natural; unique meta description under 155 characters containing "Mankada Pallippuram" or "Malappuram".
- One H1 per page; H2s that carry the supporting phrases in plain sentences, never a list of towns.
- Canonical URL, Open Graph image (1200×630, crest on turf) and Twitter card on every page; the footer address on every page.
- Image file names in words (`spl-2026-final-mankada-pallippuram.jpg`), alt text from the gallery manifest naming event, place and year.
- Internal links: pillar pages link to their albums, Sponsors and Our area; Grounds links to Contact; every page links to Contact's intent cards.
- `app/sitemap.ts` (with image entries for albums) and `app/robots.ts` generated by Next.js; a 404 page; no `noindex` anywhere except the lightbox query URLs.

**Structured data (JSON-LD in the head)**

- `SportsOrganization` on the home page: name, alternateName "SFC Pallippadi", sport "Football", `address` (streetAddress "Mankada Pallippuram", addressLocality "Mankada", addressRegion "Kerala", postalCode \[PIN\], addressCountry "IN"), `geo` with the new ground's coordinates, `areaServed` listing the six places, `sameAs` Instagram, `foundingDate`, `logo`, and `member` entries (`Person` with name and jobTitle) for the President, Secretary and Treasurer.
- `SportsEvent` on the SPL page for the current edition; `Event` for dated community programmes.
- `ImageGallery` with `ImageObject` items on album pages; `BreadcrumbList` on every sub-page; `FAQPage` on the Contact page's four questions (join, sponsor, host an event, report a case); Google no longer shows FAQ rich results for most sites, but the markup still helps it read the page.

**Local mentions (off-page).** Website link in the Instagram bio and in the caption of every SPL post; a QR code to the site on every flex board, SPL poster and ticket from now on, and a second QR at the ground that opens the Google review form (a Droxlink page does exactly this); a listing on local news portals and Malappuram football pages when SPL runs; a mention on Mankada panchayat, library or community pages that list local clubs; a YouTube channel where the reels go up as Shorts with the link in the description; registration on NGO Darpan or give.do if the club is a registered society; the Drox.dev case study; a link from Marikkals FC's Instagram bio and any page it has, since the two clubs share a village and a history.

**Content cadence (what keeps rankings growing without a CMS)**

1. A new SPL page each season: announcement, fixtures image, champions. Each is a dated page Google treats as fresh.
2. The Captures album every December.
3. A small `/updates` section of Markdown posts, four to six a year: SPL dates, champions, Nabi Dinam, the new ground, a sponsor welcome.
4. Two evergreen explainers written once: "What is 7s football, the Malappuram way" and "World Cup flex boards in Malappuram: why we build them". These target the broad phrases (7s football, Malappuram flex boards) that bring visitors from across Kerala and the Gulf, and they are the pages other sites link to.

**Performance targets (Core Web Vitals).** LCP under 2.5 s on a mid-range Android on 4G, CLS under 0.1, INP under 200 ms; Lighthouse mobile 90 or above in all four categories. Achieved by static pages, pre-generated WebP with `srcset`, two self-hosted font families with `font-display: swap`, and no third-party script except a click-to-load Instagram embed and analytics.

**Measurement.** Search Console once a month, filtered to queries containing a place name; GBP insights (calls, direction requests); Vercel Web Analytics (free on Hobby) or Umami. At 90 days, review which place phrases get impressions and expand those H2s on the Our area page.

**First 30 days after launch**

- [ ] Search Console and Bing properties verified, sitemap submitted
- [ ] Google Business Profile created for the new ground, verified, ten photos, first post
- [ ] Instagram bio link updated; a pinned post announcing the site
- [ ] Five members leave GBP reviews mentioning Mankada Pallippuram
- [ ] droxdev.com case study page live, linking to the site
- [ ] Rich Results Test passed on /, /football/spl, one album, /contact
- [ ] QR code artwork prepared for the next flex board and SPL poster

## 9. Tech stack and build phases

Next.js, fully static, with gallery images pre-built by a script and hosted on Vercel's free Hobby plan at sportingfc.droxdev.com, is the whole stack; it matches the frontend-first workflow and leaves a clean seam for a backend later.

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js (latest stable, App Router) with Tailwind CSS and TypeScript; every route statically generated | The team's strongest stack; `generateMetadata`, `app/sitemap.ts` and `app/robots.ts` cover the SEO plumbing with no plugins |
| Interactive bits | Small client components only: lightbox (yet-another-react-lightbox or PhotoSwipe), marquee, Next up countdown, click-to-load Instagram embed | Keeps the page light; everything else is a server component with no client JavaScript |
| Images | A `scripts/images.ts` step (sharp) that writes WebP at 400, 800, 1200 and 1600 px plus a tiny blur placeholder into `public/gallery/…`, read by a `<Picture>` component; `next/image` only for the hero and OG images | Avoids Vercel's image-transformation quota entirely and makes the site portable to any host |
| Fonts | `next/font/local` with two families: one display, one body | No external font requests, `font-display: swap` |
| Hosting | Vercel Hobby, auto-deploy from GitHub main; preview deployments for every pull request | Free, rebuilds in about a minute, Web Analytics included |
| Domain | `sportingfc.droxdev.com`: a CNAME record in droxdev.com's DNS pointing at Vercel, added as a custom domain on the project | No purchase needed; Vercel issues the SSL certificate |
| Analytics | Vercel Web Analytics (Hobby tier) or self-hosted Umami | No cookie banner needed with either |
| Contact | WhatsApp deep links with prefilled messages per intent, mailto, Instagram links | No form backend |
| Data | `src/data/*.json` validated with Zod at build; `src/content/updates/*.md` for posts | The committee edits files, the build fails loudly on a bad entry |
| Repo | GitHub, one `main` branch, a README runbook for albums, sponsors, members and Next up | Content updates without a developer |

**Next.js or Nuxt?** For SEO they are equal: both render complete HTML at build time, both give full control of titles, meta, canonical and JSON-LD, and Google sees the same static page either way. Maintenance favours the stack the team already masters, so Next.js is the right call; nothing on this site needs anything Nuxt does better.

**Vercel Hobby, the limits that matter here.** Hobby is for personal, non-commercial projects, which a community club site is; the included usage as of 8 Nov 2026 is 100 GB bandwidth a month and, for Image Optimization, 5,000 transformations, 300,000 cache reads and 100,000 cache writes a month ([Vercel Hobby plan](https://vercel.com/docs/plans/hobby-plan), [Image Optimization limits](https://vercel.com/docs/image-optimization/limits-and-pricing)). A gallery of a few hundred photos at four sizes would use up the transformation quota in the first week of each new album, which is why the images are pre-built by a script and served as static files; bandwidth stays well under 100 GB for a club audience. Vercel pauses a Hobby project that exceeds its limits rather than billing it, so the risk is downtime, not cost.

**Development setup: this chat plus Claude Code.** Use the two for different jobs. This chat is for planning, research, this document, and reviewing screenshots or preview links; Claude Code in VS Code is for writing the code, because it works inside the repo, runs the build and tests, and keeps the SOP in front of it on every session. Keep this session open for reviews and SOP changes rather than starting a new chat each time; the context here already holds the Instagram study and the reference research.

1. Create the GitHub repo and open it in VS Code.
2. Save section 10 as `CLAUDE.md` at the repo root (Claude Code reads it automatically) and export this document to `docs/plan.md` for reference.
3. Create `inputs/` with the crest SVG, the photo folders, the reels, and a `facts.md` holding every bracketed value from the SOP.
4. Start Claude Code and say: "Read CLAUDE.md and inputs/facts.md, then follow the Working method from step 1." It will list what is still missing before writing code.
5. Work one phase per session and commit at each gate; use `/clear` between phases so each starts clean with CLAUDE.md.
6. After the Prototype gate, bring the Vercel preview link or screenshots back here for a design review; changes to scope go into section 10 first, then into `CLAUDE.md`.

Start with the Prototype phase (home page and one album page with real photos) rather than the data layer or the inner pages: the Floodlight concept is judged on real turf photos, and every later page reuses the components built there.

&#91;embedded content: build roadmap · 5 phases, 5 gates\]

Each phase ends at a gate the club signs off, so the UI is settled before the build and the build is settled before content and SEO work begins.

1. **Inputs.** Collect everything in section 11. Sample the crest colours, convert the logo to SVG, export photos at 2000 px, write the founding story and values in Malayalam and English. Gate: logo vector and at least 100 photos received.
2. **Prototype.** Build the home page and one inner page (Gallery album) as a clickable prototype in the real stack, not Figma, so motion and image loading are judged for real. Review on two or three members' phones. Gate: club signs off the home page and one inner page.
3. **Build.** All routes including Members, Grounds and Our area, the image script and gallery, sponsors.json, members.json, the five intent cards, the Next up card, 404 page, OG images. Test on Android Chrome over 4G throttling. Gate: Lighthouse 90 or above on mobile for performance, accessibility, best practices and SEO.
4. **Content and SEO.** Final copy, alt text for every image, JSON-LD validated in Google's Rich Results Test, sitemap submitted in Search Console, Google Business Profile created and verified. Gate: schema valid, GBP verified.
5. **Launch.** Subdomain live (CNAME added in droxdev.com's DNS, custom domain attached on Vercel), Instagram bio link updated, a launch post with the website on a flex-board style graphic, sponsors notified with a thank-you image for their own pages. Gate: live and bio updated.

**After launch.** One hour a month: add new albums, update sponsors, post the SPL page each season, check Search Console for the phrases that are growing.

## 10. The SOP prompt (copy and paste)

Paste the block below into Claude Code or hand it to a developer. Replace every `[bracketed]` value first; the prompt refuses to guess them. It is self-contained and does not depend on the rest of this document.

```markdown
# SOP: Build the Sporting FC Pallippadi website (frontend only, v1)

## Role
You are the lead frontend engineer and designer at Drox.dev. Build a production-ready, static, mobile-first website for Sporting FC Pallippadi in Next.js. Follow this SOP in order. Where an input is missing, stop and ask; do not invent club facts, sponsor names, member names, dates or history.

## The client
- Club: Sporting FC Pallippadi, an arts and sports club formed in 2024 by members of Marikkals FC, the village's first club. Marikkals FC still runs under the senior members and fully supports Sporting FC. Tell this as pride in both clubs; never as a split.
- Address: Mankada Pallipuram, Malappuram district, Kerala, India, PIN [PIN]. Spellings: use the Google Maps spellings in the address, headings and schema (Mankada Pallipuram, Anakkayam, Koottilangadi, Padinhattummuri, Manjeri, Marikkals FC); mention the club's own spelling "Pallippuram" and the variants Kootilangadi, Padinjattummuri, Padinnattummuri once in body text; "Pallippadi" is the brand spelling and never changes.
- Instagram: https://www.instagram.com/sportingfc.ppd (display name SPORTING FC PALLIPPADI).
- Members: [number]. Registered society number: [if any]. Office bearers: President [name], Secretary [name], Treasurer [name], [other roles].
- What the club does: 7s football nights on a floodlit turf; runs its own tournament, SPL (Pallippadi League); World Cup fan culture with giant flex boards and cut-outs for Brazil, Portugal, Argentina and France; community and faith events (Nabi Dinam food distribution, Eid gatherings); arts programmes [list]; members' milestones; a yearly "Captures" photo collage; community help and local issue reporting for Mankada Pallipuram.
- Grounds: the club grew up on the Marikkals FC ground (Google Maps: https://maps.app.goo.gl/m3MuWncLSmCYmujx8, "Marikkals FC Football Ground", about 11.0609, 76.1217) and now plays at a larger new ground on land close by (pin: [new ground Maps link]). Present both as "roots and home".
- Audience: local members and youth, families in the villages above, local business sponsors, members working in the Gulf, visitors to SPL and events.
- Tone: warm, informal brotherhood. English only on the site; no Malayalam text anywhere. No emojis in site copy.

## Brand
- Crest: white shield, green border, "SPORTING FC" arched in deep green at the top, a crimson eagle with spread wings at the centre, "PALLIPPADI" on a ribbon at the base. Use the supplied SVG at [path]; never redraw it. Marikkals FC's crest (supplied at [path]) appears once, on the Grounds page and in the About story, never in the header.
- Colours (sample the final values from the SVG): Green 900 #061F14 background; Green 700 #0E5C3A crest green, links, section bands; Crimson 500 #B3202E primary buttons and accents; Off-white #F4F1EA body text; white at 8 to 12 percent for card surfaces; Gold 400 #D9A441 only for the Captures album and trophy moments.
- Type: display Bebas Neue or Anton (condensed uppercase); body Inter or Manrope. Load both with next/font/local; no other families.
- Identity line under the crest everywhere: "Arts & Sports Club · Mankada Pallipuram, Malappuram". Tagline: [supplied by club, English].
- Concept name: "Floodlight". Dark green base lit by white type and crimson accents, so night-turf photos, reels and flex-board art look like they do in real life. No stock photos. No gradients on text. Radius 4 px on cards, pills for tags.
- Credit: a footer line "Built by Drox.dev" with the Drox.dev wordmark in monochrome off-white at 60 percent, linking to https://droxdev.com, on every page.

## Three pillars, equal weight
Football (7s nights, SPL) · Fan culture (World Cup flex boards, jersey nights, reels) · Community (Nabi Dinam, Eid, arts, member milestones, local help). The home page gives each a card of the same size. Do not make it a football-only site.

## Stack and constraints
- Next.js (latest stable, App Router), TypeScript, Tailwind CSS. Every route statically generated. Client components only for: lightbox, marquee, Next up countdown, the reel player, click-to-load Instagram embeds.
- No backend, no database, no CMS, no media storage service, no forms that store data, no login. Content lives in `src/data/*.json` (validated with Zod in `src/schemas.ts`) and `src/content/updates/*.md`; images in `public/gallery/<year>-<slug>/`; reels in `public/videos/`.
- Images: a `scripts/images.ts` build step using sharp writes WebP at 400, 800, 1200 and 1600 px plus a blur placeholder for every gallery image; pages use a `<Picture>` component with srcset and sizes. Do not route gallery images through next/image (Vercel Hobby transformation quota). next/image is allowed only for the hero and generated OG images.
- Videos: 8 to 12 reels, each an MP4 (H.264, 720×1280, CRF 28, AAC audio, faststart, 1.5 to 3 MB) plus a WebP poster, listed in `src/data/videos.json` (slug, title, date, src, poster, instagramUrl, duration). A `<ReelPlayer>` client component: `<video muted loop playsinline preload="none">`, starts the one player in view and pauses the others with IntersectionObserver, tap on the video toggles sound, tap on the title opens Instagram. No autoplay under prefers-reduced-motion or the Save-Data header; show the poster with a play button instead.
- Contact actions are WhatsApp deep links with prefilled text (`https://wa.me/91XXXXXXXXXX?text=...`; number per intent: [list]), mailto ([email]) and Instagram links.
- Hosting: Vercel Hobby, GitHub main auto-deploy. Domain: sportingfc.droxdev.com (CNAME in droxdev.com DNS; custom domain on the Vercel project). Analytics: [Vercel Web Analytics | Umami | none].

## Routes
/ · /football · /football/spl · /fan-culture · /community · /gallery · /gallery/[album] · /videos · /sponsors · /about · /about/members · /about/grounds · /about/area · /updates · /updates/[slug] · /contact · /not-found

## Home page sections, in order
1. Crest hero on a floodlit-turf photo with a slow light-sweep, identity line, one button "Follow on Instagram".
2. Marquee strip: "SPORTING FC PALLIPPADI ✳ MANKADA PALLIPURAM ✳ EST. 2024 ✳".
3. Three pillar cards (photo, label, one-line description, link); the Fan culture card may play the newest reel muted.
4. Next up card from `src/data/next.json` (title, date, time, venue, mapLink, posterImage); hidden automatically when the date has passed.
5. Flex-board wall: horizontal scroll of World Cup boards with team and year.
6. Sponsor strip: title sponsor large, main sponsors medium, partners row (Drox.dev technology partner and others), role label under each.
7. Captures teaser: the latest yearly album, black and white with gold title.
8. Footer: crest, address with Google Maps link, WhatsApp and Instagram buttons, one line of sponsor names, "Built by Drox.dev", copyright. Nothing else.

## Inner pages
- /football: what 7s is in one paragraph, photos, SPL block linking to /football/spl, how to book a friendly (WhatsApp).
- /football/spl: full name, format, venue, editions table (year, champion, runner-up), SPL sponsors, poster gallery, link to this season's fixtures image or PDF.
- /fan-culture: boards grouped by World Cup year, jersey-night photos, three reels from videos.json, link to /videos.
- /community: events with dates, four-line values list, a yearly timeline, and the Reach-us strip (the five intent cards, compact).
- /gallery: album grid (cover, title, date, count). /gallery/[album]: masonry grid, lightbox with swipe, keyboard, download and share-URL; 60 images per page, paginate beyond. Include the Marikkals-ground memories album and the yearly Captures album.
- /videos: a vertical grid of ReelPlayers from videos.json, newest first, each with title, date and "Watch on Instagram"; a closing link to the full reel archive on Instagram.
- /sponsors: tiered wall (Title, Main, Partners, Supporters) with role labels, light cards for logos, rel="sponsored" links, a line of thanks, past sponsors by year, three packages with prices from `src/data/packages.json`, a WhatsApp "Become a sponsor" button.
- /about: founding story (2024, from Marikkals FC, the seniors' club that still runs and backs us), values, milestones timeline, links to Members, Grounds and Our area.
- /about/members: office bearers first (President, Secretary, Treasurer, [other roles]) with role and photo, then a member grid from `src/data/members.json` (name, role, optional photo, year joined). A "Join the club" WhatsApp button.
- /about/grounds: "Roots and home". Left: the Marikkals FC ground, its crest, the memories album and its Maps link. Right: the new ground, photos, map pin, how to reach it from Manjeri. Pride in both; no story about how the move happened.
- /about/area: a map, then one H2 per place (Mankada, Pallipuram, Anakkayam, Koottilangadi, Padinhattummuri, Manjeri) with two or three true sentences each from `src/data/area.json` (members from there, matches played there, distance and route to the ground) and a link to a related album. No repeated template text between places.
- /updates and /updates/[slug]: Markdown posts with date, title, cover, body; newest first; RSS at /feed.xml.
- /contact: full postal address, click-to-load map embed, WhatsApp, Instagram, email, directions from Manjeri, and five intent cards, each with a one-line description and a WhatsApp button with its own prefilled message: Donate to the club · Sponsor the club · Host an event with us · Need help in Mankada Pallipuram · Report a case in Mankada Pallipuram. Under "Report a case": one line that reports go privately to the committee and are never published. Then a four-question FAQ (join, sponsor, host an event, report a case).

## Data files (create these with one sample entry each; the club edits them later)
- `albums.json`: [{ slug, title, date, cover, description, images: [{ src, alt, w, h }] }]
- `videos.json`: [{ slug, title, date, src, poster, instagramUrl, duration }]
- `sponsors.json`: [{ name, tier: "title"|"main"|"partner"|"supporter", role, logo, link, since, active }]
- `members.json`: [{ name, role, photo?, since?, officeBearer: boolean, order }]
- `next.json`, `packages.json`, `spl.json` (editions), `events.json`, `area.json`, `intents.json` (label, description, whatsappNumber, prefilledText).

## SEO requirements
- Unique title (under 60 characters, ending "| Sporting FC Pallippadi", with a place name where natural) and meta description (under 155 characters, containing "Mankada Pallipuram" or "Malappuram") on every page via generateMetadata; one H1 per page; canonical; Open Graph and Twitter cards with a generated 1200×630 image; the footer address (name, Mankada Pallipuram, Malappuram, Kerala, PIN) on every page.
- JSON-LD: SportsOrganization on / (name, alternateName "SFC Pallippadi", sport, address, geo of the new ground, areaServed for the six places, sameAs Instagram, foundingDate 2024, logo, parentOrganization Marikkals FC, member Persons for President, Secretary, Treasurer); SportsEvent on /football/spl; Event on dated community items; ImageGallery with ImageObject on album pages; VideoObject for each reel on /videos (name, description, thumbnailUrl, contentUrl, uploadDate, duration); BreadcrumbList on every sub-page; FAQPage on /contact. Validate with Google's Rich Results Test.
- `app/sitemap.ts` with image and video entries, `app/robots.ts`, a not-found page, consistent trailing-slash policy, clean URLs with no .html.
- Target phrases, used naturally in headings and body, never as lists of towns: "Sporting FC Pallippadi", "arts and sports club Malappuram", "arts and sports club Kerala", "7s football Malappuram", "7s football club Manjeri", "Pallippadi League", "Malappuram World Cup flex boards", "Kerala culture", "Mankada Pallipuram", "Anakkayam", "Koottilangadi", "Padinhattummuri", "Manjeri", "Marikkals FC".
- No third-party scripts except click-to-load Instagram embeds and the chosen analytics.

## Accessibility and motion
- Contrast 4.5:1 minimum on the dark base; visible focus rings; skip link; lightbox and reel player fully keyboard operable; captions or a one-line description for each reel; all motion and autoplay off under prefers-reduced-motion.

## Working method (the SOP)
1. Read this file and `inputs/facts.md`. List every [bracket] still unfilled and ask for them in one message before writing code.
2. Set up the repo: Next.js, Tailwind, next/font/local, Zod schemas, the images script, an ffmpeg encode script for reels (`scripts/videos.sh`), data files with one sample entry each, README runbook (how to add an album, a reel, a sponsor, a member, an update, how to change Next up).
3. Build the design tokens in Tailwind config and a `/styleguide` route showing colours, type scale, buttons, cards, the Picture component and the ReelPlayer.
4. Prototype: build / and /gallery/[album] only, with real photos and one real reel. Stop and present them. Do not continue until the home page and the album page are approved.
5. Build the remaining routes in this order: /sponsors, /football, /football/spl, /fan-culture, /videos, /community, /gallery, /about, /about/members, /about/grounds, /about/area, /updates, /contact, not-found.
6. Run Lighthouse on mobile for every route; fix until performance, accessibility, best practices and SEO are each 90 or above. Test on a real Android phone over throttled 4G, including reel autoplay and tap-for-sound.
7. Run the Rich Results Test on /, /football/spl, one album page, /videos and /contact; fix until every schema validates.
8. Deliver: the repo on GitHub, the Vercel deployment on sportingfc.droxdev.com, the README runbook, and a one-page launch checklist (DNS CNAME, Instagram bio link, Google Business Profile for the new ground, Search Console sitemap submission, droxdev.com case-study link).

## Acceptance criteria
- All routes exist and render with real content, no lorem ipsum, no placeholder images, no Malayalam text.
- Lighthouse mobile 90+ in all four categories on every route, including /videos.
- Every image has alt text, width and height; no image over 300 KB is served to a phone; no gallery image goes through Vercel image transformations; no reel over 3 MB; only one reel plays at a time.
- No client JavaScript loads on / except the allowed components.
- Sponsors, members, albums, reels, updates and Next up can be changed by editing files only, documented in the README.
- Works at 360 px width with no horizontal scroll.
- Footer carries the address and the "Built by Drox.dev" credit on every page.
```

## 11. Inputs checklist (collect before the build starts)

Everything below is something only the club knows or owns; the build stalls at phase 0 until the items marked essential are in hand.

**Essential**

- [ ] Crest as a vector file (SVG, AI or PDF) and the original PNG at full size; the Marikkals FC crest for the Grounds page, with the seniors' okay to show it
- [ ] Founding facts: the 2024 date, who formed the club, how it got its name, and one or two lines about Marikkals FC as the club it grew from
- [ ] An English tagline, if the club wants one
- [ ] 100 or more photos exported at full size, sorted into folders by event and year, with the event name and date for each folder
- [ ] Marikkals-ground photos as their own folder (the memories album), plus any dates the club remembers
- [ ] New ground: photos, the exact Google Maps pin, and how to reach it from Manjeri
- [ ] The 8 to 12 reels to feature: Instagram links plus the original video files from the phone, each with a title and date
- [ ] Office bearers (President, Secretary, Treasurer, any others) and the member list: names, roles, year joined, and whether each person's photo may be shown
- [ ] Sponsor list: name, what they do, logo file, phone or Instagram, since which year, which tier; the Drox.dev wordmark and the logos of any other partners
- [ ] SPL facts: full name, format (teams, nights, venue), editions with champions and runners-up, this season's dates
- [ ] WhatsApp number for each intent (donations, sponsorship, events, help requests, case reports) or one number for all, and the email address if any
- [ ] Full postal address with PIN code
- [ ] Two or three true sentences about the club's connection to each of Mankada, Pallipuram, Anakkayam, Koottilangadi, Padinhattummuri and Manjeri (for the Our area page)

**Good to have**

- [ ] List of arts programmes and community events by year
- [ ] Instagram reach numbers (per-post reach, followers over time) for the sponsor rate card
- [ ] Trophies and achievements with years
- [ ] Three sponsorship packages with prices the club is comfortable publishing
- [ ] A short quote from a founding member for the About page
- [ ] Consent from members whose faces appear prominently, especially in wedding and family photos

**Decisions for the club to make**

- [ ] Whether the yearly Captures album stays an annual tradition on the site
- [ ] Whether to show past sponsors by year (recommended)
- [ ] Whether members' names (not only office bearers) appear publicly
- [ ] Which committee member receives case reports and help requests, and that reports stay private
- [ ] Whether to run analytics, and which tool
- [ ] Who on the committee will own content updates after launch (one named person)
- [ ] When to buy the club's own domain and move off the subdomain
