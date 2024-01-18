import { useTranslation } from 'react-i18next';
import { memo, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleForm.new.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { TextField } from '@/shared/ui/redesigned/TextField';
import { HStack, getFlexClasses } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { mapSymbols } from '../../../model/lib/transformText';
import {
  useCreateArticleNewMutation,
  useEditArticleMutation
} from '../../../model/api/articleFormApi';
import { useSelector } from 'react-redux';
import { getAuthUserData } from '@/entities/User';
import {
  Article,
  ArticleType,
  RedesignedArticleDetailsComponent,
  useGetArticleOnMount
} from '@/entities/Article';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { PasteTextToPositionButton } from '@/features/PasteTextToPositionButton';
import { Card } from '@/shared/ui/redesigned/Card';
import { transformBlocksToText } from '../../../model/lib/transformBlocksToText';

interface RedesignedArticleFormProps {
  className?: string;
  existingArticleId?: string;
}

export const RedesignedArticleForm: FC<RedesignedArticleFormProps> = memo(
  ({ className = '', existingArticleId }: RedesignedArticleFormProps) => {
    const { t } = useTranslation();
    const time = new Intl.DateTimeFormat('ru-Ru');

    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [blog, setBlog] = useState<string>('');
    const [createdAt, setCreatedAt] = useState<string>(time.format(new Date()));
    const [isArticleAdded, setIsArticleAdded] = useState<boolean>(false);
    const [preView, setPreview] = useState<boolean>(false);
    const [article, setArticle] = useState<Article>({} as Article);
    const existingArticle = useGetArticleOnMount(existingArticleId);
    const [textAreaCursor, setTextAreaCursor] = useState<number>(0);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const user = useSelector(getAuthUserData);
    const [createNewArticle] = useCreateArticleNewMutation();
    const [editArticle] = useEditArticleMutation();

    const pasteImage = `!!https://linkToImage\n\n${t('Подпись картинки')}!!`;
    const pasteCode = `\`\`\`${t('Какой-то код')}\`\`\``;

    useEffect(() => {
      if (existingArticle) {
        setTitle(existingArticle.title);
        setSubtitle(existingArticle.subtitle);
        setImg(existingArticle.img);
        setCreatedAt(existingArticle.createdAt);
        setBlog(transformBlocksToText(existingArticle.blocks));
      }
    }, [existingArticle]);

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
      if (existingArticle && user) {
        const editedArticle = {
          id: existingArticle.id,
          title,
          subtitle,
          img,
          userId: user?.id,
          views: existingArticle.views,
          createdAt,
          blocks,
          type: [ArticleType.ALL]
        };
        editArticle(editedArticle).catch((e) => {
          console.log(e);
        });
        setIsArticleAdded(true);
        console.log('edited');
      }
      if (user && existingArticle === undefined) {
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
        console.log('created');

        createNewArticle(createdArticle).catch((e) => {
          console.log(e);
        });
        setIsArticleAdded(true);
      }
    };

    const onPreviewHandler = (): void => {
      const blocks = mapSymbols(blog);
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
    const onMessageCloseHandler = (): void => {
      setIsArticleAdded(false);
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
          <Button onClick={onPublishHandler}>
            {existingArticleId ? t('Изменить') : t('Опубликовать')}
          </Button>
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
        <Modal
          staticSize
          className="message"
          isOpen={isArticleAdded}
          onClose={onMessageCloseHandler}
        >
          {t('Статья успешно добавлена')}
        </Modal>
      </div>
    );
  }
);
