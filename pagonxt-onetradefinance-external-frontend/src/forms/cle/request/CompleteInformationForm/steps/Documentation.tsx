import React from 'react';

import { StepProps } from '../../../../common/types/StepProps';
import DocumentationWithPriceLetter from '../../../../common/steps/DocumentationWithPriceLetter';
import ApiUrls from '../../../../../constants/apiUrls';

const Documentation: React.FC<StepProps> = (props) => (
  <DocumentationWithPriceLetter
    {...props}
    getPriceChartUrl={ApiUrls.pricesCharts.cle}
    summarySteps={['customer', 'operationDetails', 'advance']}
  />
);

export default Documentation;
