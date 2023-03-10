/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { randomStr } from '../../utils/randomStr';
import { renderFunctionText } from '../../utils/renderFunctionText';
import { RadioButton } from '../Controls/RadioButton';
import { Icon } from '../Icon';
import { TextButton } from '../TextButton';
import {
  StShowingTitle,
  StTable,
  StTableContainer,
  StTableFooterInfo,
  StSelect,
  StInfoLeft,
  StInfoRight,
  StActionsToggle,
  StActionsContainer,
  StPagesContainer,
  StSortByIcon,
} from './TableStyled';
import { BoldTitle } from '../Common/Common';
import { range } from '../../utils/range';
import { Checkbox } from '../Controls/Checkbox';

interface TableCell {
  key: string;
  label: string | (() => React.ReactNode);
  sortable?: boolean;
}

interface SortByProps {
  field: string;
  order: number;
}

export interface TableProps {
  className?: string;
  collapsible?: boolean;
  cols: TableCell[];
  'data-testid'?: string;
  defaultSortBy?: SortByProps;
  hideMetadata?: boolean;
  isMulti?: boolean;
  onNumberItemsShownChange?: (itemsShown: number) => void;
  onPageChange?: (page: number) => void;
  onSelect?: (key: string, isSelected: boolean) => void;
  onSortByChange?: (
    sortedBy: { field: string; order: number } | undefined,
  ) => void;
  renderCollapsedContent?: (rowId: string) => React.ReactNode;
  renderRowActions?: (
    rowId: string | number,
  ) => { label: string; onClick: () => void }[];
  rows: {
    [id: string]: {
      [key: string]:
        | React.ReactNode
        | string
        | number
        | (() => React.ReactNode)
        | { component: () => React.ReactNode; value: string };
    };
  };
  selectable?: boolean;
  selectedRows?: string[];
  totalItems?: number;
  units?: string;
}

