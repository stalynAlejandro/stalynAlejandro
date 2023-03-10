import React from 'react';
import { useParams } from 'react-router-dom';

import { ViewRequestDetails } from '../../components/ViewRequestDetails';
import { EventTypes, urlEventTypes } from '../../enums/eventTypes';
import { ProductTypes, urlProductTypes } from '../../enums/productTypes';

const ViewTaskDetailsPage: React.FC = () => {
  const { event, product, taskRef } = useParams();

  const parsedEvent = urlEventTypes[
    event! as keyof typeof urlEventTypes
  ] as EventTypes;
  const parsedProduct = urlProductTypes[
    product! as keyof typeof urlProductTypes
  ] as ProductTypes;

  return (
    <ViewRequestDetails
      event={parsedEvent}
      product={parsedProduct}
      requestId={taskRef!}
      type="task"
    />
  );
};

export default ViewTaskDetailsPage;
