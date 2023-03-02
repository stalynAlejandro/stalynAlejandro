import React from 'react';
import { toast } from 'react-toastify';

import { Icon } from '../Icon';

const getElementOrString = (message: any) =>
  React.isValidElement(message) ? (
    message
  ) : (
    <div dangerouslySetInnerHTML={{ __html: message }} />
  );

const success = (message: any, opts = {}) =>
  toast.success(getElementOrString(message), {
    autoClose: 4000,
    icon: <Icon icon="circled-check" />,
    ...opts,
  });

const warning = (message: any, opts = {}) =>
  toast.warning(getElementOrString(message), {
    icon: <Icon icon="circled-info" />,
    ...opts,
  });

const error = (message: any, opts = {}) =>
  toast.error(getElementOrString(message), {
    icon: <Icon icon="warning" />,
    ...opts,
  });

const info = (message: any, opts = {}) =>
  toast.info(getElementOrString(message), {
    icon: <Icon icon="circled-info" />,
    ...opts,
  });

export default {
  error,
  info,
  success,
  warning,
};