const Table: React.FC<TableProps> = ({
  className,
  collapsible,
  cols,
  'data-testid': dataTestId,
  defaultSortBy,
  hideMetadata,
  isMulti,
  onNumberItemsShownChange,
  onPageChange,
  onSelect,
  onSortByChange,
  renderCollapsedContent,
  renderRowActions,
  rows,
  selectable,
  selectedRows,
  totalItems,
  units,
}) => {
  const { t } = useTranslation();
  const firstRender = useRef(true);
  const selectableKey = randomStr();

  const defaultShowValues = [
    {
      label: '5',
      value: 5,
    },
    {
      label: '10',
      value: 10,
    },
    {
      label: '20',
      value: 20,
    },
  ];

  const [actualPage, setActualPage] = useState(0);
  const [sortBy, setSortBy] = useState<SortByProps | undefined>(defaultSortBy);
  const [showOptions, setShowOptions] = useState(defaultShowValues);
  const [numberItemsShown, setNumberItemsShown] = useState(showOptions[0]);
  const [shownActions, setShownActions] = useState('');
  const [toggledRow, setToggledRow] = useState<string>();

  const totalRows = totalItems || Object.keys(rows).length;
  const pagesLength = Math.ceil(totalRows / numberItemsShown.value);

  const toggleShownActions = (key: string) => {
    if (shownActions === key) {
      setShownActions('');
    } else {
      setShownActions(key);
    }
  };

  const updatePage = (newPage: number) => {
    let finalPage = newPage;

    if (newPage < 0) {
      finalPage = 0;
    } else if (newPage > pagesLength - 1) {
      finalPage = pagesLength - 1;
    }

    setActualPage(finalPage);
  };

  const toggleSortBy = (field: string) => {
    if (!onSortByChange) {
      return;
    }

    if (sortBy && field === sortBy.field) {
      if (sortBy.order === 1) {
        setSortBy({ field, order: -1 });
      } else if (sortBy.order === -1) {
        setSortBy(undefined);
      }
    } else {
      setSortBy({ field, order: 1 });
    }
  };

  const toggleRow = (rowId: string) => {
    setToggledRow((current) => (current === rowId ? undefined : rowId));
  };

  useEffect(() => {
    if (firstRender.current) {
      return;
    }

    if (totalRows < showOptions[0].value) {
      const newOption = {
        label: `${totalRows}`,
        value: totalRows,
      };
      setShowOptions([newOption]);
      setNumberItemsShown(newOption);
    } else if (totalRows > showOptions[0].value) {
      setShowOptions(defaultShowValues);

      if (numberItemsShown.value < defaultShowValues[0].value) {
        setNumberItemsShown(defaultShowValues[0]);
      }
    }
  }, [rows]);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }
    // Avoid asking for less items than the minimum (5) if the totalItems count is lower
    if (
      numberItemsShown?.value &&
      numberItemsShown.value >= defaultShowValues[0].value
    ) {
      onNumberItemsShownChange!(numberItemsShown.value);
    }
  }, [numberItemsShown]);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }
    onPageChange!(actualPage);
  }, [actualPage]);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }
    if (onSortByChange) {
      onSortByChange(sortBy);
    }
  }, [sortBy]);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }
    /*
      If the total items or the sortBy change, means that the items displayed
      will be completely different from the beginning, so we return to first page
    */
    setActualPage(0);
  }, [totalItems, sortBy]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  return (
    <StTableContainer
      className={cx('table__container', className)}
      data-testid={dataTestId || 'table-container'}
    >
      {!hideMetadata && totalRows > 0 && (
        <StShowingTitle
          dangerouslySetInnerHTML={{
            __html: t('showingNResults', {
              results: numberItemsShown.value,
              units: t(units!),
            }),
          }}
          data-testid="table-showing-title"
        />
      )}
      <div style={{ overflowX: 'auto' }}>
        <StTable
          className={cx({
            table: true,
            'table--collapsible': !!collapsible,
            'table--selectable': !!selectable,
          })}
          data-testid="table"
          selectable={!!selectable}
        >
          <thead>
            <tr>
              {selectable && <th />}
              {collapsible && renderCollapsedContent && <th />}
              {cols.map(({ key, label, sortable = true }) => (
                <th
                  key={`table-col-${key}`}
                  className={cx({
                    [`table-th-${key}`]: true,
                    'table-th--sortable': !!onSortByChange,
                  })}
                  data-testid={`table-col-${key}`}
                >
                  <BoldTitle
                    title={typeof label === 'string' ? label : ''}
                    onClick={() => sortable && toggleSortBy(key)}
                  >
                    <div className="table-th-title">
                      {renderFunctionText(label)}
                    </div>
                    {onSortByChange && sortable && sortBy?.field === key && (
                      <StSortByIcon
                        icon={`arrow-${sortBy.order === 1 ? 'up' : 'down'}`}
                        size={16}
                      />
                    )}
                  </BoldTitle>
                </th>
              ))}
              {renderRowActions && <th className="actions-col" />}
            </tr>
          </thead>
          <tbody>
            {Object.keys(rows).map((rowKey, i) => (
              <React.Fragment key={`table-row-${rowKey}`}>
                <tr
                  className={cx({
                    [`table-row-${rowKey}`]: true,
                    'table__tr--odd': i % 2 !== 0,
                  })}
                  data-testid={`table-row-${rowKey}`}
                >
                  {selectable && (
                    <td className="table__td--selectableAction">
                      {(isMulti && (
                        <Checkbox
                          checked={selectedRows?.includes(rowKey) || undefined}
                          onChange={(val) => onSelect!(rowKey, val)}
                        />
                      )) || (
                        <RadioButton
                          checked={selectedRows?.includes(rowKey) || undefined}
                          name={selectableKey}
                          value={rowKey}
                          onClick={() => onSelect!(rowKey, true)}
                        />
                      )}
                    </td>
                  )}
                  {collapsible && renderCollapsedContent && (
                    <td className="table__td--collapsibleAction">
                      <Icon
                        icon={
                          toggledRow === rowKey
                            ? 'chevron-down-bold'
                            : 'chevron-right-bold'
                        }
                        onClick={() => toggleRow(rowKey)}
                      />
                    </td>
                  )}
                  {cols.map(({ key: colKey }) => {
                    const tdContent = rows[rowKey]?.[colKey];

                    return (
                      <td
                        key={`table-row-${rowKey}-col-${colKey}`}
                        className={`table-td-${colKey}`}
                        data-testid={`table-row-${rowKey}-col-${colKey}`}
                      >
                        {renderFunctionText(tdContent)}
                      </td>
                    );
                  })}
                  {renderRowActions &&
                    (() => {
                      const rowActions = renderRowActions(rowKey);

                      return (
                        <td
                          key={`table-row-${rowKey}-actions`}
                          className="actions-col"
                          data-testid={`table-row-${rowKey}-actions`}
                        >
                          <StActionsToggle
                            data-testid="table-row-action-toggle"
                            hasActions={!!rowActions?.length}
                            isActive={shownActions === rowKey}
                            onClick={() => toggleShownActions(rowKey)}
                          >
                            <Icon
                              icon={
                                shownActions === rowKey
                                  ? 'close'
                                  : 'horizontal-dots'
                              }
                              size={24}
                            />
                          </StActionsToggle>
                          {shownActions === rowKey && (
                            <StActionsContainer
                              data-testid={`table-row-${rowKey}-actions`}
                            >
                              {rowActions?.map((action) => (
                                <li
                                  key={`table-row-action-${action.label
                                    ?.split(' ')
                                    .join('')}`}
                                >
                                  <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => {
                                      action.onClick?.();
                                      toggleShownActions(rowKey);
                                    }}
                                    onKeyDown={() => {
                                      action.onClick?.();
                                      toggleShownActions(rowKey);
                                    }}
                                  >
                                    {action.label}
                                  </div>
                                </li>
                              ))}
                            </StActionsContainer>
                          )}
                        </td>
                      );
                    })()}
                </tr>
                {collapsible &&
                  renderCollapsedContent &&
                  toggledRow === rowKey && (
                    <tr className="table__tr--collapsedContent">
                      <td
                        colSpan={
                          cols.length +
                          (selectable ? 1 : 0) +
                          (collapsible ? 1 : 0) +
                          (renderRowActions ? 1 : 0)
                        }
                      >
                        {renderCollapsedContent(rowKey)}
                      </td>
                    </tr>
                  )}
              </React.Fragment>
            ))}
          </tbody>
          <tfoot />
        </StTable>
      </div>
      {!hideMetadata && totalRows > 0 && (
        <StTableFooterInfo data-testid="table-footer-info">
          <StInfoLeft>
            <StSelect
              key={numberItemsShown.label}
              options={showOptions}
              value={numberItemsShown.value}
              onChange={(val) => {
                setNumberItemsShown(
                  showOptions.find((opt) => opt.value === val) ||
                    showOptions[0],
                );
              }}
            />
          </StInfoLeft>
          <StInfoRight>
            <span>
              {t('showingNofNUnits', {
                current: Math.min(
                  numberItemsShown.value,
                  Object.keys(rows).length,
                ),
                total: totalRows,
                units: t(units!),
              })}
            </span>
            {pagesLength > 1 && (
              <StPagesContainer data-testid="table-pagination-container">
                <TextButton
                  icon="chevron-left-bold"
                  iconPosition="left"
                  label={t('shortPrev')}
                  onClick={() => updatePage(actualPage - 1)}
                />
                <ul data-testid="table-pagination-page-list">
                  {range(
                    actualPage > 1
                      ? Math.max(actualPage - (pagesLength > 4 ? 1 : 3), 0) // Start from the very beginning if there are less than 4 pages
                      : Math.min(actualPage, 0),
                    4,
                    pagesLength - 1,
                  ).map((pageNum) => (
                    <li
                      // eslint-disable-next-line react/no-array-index-key
                      key={`table-page-${pageNum}`}
                      className={cx({ active: actualPage === pageNum })}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => updatePage(pageNum)}
                        onKeyDown={() => null}
                      >
                        {pageNum + 1}
                      </div>
                    </li>
                  ))}
                </ul>
                <TextButton
                  icon="chevron-right-bold"
                  iconPosition="right"
                  label={t('shortNext')}
                  onClick={() => updatePage(actualPage + 1)}
                />
              </StPagesContainer>
            )}
          </StInfoRight>
        </StTableFooterInfo>
      )}
    </StTableContainer>
  );
};

Table.defaultProps = {
  className: '',
  collapsible: false,
  'data-testid': '',
  defaultSortBy: undefined,
  hideMetadata: false,
  isMulti: false,
  onNumberItemsShownChange: () => null,
  onPageChange: () => null,
  onSelect: () => null,
  onSortByChange: undefined,
  renderCollapsedContent: undefined,
  renderRowActions: undefined,
  selectable: true,
  selectedRows: [],
  totalItems: undefined,
  units: 'results',
};

export default Table;
