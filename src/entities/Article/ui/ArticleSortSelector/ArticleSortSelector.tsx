import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import type { FC } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { Select } from 'shared/ui/Select/Select';
import type { SelectOption } from 'shared/ui/Select/Select';
import { ArticleSortField } from 'entities/Article/model/types/article';
import type { SortOrder } from 'shared/types/types';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newOrder: ArticleSortField) => void;
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo(
  ({
    className = '',
    onChangeOrder,
    onChangeSort,
    order,
    sort
  }: ArticleSortSelectorProps) => {
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
      () => [
        { value: 'asc', content: t('возрастанию') },
        { value: 'desc', content: t('убыванию') }
      ],
      [t]
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
      () => [
        { value: ArticleSortField.CREATED, content: t('дата создания') },
        { value: ArticleSortField.TITLE, content: t('название') },
        { value: ArticleSortField.VIEWS, content: t('просмотрам') }
      ],
      [t]
    );

    return (
      <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select
          options={sortFieldOptions}
          label={t('Сортировать по') ?? ''}
          value={sort}
          onChange={onChangeSort}
        />
        <Select
          options={orderOptions}
          label={t('по') ?? ''}
          value={order}
          onChange={onChangeOrder}
        />
      </div>
    );
  }
);
