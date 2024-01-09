import { ArticleBlock, ArticleBlockType } from '@/entities/Article';

export const transformBlocksToText = (blocks: ArticleBlock[]): string => {
  const articleBlocks = [...blocks];
  let result = '';
  articleBlocks.forEach((elem) => {
    if (elem.type === ArticleBlockType.TEXT) {
      if (elem.title) {
        result += `${elem.title}\n\n`;
      }
      elem.paragraphs.forEach((paragraph, i, array) => {
        result += `${paragraph}\n`;
      });
    }

    if (elem.type === ArticleBlockType.CODE) {
      result += `\`\`\`${elem.code}\`\`\`\n`;
    }

    if (elem.type === ArticleBlockType.IMAGE) {
      result += `!!${elem.src}\n\n`;
      if (elem.title) {
        result += `${elem.title}!!\n`;
      }
    }
  });
  return result;
};
