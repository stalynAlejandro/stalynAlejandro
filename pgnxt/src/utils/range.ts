export const range = (
  start: number,
  count?: number,
  end?: number,
): number[] => {
  let inStart = start;
  let inCount = count;

  if (!inCount) {
    inCount = inStart;
    inStart = 0;
  }

  const rangeNumbers: number[] = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < inCount; i++) {
    if (end && inStart + i > end) {
      break;
    }
    rangeNumbers.push(inStart + i);
  }

  return rangeNumbers;
};
