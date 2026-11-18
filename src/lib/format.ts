const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-06-14" → "14 Jun 2026". Parsed by hand so no Date (and no time zone) is involved.
export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

// "2026-12-31" → { day: 31, month: "Dec", year: 2026 }
export function dateParts(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return { day, month: MONTHS[month - 1], year };
}

// Whole days from one ISO date to another, without reading the clock.
export function daysBetween(from: string, to: string) {
  const utc = (iso: string) => {
    const [year, month, day] = iso.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
  };
  return Math.round((utc(to) - utc(from)) / 86_400_000);
}

// 75 → "1:15"
export function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export const whatsappLink = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
