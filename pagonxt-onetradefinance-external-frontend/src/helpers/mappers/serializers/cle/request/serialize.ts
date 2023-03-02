import { CreateFormDataDto } from '../../../../../api/types/cle/request/CreateFormDataDto';
import { FileProps } from '../../../../../types/FileProps';
import { mapFileItem } from '../../../../mapFileItem';

export const serializeNewCollection = async (
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
