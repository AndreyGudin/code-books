import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { HStack } from '../../redesigned/Stack';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo: FC<AppLogoProps> = memo(
  ({ className = '', size = 50 }: AppLogoProps) => {
    return (
      <HStack
        max
        justify="center"
        className={classNames(cls.AppLogoWrapper, {}, [className])}
      >
        <AppSvg
          width={size}
          height={size}
          color="black"
          className={cls.appLogo}
        />
        <div className={cls.gradientBig} />
        <div className={cls.gradientSmall} />
      </HStack>
    );
  }
);
