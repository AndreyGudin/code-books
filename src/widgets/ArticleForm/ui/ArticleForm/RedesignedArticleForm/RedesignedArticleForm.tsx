import { useTranslation } from 'react-i18next';
import { memo, useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleForm.new.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { TextField } from '@/shared/ui/redesigned/TextField';
import { HStack, getFlexClasses } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { mapSymbols } from '../../../model/lib/transformText';
import { useCreateArticleNewMutation } from '../../../model/api/articleFormApi';
import { useSelector } from 'react-redux';
import { getAuthUserData } from '@/entities/User';
import {
  Article,
  ArticleType,
  RedesignedArticleDetailsComponent
} from '@/entities/Article';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { PasteTextToPositionButton } from '@/features/PasteTextToPositionButton';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Card } from '@/shared/ui/redesigned/Card';

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
    const [preView, setPreview] = useState<boolean>(false);
    const [article, setArticle] = useState<Article>({} as Article);
    const [textAreaCursor, setTextAreaCursor] = useState<number>(0);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const user = useSelector(getAuthUserData);
    const [createNewArticle] = useCreateArticleNewMutation();
    const time = new Intl.DateTimeFormat('ru-Ru');

    const pasteImage = `!!https://linkToImage\n\n${t('Подпись картинки')}!!`;
    const pasteCode = `\`\`\`${t('Какой-то код')}\`\`\``;

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
        const createdArticle = {
          title,
          subtitle,
          img,
          userId: user?.id,
          views: 0,
          createdAt,
          blocks,
          type: [ArticleType.ALL]
        };

        createNewArticle(createdArticle).catch((e) => {
          console.log(e);
        });
      }
    };

    const onPreviewHandler = (): void => {
      const blocks = mapSymbols(blog);
      const createdAt = time.format(new Date());
      console.log('blocks', blocks);
      console.log('selectionStart', textAreaRef.current?.selectionStart);
      if (user) {
        const createdArticle: Article = {
          id: '',
          title,
          subtitle,
          img,
          user: { id: user?.id, username: '' },
          views: 0,
          createdAt,
          blocks,
          type: [ArticleType.ALL]
        };
        setArticle(createdArticle);
        setPreview(true);
      }
    };

    const onPreviewCloseHandler = (): void => {
      setPreview(false);
    };

    const onPasteTextHandler = (value: string): void => {
      setBlog(value);
    };

    const onTextAreaClickHandler = (): void => {
      setTextAreaCursor(textAreaRef.current?.selectionStart ?? 0);
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
        <HStack gap="32" max>
          <PasteTextToPositionButton
            variant="clear"
            size="m"
            position={textAreaCursor}
            value={blog}
            setValue={onPasteTextHandler}
            textToPaste={pasteImage}
          >
            {'Вставить картинку'}
          </PasteTextToPositionButton>
          <PasteTextToPositionButton
            variant="clear"
            size="m"
            position={textAreaCursor}
            value={blog}
            setValue={onPasteTextHandler}
            textToPaste={pasteCode}
          >
            {'Вставить код'}
          </PasteTextToPositionButton>
        </HStack>

        <TextField
          ref={textAreaRef}
          onChange={changeBlogHandler}
          onClick={onTextAreaClickHandler}
          name="blog"
          className={cls.textArea}
          text={blog}
        />
        <HStack gap="8">
          <Button onClick={onPublishHandler}>{t('Опубликовать')}</Button>
          <Button variant="filled" onClick={onPreviewHandler}>
            {t('Предосмотр')}
          </Button>
        </HStack>

        <Modal
          staticSize
          className="preview"
          isOpen={preView}
          onClose={onPreviewCloseHandler}
        >
          <Card
            fullWidth
            className={classNames(cls.ArticleDetailsPreview, {}, [
              getFlexClasses({ direction: 'column', gap: '16', align: 'start' })
            ])}
            padding="24"
            border="round"
          >
            <RedesignedArticleDetailsComponent article={article} />
          </Card>
        </Modal>
      </div>
    );
  }
);
