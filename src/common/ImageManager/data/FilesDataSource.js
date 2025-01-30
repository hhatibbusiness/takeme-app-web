import axios from 'axios';
import { dataURLtoFile } from 'image-conversion';

class FilesDataSource {
    static async getFilesFromDataSource(params) {
        const urlParams = new URLSearchParams(params.params).toString();
        const url = `${params.baseUrl}files/get-files?${urlParams}`;
        console.log('Get URL:', url);
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Failed to fetch files:', error.response?.data || error.message);
            } else {
                console.error('An unexpected error occurred:', error);
            }
            throw new Error('Failed to fetch files');
        }
    }

    static async deleteFilesFromDataSource(params, images) {
        let deleteUrl = `${params.baseUrl}files/delete-files-by-uris?`;
        images.forEach((image, index) => {
            deleteUrl += index === 0 ? `filesUris=${image}` : `&filesUris=${image}`;
        });
        try {
            const response = await axios.delete(deleteUrl, {
                headers: params.headers
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Failed to delete files:', error.response?.data || error.message);
            } else {
                console.error('An unexpected error occurred:', error);
            }
            throw new Error('Failed to delete files');
        }
    }

    static async addFilesFromDataSource(params, images) {
        const formData = new FormData();
        for (const image of images) {
            const imageFile = await dataURLtoFile(image.file);
            formData.append('files', new File([imageFile], image.id));
        }
        const urlParams = new URLSearchParams(params.params).toString();
        const url = `${params.baseUrl}images/upload-images?${urlParams}`;
        console.log('url:', url);
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    ...params.headers,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Failed to add files:', error.response?.data || error.message);
            } else {
                console.error('An unexpected error occurred:', error);
            }
            throw new Error('Failed to add files');
        }
    }

    static async compressImage(params, imageFile, compressionParams = {}) {
        try {
            const formData = new FormData();
            formData.append('imageFile', imageFile);
            formData.append('width', compressionParams.width?.toString() || '1080');
            formData.append('height', compressionParams.height?.toString() || '1080');
            formData.append('quality', compressionParams.quality?.toString() || '70');

            const response = await axios.post(
                `${params.baseUrl}/endpoints/images/compress-image?locale=ar`,
                formData,
                {
                    headers: {
                        ...params.headers,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            const compressedBlob = new Blob([response.data], { type: imageFile.type });
            return new File([compressedBlob], imageFile.name, { type: imageFile.type });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Failed to compress image:', error.response?.data || error.message);
            } else {
                console.error('An unexpected error occurred:', error);
            }
            throw new Error('Failed to compress image');
        }
    }
}

export default FilesDataSource;
