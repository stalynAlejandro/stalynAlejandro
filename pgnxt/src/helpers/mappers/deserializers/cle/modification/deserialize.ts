import { CreateApiDataDto } from '../../../../../api/types/cle/modification/CreateApiDataDto';

export const deserializeModifyCollection = (serviceData: CreateApiDataDto) => ({
  code: serviceData.code!,
  customer: serviceData.customer,
  documentation: serviceData.documentation,
  request: {
    comments: serviceData.comments,
    exportCollection: serviceData.exportCollection,
    office: serviceData.office,
  },
});
