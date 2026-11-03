export const site = {
  name: 'holopeño',
  shortName: 'holopeno',
  tagline: 'spicy notes on llms and shipping software.',
  description:
    'holopeño is a tech blog by sasha k. notes on llms, agents, and shipping software. hot, not hallucinated.',
  author: 'sasha k',
  locale: 'en_US',
  olderBlog: 'https://mustlovellamas.com',
} as const;

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    return configured.replace(/\/$/, '');
  }

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) {
    return `https://${production.replace(/\/$/, '')}`;
  }

  const preview = process.env.VERCEL_URL;
  if (preview) {
    return `https://${preview.replace(/\/$/, '')}`;
  }

  return 'http://localhost:3000';
}

// Stable across domain changes so feed readers never re-deliver old posts.
export function getPostGuid(slug: string): string {
  return `${site.shortName}:post:${slug}`;
}
