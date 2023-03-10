export interface FileProps extends File {
  data?: string;
  documentType?: 'letter' | 'document' | null;
  id?: string | null;
  uploadedDate?: string;
}
