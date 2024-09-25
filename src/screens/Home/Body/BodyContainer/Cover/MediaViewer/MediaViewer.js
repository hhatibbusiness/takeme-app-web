import React, {useEffect, useState} from 'react';
import CoverVideo from "../CoverVideo/CoverVideo";
import coverImg from "../../../../../../assets/images/defaults/take_me_cover_gif.mp4";
import CoverImg from "../CoverImg/CoverImg";

const MediaViewer = ({image, loaded, setLoaded}) => {
    const [imgType, setImgType] = useState(null);

    const renderImageOrVideo = () => {
        const types = new Map([["jpg", 1], ["png", 1], ['jpeg', 1], ["gif", 1], ["mp4", 0], ["webm", 0], ["3gp", 0]])
        if(image) {
            const extension = image?.split(".")[image?.split('.').length - 1];
            const element = types.get(extension);
            console.log(element, extension);
            if (element == undefined) {
                console.log('Not existed!', element)
                return setImgType(2);
            }
            setImgType(element);
        }else {
            console.log('no Image!')
            setImgType(2);
        }
    }

    useEffect(() => {
        renderImageOrVideo();
    }, []);

    const choseImgComponent = () => {
        switch (imgType) {
            case 0:
                // setLoaded(true);
                return <CoverVideo video={image} loaded={loaded} setLoaded={setLoaded} />
            case 1:
                return <CoverImg loaded={loaded} setLoaded={setLoaded} image={image} />
            case 2:
            return <CoverImg loaded={loaded} setLoaded={setLoaded} image={coverImg} />
        }
    }

    return imgType != null && choseImgComponent();
};

export default React.memo(MediaViewer);