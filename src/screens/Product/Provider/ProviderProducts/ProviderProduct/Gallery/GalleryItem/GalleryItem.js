import React, {useEffect, useRef, useState} from 'react';
import Img from "../../../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../../../components/LoadingProduct/LoadingProduct";
import './GalleryItem.scss';
import productDefaultImage from '../../../../../../../assets/images/defaults/default-product-image.png';

const GalleryItem = ({imgUrl, activeIndex}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgUI, setImgUI] = useState(true);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hidden, setHidden] = useState(true);
    const failureRef = useRef(null);
    const imgLoaderRef = useRef(null);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const imgContainerRef = useRef(null);
    const galleryContainer = useRef();
    const [imgUrlPath, setImgUrlPath] = useState(() => {
        const imgUrlArray = imgUrl?.imagePath?.split('.');
        console.log(imgUrlArray);
        if(!imgUrlArray) return productDefaultImage;
        const imgUrlLastPart = `${imgUrlArray[imgUrlArray?.length - 2]}_original`;
        imgUrlArray[imgUrlArray.length - 2] = imgUrlLastPart;
        return imgUrlArray.join('.');
    });

    const getGalleryMin = () => {
        const containerElem = galleryContainer?.current;
        if(!containerElem) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const minDim = Math.min(width, height);
        containerElem.style.width = `${minDim}px`;
        containerElem.style.height = `${minDim}px`;
        console.log(minDim);
    }

    useEffect(() => {
        getGalleryMin();
    }, [galleryContainer]);

    useEffect(() => {
        console.log(imgUrl);
        window.addEventListener('resize', () => {
            getGalleryMin();
        });
    }, []);


    // useEffect(() => {
    //     handleImageUrl(imgUrl?.imagePath);
    // }, [imgUrl]);

    return (
        <div ref={galleryContainer} className={'GalleryItem '}>
            {
                imgUI && (
                    <>
                        <Img product={true} activeIndex={activeIndex} gallery={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={imgUrlPath  || productDefaultImage} />
                        {loaded && error && <RenderImgError hidden={hidden} setHidden={setHidden} imgLoaderRef={imgLoaderRef} failureRef={failureRef} elemRef={imgContainerRef} /> }
                    </>
                )
            }
            {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
        </div>
    );
};

export default React.memo(GalleryItem);