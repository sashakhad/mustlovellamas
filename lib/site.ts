export const site = {
  name: 'Must Love LLaMas',
  shortName: 'mustlovellamas',
  tagline: 'A tech blog by Sasha K. Notes on software, models, and the work around them.',
  description:
    'Must Love LLaMas is Sasha K\'s tech blog. Essays and notes on building software, working with LLMs, and shipping things.',
  author: 'Sasha K',
  github: 'https://github.com/sashakhad/mustlovellamas',
  personalBlog: 'https://github.com/sashakhad/blog-public',
} as const;

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    return configured.replace(/\/$/, '');
  }

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) {
    return `https://${vercel.replace(/\/$/, '')}`;
  }

  return 'http://localhost:3000';
}
