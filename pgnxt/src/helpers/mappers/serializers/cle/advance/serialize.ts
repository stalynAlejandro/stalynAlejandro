import { CustomerDto } from '../../../../../api/types/CustomerDto';
import { CreateFormDataDto } from '../../../../../api/types/cle/advance/CreateFormDataDto';
import { FileProps } from '../../../../../types/FileProps';
import { mapFileItem } from '../../../../mapFileItem';

export const serializeNewAdvanceCollection = async (
  formData: any,
): Promise<CreateFormDataDto> => {
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
