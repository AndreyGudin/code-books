import { findSubstring } from './findSubstring';

const CODE_SYMBOL = '```';
const IMG_SYMBOL = '!!';

const excludeText = (
  text: string,
  toExclude: string[],
  symbol: string
): string => {
  let result = text;
  if (toExclude.length > 0) {
    toExclude.forEach((elem) => {
      result = result.replace(symbol + elem + symbol, '');
    });
    return result;
  }
  return text;
};

export const transformText = (text: string): string => {
  const codeText = findSubstring(text, CODE_SYMBOL);
  console.log('codeText', codeText);
  const img = findSubstring(text, IMG_SYMBOL);
  console.log('img', img);

  const wasteSymbols =
    CODE_SYMBOL.length * codeText.length * 2 +
    IMG_SYMBOL.length * img.length * 2;
  console.log('wasteSymbols', wasteSymbols);
  const textWithoutCode = excludeText(text, codeText, CODE_SYMBOL);
  console.log('textWithoutCode', textWithoutCode);
  const t = excludeText(textWithoutCode, img, IMG_SYMBOL);
  console.log('t', t);
  return excludeText(textWithoutCode, img, IMG_SYMBOL).slice(wasteSymbols + 1);
};
