import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { useNavigate, useSearchParams } from 'react-router-dom';
import cx from 'classnames';

import { PendingTaskDto } from '../../api/types/PendingTaskDto';
import { ColoredStatus } from '../../components/ColoredStatus';
import { ContentContainer } from '../../components/ContentContainer';
import { Currency } from '../../components/Currency';
import ManagementTable, {
  ManagementTableProps,
} from '../../containers/ManagementTable/ManagementTable';
import { PageTitle } from '../../components/PageTitle';
import { PageWithMenu } from '../../components/PageWithMenu';
import ApiUrls from '../../constants/apiUrls';
import { getNumberFormatProps } from '../../utils/getNumberFormatProps';
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
import { Tabs } from '../../components/Tabs';
import { Loader } from '../../components/Loader';
import { ViewRequestDetails } from '../../components/ViewRequestDetails';
import statusTypes from '../../enums/statusTypes';
import productTypes, { ProductTypes } from '../../enums/productTypes';
import eventTypes, { EventTypes } from '../../enums/eventTypes';
import { defaultJsonHeaders } from '../../constants/defaultJsonHeaders';

const getAmountComponent: React.FC<string> = (amount) =>
  (amount && (
    <NumberFormat
      {...getNumberFormatProps()}
      displayType="text"
      value={amount}
    />
  )) ||
  null;

const getStatusComponent: React.FC<string> = (status) =>
  (status && <ColoredStatus status={status} />) || null;

const getCurrencyComponent: React.FC<string> = (currency) =>
  (currency && <Currency currency={currency} />) || null;

const PendingTasks: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [detailsOpened, setDetailsOpened] = useState<{
    event: EventTypes;
    product: ProductTypes;
    requestId: string;
  }>();
  const [tasksScope, setTasksScope] = useState<string>(
    searchParams.get('scope') || 'mine',
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [indexedTasks, setIndexedTasks] = useState<{
    [key: string]: PendingTaskDto;
  }>({});
  const [pendingTasksRows, setPendingTasksRows] = useState<
    ManagementTableProps['rows']
  >({});
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

  const renderRowActions = useCallback(
    (rowId: string | number) => {
      const {
        event,
        operationId,
        product,
        status: taskStatus,
        taskId,
      } = indexedTasks[rowId];
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
          label: t('doAccess'),
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
              requestId: taskId,
            });
          },
        },
      ];
    },
    [indexedTasks],
  );

  const fetchPendingTasks = useCallback(async () => {
    const filtersObject = {
      filters: getFiltersAppliedObject(fetchedFilters, filtersApplied),
      fromPage,
      pageSize,
      sortField: sortBy?.field || '',
      sortOrder: sortBy?.order || 0, // -1 | 0 | 1
    };

    let response;
    setIsLoading(true);
    try {
      response = await fetchServer<{
        data: PendingTaskDto[];
        total: number;
      }>(`${ApiUrls.pendingTasks}?scope=${tasksScope}`, {
        body: JSON.stringify(filtersObject),
        headers: defaultJsonHeaders,
        method: 'post',
      });
    } finally {
      setIsLoading(false);
    }

    if (response.data) {
      setTotalItems(response.total);

      const dictionaryTasks: { [key: string]: PendingTaskDto } = {};
      const newTasks: ManagementTableProps['rows'] = {};

      response.data.forEach((pendingTask: PendingTaskDto) => {
        dictionaryTasks[pendingTask.rowId] = { ...pendingTask };

        newTasks[pendingTask.rowId] = {
          ...pendingTask,
          amount: {
            component: () => getAmountComponent(pendingTask?.amount),
            value: pendingTask?.amount,
          },
          currency: {
            component: () => getCurrencyComponent(pendingTask?.currency),
            value: pendingTask?.currency,
          },
          event:
            (pendingTask.event &&
              t(`eventTypes.${pendingTask.event.toLowerCase()}`)) ||
            '',
          issuanceDate:
            (pendingTask.issuanceDate &&
              formatDate(new Date(pendingTask.issuanceDate))) ||
            '',
          priority: t(pendingTask.priority || ''),
          product:
            (pendingTask.product &&
              t(`productTypes.${pendingTask.product.toLowerCase()}`)) ||
            '',
          status: {
            component: () => getStatusComponent(pendingTask?.status),
            value:
              pendingTask?.status &&
              t(`statuses.${pendingTask.status.toLowerCase()}`),
          },
          task:
            (pendingTask.task &&
              t(`taskTypes.${pendingTask.task.toLowerCase()}`)) ||
            '',
        };
      });

      setIndexedTasks(dictionaryTasks);
      setPendingTasksRows(newTasks);
    }
  }, [fromPage, pageSize, filtersApplied, sortBy, tasksScope]);

  // Re-fetch each time these parameters change
  useEffect(() => {
    fetchPendingTasks();
  }, [pageSize, fromPage, filtersApplied, sortBy, tasksScope]);

  useEffect(() => {
    setSearchParams({ scope: tasksScope }, { replace: true });
  }, [tasksScope]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetchServer<ApiFiltersResponseDto>(
          `${ApiUrls.pendingTasksFilters}?scope=${tasksScope}`,
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
                'taskId',
                'priority',
                'fromDate',
                'toDate',
              ],
              i18nPrefixes: {
                eventId: 'eventTypes',
                productId: 'productTypes',
                taskId: 'taskTypes',
              },
              relatedFields: {
                fromDate: 'toDate',
              },
            }),
            title: t('petitionDetails'),
          });

          newFilters.push({
            fields: getFilterFieldsArray({
              apiFilters: response,
              fieldNames: ['fromAmount', 'toAmount', 'currency'],
              i18nPrefixes: {
                currency: 'filterValues',
              },
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
  }, [tasksScope]);

  return (
    <PageWithMenu>
      {detailsOpened && (
        <ViewRequestDetails
          event={detailsOpened.event}
          product={detailsOpened.product}
          requestId={detailsOpened.requestId}
          onClose={() => setDetailsOpened(undefined)}
        />
      )}

      <div
        className={cx({ hiddenComponent: detailsOpened })}
        data-testid="pending-tasks"
      >
        <PageTitle title={t('pendingTasks')}>
          <Tabs
            activeTab={tasksScope}
            items={[
              {
                key: 'mine',
                label: t('myTasks'),
              },
              {
                key: 'all',
                label: t('allTasks'),
              },
            ]}
            onTabClick={setTasksScope}
          />
        </PageTitle>
        {isLoading && <Loader primary={false} />}
        <ContentContainer>
          <div>
            <ManagementTable
              cols={[
                { key: 'operationId', label: t('requestRef') },
                { key: 'mercuryRef', label: t('contractRef') },
                { key: 'issuanceDate', label: t('reqDate') },
                { key: 'product', label: t('product') },
                { key: 'event', label: t('event') },
                { key: 'client', label: t('client') },
                { key: 'task', label: t('task') },
                { key: 'priority', label: t('priority') },
                { key: 'requesterName', label: t('requester') },
              ]}
              filters={categorizedFilters}
              filterValues={filtersApplied}
              quickFilterKeys={['productId', 'eventId', 'taskId']}
              renderRowActions={renderRowActions}
              rows={pendingTasksRows}
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

export default PendingTasks;
