import { ArticleBlockType } from '../../model/consts/const';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponents } from '../ArticleCodeBlockComponents/ArticleCodeBlockComponents';
import { ArticleImageBlockComponents } from '../ArticleImageBlockComponents/ArticleImageBlockComponents';
import { ArticleTextBlockComponents } from '../ArticleTextBlockComponents/ArticleTextBlockComponents';
import cls from './ArticleDetails.module.scss';

export const renderBlock = (block: ArticleBlock): JSX.Element | null => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return (
        <ArticleCodeBlockComponents
          key={block.id}
          block={block}
          className={cls.block}
        />
      );
    case ArticleBlockType.IMAGE:
      return (
        <ArticleImageBlockComponents
          key={block.id}
          block={block}
          className={cls.block}
        />
      );
    case ArticleBlockType.TEXT:
      return (
        <ArticleTextBlockComponents
          key={block.id}
          block={block}
          className={cls.block}
        />
      );
    default:
      return null;
  }
};
