import { CustomerDto } from '../../../../../api/types/CustomerDto';
import { CreateFormDataDto } from '../../../../../api/types/cle/advanceCancellation/CreateFormDataDto';
import { FileProps } from '../../../../../types/FileProps';
import { mapFileItem } from '../../../../mapFileItem';
import { CreateApiDataDto } from '../../../../../api/types/cle/advanceCancellation/CreateApiDataDto';

export const serializeCleAdvanceCancellation = async (
  formData: any,
): Promise<CreateApiDataDto> => {
  const castedFormData = formData as CreateFormDataDto;

  return {
    ...castedFormData,
    customer: formData.customer as CustomerDto,
    documentation: {
      ...(formData.documentation as CreateFormDataDto['documentation']),
      files: [
        ...(await Promise.all(
          formData.documentation?.files?.map(
            async (file: any): Promise<FileProps> => mapFileItem(file),
          ) || [],
        )),
      ],
    },
  };
};
