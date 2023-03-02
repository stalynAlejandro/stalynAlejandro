import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';

import { AccountDto } from '../api/types/AccountDto';
import { ApiResponse } from '../api/types/ApiResponse';
import { CommentDto } from '../api/types/CommentDto';
import { CustomerCleRequestDto } from '../api/types/CustomerCleRequestDto';
import { CustomerDto } from '../api/types/CustomerDto';
import { ExchangeInsuranceDto } from '../api/types/ExchangeInsuranceDto';
import { RiskLineDto } from '../api/types/RiskLineDto';
import { TableApiFilterDto } from '../api/types/TableApiFilterDto';
import { RequestHistoricItemDto } from '../api/types/RequestHistoricItemDto';
import { Option } from '../components/Controls/Select/Select';
import ApiUrls from '../constants/apiUrls';
import { getApiLocale } from '../utils/getApiLocale';
import { getSearchParamsWithValues } from '../utils/getSearchParamsWithValue';
import useSingleFetch from './useSingleFetch';
import { ProductTypes } from '../enums/productTypes';
import { formatDate } from '../utils/dates';
import { EventTypes } from '../enums/eventTypes';
import { CurrencyDto } from '../api/types/CurrencyDto';
import { CurrencyValue } from '../components/Controls/Select/OptionComponents/CurrencyValue';
import { defaultJsonHeaders } from '../constants/defaultJsonHeaders';
import { CustomerCliRequestDto } from '../api/types/CustomerCliRequestDto';
import { CustomerCliFinancingDto } from '../api/types/CustomerCliFinancingDto';

interface FetchHookOptions {
  autofetch?: boolean;
}

const defaultHookOptions: FetchHookOptions = {
  autofetch: true,
};

export const useFetchRiskLines = (
  {
    amount,
    currency = 'EUR',
    expirationDate,
    personNumber,
    product,
  }: {
    amount?: string;
    currency?: string;
    expirationDate?: string;
    personNumber: string;
    product: ProductTypes;
  },
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const urlSearchParams = getSearchParamsWithValues({
    client: personNumber,
    expiration_date: expirationDate
      ? formatDate(new Date(expirationDate), false, 'yyyy-MM-dd')
      : undefined,
    operation_amount: amount,
    operation_currency: currency,
    product_id: product,
  });

  const {
    data: riskLines,
    fetchData: fetchRiskLines,
    isLoading,
  } = useSingleFetch<RiskLineDto[]>(
    `${ApiUrls.riskLines}?${urlSearchParams.toString()}`,
  );

  const debouncedFetch = useCallback(debounce(fetchRiskLines, 600), [
    urlSearchParams,
  ]);

  useEffect(() => {
    if (hookOptions.autofetch) {
      debouncedFetch();
    }
  }, [personNumber, product, expirationDate, amount, currency]);

  return {
    fetchRiskLines,
    isLoading,
    riskLines,
  };
};

export const useFetchCustomerCleCollections = (
  personNumber: string,
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const {
    data: customerCollections,
    fetchData: fetchCustomerCollections,
    isLoading,
  } = useSingleFetch<CustomerCleRequestDto[]>(
    `${ApiUrls.exportCollections}?customer=${personNumber}`,
  );

  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchCustomerCollections();
    }
  }, [personNumber]);

  return {
    customerCollections,
    fetchCustomerCollections,
    isLoading,
  };
};

export const useFetchCustomerCliCollections = (
  personNumber: string,
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const {
    data: customerCollections,
    fetchData: fetchCustomerCollections,
    isLoading,
  } = useSingleFetch<CustomerCliRequestDto[]>(
    `${ApiUrls.importCollections}?customer=${personNumber}`,
  );

  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchCustomerCollections();
    }
  }, [personNumber]);

  return {
    customerCollections,
    fetchCustomerCollections,
    isLoading,
  };
};

export const useFetchCustomerCliFinancingRequests = (
  personNumber: string,
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const {
    data: financingRequests,
    fetchData: fetchFinancingRequests,
    isLoading,
  } = useSingleFetch<CustomerCliFinancingDto[]>(
    `${ApiUrls.importFinancingRequests}?customer=${personNumber}`,
  );

  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchFinancingRequests();
    }
  }, [personNumber]);

  return {
    fetchFinancingRequests,
    financingRequests,
    isLoading,
  };
};

export const useFetchCustomerAdvanceCollections = (
  personNumber: string,
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const {
    data: customerAdvanceCollections,
    fetchData: fetchCustomerAdvanceCollections,
    isLoading,
  } = useSingleFetch<CustomerCleRequestDto[]>(
    `${ApiUrls.exportAdvanceCollections}?customer=${personNumber}`,
  );

  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchCustomerAdvanceCollections();
    }
  }, [personNumber]);

  return {
    customerAdvanceCollections,
    fetchCustomerAdvanceCollections,
    isLoading,
  };
};

export const useFetchOperationTypes = (
  product: string,
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const { t } = useTranslation();
  const [mappedOperationTypes, setMappedOperationTypes] = useState<Option[]>();
  const {
    data: operationTypes,
    fetchData: fetchOperationTypes,
    isLoading,
  } = useSingleFetch<{ key: string }[]>(
    `${ApiUrls.operationTypes}?product_id=${product}`,
  );

  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchOperationTypes();
    }
  }, [product]);

  // Map response whenever we get it from the service to adapt it for Select components
  useEffect(() => {
    if (operationTypes?.length > 0) {
      const mappedTypes = operationTypes.map(({ key }) => ({
        label: t(`operationTypes.${key}`),
        value: key,
      }));

      setMappedOperationTypes(mappedTypes);
    }
  }, [operationTypes]);

  return {
    fetchOperationTypes,
    isLoading,
    mappedOperationTypes,
    operationTypes,
  };
};

