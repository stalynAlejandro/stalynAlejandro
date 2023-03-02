import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { useFetchRequestHistoric } from '../../hooks/fetchDataHooks';
import { StHistoricModalContainer } from './RequestHistoricModalStyled';
import { NotificationToast } from '../NotificationToast';
import { Table } from '../Table';
import { formatDate } from '../../utils/dates';
import { TableProps } from '../Table/Table';
import { TableApiFilterDto } from '../../api/types/TableApiFilterDto';

interface RequestHistoricModalProps {
  className?: string;
  onClose: () => void;
  requestId: string;
  title?: string;
}

const RequestHistoricModal: React.FC<RequestHistoricModalProps> = ({
  className,
  onClose,
  requestId,
  title,
}) => {
  const { t } = useTranslation();

  const {
    fetchRequestHistoric,
    historic: fetchedHistoric,
    isLoading,
    totalResults,
  } = useFetchRequestHistoric(requestId, { autofetch: false });
  const [historicRows, setHistoricRows] = useState<TableProps['rows']>({});

  // Sort by options
  const [sortBy, setSortBy] = useState({ field: 'endDate', order: -1 });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const changeSortBy = (newSortBy: any) => {
    setSortBy(newSortBy);
  };

  const changeNumberItemsShown = (numberItems: number) => {
    setPageSize(numberItems);
  };

  // Fetch comments if they are not provided as a prop
  useEffect(() => {
    const hydrateHistoric = async () => {
      try {
        const sortByOptions: TableApiFilterDto = {
          fromPage: page,
          pageSize,
          sortField: sortBy?.field || '',
          sortOrder: sortBy?.order || 0,
        };

        await fetchRequestHistoric(sortByOptions);
      } catch (err) {
        NotificationToast.error(t('errors.historic.couldNotRetrieveHistoric'), {
          toastId: 'historic-error',
        });
        onClose();
      }
    };

    hydrateHistoric();
  }, [requestId, page, pageSize, sortBy]);

  // Whenever historic is fetched, update the rows
  useEffect(() => {
    if (fetchedHistoric) {
      const mappedHistoricRows: TableProps['rows'] = {};

      fetchedHistoric.forEach((h) => {
        mappedHistoricRows[h.rowId] = {
          endDate: formatDate(new Date(h.endDate), true),
          startDate: formatDate(new Date(h.startDate), true),
          taskName: h.taskName,
          userName: h.userName,
        };
      });

      setHistoricRows(mappedHistoricRows);
    }
  }, [fetchedHistoric]);

  return (
    <StHistoricModalContainer
      className={cx({ [className!]: !!className })}
      data-testid="historic-modal"
      isLoading={isLoading}
      title={title || t('historic')}
      onClose={onClose}
    >
      <div>
        {Object.keys(historicRows).length > 0 && (
          <Table
            cols={[
              { key: 'startDate', label: t('startDate') },
              { key: 'endDate', label: t('endDate') },
              { key: 'taskName', label: t('task'), sortable: false },
              { key: 'userName', label: t('owner'), sortable: false },
            ]}
            defaultSortBy={sortBy}
            rows={historicRows}
            selectable={false}
            totalItems={totalResults || 0}
            onNumberItemsShownChange={changeNumberItemsShown}
            onPageChange={changePage}
            onSortByChange={changeSortBy}
          />
        )}
      </div>
    </StHistoricModalContainer>
  );
};

RequestHistoricModal.defaultProps = {
  className: '',
  title: '',
};

export default RequestHistoricModal;
