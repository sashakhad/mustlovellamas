export const site = {
  name: 'holopeño',
  shortName: 'holopeno',
  tagline: 'spicy notes on llms and shipping software.',
  description: 'holopeño: spicy notes on llms, agents, and the software factories they run. hot, not hallucinated.',
  author: 'sasha',
  // placeholder until the X handle is final (see the rebrand plan)
  xHandle: '@holopeno',
  github: 'https://github.com/sashakhad/holopeno',
  locale: 'en_US',
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

export function xProfileUrl(): string {
  return `https://x.com/${site.xHandle.replace(/^@/, '')}`;
}
