import type { Metadata } from "next";
import { FanZone } from "@/components/home/FanZone";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { OffThePitch } from "@/components/home/OffThePitch";
import { SponsorStrip } from "@/components/home/SponsorStrip";
import { TournamentSquads } from "@/components/home/TournamentSquads";
import { club } from "@/lib/data";

export const metadata: Metadata = {
  title: `${club.name} | Arts & Sports Club, Mankada Pallipuram, Malappuram`,
  description:
    "Welcome to Sporting FC Pallippadi. Explore our 7s football tournament squads, community moments off the pitch, World Cup fan zone, and club sponsors in Malappuram.",
  alternates: { canonical: "/" },
};

// The menu links to these sections by id (src/lib/site.ts → nav).
export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <Marquee items={[club.name, club.address.street, `Est. ${club.founded}`]} /> */}
      <OffThePitch />
      <TournamentSquads />
      <FanZone />
      <SponsorStrip />
    </>
  );
}
