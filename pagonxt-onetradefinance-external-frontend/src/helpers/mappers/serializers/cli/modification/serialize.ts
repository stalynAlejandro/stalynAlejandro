import { CustomerCliRequestDto } from '../../../../../api/types/CustomerCliRequestDto';
import { CustomerDto } from '../../../../../api/types/CustomerDto';
import { CreateApiDataDto } from '../../../../../api/types/cli/modification/CreateApiDataDto';
import { FileProps } from '../../../../../types/FileProps';
import { mapFileItem } from '../../../../mapFileItem';

export const serializeCliModifyCollection = async (
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
  importCollection: formData.request?.importCollection as CustomerCliRequestDto,
  office: formData.request?.office,
});
