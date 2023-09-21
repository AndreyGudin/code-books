import { memo, useState } from 'react';
import type { FC } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import Star from '@/shared/assets/icons/star.svg';
import { Icon } from '../Icon/Icon';

interface StarRatingProps {
  className?: string;
  onSelect?: (starCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating: FC<StarRatingProps> = memo(
  ({
    className = '',
    size = 30,
    selectedStars = 0,
    onSelect = () => {}
  }: StarRatingProps) => {
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
      if (!isSelected) setCurrentStarsCount(starsCount);
    };

    const onLeave = () => () => {
      if (!isSelected) setCurrentStarsCount(0);
    };

    const onClick = (starsCount: number) => () => {
      if (!isSelected) {
        onSelect?.(starsCount);
        setCurrentStarsCount(starsCount);
        setIsSelected(true);
      }
    };

    return (
      <div className={classNames(cls.StarRating, {}, [className])}>
        {stars.map((star) => {
          return (
            <Icon
              className={classNames(
                cls.starIcon,
                { [cls.selected]: isSelected },
                [currentStarsCount >= star ? cls.hovered : cls.normal]
              )}
              Svg={Star}
              key={star}
              width={size}
              height={size}
              onMouseLeave={onLeave}
              onMouseEnter={onHover(star)}
              onClick={onClick(star)}
              data-testid={`StarRating.${star}`}
              data-selected={currentStarsCount >= star}
            />
          );
        })}
      </div>
    );
  }
);
