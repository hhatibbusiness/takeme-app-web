const getFileSize = (size) => {
    return size / (1024 * 1024);
};

const base64ToBlob = (base64Data) => {
    const base64String = String(base64Data);
    const match = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!match || match.length !== 3) {
        console.error('Invalid base64 data format');
        return null;
    }
    const [, contentType, base64Image] = match;
    const decodedImage = atob(base64Image);
    const byteArray = new Uint8Array(decodedImage.length);
    for (let i = 0; i < decodedImage.length; i++) {
        byteArray[i] = decodedImage.charCodeAt(i);
    }
    return new Blob([byteArray], { type: contentType });
};

const convertToPNG = async (file) => {
    const image = new Image();
    const reader = new FileReader();

    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
        reader.onload = function (event) {
            image.src = event.target.result;
            image.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(image, 0, 0);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const convertedFile = new File([blob], file.name, { type: 'image/png' });
                        resolve(convertedFile);
                    } else {
                        reject(new Error('Conversion failed'));
                    }
                }, 'image/png');
            };
        };
    });
};

const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result;
            resolve(base64String);
        };
        reader.onerror = () => {
            reject(reader.error);
        };
    });
};

export {
    base64ToBlob,
    getFileSize,
    convertFileToBase64,
    convertToPNG,
};
