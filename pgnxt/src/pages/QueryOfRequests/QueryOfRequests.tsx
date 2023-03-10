import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';

import { QueryRequestDto } from '../../api/types/QueryRequestDto';
import { ContentContainer } from '../../components/ContentContainer';
import { ManagementTableProps } from '../../containers/ManagementTable/ManagementTable';
import { PageTitle } from '../../components/PageTitle';
import { PageWithMenu } from '../../components/PageWithMenu';
import ApiUrls from '../../constants/apiUrls';
import { fetchServer } from '../../utils/fetchServer';
import {
  FiltersProps,
  FilterValuesProps,
} from '../../containers/FiltersModal/FiltersModal';
import { getFilterFieldsArray } from '../../helpers/getFilterFieldsArray';
import { getFiltersAppliedObject } from '../../helpers/getFiltersAppliedObject';
import Navigation from '../../constants/navigation';
import { formatDate } from '../../utils/dates';
import { ApiFiltersResponseDto } from '../../api/types/ApiFiltersResponseDto';
import { StManagementTable } from './QueryOfRequestsStyled';
import statusTypes from '../../enums/statusTypes';
import productTypes, { ProductTypes } from '../../enums/productTypes';
import eventTypes, { EventTypes } from '../../enums/eventTypes';
import { ViewRequestDetails } from '../../components/ViewRequestDetails';
import { defaultJsonHeaders } from '../../constants/defaultJsonHeaders';

