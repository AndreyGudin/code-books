import { ArticleBlockType, ArticleBlock } from '@/entities/Article';

const CODE_SYMBOL = '```';
const IMG_SYMBOL = '!!';

const sortText = (a: string, b: string): 1 | 0 | -1 => {
  const toSortA = Number(a.split(' ')[1]);
  const toSortB = Number(b.split(' ')[1]);
  if (toSortA > toSortB) return 1;
  if (toSortB > toSortA) return -1;
  return 0;
};

export const mapSymbols = (text: string): ArticleBlock[] => {
  const symbols = [CODE_SYMBOL, IMG_SYMBOL];
  let mappedSymbols: string[] = [];

  symbols.forEach((elem) => {
    let beginCode = text.indexOf(elem);
    while (beginCode > -1) {
      const endCode = text.indexOf(elem, beginCode + elem.length);
      mappedSymbols.push(`${elem} ${beginCode + elem.length} ${endCode}`);
      beginCode = text.indexOf(elem, endCode + elem.length);
    }
  });
  const mappedText: string[] = [];

  mappedSymbols.sort(sortText);
  console.log('mappedSymbols', mappedSymbols);
  mappedSymbols.forEach((elem, i, array) => {
    const beginSymbolText = Number(elem.split(' ')[1]);
    const endSymbolText = Number(elem.split(' ')[2]);
    const symbol = elem.split(' ')[0].length;

    if (i === 0) {
      if (array.length === 1) {
        if (beginSymbolText === 0) {
          console.log('1');
          mappedText.push(
            `text ${endSymbolText + symbol + 1} ${text.length - 1}`
          );
        }

        if (beginSymbolText > 0) {
          mappedText.push(`text 0 ${beginSymbolText - symbol}`);
        }
      } else {
        const nextBeginSymbolText = Number(array[i + 1].split(' ')[1]);

        if (beginSymbolText === 0) {
          mappedText.push(
            `text ${endSymbolText + symbol + 1} ${nextBeginSymbolText}`
          );
        }

        if (beginSymbolText > 0) {
          mappedText.push(`text 0 ${beginSymbolText - symbol}`);
        }
      }
    }

    if (array[i + 1]) {
      const endNextText = Number(array[i + 1].split(' ')[1]);
      const nextSymbol = array[i + 1].split(' ')[0].length;
      mappedText.push(
        `text ${endSymbolText + symbol + 1} ${endNextText - nextSymbol}`
      );
    } else {
      mappedText.push(`text ${endSymbolText + symbol + 1} ${text.length - 1}`);
    }
  });

  mappedSymbols = mappedSymbols.concat(mappedText);

  mappedSymbols.sort(sortText);
  if (mappedSymbols.length === 0) {
    mappedSymbols.push(`text 0 ${text.length - 1}`);
  }
  console.log('mappedSymbols', mappedSymbols);

  const result: ArticleBlock[] = mappedSymbols.map((value, i, array) => {
    const [symbol, begin, end] = value.split(' ');
    let resultObject: ArticleBlock = {} as ArticleBlock;

    if (symbol === CODE_SYMBOL) {
      const code = text.substring(+begin, +end);
      resultObject = {
        id: String(i),
        type: ArticleBlockType.CODE,
        code
      };
    }
    if (symbol === IMG_SYMBOL) {
      const [src, title] = text.substring(+begin, +end).split('\n\n');
      resultObject = {
        id: String(i),
        type: ArticleBlockType.IMAGE,
        src,
        title
      };
    }
    if (symbol === 'text') {
      const [title, ...paragraphs] = text.substring(+begin, +end).split('\n\n');
      if (paragraphs.length !== 0) {
        resultObject = {
          id: String(i),
          type: ArticleBlockType.TEXT,
          paragraphs,
          title
        };
      } else {
        resultObject = {
          id: String(i),
          type: ArticleBlockType.TEXT,
          paragraphs: title.split('\n'),
          title: ''
        };
      }
    }
    return resultObject;
  });
  console.log('result', result);
  return result;
};
