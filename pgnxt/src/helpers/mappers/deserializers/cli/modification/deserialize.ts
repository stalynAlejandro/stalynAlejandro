import { CreateApiDataDto } from '../../../../../api/types/cli/modification/CreateApiDataDto';

export const deserializeCliModifyCollection = (
  serviceData: CreateApiDataDto,
) => ({
  code: serviceData.code!,
  customer: serviceData.customer,
  documentation: serviceData.documentation,
  request: {
    comments: serviceData.comments,
    importCollection: serviceData.importCollection,
    office: serviceData.office,
  },
});
