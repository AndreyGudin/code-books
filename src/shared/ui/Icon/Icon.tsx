import { memo } from 'react';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon: FC<IconProps> = memo(
  ({ className = '', Svg }: IconProps) => {
    return <Svg className={classNames(cls.Icon, {}, [className])} />;
  }
);
