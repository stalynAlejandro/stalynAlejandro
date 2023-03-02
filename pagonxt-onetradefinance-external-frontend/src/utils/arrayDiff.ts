export const arrayDiff = (a?: any[], b?: any[]) => {
  let i;
  const la = a?.length;
  const lb = b?.length;
  const res = [];

  if (!la) {
    return b || [];
  }

  if (!lb) {
    return a || [];
  }

  for (i = 0; i < la; i += 1) {
    if (b.indexOf(a[i]) === -1) {
      res.push(a[i]);
    }
  }

  for (i = 0; i < lb; i += 1) {
    if (a.indexOf(b[i]) === -1) {
      res.push(b[i]);
    }
  }

  return res;
};
