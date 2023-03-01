import { FilterFieldProps } from '../containers/FiltersModal/FiltersModal';
import i18n from '../i18n';
import { TranslatorType } from '../types/TranslatorType';

interface I18nFieldNames {
  [key: string]: string | undefined | null;
}

export const getFilterFieldsArray = ({
  apiFilters,
  fieldNames,
  i18nPrefixes = {},
  relatedFields = {},
  t = i18n.t,
}: {
  apiFilters: any;
  fieldNames: string[];
  i18nPrefixes?: I18nFieldNames;
  relatedFields?: { [key: string]: string };
  t?: TranslatorType;
}) => {
  const fieldsArray: FilterFieldProps[] = [];

  fieldNames.forEach((name) => {
    const apiFilter = apiFilters[name];
    const i18nPrefix = i18nPrefixes[name] ? `${i18nPrefixes[name]}.` : '';

    if (!apiFilter) {
      // eslint-disable-next-line no-console
      console.warn(`Filter "${name}" not present in API filters`);
    } else {
      const { options, type } = apiFilters[name];

      fieldsArray.push({
        key: name,
        options:
          options && options.length
            ? options.map(({ code }: { code: string }) => ({
                label: t(
                  `${i18nPrefix}${code.split(' ').join('').toLowerCase()}`,
                ),
                value: code,
              }))
            : undefined,
        placeholder: t(`filterKeys.${name}`),
        relatedField: relatedFields[name],
        title: t('filterByField', { field: t(`filterKeys.${name}`) }),
        type,
      });
    }
  });

  return fieldsArray;
};
