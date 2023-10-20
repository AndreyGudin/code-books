import { memo } from 'react';
import type { FC } from 'react';

import { Button as DeprecatedButton } from '@/shared/ui/deprecated/Button';
import { ButtonTheme } from '@/shared/ui/deprecated/Button/const';
import { Icon as DeprecatedIcon } from '@/shared/ui/deprecated/Icon';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleViewSelector.module.scss';
import DeprecatedGridIcon from '@/shared/assets/icons/grid.svg';
import DeprecatedListIcon from '@/shared/assets/icons/list.svg';
import GridIcon from '@/shared/assets/icons/tile.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import { ArticleView } from '@/entities/Article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
  className?: string;
  view?: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.GRID,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => GridIcon,
      off: () => DeprecatedGridIcon
    })
  },
  {
    view: ArticleView.LIST,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => DeprecatedListIcon
    })
  }
];

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo(
  ({ className = '', view, onViewClick }: ArticleViewSelectorProps) => {
    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView);
    };

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card
            className={classNames(cls.ArticleViewSelectorRedesigned, {}, [
              className
            ])}
            border="round"
          >
            <HStack gap="8">
              {viewTypes.map((type) => {
                return (
                  <Icon
                    width={24}
                    height={24}
                    Svg={type.icon}
                    className={classNames('', {
                      [cls.notSelected]: type.view !== view
                    })}
                    onClick={onClick(type.view)}
                    key={type.view}
                    clickable
                  />
                );
              })}
            </HStack>
          </Card>
        }
        off={
          <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((type) => {
              return (
                <DeprecatedButton
                  theme={ButtonTheme.CLEAR}
                  onClick={onClick(type.view)}
                  key={type.view}
                >
                  <DeprecatedIcon
                    width={24}
                    height={24}
                    Svg={type.icon}
                    className={classNames('', {
                      [cls.notSelected]: type.view !== view
                    })}
                  />
                </DeprecatedButton>
              );
            })}
          </div>
        }
      />
    );
  }
);
