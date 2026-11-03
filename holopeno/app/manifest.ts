import type { MetadataRoute } from 'next';
import { color } from '../design/tokens';
import { site } from '../lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'browser',
    background_color: color.char,
    theme_color: color.char,
    icons: [{ src: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  };
}
