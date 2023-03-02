import React from 'react';
import { useParams } from 'react-router-dom';

import { ViewRequestDetails } from '../../components/ViewRequestDetails';
import { EventTypes, urlEventTypes } from '../../enums/eventTypes';
import { ProductTypes, urlProductTypes } from '../../enums/productTypes';

const ViewRequestDetailsPage: React.FC = () => {
  const { event, product, requestRef } = useParams();

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
      requestId={requestRef!}
      type="request"
    />
  );
};

export default ViewRequestDetailsPage;
