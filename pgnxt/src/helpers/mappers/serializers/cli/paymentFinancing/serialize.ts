import { mapFileItem } from '../../../../mapFileItem';
import { FileProps } from '../../../../../types/FileProps';
import { CreateFormDataDto } from '../../../../../api/types/cli/paymentFinancing/CreateFormDataDto';

export const serializeCliPaymentFinancingCreation = async (
  formData: any,
): Promise<CreateFormDataDto> => {
  const castedFormData = formData as CreateFormDataDto;

  return {
    ...castedFormData,
    documentation: {
      ...castedFormData.documentation,
      files: [
        ...(await Promise.all(
          castedFormData.documentation.files?.map(
            async (file: any): Promise<FileProps> => mapFileItem(file),
          ) || [],
        )),
      ],
    },
  };
};
