import { CreateApiDataDto } from '../../../../../api/types/cli/financingModification/CreateApiDataDto';
import { FileProps } from '../../../../../types/FileProps';
import { mapFileItem } from '../../../../mapFileItem';

export const serializeCliFinancingModificationCollection = async (
  formData: any,
): Promise<CreateApiDataDto> => {
  const castedFormData = formData as CreateApiDataDto;

  return {
    ...castedFormData,
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
  };
};
