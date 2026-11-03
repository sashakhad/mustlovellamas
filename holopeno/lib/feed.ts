import { site } from './site';

// Slug-based, not url-based, so a domain move never re-sends old posts to feed readers.
export function rssGuid(slug: string): string {
  return `${site.shortName}:${slug}`;
}
