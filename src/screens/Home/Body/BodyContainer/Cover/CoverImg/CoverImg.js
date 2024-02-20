import React, {useRef, useState} from 'react';
import Img from "../../ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../../components/LoadingProduct/LoadingProduct";
import CoverVideo from "../CoverVideo/CoverVideo";

const CoverImg = ({image}) => {
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const failureRef= useRef(null);
    const imgRefDub = useRef(null);
    const imgContainerRef = useRef(null);
    const [imgLoaded, setImgLoaded] = useState(true);


    const getFileTypeFromUrl = async url => {
        try {
            const response = await fetch(url);
            const contentType = response.headers.get('Content-Type');
            // Parse `contentType` to determine the file type
            // console.log(`The file type is: ${contentType}`);
            return contentType;
        } catch (error) {
            console.log(error.message);
        }
    }

    const renderImageOrVideo = async url => {
        const type = await getFileTypeFromUrl(url);
        switch (type) {
            case 'video/mp4':
                return <CoverVideo />
            case 'image/jpg':
            case 'image/png':
                return <CoverImg />
            default:
                return null;
        }
    }

    return (
        <div ref={imgContainerRef} className={`${imgLoaded ? 'Cover__visible' : 'Cover__hidden'}`}>
            <Img setError={setError} setHidden={setHidden} setLoaded={setLoaded} setContainerLoaded={setContainerLoaded} imgRefDub={imgRefDub} setImgLoaded={setImgLoaded} imgUrl={image}/>
            {/*<Img setError={setError} setHidden={setHidden} setLoaded={setLoaded} setContainerLoaded={setContainerLoaded} imgRefDub={imgRefDub} setImgLoaded={setImgLoaded} imgUrl={assets?.coverPath && assets?.coverPath}/>*/}
            {loaded && error && <RenderImgError hidden={hidden} setHidden={setHidden} failureRef={failureRef} cover={true} elemRef={imgContainerRef} />}
            {(!loaded || (!loaded && hidden)) && <LoadingProduct priceStartFrom={true} priceTitle={false} imgLoaded={false} details={false} btn={false} />}

        </div>
    );
};

export default CoverImg;