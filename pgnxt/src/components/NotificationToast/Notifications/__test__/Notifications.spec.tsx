import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponent } from '../../../../testUtils/renderComponent';
import { DefaultNotification } from '../DefaultNotification';
import { NewCollectionSuccess } from '../NewCollectionSuccess';

describe('Components Notifications', () => {
  describe('Notification DefaultNotification', () => {
    const defaultProps = {
      description: 'My much larger notification test description.',
      title: 'My notification title',
    };

    const renderWithProps = (props: any = {}) => {
      renderComponent(<DefaultNotification {...defaultProps} {...props} />);
    };

    it('renders the component successfully', async () => {
      renderWithProps();

      expect(screen.getByText(`T_${defaultProps.title}`)).toBeInTheDocument();
      expect(
        screen.getByText(`T_${defaultProps.description}`),
      ).toBeInTheDocument();
    });
  });

  describe('Notification NewCollectionSuccess', () => {
    const defaultProps = {
      clientName: 'Test Client',
      priority: 'urgent',
      reference: 'CLE-01',
      subtitle: 'My notification subtitle',
      title: 'My title',
    };

    const renderWithProps = (props: any = {}) => {
      renderComponent(<NewCollectionSuccess {...defaultProps} {...props} />);
    };

    it('renders the component successfully', async () => {
      renderWithProps();

      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.reference)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.clientName)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.priority)).toBeInTheDocument();
    });
  });
});
