import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponents.module.scss';

interface ArticleTextBlockComponentsProps {
  className?: string;
}

export const ArticleTextBlockComponents: FC<
  ArticleTextBlockComponentsProps
> = ({ className = '' }: ArticleTextBlockComponentsProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(cls.ArticleTextBlockComponents, {}, [className])}
    ></div>
  );
};
