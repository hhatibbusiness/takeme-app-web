import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Img from "../../../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../../../components/LoadingProduct/LoadingProduct";
import './GalleryItem.scss';

const GalleryItem = ({imgUrl}) => {
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

    const renderImage = async () => {
        try{
            const res = await axios.get(imgUrl.imagePath);
            if(res.status === 200) {
                const img = <Img setImgLoaded={setImgLoaded} imgUrl={imgUrl.imagePath}/>;
                setImgUI(img);
            }
        }catch(e) {
            console.error(e);
            const imgUI =  <RenderImgError hidden={hidden} setHidden={setHidden} />;
            setImgLoaded(true);
            setImgUI(prevState => imgUI);
        }
    }

    useEffect(() => {
        renderImage()
    }, []);

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
        window.addEventListener('resize', () => {
            getGalleryMin();
        });
    }, []);

    return (
        <div ref={galleryContainer} className={'GalleryItem'}>
            {
                imgUI && (
                    <>
                        <Img gallery={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={imgUrl.imagePath && imgUrl.imagePath}/>
                        {loaded && error && <RenderImgError hidden={hidden} setHidden={setHidden} imgLoaderRef={imgLoaderRef} failureRef={failureRef} elemRef={imgContainerRef} /> }
                    </>
                )
            }
            {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
            {/*{(true) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}
        </div>
    );
};

export default GalleryItem;