export const useFetchCustomers = (
  searchParams: {
    name: string;
    office?: string;
    personNumber?: string;
    taxId?: string;
  },
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const urlParams = {
    name: searchParams.name,
    office: searchParams.office,
    person_number: searchParams.personNumber,
    tax_id: searchParams.taxId,
  };
  const urlSearchParams = getSearchParamsWithValues(urlParams);

  const {
    data: customers,
    fetchData: fetchCustomers,
    isLoading,
  } = useSingleFetch<CustomerDto[]>(
    `${ApiUrls.clients}?${urlSearchParams.toString()}`,
  );

  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchCustomers();
    }
  }, [searchParams]);

  return {
    customers,
    fetchCustomers,
    isLoading,
  };
};

export const useFetchCustomerAccounts = (
  personNumber: string,
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const {
    data: customerAccounts,
    fetchData: fetchAccounts,
    isLoading,
  } = useSingleFetch<{ accounts: AccountDto[]; client: string }[]>(
    `${ApiUrls.accounts}?client=${personNumber}`,
  );

  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchAccounts();
    }
  }, [personNumber]);

  return {
    customerAccounts: customerAccounts?.[0]?.accounts || [],
    fetchAccounts,
    isLoading,
  };
};

export const useFetchCollectionTypes = (
  productType: ProductTypes,
  currency: string = 'EUR',
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const { t } = useTranslation();
  const {
    data: collectionTypes,
    fetchData: fetchCollectionTypes,
    isLoading,
  } = useSingleFetch<{ key: string }[]>(
    ApiUrls.collectionTypes(productType, currency),
  );

  const [mappedCollectionTypes, setMappedCollectionTypes] =
    useState<Option[]>();

  // Fetch automatically when currency changes
  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchCollectionTypes();
    }
  }, [currency]);

  // Map response whenever we get it from the service to adapt it for Select components
  useEffect(() => {
    if (collectionTypes?.length > 0) {
      const mappedTypes = collectionTypes.map(({ key }) => ({
        label: t(`collectionTypes.${key}`),
        value: key,
      }));

      setMappedCollectionTypes(mappedTypes);
    }
  }, [collectionTypes]);

  return {
    collectionTypes,
    fetchCollectionTypes,
    isLoading,
    mappedCollectionTypes,
  };
};

export const useFetchExchangeInsurances = (
  {
    amount,
    buy,
    currencyBuy,
    currencySell,
    customerId,
  }: {
    amount: string;
    buy: boolean;
    currencyBuy: string;
    currencySell: string;
    customerId: string;
  },
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const urlSearchParams = getSearchParamsWithValues(
    {
      amount,
      buy,
      currency_buy: currencyBuy,
      currency_sell: currencySell,
      customer_id: customerId,
    },
    true,
  );
  const {
    data: exchangeInsurances,
    fetchData: fetchExchangeInsurances,
    isLoading,
  } = useSingleFetch<ExchangeInsuranceDto[]>(
    `${ApiUrls.exchangeInsurances}?${urlSearchParams.toString()}`,
  );

  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchExchangeInsurances();
    }
  }, [amount, buy, currencyBuy, currencySell, customerId]);

  return {
    exchangeInsurances,
    fetchExchangeInsurances,
    isLoading,
  };
};

export const useFetchComments = (
  requestId: string,
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const {
    data,
    fetchData: fetchComments,
    isLoading,
  } = useSingleFetch<ApiResponse<CommentDto[]>>(
    ApiUrls.requestComments(requestId, getApiLocale()),
  );

  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchComments();
    }
  }, [requestId]);

  return {
    comments: data?.entity as CommentDto[],
    fetchComments,
    isLoading,
  };
};

export const useFetchRequestHistoric = (
  requestId: string,
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const { data, fetchData, isLoading } = useSingleFetch<{
    data: RequestHistoricItemDto[];
    total: number;
  }>(ApiUrls.requestHistoric(requestId, getApiLocale()));

  const fetchRequestHistoric = async (filterOptions?: TableApiFilterDto) => {
    const defaultFilterOptions = {
      fromPage: 0,
      pageSize: 5,
      sortField: 'endDate',
      sortOrder: 1,
    };

    return fetchData({
      body: JSON.stringify({
        ...defaultFilterOptions,
        ...(filterOptions || {}),
      }),
      headers: defaultJsonHeaders,
      method: 'post',
    });
  };

  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchRequestHistoric();
    }
  }, [requestId]);

  return {
    fetchRequestHistoric,
    historic: data?.data,
    isLoading,
    totalResults: data?.total,
  };
};

export const useFetchCurrencies = (
  product: ProductTypes = 'CLE',
  event: EventTypes = 'REQUEST',
  hookOptions: FetchHookOptions = defaultHookOptions,
) => {
  const {
    data: currencies,
    fetchData: fetchCurrencies,
    isLoading,
  } = useSingleFetch<CurrencyDto[]>(ApiUrls.currencies(product, event));
  const defaultCurrency = { currency: 'EUR', id: 'EUR' };
  const [mappedCurrencies, setMappedCurrencies] = useState<Option[]>([]);

  // Fetch automatically when props changes
  useEffect(() => {
    if (hookOptions.autofetch) {
      fetchCurrencies();
    }
  }, [product, event]);

  // Map response whenever we get it from the service to adapt it for Select components
  useEffect(() => {
    if (currencies?.length > 0) {
      const mapped = currencies.map(({ currency, id }) => ({
        component: CurrencyValue,
        value: {
          currency,
          id,
        },
      }));

      setMappedCurrencies(mapped);
    }
  }, [currencies]);

  return {
    currencies,
    defaultCurrency,
    fetchCurrencies,
    isLoading,
    mappedCurrencies,
  };
};
