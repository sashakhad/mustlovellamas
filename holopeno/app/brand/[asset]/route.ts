import { brandAssets, isBrandAsset, renderBrandAsset } from '../../../lib/brandSvg';

export const dynamic = 'force-static';
export const dynamicParams = false;

type BrandRouteContext = { params: Promise<{ asset: string }> };

export function generateStaticParams(): Array<{ asset: string }> {
  return brandAssets.map(asset => ({ asset }));
}

export async function GET(_request: Request, { params }: BrandRouteContext): Promise<Response> {
  const { asset } = await params;
  if (!isBrandAsset(asset)) {
    return new Response('not found', { status: 404 });
  }
  return new Response(renderBrandAsset(asset), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
