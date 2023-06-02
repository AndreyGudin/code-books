import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleCodeBlockComponents.module.scss';

interface ArticleCodeBlockComponentsProps {
  className?: string;
}

export const ArticleCodeBlockComponents: FC<
  ArticleCodeBlockComponentsProps
> = ({ className = '' }: ArticleCodeBlockComponentsProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(cls.ArticleCodeBlockComponents, {}, [className])}
    ></div>
  );
};
