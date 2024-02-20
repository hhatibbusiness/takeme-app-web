import React, {useEffect, useState} from 'react';
import CoverVideo from "../CoverVideo/CoverVideo";
import CoverImg from "../CoverImg/CoverImg";

const MediaViewer = ({image}) => {
    const [imagePath, setImagePath] = useState(null);
    const [type, setType] = useState(null);
    const getFileTypeFromUrl = async url => {
        try {
            const response = await fetch(url && url);
            const contentType = response.headers.get('Content-Type');
            // Parse `contentType` to determine the file type
            // console.log(`The file type is: ${contentType}`);
            setType(contentType);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        setImagePath(image);
    }, image);

    const renderImageOrVideo = () => {
        // console.log(type);
        switch (type) {
            case 'video/mp4':
            case 'video/mp4;charset=UTF-8':
                return <CoverVideo video={image} />
            case 'image/jpg':
            case 'image/jpg;charset=UTF-8':
            case 'image/png':
            case 'image/png;charset=UTF-8':
            case 'image/jpeg':
            case 'image/jpeg;charset=UTF-8':
            case 'image/gif':
            case 'image/gif;charset=UTF-8':
            case 'image/avif':
            case 'image/avif;charset=UTF-8':
            case 'image/svb+xml;charset=UTF-8':
            case 'image/webp':
                return <CoverImg image={image} />
            default:
                return null;
        }
    }
    useEffect(() => {
        getFileTypeFromUrl(imagePath);
        // console.log(imagePath);
    }, [imagePath]);

    return renderImageOrVideo();
};

export default MediaViewer;