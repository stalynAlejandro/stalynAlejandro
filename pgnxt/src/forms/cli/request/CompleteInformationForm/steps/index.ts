import Customer from '../../../../common/steps/Customer';
import Confirm from '../../../../common/steps/Confirm';
import Documentation from './Documentation';
import OperationDetails from './OperationDetails';

export default [
  {
    component: Customer,
    key: 'customer',
    title: 'client',
  },
  {
    component: OperationDetails,
    key: 'operationDetails',
    title: 'operationDetails',
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
