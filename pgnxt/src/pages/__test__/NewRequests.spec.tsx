import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

import Navigation from '../../constants/navigation';
import theme from '../../resources/theme';
import { renderComponent } from '../../testUtils/renderComponent';
import { NewRequests } from '../NewRequests';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Page NewRequests', () => {
  const tabs = {
    collections: 'T_collections',
    documentaryCredit: 'T_documentaryCredit',
    financing: 'T_financings',
    guarantees: 'T_guarantees',
  };

  const renderPage = () => {
    renderComponent(
      <BrowserRouter>
        <NewRequests />
      </BrowserRouter>,
    );
  };

  const renderPageInTab = (tabText: string) => {
    renderPage();

    act(() =>
      userEvent.click(
        screen.getByText(tabText, {
          selector: '[data-testid="tab-item"] span',
        }),
      ),
    );
  };

  it('renders the page successfully', () => {
    renderPage();
    expect(
      screen.getByText('T_newRequests', { selector: '.pageTitle__title' }),
    ).toBeInTheDocument();
  });

  it('renders all the tabs and renders the first tab by default', () => {
    renderPage();

    expect(
      screen.getByText('T_documentaryCredit', {
        selector: '[data-testid="tab-item"] span',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('T_collections', {
        selector: '[data-testid="tab-item"] span',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('T_guarantees', {
        selector: '[data-testid="tab-item"] span',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('T_financings', {
        selector: '[data-testid="tab-item"] span',
      }),
    ).toBeInTheDocument();

    const firstTab = screen.getAllByTestId('tab-item')[0];
    expect(firstTab).toHaveStyle({
      fontFamily: theme.typography.textFonts.bold,
    });
  });

  it('renders the contents of the selected tab when clicked to it', () => {
    renderPage();

    act(() =>
      userEvent.click(
        screen.getByText('T_collections', {
          selector: '[data-testid="tab-item"] span',
        }),
      ),
    );

    expect(screen.getByText('T_collectionsExportation')).toBeInTheDocument();
    expect(screen.getByText('T_collectionsImportation')).toBeInTheDocument();
  });

  describe('Documentary Credit tab', () => {
    it('renders all the products', () => {
      renderPageInTab(tabs.documentaryCredit);

      expect(screen.getByText('T_creditTab.notification')).toBeInTheDocument();
      expect(screen.getAllByText('T_creditTab.modification')).toHaveLength(2);
      expect(screen.getByText('T_creditTab.prerevision')).toBeInTheDocument();
      expect(screen.getByText('T_creditTab.usage')).toBeInTheDocument();
      expect(
        screen.getAllByText('T_creditTab.otherInformationAndQueries'),
      ).toHaveLength(2);
      expect(screen.getByText('T_creditTab.issuance')).toBeInTheDocument();
      expect(
        screen.getByText('T_creditTab.documentationRevision'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('T_creditTab.paymentInstructions'),
      ).toBeInTheDocument();
    });

    it('does nothing for non-implemented products', () => {
      renderPageInTab(tabs.documentaryCredit);

      userEvent.click(screen.getAllByText('T_creditTab.notification')[0]);
      userEvent.click(screen.getAllByText('T_creditTab.modification')[0]);
      userEvent.click(screen.getAllByText('T_creditTab.modification')[1]);
      userEvent.click(screen.getAllByText('T_creditTab.prerevision')[0]);
      userEvent.click(screen.getAllByText('T_creditTab.usage')[0]);
      userEvent.click(
        screen.getAllByText('T_creditTab.otherInformationAndQueries')[0],
      );
      userEvent.click(
        screen.getAllByText('T_creditTab.otherInformationAndQueries')[1],
      );
      userEvent.click(screen.getAllByText('T_creditTab.issuance')[0]);
      userEvent.click(
        screen.getAllByText('T_creditTab.documentationRevision')[0],
      );
      userEvent.click(
        screen.getAllByText('T_creditTab.paymentInstructions')[0],
      );

      expect(mockedUsedNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Collections tab', () => {
    it('renders all the products', () => {
      renderPageInTab(tabs.collections);

      expect(screen.getAllByText('T_collectionsTab.admission')).toHaveLength(2);
      expect(screen.getAllByText('T_collectionsTab.modification')).toHaveLength(
        2,
      );
      expect(
        screen.getByText('T_collectionsTab.moneyAdvances'),
      ).toBeInTheDocument();
      expect(
        screen.getAllByText('T_collectionsTab.otherOperations'),
      ).toHaveLength(2);
      expect(screen.getByText('T_collectionsTab.payment')).toBeInTheDocument();
      expect(
        screen.getByText('T_collectionsTab.financing'),
      ).toBeInTheDocument();
    });

    describe('Implemented and enabled CLE events', () => {
      it('redirects to New Collection form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        userEvent.click(screen.getAllByText('T_collectionsTab.admission')[0]);
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cle.request.create,
        );
      });

      it('redirects to Modify Collection form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(
            screen.getAllByText('T_collectionsTab.modification')[0],
          ),
        );
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cle.modification.create,
        );
      });

      it('opens the Advance dialog when clicking the Advance product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(
            screen.getAllByText('T_collectionsTab.moneyAdvances')[0],
          ),
        );
        expect(mockedUsedNavigate).not.toHaveBeenCalled();
        expect(screen.getByTestId('action-modal')).toBeInTheDocument();
      });

      it('closes the Advance dialog when clicking the close button', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(
            screen.getAllByText('T_collectionsTab.moneyAdvances')[0],
          ),
        );
        act(() => userEvent.click(screen.getByTestId('icon-close')));

        expect(screen.queryByTestId('action-modal')).not.toBeInTheDocument();
      });

      it('redirects to New Advance form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(
            screen.getAllByText('T_collectionsTab.moneyAdvances')[0],
          ),
        );
        const { getByText } = within(screen.getByTestId('action-modal'));

        const button = getByText('T_collectionsTab.admission')
          .closest('.actionModal__action')!
          .querySelector(':scope button')!;
        act(() => userEvent.click(button));
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cle.advance.create,
        );
      });

      it('redirects to Modify Advance form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(
            screen.getAllByText('T_collectionsTab.moneyAdvances')[0],
          ),
        );
        const { getByText } = within(screen.getByTestId('action-modal'));

        const button = getByText('T_collectionsTab.modification')
          .closest('.actionModal__action')!
          .querySelector(':scope button')!;
        act(() => userEvent.click(button));
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cle.advanceModification.create,
        );
      });

      it('redirects to Cancel Advance form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(
            screen.getAllByText('T_collectionsTab.moneyAdvances')[0],
          ),
        );
        const { getByText } = within(screen.getByTestId('action-modal'));

        const button = getByText('T_collectionsTab.cancellation')
          .closest('.actionModal__action')!
          .querySelector(':scope button')!;
        act(() => userEvent.click(button));
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cle.advanceCancellation.create,
        );
      });
    });

    describe('Implemented and enabled CLI events', () => {
      it('redirects to New CLI Request form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(screen.getAllByText('T_collectionsTab.admission')[1]),
        );
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cli.request.create,
        );
      });

      it('redirects to CLI Modification form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(
            screen.getAllByText('T_collectionsTab.modification')[1],
          ),
        );
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cli.modification.create,
        );
      });

      it('opens the Payment dialog when clicking the Payment product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(screen.getAllByText('T_collectionsTab.payment')[0]),
        );
        expect(mockedUsedNavigate).not.toHaveBeenCalled();
        expect(screen.getByTestId('action-modal')).toBeInTheDocument();
      });

      it('closes the Payment dialog when clicking the close button', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(screen.getAllByText('T_collectionsTab.payment')[0]),
        );
        act(() => userEvent.click(screen.getByTestId('icon-close')));

        expect(screen.queryByTestId('action-modal')).not.toBeInTheDocument();
      });

      it('redirects to Payment Charge form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(screen.getAllByText('T_collectionsTab.payment')[0]),
        );
        const { getByText } = within(screen.getByTestId('action-modal'));

        const button = getByText('T_collectionsTab.accountCharge')
          .closest('.actionModal__action')!
          .querySelector(':scope button')!;
        act(() => userEvent.click(button));
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cli.paymentCharge.create,
        );
      });

      it('redirects to Payment Accountless form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(screen.getAllByText('T_collectionsTab.payment')[0]),
        );
        const { getByText } = within(screen.getByTestId('action-modal'));

        const button = getByText('T_collectionsTab.withoutAccount')
          .closest('.actionModal__action')!
          .querySelector(':scope button')!;
        act(() => userEvent.click(button));
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cli.paymentAccountless.create,
        );
      });

      it('opens the Financing dialog when clicking the Financing product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(screen.getAllByText('T_collectionsTab.financing')[0]),
        );
        expect(mockedUsedNavigate).not.toHaveBeenCalled();
        expect(screen.getByTestId('action-modal')).toBeInTheDocument();
      });

      it('closes the Financing dialog when clicking the close button', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(screen.getAllByText('T_collectionsTab.financing')[0]),
        );
        act(() => userEvent.click(screen.getByTestId('icon-close')));

        expect(screen.queryByTestId('action-modal')).not.toBeInTheDocument();
      });

      it('redirects to Financing Request form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(screen.getAllByText('T_collectionsTab.financing')[0]),
        );
        const { getByText } = within(screen.getByTestId('action-modal'));

        const button = getByText('T_collectionsTab.admission')
          .closest('.actionModal__action')!
          .querySelector(':scope button')!;
        act(() => userEvent.click(button));
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cli.financingRequest.create,
        );
      });

      it('redirects to Financing Modification form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(screen.getAllByText('T_collectionsTab.financing')[0]),
        );
        const { getByText } = within(screen.getByTestId('action-modal'));

        const button = getByText('T_collectionsTab.modification')
          .closest('.actionModal__action')!
          .querySelector(':scope button')!;
        act(() => userEvent.click(button));
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cli.financingModification.create,
        );
      });

      it('redirects to Financing Cancellation form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(screen.getAllByText('T_collectionsTab.financing')[0]),
        );
        const { getByText } = within(screen.getByTestId('action-modal'));

        const button = getByText('T_collectionsTab.cancellation')
          .closest('.actionModal__action')!
          .querySelector(':scope button')!;
        act(() => userEvent.click(button));
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cli.financingCancellation.create,
        );
      });

      it('redirects to Other Operations form when clicking the specified product', () => {
        renderPageInTab(tabs.collections);

        act(() =>
          userEvent.click(
            screen.getAllByText('T_collectionsTab.otherOperations')[1],
          ),
        );
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          Navigation.forms.cli.otherOperations.create,
        );
      });
    });
  });

  describe('Guarantees tab', () => {
    it('renders all the products', () => {
      renderPageInTab(tabs.guarantees);

      expect(
        screen.getByText('T_guaranteesTab.draftPreissuance'),
      ).toBeInTheDocument();
      expect(screen.getByText('T_guaranteesTab.issuance')).toBeInTheDocument();
      expect(
        screen.getByText('T_guaranteesTab.modification'),
      ).toBeInTheDocument();
      expect(screen.getAllByText('T_guaranteesTab.execution')).toHaveLength(2);
      expect(
        screen.getAllByText('T_guaranteesTab.otherInformationAndQueries'),
      ).toHaveLength(2);
    });

    it('does nothing for non-implemented products', () => {
      renderPageInTab(tabs.guarantees);

      userEvent.click(
        screen.getAllByText('T_guaranteesTab.draftPreissuance')[0],
      );
      userEvent.click(screen.getAllByText('T_guaranteesTab.issuance')[0]);
      userEvent.click(screen.getAllByText('T_guaranteesTab.modification')[0]);
      userEvent.click(screen.getAllByText('T_guaranteesTab.execution')[0]);
      userEvent.click(screen.getAllByText('T_guaranteesTab.execution')[1]);
      userEvent.click(
        screen.getAllByText('T_guaranteesTab.otherInformationAndQueries')[0],
      );
      userEvent.click(
        screen.getAllByText('T_guaranteesTab.otherInformationAndQueries')[1],
      );
      userEvent.click(screen.getAllByText('T_guaranteesTab.execution')[0]);

      expect(mockedUsedNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Financing tab', () => {
    it('renders all the products', () => {
      renderPageInTab(tabs.financing);

      expect(screen.getByText('T_financingTab.issuance')).toBeInTheDocument();
      expect(
        screen.getByText('T_financingTab.modification'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('T_financingTab.cancellationRequest'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('T_financingTab.otherInformationAndQueries'),
      ).toBeInTheDocument();
    });

    it('does nothing for non-implemented products', () => {
      renderPageInTab(tabs.financing);

      userEvent.click(screen.getAllByText('T_financingTab.issuance')[0]);
      userEvent.click(screen.getAllByText('T_financingTab.modification')[0]);
      userEvent.click(
        screen.getAllByText('T_financingTab.cancellationRequest')[0],
      );
      userEvent.click(
        screen.getAllByText('T_financingTab.otherInformationAndQueries')[0],
      );
      expect(mockedUsedNavigate).not.toHaveBeenCalled();
    });
  });
});