const QueryOfRequests: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [detailsOpened, setDetailsOpened] = useState<{
    event: EventTypes;
    product: ProductTypes;
    requestId: string;
  }>();
  const [indexedRequests, setIndexedRequests] = useState<{
    [key: string]: QueryRequestDto;
  }>({});
  const [requestRows, setRequestRows] = useState<ManagementTableProps['rows']>(
    {},
  );
  const [categorizedFilters, setCategorizedFilters] =
    useState<FiltersProps[]>();
  const [fetchedFilters, setFetchedFilters] = useState<ApiFiltersResponseDto>();

  /* Variables needed to keep track of changes that affect the displayed data from the backend */
  const [filtersApplied, setFiltersApplied] = useState<FilterValuesProps>();
  const [sortBy, setSortBy] = useState<
    { field: string; order: number } | undefined
  >();
  const [pageSize, setPageSize] = useState(5); // Default value, same as in Table.tsx
  const [fromPage, setFromPage] = useState(0); // Default value, same as in Table.tsx
  const [totalItems, setTotalItems] = useState(0);

  const fetchRequests = useCallback(async () => {
    const filtersObject = {
      filters: getFiltersAppliedObject(fetchedFilters, filtersApplied),
      fromPage,
      pageSize,
      sortField: sortBy?.field || '',
      sortOrder: sortBy?.order || 0, // -1 | 0 | 1
    };

    const response = await fetchServer<{
      data: QueryRequestDto[];
      total: number;
    }>(`${ApiUrls.myRequests}`, {
      body: JSON.stringify(filtersObject),
      headers: defaultJsonHeaders,
      method: 'post',
    });

    if (response.data) {
      setTotalItems(response.total);

      const newRequests: ManagementTableProps['rows'] = {};
      const dictionaryResponse: { [key: string]: QueryRequestDto } = {};

      response.data.forEach((request: QueryRequestDto) => {
        dictionaryResponse[request.rowId] = { ...request };

        newRequests[request.rowId] = {
          ...request,
          event:
            (request.event && t(`eventTypes.${request.event.toLowerCase()}`)) ||
            '',
          product:
            (request.product &&
              t(`productTypes.${request.product.toLowerCase()}`)) ||
            '',
          requestedDate:
            (request.requestedDate &&
              formatDate(new Date(request.requestedDate))) ||
            '',
          resolution:
            (request.resolution &&
              t(`resolutionTypes.${request.resolution.toUpperCase()}`)) ||
            '',
        };
      });

      setIndexedRequests(dictionaryResponse);
      setRequestRows(newRequests);
    }
  }, [fromPage, pageSize, filtersApplied, sortBy]);

  const renderRowActions = useCallback(
    (rowId: string | number) => {
      const {
        event,
        operationId,
        product,
        status: taskStatus,
      } = indexedRequests[rowId];
      const status = taskStatus.toUpperCase();

      if (status === statusTypes.DRAFT) {
        if (
          [
            eventTypes.ADVANCE,
            eventTypes.REQUEST,
            eventTypes.FINANCING_REQUEST,
            eventTypes.PAYMENT_CHARGE,
            eventTypes.PAYMENT_ACCOUNTLESS,
            eventTypes.PAYMENT_FINANCING,
          ].includes(event as any)
        ) {
          return [
            {
              label: t('continue'),
              onClick: () => {
                if (product === productTypes.CLE) {
                  if (event === eventTypes.ADVANCE) {
                    navigate(
                      `${Navigation.forms.cle.advance.create}/${operationId}`,
                    );
                  } else if (event === eventTypes.REQUEST) {
                    navigate(
                      `${Navigation.forms.cle.request.create}/${operationId}`,
                    );
                  }
                } else if (product === productTypes.CLI) {
                  if (event === eventTypes.REQUEST) {
                    navigate(
                      `${Navigation.forms.cli.request.create}/${operationId}`,
                    );
                  } else if (event === eventTypes.PAYMENT_CHARGE) {
                    navigate(
                      `${Navigation.forms.cli.paymentCharge.create}/${operationId}`,
                    );
                  } else if (event === eventTypes.PAYMENT_ACCOUNTLESS) {
                    navigate(
                      `${Navigation.forms.cli.paymentAccountless.create}/${operationId}`,
                    );
                  } else if (event === eventTypes.PAYMENT_FINANCING) {
                    navigate(
                      `${Navigation.forms.cli.paymentFinancing.create}/${operationId}`,
                    );
                  } else if (event === eventTypes.FINANCING_REQUEST) {
                    navigate(
                      `${Navigation.forms.cli.financingRequest.create}/${operationId}`,
                    );
                  }
                }
              },
            },
          ];
        }

        return [];
      }

      return [
        {
          label: t('consult'),
          onClick: () => {
            let allowedEvents;

            if (product === productTypes.CLE) {
              allowedEvents = [
                eventTypes.REQUEST,
                eventTypes.MODIFICATION,
                eventTypes.ADVANCE,
                eventTypes.ADVANCE_MODIFICATION,
                eventTypes.ADVANCE_CANCELLATION,
                eventTypes.OTHER_OPERATIONS,
              ];
            } else if (product === productTypes.CLI) {
              allowedEvents = [
                eventTypes.REQUEST,
                eventTypes.MODIFICATION,
                eventTypes.PAYMENT_CHARGE,
                eventTypes.PAYMENT_ACCOUNTLESS,
                eventTypes.PAYMENT_FINANCING,
                eventTypes.FINANCING_REQUEST,
                eventTypes.FINANCING_MODIFICATION,
                eventTypes.FINANCING_CANCELLATION,
                eventTypes.OTHER_OPERATIONS,
              ];
            }

            if (!allowedEvents || !allowedEvents.includes(event as any)) {
              return;
            }

            setDetailsOpened({
              event: event as EventTypes,
              product: product as ProductTypes,
              requestId: operationId,
            });
          },
        },
      ];
    },
    [indexedRequests],
  );

  // TODO: implement returned collapsed content
  const renderCollapsedContent = undefined;
  // const renderCollapsedContent = (rowId: string) => {
  //   const {
  //     issuanceDate,
  //     ownerName = 'Mipropietario',
  //     task,
  //   } = indexedRequests[rowId];

  //   return (
  //     <Table
  //       collapsible={false}
  //       cols={[
  //         { key: 'startDate', label: t('startDate') },
  //         { key: 'endDate', label: t('endDate') },
  //         { key: 'task', label: t('task') },
  //         { key: 'ownerName', label: t('owner') },
  //       ]}
  //       hideMetadata
  //       rows={{
  //         'id-1': {
  //           endDate: issuanceDate && formatDate(new Date(issuanceDate), true),
  //           ownerName,
  //           startDate: issuanceDate && formatDate(new Date(issuanceDate), true),
  //           task: task || 'Tarea genérica',
  //         },
  //         'id-2': {
  //           endDate: issuanceDate && formatDate(new Date(issuanceDate), true),
  //           ownerName,
  //           startDate: issuanceDate && formatDate(new Date(issuanceDate), true),
  //           task: task || 'Tarea genérica',
  //         },
  //       }}
  //       selectable={false}
  //     />
  //   );
  // };

  // Re-fetch each time these parameters change
  useEffect(() => {
    fetchRequests();
  }, [pageSize, fromPage, filtersApplied, sortBy]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetchServer<ApiFiltersResponseDto>(
          ApiUrls.myRequestsFilters,
        );

        if (response) {
          setFetchedFilters(response);
          const newFilters: FiltersProps[] = [];

          newFilters.push({
            fields: getFilterFieldsArray({
              apiFilters: response,
              fieldNames: [
                'productId',
                'eventId',
                'priority',
                'fromDate',
                'toDate',
              ],
              i18nPrefixes: {
                eventId: 'eventTypes',
                productId: 'productTypes',
                status: 'statuses',
              },
              relatedFields: { fromDate: 'toDate' },
            }),
            title: t('petitionDetails'),
          });

          newFilters.push({
            fields: getFilterFieldsArray({
              apiFilters: response,
              fieldNames: ['fromAmount', 'toAmount', 'currency'],
              i18nPrefixes: { currency: 'filterValues' },
              relatedFields: { fromAmount: 'toAmount' },
            }),
            title: t('amountAndCurrency'),
          });

          setCategorizedFilters(newFilters);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };

    fetchFilters();
  }, []);

  return (
    <PageWithMenu>
      {detailsOpened && (
        <ViewRequestDetails
          event={detailsOpened.event}
          product={detailsOpened.product}
          requestId={detailsOpened.requestId}
          type="request"
          onClose={() => setDetailsOpened(undefined)}
        />
      )}

      <div
        className={cx({ hiddenComponent: detailsOpened })}
        data-testid="query-of-requests"
      >
        <PageTitle title={t('queryOfRequests')} />
        <ContentContainer>
          <div>
            <StManagementTable
              collapsible
              cols={[
                { key: 'operationId', label: t('requestRef') },
                { key: 'contractReference', label: t('contractRef') },
                { key: 'requestedDate', label: t('reqDate') },
                { key: 'office', label: t('office') },
                { key: 'product', label: t('product') },
                { key: 'event', label: t('event') },
                { key: 'resolution', label: t('resolution') },
                { key: 'client', label: t('client') },
                { key: 'requesterName', label: t('filterKeys.requesterName') },
              ]}
              filters={categorizedFilters}
              quickFilterKeys={['productId', 'eventId']}
              renderCollapsedContent={renderCollapsedContent}
              renderRowActions={renderRowActions}
              rows={requestRows}
              searchByFields={
                fetchedFilters &&
                Object.keys(fetchedFilters)
                  .filter((key) => fetchedFilters[key].type === 'text')
                  .map((key) => ({
                    key,
                    label: t(`filterKeys.${key}`),
                  }))
              }
              searchPlaceholder={t('searchByOperationId')}
              selectable={false}
              totalItems={totalItems}
              units={t('tasks')}
              onFiltersChange={(newFiltersApplied) =>
                setFiltersApplied(newFiltersApplied)
              }
              onNumberItemsShownChange={(itemsShown) => setPageSize(itemsShown)}
              onPageChange={(page) => setFromPage(page)}
              onSortByChange={(newSortBy) => setSortBy(newSortBy)}
            />
          </div>
        </ContentContainer>
      </div>
    </PageWithMenu>
  );
};

export default QueryOfRequests;
