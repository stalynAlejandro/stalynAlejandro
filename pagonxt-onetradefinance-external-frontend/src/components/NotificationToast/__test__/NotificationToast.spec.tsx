import React from 'react';
import { screen } from '@testing-library/react';

import { renderComponentWithToast } from '../../../testUtils/renderComponent';
import NotificationToast from '../NotificationToast';

describe('Component NotificationToast', () => {
  const notificationMessage = 'Lorem ipsum dolor sit amet';
  const componentMessage = <span>{notificationMessage}</span>;

  beforeEach(() => {
    renderComponentWithToast(<div />);
  });

  describe('NotificationToast Success', () => {
    it('renders correctly the message if it contains HTML', async () => {
      const message = '<span data-testid="test-id">Hello test</span>';
      NotificationToast.success(message);

      expect(await screen.findByTestId('test-id')).toBeInTheDocument();
      expect(await screen.findByText('Hello test')).toBeInTheDocument();
    });

    it('renders a green banner with the provided message and success icon', async () => {
      NotificationToast.success(notificationMessage);

      expect(await screen.findByText(notificationMessage)).toBeInTheDocument();
      expect(screen.getByTestId('icon-circled-check')).toBeInTheDocument();
      expect(
        document.querySelector('.Toastify__toast--success'),
      ).toBeInTheDocument();
      expect(document.querySelector('.Toastify__toast--success')).toHaveStyle({
        backgroundColor: '#f0f8f0',
        borderColor: '#3a8340',
      });
    });

    it('is capable to render a component as message', async () => {
      NotificationToast.success(componentMessage);

      expect(await screen.findByText(notificationMessage)).toBeInTheDocument();
      expect(screen.getByTestId('icon-circled-check')).toBeInTheDocument();
    });
  });

  describe('NotificationToast Error', () => {
    it('renders correctly the message if it contains HTML', async () => {
      const message = '<span data-testid="test-id">Hello test</span>';
      NotificationToast.error(message);

      expect(await screen.findByTestId('test-id')).toBeInTheDocument();
      expect(await screen.findByText('Hello test')).toBeInTheDocument();
    });

    it('renders a green banner with the provided message and success icon', async () => {
      NotificationToast.error(notificationMessage);

      expect(await screen.findByText(notificationMessage)).toBeInTheDocument();
      expect(screen.getByTestId('icon-warning')).toBeInTheDocument();
      expect(
        document.querySelector('.Toastify__toast--error'),
      ).toBeInTheDocument();
      expect(document.querySelector('.Toastify__toast--error')).toHaveStyle({
        backgroundColor: '#fee5e5',
        borderColor: '#cc0000',
      });
    });

    it('is capable to render a component as message', async () => {
      NotificationToast.error(componentMessage);

      expect(await screen.findByText(notificationMessage)).toBeInTheDocument();
      expect(screen.getByTestId('icon-warning')).toBeInTheDocument();
    });
  });

  describe('NotificationToast Warning', () => {
    it('renders correctly the message if it contains HTML', async () => {
      const message = '<span data-testid="test-id">Hello test</span>';
      NotificationToast.warning(message);

      expect(await screen.findByTestId('test-id')).toBeInTheDocument();
      expect(await screen.findByText('Hello test')).toBeInTheDocument();
    });

    it('renders a green banner with the provided message and success icon', async () => {
      NotificationToast.warning(notificationMessage);

      expect(await screen.findByText(notificationMessage)).toBeInTheDocument();
      expect(screen.getByTestId('icon-circled-info')).toBeInTheDocument();
      expect(
        document.querySelector('.Toastify__toast--warning'),
      ).toBeInTheDocument();
      expect(document.querySelector('.Toastify__toast--warning')).toHaveStyle({
        backgroundColor: '#fffaeb',
        borderColor: '#946f00',
      });
    });

    it('is capable to render a component as message', async () => {
      NotificationToast.warning(componentMessage);

      expect(await screen.findByText(notificationMessage)).toBeInTheDocument();
      expect(screen.getByTestId('icon-circled-info')).toBeInTheDocument();
    });
  });

  describe('NotificationToast Info', () => {
    it('renders correctly the message if it contains HTML', async () => {
      const message = '<span data-testid="test-id">Hello test</span>';
      NotificationToast.info(message);

      expect(await screen.findByTestId('test-id')).toBeInTheDocument();
      expect(await screen.findByText('Hello test')).toBeInTheDocument();
    });

    it('renders a green banner with the provided message and success icon', async () => {
      NotificationToast.info(notificationMessage);

      expect(await screen.findByText(notificationMessage)).toBeInTheDocument();
      expect(screen.getByTestId('icon-circled-info')).toBeInTheDocument();
      expect(
        document.querySelector('.Toastify__toast--info'),
      ).toBeInTheDocument();
      expect(document.querySelector('.Toastify__toast--info')).toHaveStyle({
        backgroundColor: '#f9fcfd',
        borderColor: '#257fa4',
      });
    });

    it('is capable to render a component as message', async () => {
      NotificationToast.info(componentMessage);

      expect(await screen.findByText(notificationMessage)).toBeInTheDocument();
      expect(screen.getByTestId('icon-circled-info')).toBeInTheDocument();
    });
  });
});
