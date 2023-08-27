import { memo } from 'react';
import type { FC } from 'react';

import { ArticleView } from '../../model/consts/const';
import { Button } from '@/shared/ui/Button';
import { ButtonTheme } from '@/shared/ui/Button/const';
import { Icon } from '@/shared/ui/Icon';

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleViewSelector.module.scss';
import GridIcon from '@/shared/assets/icons/grid.svg';
import ListIcon from '@/shared/assets/icons/list.svg';

interface ArticleViewSelectorProps {
  className?: string;
  view?: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.GRID,
    icon: GridIcon
  },
  {
    view: ArticleView.LIST,
    icon: ListIcon
  }
];

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = memo(
  ({ className = '', view, onViewClick }: ArticleViewSelectorProps) => {
    const onClick = (newView: ArticleView) => () => {
      onViewClick?.(newView);
    };

    return (
      <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
        {viewTypes.map((type) => {
          return (
            <Button
              theme={ButtonTheme.CLEAR}
              onClick={onClick(type.view)}
              key={type.view}
            >
              <Icon
                Svg={type.icon}
                className={classNames('', {
                  [cls.notSelected]: type.view !== view
                })}
              />
            </Button>
          );
        })}
      </div>
    );
  }
);
