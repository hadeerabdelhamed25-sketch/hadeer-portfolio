import type { MetadataRoute } from 'next';
import { SITE, ROUTES } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap { return ROUTES.map(([p]) => ({ url: SITE + (p === '/' ? '' : p), lastModified: new Date() })); }
