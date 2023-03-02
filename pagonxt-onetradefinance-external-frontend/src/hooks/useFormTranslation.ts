import { useTranslation } from 'react-i18next';

import { TranslatorType } from '../types/TranslatorType';
import { getContextTKeys } from '../utils/getContextTKeys';

export const useFormTranslation = (context: string = '', props: any = {}) => {
  const trans = useTranslation('forms', props);

  const t: TranslatorType = (keys, options = {}) => {
    const contextKeys = getContextTKeys(keys, context);
    return trans.t(contextKeys, options);
  };

  return {
    ...trans,
    t,
  };
};
