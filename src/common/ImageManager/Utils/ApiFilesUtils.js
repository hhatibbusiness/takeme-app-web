import axios from 'axios';

export async function imageUrlToFile(image) {
  try {
    const response = await axios.get(image.uri, { responseType: 'arraybuffer' });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = new URL(image.uri);
    const imageName = url.pathname.split('/').pop();
    return new File([blob], imageName);
  } catch (error) {
    console.error('Error converting image URL to file:', error);
    throw error;
  }
}
