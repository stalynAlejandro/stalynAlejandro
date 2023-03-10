import { CustomerCleRequestDto } from '../../../../../api/types/CustomerCleRequestDto';
import { CustomerDto } from '../../../../../api/types/CustomerDto';
import { CreateApiDataDto } from '../../../../../api/types/cle/modification/CreateApiDataDto';
import { FileProps } from '../../../../../types/FileProps';
import { mapFileItem } from '../../../../mapFileItem';

export const serializeModifyCollection = async (
  formData: any,
): Promise<CreateApiDataDto> => ({
  code: formData.code || null,
  comments: formData.request?.comments,
  customer: formData.customer as CustomerDto,
  documentation: {
    ...(formData.documentation as CreateApiDataDto['documentation']),
    files: [
      ...(await Promise.all(
        formData.documentation?.files?.map(
          async (file: any): Promise<FileProps> => mapFileItem(file),
        ) || [],
      )),
    ],
  },
  exportCollection: formData.request?.exportCollection as CustomerCleRequestDto,
  office: formData.request?.office,
});
