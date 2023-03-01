import Customer from '../../../../common/steps/Customer';
import Confirm from '../../../../common/steps/Confirm';
import Documentation from '../../../../common/steps/Documentation';
import Request from './Request';

export default [
  {
    component: Customer,
    key: 'customer',
    title: 'client',
  },
  {
    component: Request,
    key: 'request',
    title: 'request',
  },
  {
    component: Documentation,
    key: 'documentation',
    title: 'documentation',
  },
  {
    component: Confirm,
    key: 'confirm',
    skipInList: true,
    title: 'confirm',
  },
];
