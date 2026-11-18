// Display copy of the palette in globals.css, for the styleguide. Keep in sync.
export const palette = [
  { name: "Ink 900", hex: "#152D37", swatch: "bg-ink-900", use: "Crest lettering: text and headings" },
  { name: "Teal 800", hex: "#123843", swatch: "bg-teal-800", use: "Crest shield: links, dark bands" },
  { name: "Teal 600", hex: "#1F5F6D", swatch: "bg-teal-600", use: "Link hover, accents" },
  { name: "Ember 500", hex: "#B64236", swatch: "bg-ember-500", use: "Eagle wing tips: accents, the marquee band" },
  { name: "Crimson 600", hex: "#9E3143", swatch: "bg-crimson-600", use: "Eagle wings: primary buttons, eyebrows" },
  { name: "Crimson 700", hex: "#84283A", swatch: "bg-crimson-700", use: "Primary button hover" },
  { name: "Plum 700", hex: "#483059", swatch: "bg-plum-700", use: "Eagle body and ball: accents" },
  { name: "Gold 400", hex: "#D9A441", swatch: "bg-gold-400", use: "Captures album and trophy moments, on black only" },
  { name: "Night 950", hex: "#060A13", swatch: "bg-night-950", use: "World Cup section: the shade over its background photo" },
  { name: "Night 900", hex: "#0C1526", swatch: "bg-night-900", use: "World Cup section: a lighter night shade" },
] as const;

// Text-on-background pairs the site uses (or must not use), checked against 4.5:1.
// A "wash" is the darkest point of a background colour wash (globals.css): teal
// and plum at 20 percent, ember at 24 percent over white.
export const contrastPairs = [
  { label: "Ink 900 on white", fg: "#152D37", bg: "#FFFFFF" },
  { label: "Ink 900 75% on white", fg: "#152D37", bg: "#FFFFFF", alpha: 0.75 },
  { label: "Ink 900 75% on the teal wash", fg: "#152D37", bg: "#D0D7D9", alpha: 0.75 },
  { label: "Ink 900 75% on the plum wash", fg: "#152D37", bg: "#DAD6DE", alpha: 0.75 },
  { label: "Teal 800 on white", fg: "#123843", bg: "#FFFFFF" },
  { label: "Crimson 600 on white", fg: "#9E3143", bg: "#FFFFFF" },
  { label: "Crimson 600 on the teal wash", fg: "#9E3143", bg: "#D0D7D9" },
  { label: "Crimson 600 on the ember wash", fg: "#9E3143", bg: "#EDD2CF" },
  { label: "Ember 500 on white", fg: "#B64236", bg: "#FFFFFF" },
  { label: "White on Crimson 600", fg: "#FFFFFF", bg: "#9E3143" },
  { label: "White on Ember 500", fg: "#FFFFFF", bg: "#B64236" },
  { label: "White on Ink 900", fg: "#FFFFFF", bg: "#152D37" },
  { label: "Gold 400 on black", fg: "#D9A441", bg: "#000000" },
  { label: "Gold 400 on white", fg: "#D9A441", bg: "#FFFFFF" },
] as const;

const channels = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

function luminance(rgb: number[]) {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// WCAG contrast ratio; alpha blends the foreground over the background first.
export function contrast(fg: string, bg: string, alpha = 1) {
  const back = channels(bg);
  const front = channels(fg).map((c, i) => c * alpha + back[i] * (1 - alpha));
  const [hi, lo] = [luminance(front), luminance(back)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}
