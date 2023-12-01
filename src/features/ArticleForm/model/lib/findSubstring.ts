export const findSubstring = (blog: string, substring: string): string[] => {
  const symbol = substring;
  const length = substring.length;
  const result = [];
  const temp = blog;
  let beginCode = temp.indexOf(symbol);
  while (beginCode > -1) {
    const endCode = temp.indexOf(symbol, beginCode + length);
    if (beginCode > -1 && endCode > -1) {
      result.push(temp.slice(beginCode + length, endCode));
    }
    beginCode = temp.indexOf(symbol, endCode + length);
  }
  return result;
};
