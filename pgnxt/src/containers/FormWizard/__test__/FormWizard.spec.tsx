import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';

import theme from '../../../resources/theme';
import { renderComponent } from '../../../testUtils/renderComponent';
import FormWizard, { FormWizardProps } from '../FormWizard';

describe('Container FormWizard', () => {
  const defaultProps: FormWizardProps = {
    onClose: jest.fn(),
    onStepChange: jest.fn(),
    stepList: [
      {
        key: 'step-1',
        title: 'My first step',
      },
      {
        key: 'step-2',
        title: 'My second step',
      },
      {
        key: 'step-3',
        title: 'My third step',
      },
      {
        key: 'step-4',
        title: 'My fourth step',
      },
      {
        key: 'step-5',
        skipInList: true,
        title: 'Last step',
      },
    ],
    title: 'Form Wizard Title',
  };

  const renderWithProps = (
    props: Partial<FormWizardProps> = {},
    children: React.ReactNode = null,
  ) => {
    renderComponent(
      <FormWizard {...defaultProps} {...props}>
        {children}
      </FormWizard>,
    );
  };

  describe('Common behavior', () => {
    it('renders the component successfully with its title', () => {
      renderWithProps();

      expect(screen.getByTestId('form-wizard-container')).toBeInTheDocument();
      expect(screen.getByText(`T_${defaultProps.title}`)).toBeInTheDocument();
      expect(screen.getByText(`T_discard`)).toBeInTheDocument();
    });

    it('sets the actual step to 0 by default if no actualStep prop is provided', () => {
      renderWithProps();

      const firstStepElement = screen.getByText(
        `T_${defaultProps.stepList[0].title}`,
      );

      expect(firstStepElement.closest('li')).toHaveClass(
        'footer-step--is-active',
      );
    });

    it('displays a confirmation modal when Close button is pressed', () => {
      renderWithProps();

      act(() => userEvent.click(screen.getByTestId('icon-close')));

      expect(screen.getByTestId('modal-container')).toBeInTheDocument();
      expect(
        screen.getByText('T_discardCollectionPromptMessage'),
      ).toBeInTheDocument();
    });

    it('executes the provided onClose method when the Confirm button is clicked in the close modal', () => {
      renderWithProps();

      act(() => userEvent.click(screen.getByTestId('icon-close')));
      act(() => userEvent.click(screen.getByText('T_confirm')));

      expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('closes the modal if the Cancel button in modal is pressed', () => {
      renderWithProps();

      act(() => userEvent.click(screen.getByTestId('icon-close')));
      act(() => userEvent.click(screen.getByText('T_cancel')));

      expect(screen.queryByTestId('modal-container')).not.toBeInTheDocument();
    });
  });

  describe('Header', () => {
    it('renders the back button if canGoBack prop is true, it is not the first step and onFinish prop is not provided', () => {
      renderWithProps({
        actualStep: 2,
        canGoBack: true,
      });

      expect(screen.getByText('T_back')).toBeInTheDocument();
    });

    it('does not render the back button if canGoBack prop is false', () => {
      renderWithProps({
        actualStep: 2,
        canGoBack: false,
      });

      expect(screen.queryByText('T_back')).not.toBeInTheDocument();
    });

    it('does not render the back button if the actual step is the first one', () => {
      renderWithProps(); // canGoBack default value is true
      expect(screen.queryByText('T_back')).not.toBeInTheDocument();
    });

    it('executes the provided onStepChange method when clicking the go back button', () => {
      renderWithProps({
        actualStep: 2,
        canGoBack: true,
      });

      act(() => userEvent.click(screen.getByText('T_back')));

      expect(defaultProps.onStepChange).toHaveBeenCalledWith(1);
    });

    it('renders the Save Draft button if onSaveDraft is provided and onFinish prop is not provided', () => {
      renderWithProps({
        onSaveDraft: jest.fn(),
      });

      expect(screen.getByText('T_saveForLater')).toBeInTheDocument();
    });

    it('does not render the Save Draft button if onSaveDraft is not provided', () => {
      renderWithProps();
      expect(screen.queryByText('T_saveForLater')).not.toBeInTheDocument();
    });

    it('renders the progress bar with the correct length according to the actual step', () => {
      const actualStep = 2;
      const totalSteps = defaultProps.stepList.length;
      const expectedPercentage = ((actualStep + 1) / totalSteps) * 100;

      renderWithProps({ actualStep });

      expect(screen.getByTestId('form-wizard-progress-bar')).toHaveAttribute(
        'data-progress',
        `${expectedPercentage}`,
      );
    });
  });

  describe('Wizard Content', () => {
    it('renders the content successfully', () => {
      renderWithProps(undefined, <span>This is a test child</span>);
      expect(screen.getByText('This is a test child')).toBeInTheDocument();
    });
  });

  describe('Footer steps', () => {
    const getStepBgLineElement = (step: string | HTMLElement) => {
      const stepElement =
        typeof step === 'string'
          ? screen.getByText(`T_${step}`).closest('li')
          : step;

      if (stepElement) {
        const { queryByTestId } = within(stepElement);
        return queryByTestId('footer-step-bg-line');
      }

      return null;
    };

    const getStepCircleElement = (step: string | HTMLElement) => {
      const stepElement =
        typeof step === 'string'
          ? screen.getByText(`T_${step}`).closest('li')
          : step;

      if (stepElement) {
        const { queryByTestId } = within(stepElement);
        return queryByTestId('footer-step-circle');
      }

      return null;
    };

    it('renders the footer with all the titles of the steps without skipInList prop in them', () => {
      renderWithProps();

      const notSkippedSteps = defaultProps.stepList.filter(
        (step) => !step.skipInList,
      );
      expect(notSkippedSteps.length).toBeGreaterThan(0);

      notSkippedSteps.forEach(({ title }) => {
        expect(screen.getByText(`T_${title}`)).toBeInTheDocument();
        expect(screen.getByText(`T_${title}`).closest('li')).toHaveClass(
          'footer-step',
        );
      });
    });

    it('does not render steps with skipInList prop set to true', () => {
      renderWithProps();
      const skippedSteps = defaultProps.stepList.filter(
        (step) => step.skipInList,
      );

      expect(skippedSteps.length).toBeGreaterThan(0);

      skippedSteps.forEach(({ title }) => {
        expect(screen.queryByText(`T_${title}`)).not.toBeInTheDocument();
      });
    });

    it('shows prior steps as completed', () => {
      renderWithProps({ actualStep: 2 });

      const firstStepElement = screen
        .getByText(`T_${defaultProps.stepList[0].title}`)
        .closest('li');

      expect(firstStepElement).toHaveClass('footer-step--is-completed');
      expect(firstStepElement).not.toHaveClass('footer-step--is-active');
    });

    it('shows current step as active', () => {
      renderWithProps({ actualStep: 2 });

      const stepElement = screen
        .getByText(`T_${defaultProps.stepList[2].title}`)
        .closest('li');

      expect(stepElement).toHaveClass('footer-step--is-active');
    });

    it('shows next steps as not active and not completed', () => {
      renderWithProps({ actualStep: 2 });

      const stepElement = screen
        .getByText(`T_${defaultProps.stepList[3].title}`)
        .closest('li');

      expect(stepElement).not.toHaveClass('footer-step--is-active');
      expect(stepElement).not.toHaveClass('footer-step--is-completed');
    });

    it('visually shows correctly the status of the steps', () => {
      const actualStep = 1;
      const { colors } = theme;
      renderWithProps({ actualStep });

      const completedStep = screen
        .getByText(`T_${defaultProps.stepList[actualStep - 1].title}`)
        .closest('li');
      const activeStep = screen
        .getByText(`T_${defaultProps.stepList[actualStep].title}`)
        .closest('li');
      const nextStep = screen
        .getByText(`T_${defaultProps.stepList[actualStep + 1].title}`)
        .closest('li');
      const furtherStep = screen
        .getByText(`T_${defaultProps.stepList[actualStep + 2].title}`)
        .closest('li');

      // Step background lines styles
      expect(getStepBgLineElement(completedStep!)).not.toBeInTheDocument();
      expect(getStepBgLineElement(activeStep!)).toHaveStyle({
        backgroundColor: '#e8f3f6',
        right: 0,
      });
      expect(getStepBgLineElement(nextStep!)).toHaveStyle({
        backgroundColor: '#e8f3f6',
        left: 0,
      });
      expect(getStepBgLineElement(furtherStep!)).not.toBeInTheDocument();

      // Step circles styles
      expect(getStepCircleElement(completedStep!)).toHaveStyle({
        backgroundColor: colors.darkergray,
        borderColor: 'black',
        opacity: 1,
      });
      expect(getStepCircleElement(activeStep!)).toHaveStyle({
        borderColor: colors.boston,
      });
      expect(getStepCircleElement(nextStep!)).toHaveStyle({
        borderColor: 'black',
        opacity: 0.4,
      });
      expect(getStepCircleElement(furtherStep!)).toHaveStyle({
        borderColor: 'black',
        opacity: 0.4,
      });
    });
  });

  describe('Footer buttons', () => {
    it('renders the footer buttons if onFinish prop is provided', () => {
      renderWithProps({ onFinish: jest.fn() });

      expect(document.querySelector('.footer-step')).not.toBeInTheDocument();
      expect(screen.getByText('T_confirm')).toBeInTheDocument();
      expect(screen.getByText('T_cancel')).toBeInTheDocument();
    });

    it('opens the Close modal when Cancel button is clicked', () => {
      renderWithProps({ onFinish: jest.fn() });
      act(() => userEvent.click(screen.getByText('T_cancel')));

      expect(screen.getByTestId('modal-container')).toBeInTheDocument();
      expect(
        screen.getByText('T_discardCollectionPromptMessage'),
      ).toBeInTheDocument();
    });

    it('executes the provided onFinish method when Confirm button is clicked', () => {
      const onFinish = jest.fn();

      renderWithProps({ onFinish });
      userEvent.click(screen.getByText('T_confirm'));

      expect(onFinish).toHaveBeenCalled();
    });

    it('opens the Close modal when Cancel footer button is clicked', async () => {
      renderWithProps({
        onFinish: jest.fn(),
      });

      const { getByText } = within(screen.getByTestId('form-wizard-footer'));
      act(() => userEvent.click(getByText('T_cancel')));

      await waitFor(() => {
        expect(screen.getByTestId('modal-container')).toBeInTheDocument();
        expect(
          screen.getByText('T_discardCollectionPromptMessage'),
        ).toBeInTheDocument();
      });
    });
  });
});
