export const getContextTKeys = (keys: string | string[], context: string) => {
  const keysArray = !Array.isArray(keys) ? [String(keys)] : keys;

  const contextKeys = keysArray.map((key) => {
    const contextualKeys = context?.split('.') || [];
    const pageKeys: string[] = [];

    contextualKeys.forEach((_, i) => {
      pageKeys.push(
        `${contextualKeys
          .slice(0, contextualKeys.length - i)
          .join('.')}.${key}`,
      );
    });

    return [...pageKeys, key, `common:${key}`]; // Use original key and common:key as a fallback to find it in forms root
  });

  return contextKeys.flat();
};
