import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleForm.new.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { TextField } from '@/shared/ui/redesigned/TextField';
import { getFlexClasses } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { transformText } from '../../../model/lib/transformText';

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
      console.log(transformText(blog));
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
          text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus ad dolorem sunt architecto ipsum, velit fugiat ratione facere nesciunt sapiente. Alias rem eaque ex natus omnis nisi nostrum, eligendi blanditiis!
Eum deserunt suscipit nam vel culpa doloremque quos quibusdam explicabo voluptatem eos accusantium iure tempore impedit porro exercitationem necessitatibus aliquid labore, autem numquam dolorem fuga. Deleniti eaque assumenda sint velit.
Itaque delectus esse voluptas et deleniti at maxime. Dicta earum rem dignissimos culpa quisquam? Consectetur earum inventore ipsam odit eum totam minima a numquam soluta quidem modi cupiditate, dignissimos nisi.
Perferendis consectetur aut corrupti laboriosam architecto exercitationem amet. Sint in ullam est alias cum consequatur laborum vero doloribus quaerat vitae, iusto numquam! Doloribus, corrupti perspiciatis voluptatum ab fuga voluptates! Officiis?
Nobis sapiente, veniam minus atque necessitatibus iste debitis omnis aliquid, quaerat corporis eum. Nam adipisci sapiente placeat odio corporis dignissimos et quasi quibusdam aperiam alias? Pariatur ratione porro possimus blanditiis.
Dignissimos ducimus consectetur in eum ea harum dolores ipsam molestiae est alias similique officia nobis voluptates, ratione omnis eos velit sapiente, sint iste quibusdam aperiam vel? Officiis vel reiciendis facere?
Beatae illum officia ab laboriosam officiis laudantium, dolorem cupiditate eligendi tenetur, obcaecati voluptatem quis blanditiis ratione enim voluptatum accusamus a, sunt amet. Dolor, inventore. Quos nam adipisci iusto exercitationem ullam.
Provident alias animi similique dolores eum! Quae molestiae cupiditate blanditiis cum, earum quasi sapiente voluptatem sed esse necessitatibus quas, animi eum id dolor sit omnis placeat! Aut magni odio at!
Sit et, magnam quam repellat qui nulla quas quidem aliquid voluptates tempora reiciendis beatae, quos laborum, veritatis tenetur nam in facilis cupiditate. Inventore, ipsa? Debitis minus nihil reprehenderit eos quos?"
        />
        <Button onClick={onPublishHandler}>{t('Опубликовать')}</Button>
      </div>
    );
  }
);
