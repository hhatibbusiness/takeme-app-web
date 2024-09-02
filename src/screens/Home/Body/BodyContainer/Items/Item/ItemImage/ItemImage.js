import React, {useEffect, useRef, useState} from 'react';
import './ItemImage.css';
import Img from "../../../ProductList/Products/Product/Img/Img";
import LoadingProduct from "../../../../../../../components/LoadingProduct/LoadingProduct";
import productDefault from '../../../../../../../assets/images/defaults/default-product-image.png'
import {useLocation, useNavigate} from "react-router-dom";
import {openGallery} from "../../../../../../../store/actions/product.actions";
import {connect} from "react-redux";
import {changeCurrentProvider, openSearchPopup, changePopupProduct, openPopup} from "../../../../../../../store/actions/ui.actions";

const ItemImage = ({item, value, openGallery, openSearchPopup, changePopupProduct, openPopup, changeCurrentProvider}) => {
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgLoaderRef = useRef(null);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);

    const imageRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const imageContainer = imageRef.current;
        if(imageContainer) {
            imageContainer.style.height = `${imageContainer.getBoundingClientRect().width}px`;

        }
    }, [imageRef.current, value]);

    const adjustFontSize = () => {
        if(value == 50) return 14;
        if(value == 0) return 12;
    }

    return (
        <div ref={imageRef} className={'ItemImage'} onClick={e => {
            if(value < 100) {
                changePopupProduct(item);
                changeCurrentProvider(item?.provider);
                openPopup();
                navigate(`main/popup/${item?.id}`);
                openSearchPopup();
            }else {
                openGallery(item);
                navigate(`gallery`);
            }
        }}>
            {
                value < 100 && item?.saleDetails && (
                    <div className={'ItemImage__price'} style={{fontSize: `${adjustFontSize()}px`}}>
                        <p>{item?.saleDetails?.price}<span><i className="fa-solid fa-shekel-sign"></i></span></p>
                    </div>
                )
            }
            {
                value < 100 && (
                    <div className={'ItemImage__backdrop'}></div>
                )
            }
            <Img product={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={item?.images && item?.images[0]?.imagePath || productDefault} />
            {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
            {/*{true && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}
        </div>
    );
};

export default connect(null, {openGallery, openSearchPopup, openPopup, changePopupProduct, changeCurrentProvider}) (ItemImage);