const getImageDimensions = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const img = new Image();
          img.onload = () => {
            if (img.width > 0 && img.height > 0) {
              const aspectRatio = img.width / img.height;
              const aspect =
                aspectRatio === 1
                  ? "1:1"
                  : aspectRatio > 1
                  ? `${aspectRatio.toFixed(2)}:1`
                  : `1:${(1 / aspectRatio).toFixed(2)}`;
              resolve({ aspect });
            } else {
              reject(new Error("Image has invalid dimensions"));
            }
          };
          img.onerror = () => {
            reject(new Error("Error loading image"));
          };
  
          img.src = event.target.result;
        } else {
          reject(new Error("Event target or result is null"));
        }
      };
  
      reader.onerror = () => {
        reject(new Error("Error reading blob"));
      };
      reader.readAsDataURL(blob);
    });
  };
  
  export default getImageDimensions;
  