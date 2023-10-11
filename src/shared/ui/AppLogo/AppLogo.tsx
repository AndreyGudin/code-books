import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { HStack } from '../Stack';

interface AppLogoProps {
  className?: string;
}

export const AppLogo: FC<AppLogoProps> = memo(
  ({ className = '' }: AppLogoProps) => {
    return (
      <HStack
        max
        justify="center"
        className={classNames(cls.AppLogoWrapper, {}, [className])}
      >
        <div className={cls.gradientBig} />
        <div className={cls.gradientSmall} />
        <AppSvg className={cls.appLogo} />
      </HStack>
    );
  }
);
