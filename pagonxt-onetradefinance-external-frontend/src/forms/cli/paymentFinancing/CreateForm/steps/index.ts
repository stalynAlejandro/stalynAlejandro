import Request from './Request';
import Confirm from '../../../../common/steps/Confirm';
import Customer from '../../../../common/steps/Customer';
import Documentation from '../../../../common/steps/Documentation';

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
