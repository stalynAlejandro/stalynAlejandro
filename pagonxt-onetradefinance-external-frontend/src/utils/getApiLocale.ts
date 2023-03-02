import i18n from '../i18n';

export const getApiLocale = () => {
  const lang = i18n.language?.toLowerCase() || '';

  // Send Spain regional spanish if it is spanish regardless the region
  if (lang.includes('es')) {
    return 'es_es';
  }

  // Try to send the localization locale if available
  if (lang.includes('_')) {
    return lang;
  }
  if (lang.includes('-')) {
    return lang.replace('-', '_');
  }

  // Otherwise, send specific global languages
  if (lang === 'en') {
    return 'en_us';
  }

  // Defaults to spanish
  return 'es_es';
};
