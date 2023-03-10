export const catchTestError = async (callback: () => any | void) => {
  try {
    await callback();
  } catch (err) {
    return err;
  }

  throw Error('Callback error not thrown');
};
