import { memo, useLayoutEffect, useState } from 'react';
import type { FC, ImgHTMLAttributes, ReactElement } from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

export const AppImage: FC<AppImageProps> = memo(
  ({
    className = '',
    fallback,
    errorFallback,
    src,
    alt = 'image',
    ...otherProps
  }: AppImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
      const img = new Image();
      img.src = src ?? '';
      img.onload = () => {
        setIsLoading(false);
      };
      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
      };
    }, [src]);

    if (isLoading && fallback) return fallback;

    if (hasError && errorFallback) return errorFallback;
    return <img {...otherProps} src={src} alt={alt} className={className} />;
  }
);
