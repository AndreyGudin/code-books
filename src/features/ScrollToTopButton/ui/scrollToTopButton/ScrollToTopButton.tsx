import { memo } from 'react';
import type { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToTopButton.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton: FC<ScrollToTopButtonProps> = memo(
  ({ className = '' }: ScrollToTopButtonProps) => {
    const onClick = (): void => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <Icon
        width={32}
        height={32}
        clickable
        onClick={onClick}
        Svg={CircleIcon}
        className={classNames(cls.ScrollToTopButton, {}, [className])}
      />
    );
  }
);
