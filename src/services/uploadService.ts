import api from './api';

export interface UploadResult {
  url: string;
  publicId: string;
}

export const uploadService = {
  uploadFile: async (file: File): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
