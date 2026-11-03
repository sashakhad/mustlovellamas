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
        className='h-auto w-full border border-line'
      />
      {label.length > 0 ? (
        <figcaption className='mt-2 font-mono text-meta text-ash'>{label}</figcaption>
      ) : null}
    </figure>
  );
}
