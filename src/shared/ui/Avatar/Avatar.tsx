import { useMemo } from 'react';
import type { CSSProperties, FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar: FC<AvatarProps> = ({
  className = '',
  src = '',
  alt = 'avatar',
  size = 100
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size
    };
  }, [size]);

  return (
    <img
      src={src}
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
      alt={alt}
    />
  );
};
