import { useTranslation } from 'react-i18next';
import type { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleImageBlockComponents.module.scss';

interface ArticleImageBlockComponentsProps {
  className?: string;
}

export const ArticleImageBlockComponents: FC<
  ArticleImageBlockComponentsProps
> = ({ className = '' }: ArticleImageBlockComponentsProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(cls.ArticleImageBlockComponents, {}, [className])}
    ></div>
  );
};
