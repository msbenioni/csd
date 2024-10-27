import Image from "next/image";

export function PlaceholderImage({
  width,
  height,
  alt,
}: {
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <Image
      src={`/api/placeholder/${width}/${height}`}
      alt={alt}
      width={width}
      height={height}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = `/images/imagecomingsoon.png`;
      }}
    />
  );
}
