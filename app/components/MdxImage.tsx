import Image from 'next/image';

type MdxImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
};

export function MdxImage({ src, alt, width = 1400, height = 900, caption }: MdxImageProps) {
  const label = caption ?? alt;

  return (
    <figure className='my-8'>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className='h-auto w-full rounded-lg border border-wool'
      />
      {label.length > 0 ? (
        <figcaption className='mt-2 text-sm text-muted'>{label}</figcaption>
      ) : null}
    </figure>
  );
}
