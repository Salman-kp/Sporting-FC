// Parsed, typed content. Importing this module validates every data file, so a
// bad entry stops `next build` with the file name and the failing field.
import type { z } from "zod";
import { prettifyError } from "zod";
import * as schemas from "@/schemas";
import albumsJson from "@/data/albums.json";
import areaJson from "@/data/area.json";
import clubJson from "@/data/club.json";
import eventsJson from "@/data/events.json";
import homeJson from "@/data/home.json";
import intentsJson from "@/data/intents.json";
import membersJson from "@/data/members.json";
import nextJson from "@/data/next.json";
import packagesJson from "@/data/packages.json";
import splJson from "@/data/spl.json";
import sponsorsJson from "@/data/sponsors.json";
import videosJson from "@/data/videos.json";

function load<T extends z.ZodType>(file: string, schema: T, json: unknown): z.infer<T> {
  const result = schema.safeParse(json);
  if (!result.success) {
    throw new Error(`src/data/${file} is invalid:\n${prettifyError(result.error)}`);
  }
  return result.data;
}

export const club = load("club.json", schemas.clubSchema, clubJson);
export const home = load("home.json", schemas.homeSchema, homeJson);
export const albums = load("albums.json", schemas.albumsSchema, albumsJson);
export const videos = load("videos.json", schemas.videosSchema, videosJson);
export const sponsors = load("sponsors.json", schemas.sponsorsSchema, sponsorsJson);
export const members = load("members.json", schemas.membersSchema, membersJson);
export const upcoming = load("next.json", schemas.nextSchema, nextJson);
export const packages = load("packages.json", schemas.packagesSchema, packagesJson);
export const spl = load("spl.json", schemas.splSchema, splJson);
export const events = load("events.json", schemas.eventsSchema, eventsJson);
export const area = load("area.json", schemas.areaSchema, areaJson);
export const intents = load("intents.json", schemas.intentsSchema, intentsJson);

export const getAlbum = (slug: string) => albums.find((album) => album.slug === slug);
