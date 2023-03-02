import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../../testUtils/renderComponent';
import Table, { TableProps } from '../Table';

describe('Component Table', () => {
  const defaultProps: TableProps = {
    cols: [
      { key: 'colA', label: 'ColumnA' },
      { key: 'colB', label: () => <span>ColumnB</span> },
    ],
    rows: {
      keyA: { colA: 'A.1', colB: () => <span>A.2</span> },
      keyB: { colA: () => <span>B.1</span>, colB: 'B.2' },
      keyC: { colA: 'C.1', colB: 'C.2' },
    },
  };

  const changeNumberItemsShowing = (newNumber: string | number) => {
    const { getByTestId, getByText } = within(
      screen.getByTestId('table-footer-info'),
    );

    act(() => {
      userEvent.click(
        getByTestId('form-select').querySelector('.formSelect__control')!,
      );
    });

    act(() => userEvent.click(getByText(`${newNumber}`)));
  };

  const changeCurrentPage = (newNumber: string | number) => {
    const pageListContainer = screen.getByTestId('table-pagination-page-list');
    expect(pageListContainer).toBeInTheDocument();

    const { getByText } = within(pageListContainer);
    act(() => userEvent.click(getByText(`${newNumber}`)));
  };

  const renderWithProps = (props?: Partial<TableProps>) =>
    renderComponent(<Table {...defaultProps} {...(props || {})} />);

  describe('Common behaviour', () => {
    it('renders the component successfully with the provided cols and rows', () => {
      renderWithProps();

      expect(screen.getByTestId('table-container')).toBeInTheDocument();
      expect(screen.getByTestId('table')).toBeInTheDocument();
      expect(screen.getByTestId('table-footer-info')).toBeInTheDocument();

      expect(screen.getByText('ColumnA')).toBeInTheDocument();
      expect(screen.getByText('ColumnB')).toBeInTheDocument();
      expect(screen.getByText('A.1')).toBeInTheDocument();
      expect(screen.getByText('A.2')).toBeInTheDocument();
      expect(screen.getByText('B.1')).toBeInTheDocument();
      expect(screen.getByText('B.2')).toBeInTheDocument();
    });

    it('renders the table wrapper with the provided data-testid', () => {
      renderWithProps({ 'data-testid': 'testing-id' });
      expect(screen.queryByTestId('table-container')).not.toBeInTheDocument();
      expect(screen.getByTestId('testing-id')).toBeInTheDocument();
    });

    it('renders the actions correctly if renderActionRows is provided', () => {
      const actions = [{ label: 'Action A', onClick: jest.fn() }];
      const renderRowActions = jest.fn().mockImplementation(() => actions);

      renderWithProps({ renderRowActions });

      const actionToggle = screen.getAllByTestId('table-row-action-toggle')[0];
      expect(actionToggle).toBeInTheDocument();

      act(() => {
        userEvent.click(actionToggle);
      });

      expect(renderRowActions).toHaveBeenCalled();
      expect(screen.getByText(actions[0].label)).toBeInTheDocument();

      act(() => {
        userEvent.click(screen.getByText(actions[0].label));
      });
      expect(actions[0].onClick).toHaveBeenCalled();
    });

    it('renders the action toggle as disabled if the actions array is empty', () => {
      renderWithProps({ renderRowActions: () => [] });

      const actionToggle = screen.getAllByTestId('table-row-action-toggle')[0];
      expect(actionToggle).toBeInTheDocument();
      expect(actionToggle).toHaveStyle('pointer-events: none');
    });

    it('adds provided className to element classes', () => {
      renderWithProps({ className: 'test-class' });
      expect(screen.getByTestId('table-container')).toHaveClass('test-class');
    });

    it('changes correctly the number of items to show and keeps it after rerendering if props change', () => {
      const { rerender } = renderWithProps({
        totalItems: 20,
      });

      const targetShowItems = 10;
      const newRows = {
        keyC: { colA: 'C.1', colB: () => <span>C.2</span> },
        keyD: { colA: () => <span>D.1</span>, colB: 'D.2' },
      };

      changeNumberItemsShowing(targetShowItems);
      const { getByText } = within(screen.getByTestId('mini-select'));

      expect(getByText(`${targetShowItems}`)).toBeInTheDocument();

      rerender(<Table {...defaultProps} rows={newRows} totalItems={25} />);
      expect(getByText(`${targetShowItems}`)).toBeInTheDocument();
    });

    it('executes the provided onNumberItemsShownChange method when a the number of items to show is changed', () => {
      const onNumberItemsShownChange = jest.fn();

      renderWithProps({
        onNumberItemsShownChange,
        totalItems: 20,
      });

      changeNumberItemsShowing(10);
      expect(onNumberItemsShownChange).toHaveBeenCalledWith(10);
    });

    it('does not display header subtitle nor pagination if hideMetadata is set to true', () => {
      renderWithProps({ hideMetadata: true });

      expect(screen.queryByText('T_showingNResults')).not.toBeInTheDocument();
      expect(screen.queryByText('T_showingNofNUnits')).not.toBeInTheDocument();
      expect(screen.queryByTestId('table-footer-info')).not.toBeInTheDocument();
    });
  });

  describe('Selectable rows', () => {
    it('renders a radio button if the table is set as selectable', () => {
      renderWithProps({ selectable: true });
      expect(
        screen.getByTestId('table').querySelectorAll('input[type="radio"]'),
      ).toHaveLength(Object.keys(defaultProps.rows).length);
    });

    it('renders a checkbox if prop isMulti is provided as true', () => {
      renderWithProps({
        isMulti: true,
        selectable: true,
      });

      expect(
        screen.getByTestId('table').querySelectorAll('input[type="checkbox"]'),
      ).toHaveLength(Object.keys(defaultProps.rows).length);
    });

    it('executes the onSelected method when row is selected', () => {
      const props = {
        onSelect: jest.fn(),
        selectable: true,
      };
      renderWithProps(props);

      const radio = screen.getAllByTestId('radio-button')?.[0];
      act(() => userEvent.click(radio));

      expect(props.onSelect).toHaveBeenCalledWith(
        Object.keys(defaultProps.rows)[0],
        true,
      );
    });

    it('executes the onSelected method when row selection is toggled', () => {
      const props = {
        isMulti: true,
        onSelect: jest.fn(),
        selectable: true,
      };
      renderWithProps(props);
      const check = screen.getAllByTestId('checkbox')?.[0];

      act(() => userEvent.click(check));
      expect(props.onSelect).toHaveBeenCalledWith(
        Object.keys(defaultProps.rows)[0],
        true,
      );

      act(() => userEvent.click(check));
      expect(props.onSelect).toHaveBeenCalledWith(
        Object.keys(defaultProps.rows)[0],
        false,
      );
    });

    it('shows checkboxes selected accordingly if selectedRows is provided', () => {
      renderWithProps({
        isMulti: true,
        selectable: true,
        selectedRows: ['keyA', 'keyB'],
      });

      expect(
        screen
          .getByTestId('table-row-keyA')
          .querySelector('input[type="checkbox"]')!,
      ).toBeChecked();
      expect(
        screen
          .getByTestId('table-row-keyB')
          .querySelector('input[type="checkbox"]')!,
      ).toBeChecked();
      expect(
        screen
          .getByTestId('table-row-keyC')
          .querySelector('input[type="checkbox"]')!,
      ).not.toBeChecked();
    });

    it('shows radiobuttons selected accordingly if selectedRows is provided', () => {
      renderWithProps({
        selectable: true,
        selectedRows: ['keyB'],
      });

      expect(
        screen
          .getByTestId('table-row-keyA')
          .querySelector('input[type="radio"]')!,
      ).not.toBeChecked();
      expect(
        screen
          .getByTestId('table-row-keyB')
          .querySelector('input[type="radio"]')!,
      ).toBeChecked();
      expect(
        screen
          .getByTestId('table-row-keyC')
          .querySelector('input[type="radio"]')!,
      ).not.toBeChecked();
    });
  });

  describe('Collapsible rows', () => {
    it('does not render the collapsible icon when renderCollapsedContent is not provided', () => {
      renderWithProps({ collapsible: true });
      const { queryByTestId } = within(screen.getByTestId('table'));

      expect(queryByTestId('icon-chevron-right-bold')).not.toBeInTheDocument();
    });

    it('renders the collapsible icon when renderCollapsedContent and collapsible props are provided', () => {
      renderWithProps({ collapsible: true, renderCollapsedContent: jest.fn() });
      const { getAllByTestId } = within(screen.getByTestId('table'));

      expect(getAllByTestId('icon-chevron-right-bold')).toHaveLength(
        Object.keys(defaultProps.rows).length,
      );
    });

    it('changes the collapsible icon when the row is toggled', () => {
      renderWithProps({ collapsible: true, renderCollapsedContent: jest.fn() });
      const { getAllByTestId, getByTestId } = within(
        screen.getByTestId('table'),
      );

      act(() => userEvent.click(getAllByTestId('icon-chevron-right-bold')[0]));
      expect(getByTestId('icon-chevron-down-bold')).toBeInTheDocument();
    });

    it('displays the collapsible content when the row is toggled', () => {
      renderWithProps({
        collapsible: true,
        renderCollapsedContent: () => <span>Hello test collapsible</span>,
      });
      const { getAllByTestId, getByText } = within(screen.getByTestId('table'));

      act(() => userEvent.click(getAllByTestId('icon-chevron-right-bold')[0]));
      expect(getByText('Hello test collapsible')).toBeInTheDocument();
    });

    it('hides the collapsible content when the row is toggled again', () => {
      renderWithProps({
        collapsible: true,
        renderCollapsedContent: () => <span>Hello test collapsible</span>,
      });
      const { getAllByTestId, queryByText } = within(
        screen.getByTestId('table'),
      );

      act(() => userEvent.click(getAllByTestId('icon-chevron-right-bold')[0]));
      expect(queryByText('Hello test collapsible')).toBeInTheDocument();

      act(() => userEvent.click(getAllByTestId('icon-chevron-down-bold')[0]));
      expect(queryByText('Hello test collapsible')).not.toBeInTheDocument();
    });

    it('displays only the collapsible content of the currently toggled row', () => {
      renderWithProps({
        collapsible: true,
        renderCollapsedContent: () => <span>Hello test collapsible</span>,
      });
      const { getAllByTestId, queryAllByText } = within(
        screen.getByTestId('table'),
      );

      act(() => userEvent.click(getAllByTestId('icon-chevron-right-bold')[0]));
      act(() => userEvent.click(getAllByTestId('icon-chevron-right-bold')[1]));

      expect(queryAllByText('Hello test collapsible')).toHaveLength(1);
    });
  });

  describe('Pagination', () => {
    it('shows pagination if totalItems are greater than shownItems', () => {
      renderWithProps({ totalItems: 20 });
      expect(
        screen.getByTestId('table-pagination-container'),
      ).toBeInTheDocument();
    });

    it('does not show pagination if totalItems is not provided', () => {
      renderWithProps();
      expect(
        screen.queryByTestId('table-pagination-container'),
      ).not.toBeInTheDocument();
    });

    it('executes the provided onPageChange method when a page is changed and provides zero-based page number', () => {
      const onPageChange = jest.fn();
      const zeroBasedPage = 2;

      renderWithProps({
        onPageChange,
        totalItems: 20,
      });

      changeCurrentPage(zeroBasedPage + 1);
      expect(onPageChange).toHaveBeenCalledWith(zeroBasedPage);
    });

    it('calculates correctly the number of pages to display', () => {
      const totalItems = 17;
      renderWithProps({ totalItems });

      expect(screen.getByTestId('table-pagination-page-list').textContent).toBe(
        '1234',
      ); // With 5 results per page: 4 pages;

      changeNumberItemsShowing(10);
      expect(screen.getByTestId('table-pagination-page-list').textContent).toBe(
        '12',
      ); // With 10 results: 2 pages;

      changeNumberItemsShowing(20);
      expect(
        screen.queryByTestId('table-pagination-page-list'),
      ).not.toBeInTheDocument(); // With 20 results: 1 single page, so no pagination
    });

    it('keeps the current page when props not related to pagination are changed', () => {
      const newRows = {
        keyC: { colA: 'C.1', colB: () => <span>C.2</span> },
        keyD: { colA: () => <span>D.1</span>, colB: 'D.2' },
      };
      const { rerender } = renderWithProps({
        totalItems: 25,
      });

      act(() => changeCurrentPage(3));

      const pageListContainer = screen.getByTestId(
        'table-pagination-page-list',
      );
      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '3',
      );

      rerender(<Table {...defaultProps} rows={newRows} totalItems={25} />);
      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '3',
      );
    });

    it('resets current page when totalItems provided or sortBy are changed', () => {
      const { rerender } = renderWithProps({
        onSortByChange: jest.fn(),
        totalItems: 25,
      });

      act(() => changeCurrentPage(3));

      const pageListContainer = screen.getByTestId(
        'table-pagination-page-list',
      );
      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '3',
      );

      rerender(
        <Table {...defaultProps} totalItems={30} onSortByChange={jest.fn()} />,
      );

      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '1',
      );

      act(() => changeCurrentPage(3));
      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '3',
      );

      const targetCol = defaultProps.cols[0];
      const targetColElement = screen.getByText(`${targetCol.label}`);
      act(() => userEvent.click(targetColElement));

      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '1',
      );
    });

    it('pagination only shows 4 numbers when there are more than 4 pages to navigate', () => {
      renderWithProps({ totalItems: 40 });
      const pageListContainer = screen.getByTestId(
        'table-pagination-page-list',
      );

      expect(pageListContainer.textContent).toBe('1234');
    });

    it('prev button works correctly in pagination', () => {
      renderWithProps({ totalItems: 40 });
      act(() => changeCurrentPage(3));

      const pageListContainer = screen.getByTestId(
        'table-pagination-page-list',
      );

      act(() => userEvent.click(screen.getByText('T_shortPrev')));
      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '2',
      );
    });

    it('next button works correctly in pagination', () => {
      renderWithProps({ totalItems: 40 });
      changeCurrentPage(3);

      const pageListContainer = screen.getByTestId(
        'table-pagination-page-list',
      );

      act(() => userEvent.click(screen.getByText('T_shortNext')));
      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '4',
      );
    });

    it('shows next pages in the list when clicking the last items in it', () => {
      renderWithProps({ totalItems: 40 });

      const pageListContainer = screen.getByTestId(
        'table-pagination-page-list',
      );

      expect(pageListContainer.textContent).toBe('1234');

      act(() => changeCurrentPage(4));
      expect(pageListContainer.textContent).toBe('3456');

      act(() => userEvent.click(screen.getByText('T_shortNext')));
      expect(pageListContainer.textContent).toBe('4567');
    });

    it('does not let to go to the previous page if current page is the first one', () => {
      renderWithProps({ totalItems: 40 });

      const pageListContainer = screen.getByTestId(
        'table-pagination-page-list',
      );
      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '1',
      );

      userEvent.click(screen.getByText('T_shortPrev'));
      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '1',
      );
    });

    it('does not let to navigate to the next page if current page is the last one', () => {
      renderWithProps({ totalItems: 18 }); // Last page will be 4th

      const pageListContainer = screen.getByTestId(
        'table-pagination-page-list',
      );
      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '1',
      );

      changeCurrentPage(4);
      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '4',
      );

      act(() => {
        userEvent.click(screen.getByText('T_shortNext'));
      });
      expect(pageListContainer.querySelector('.active')!).toHaveTextContent(
        '4',
      );
    });
  });

  describe('Sorting', () => {
    it('displays the sort indicator on column header if it is clicked and onSortByChange is provided', () => {
      const onSortByChange = jest.fn();
      const targetCol = defaultProps.cols[0];

      renderWithProps({
        onSortByChange,
      });

      const colElement = screen.getByText(`${targetCol.label}`).closest('h3')!;
      const { getByTestId, queryByTestId } = within(colElement);

      // First click: sort ascendant
      act(() => {
        userEvent.click(colElement);
      });
      expect(getByTestId('icon-arrow-up')).toBeInTheDocument();

      // Second click: sort descendant
      act(() => {
        userEvent.click(colElement);
      });
      expect(getByTestId('icon-arrow-down')).toBeInTheDocument();

      // Third click: undo the sorting
      act(() => {
        userEvent.click(colElement);
      });
      expect(queryByTestId('icon-arrow-up')).not.toBeInTheDocument();
      expect(queryByTestId('icon-arrow-down')).not.toBeInTheDocument();
    });

    it('does not display the sort indicator on column header if it is clicked and onSortByChange is not provided', () => {
      const targetCol = defaultProps.cols[0];
      renderWithProps();

      const colElement = screen.getByText(`${targetCol.label}`);
      const { queryByTestId } = within(colElement);

      userEvent.click(colElement);
      expect(queryByTestId('icon-arrow-up')).not.toBeInTheDocument();
      expect(queryByTestId('icon-arrow-down')).not.toBeInTheDocument();
    });

    it('executes the provided onSortByChange method when a column header is clicked to sort it', () => {
      const onSortByChange = jest.fn();
      const targetCol = defaultProps.cols[0];

      renderWithProps({
        onSortByChange,
      });

      const targetColElement = screen.getByText(`${targetCol.label}`);

      act(() => {
        userEvent.click(targetColElement);
      });
      expect(onSortByChange).toHaveBeenCalledWith({ field: targetCol.key, order: 1 });

      act(() => {
        userEvent.click(targetColElement);
      });
      expect(onSortByChange).toHaveBeenCalledWith({
        field: targetCol.key,
        order: -1,
      });

      act(() => userEvent.click(targetColElement));
      expect(onSortByChange).toHaveBeenCalledWith(undefined);
    });

    it('shows the provided column in defaultSortBy as sorted', () => {
      const onSortByChange = jest.fn();
      const targetCol = defaultProps.cols[0];

      renderWithProps({
        defaultSortBy: {
          field: targetCol.key,
          order: 1,
        },
        onSortByChange,
      });

      const colElement = screen.getByText(`${targetCol.label}`).closest('h3')!;
      const { queryByTestId } = within(colElement);

      expect(queryByTestId('icon-arrow-up')).toBeInTheDocument();
      expect(onSortByChange).not.toHaveBeenCalled();
    });

    it('does not execute the provided onSortByChange if the column is not sortable', () => {
      const onSortByChange = jest.fn();
      const cols = [
        ...defaultProps.cols,
        { key: 'colC', label: 'ColumnC', sortable: false },
      ];
      const unsortableCol = cols.at(-1)!;
      const sortableCol = cols[0];

      renderWithProps({
        cols,
        onSortByChange,
      });

      // Check that unsortable column does not trigger sorting
      const unsortableElement = screen
        .getByText(`${unsortableCol.label}`)
        .closest('h3')!;
      const { queryByTestId: unsortableQueryByTestId } =
        within(unsortableElement);

      act(() => {
        userEvent.click(unsortableElement);
      });
      expect(onSortByChange).not.toHaveBeenCalled();

      expect(unsortableQueryByTestId('icon-arrow-up')).not.toBeInTheDocument();
      expect(
        unsortableQueryByTestId('icon-arrow-down'),
      ).not.toBeInTheDocument();

      // Check that other columns do trigger sorting
      const sortableElement = screen
        .getByText(`${sortableCol.label}`)
        .closest('h3')!;
      const { queryByTestId: sortableQueryByTestId } = within(sortableElement);

      act(() => {
        userEvent.click(sortableElement);
      });
      expect(onSortByChange).toHaveBeenCalledWith({
        field: sortableCol.key,
        order: 1,
      });

      expect(sortableQueryByTestId('icon-arrow-up')).toBeInTheDocument();
    });
  });
});
