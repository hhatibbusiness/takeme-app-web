import React, {useEffect, useState} from 'react';
import CoverVideo from "../CoverVideo/CoverVideo";
import CoverImg from "../CoverImg/CoverImg";

const MediaViewer = ({image}) => {
    const [type, setType] = useState(null);
    const getFileTypeFromUrl = async url => {
        try {
            const response = await fetch(url);
            const contentType = response.headers.get('Content-Type');
            // Parse `contentType` to determine the file type
            console.log(`The file type is: ${contentType}`);
            setType(contentType);
        } catch (error) {
            console.log(error.message);
        }
    }

    const renderImageOrVideo = () => {
        switch (type) {
            case 'video/mp4':
                return <CoverVideo video={image} />
            case 'image/jpg':
            case 'image/png':
            case 'image/jpeg':
            case 'image/gif':
            case 'image/avif':
            case 'image/svb+xml':
            case 'image/webp':
                return <CoverImg image={image} />
            default:
                return null;
        }
    }
    useEffect(() => {
        getFileTypeFromUrl(image);
    }, []);

    return renderImageOrVideo();
};

export default MediaViewer;