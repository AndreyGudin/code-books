import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleForm.new.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { TextField } from '@/shared/ui/redesigned/TextField';
import { getFlexClasses } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { mapSymbols } from '../../../model/lib/transformText';
import { useCreateArticleNewMutation } from '../../../model/api/articleFormApi';
import { useSelector } from 'react-redux';
import { getAuthUserData } from '@/entities/User';
import { ArticleType } from '@/entities/Article';

interface RedesignedArticleFormProps {
  className?: string;
}

export const RedesignedArticleForm: FC<RedesignedArticleFormProps> = memo(
  ({ className = '' }: RedesignedArticleFormProps) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [blog, setBlog] = useState<string>('');
    const user = useSelector(getAuthUserData);
    const [createNewArticle] = useCreateArticleNewMutation();
    const time = new Intl.DateTimeFormat('ru-Ru');
    const changeTitleHandler = (value: string): void => {
      setTitle(value);
    };
    const changeSubtitleHandler = (value: string): void => {
      setSubtitle(value);
    };
    const changeImgHandler = (value: string): void => {
      setImg(value);
    };
    const changeBlogHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
      setBlog(e.currentTarget.value);
    };

    const onPublishHandler = (): void => {
      console.log('text ', mapSymbols(blog));
      const blocks = mapSymbols(blog);
      const createdAt = time.format(new Date());
      if (user) {
        createNewArticle({
          title,
          subtitle,
          img,
          userId: user.id,
          views: 0,
          createdAt,
          blocks,
          type: [ArticleType.ALL]
        }).catch((e) => {
          console.log(e);
        });
      }
    };

    return (
      <div
        className={classNames(cls.RedesignedArticleForm, {}, [
          className,
          getFlexClasses({ direction: 'column', gap: '8' })
        ])}
      >
        <Input
          onChange={changeTitleHandler}
          name="title"
          placeholder={t('Заголовок') ?? ''}
          value={title}
        />
        <Input
          onChange={changeSubtitleHandler}
          name="subtitle"
          placeholder={t('Подзаголовок') ?? ''}
          value={subtitle}
        />
        <Input
          onChange={changeImgHandler}
          name="img"
          placeholder={t('Ссылка на изображение') ?? ''}
          value={img}
        />
        <TextField
          onChange={changeBlogHandler}
          name="blog"
          className={cls.textArea}
          text={blog}
        />
        <Button onClick={onPublishHandler}>{t('Опубликовать')}</Button>
      </div>
    );
  }
);
