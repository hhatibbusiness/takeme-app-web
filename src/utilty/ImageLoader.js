import React from 'react';

const ImageLoader = ({ src, alt, height, width }) => {
  // Fallback if width or height is not provided
  const imgWidth = width || 'auto';
  const imgHeight = height || 'auto';
  return (
    <img
      src={process.env.PUBLIC_URL + '/images/' + src}
      alt={alt}
      style={{width:imgWidth, height:imgHeight}}
    />
  );
};

export default ImageLoader;
