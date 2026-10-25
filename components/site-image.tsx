import Image from "next/image";
import { isOptimizableImage, type ImageSetting } from "@/lib/settings";

/** next/image for an editable image slot; images from other hosts are shown without optimization. */
export function SiteImage({
  image,
  width,
  height,
  sizes,
  priority,
  className,
  testId,
}: {
  image: ImageSetting;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  testId?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      unoptimized={!isOptimizableImage(image.src)}
      data-testid={testId}
      className={className}
    />
  );
}
