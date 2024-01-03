import React, {useEffect, useRef, useState} from 'react';
import './Product.css';
import axios from "axios";
import RenderImgError from "../../../../../../../components/RenderImgError/RenderImgError";
import {connect} from "react-redux";
import {changeSliderValue} from "../../../../../../../store/actions/categories.action";
import Img from "./Img/Img";
import Count from "./Count/Count";
import SpinnerComponent from "../../../../../../../components/Spinner/Spinner.Component";
import LoadingProduct from "../../../../../../../components/LoadingProduct/LoadingProduct";
import {useNavigate, useParams} from "react-router-dom";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../../../../../utls/firebase.auth";
import {useTranslation} from "react-i18next";
import {fetchProductTypeDetails, changeCurrentProductTypeId, startFetchingProvidersProducts, resetProductData, resetProvidersFetchingPage, fetchProductDetails} from "../../../../../../../store/actions/product.actions";
// import {notFoundImg} from "../../../../assets";

const Product = ({product, filter, productType, changeCurrentProductTypeId, startFetchingProvidersProducts, resetProductData, resetProvidersFetchingPage, value, lan, fetchProductDetails, fetchProductTypeDetails, setCurrentProduct, setPopup}) => {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const [imgUI, setImgUI] = useState(true);
    const [currentValue, setCurrentValue] = useState(100);
    const productRef = useRef();
    const navigate = useNavigate();
    const imgRef = useRef();
    const imgContainer = useRef();
    const imgLoaderRef = useRef();
    const failureRef = useRef(null);
    const imgRefDub = useRef(null);
    const imgContainerRef = useRef(null);
    const [windowWidth, setWindowSize] = useState(window.innerWidth);
    const [hidden, setHidden] = useState(true);
    const [containerLoaded, setContainerLoaded] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const changeHeightToWidth = () => {
        const productEle = productRef.current;
        if(!productEle) return;
        if(value === 100) return productEle.style.height = productEle.getBoundingClientRect().width;
        const productWidth = productEle.getBoundingClientRect().width;
        productEle.style.height = `${productWidth}px`;
    }

    useEffect(() => {
        changeHeightToWidth();
    }, [value]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            const currEle = productRef.current;
            changeHeightToWidth();
        });
    }, []);

    useEffect(() => {
        renderImage()
    }, []);

    const renderImage = async () => {
        try{
            const res = await axios.get(product?.imagePath && product.imagePath);
            if(res.status === 200) {
                const img = <Img setContainerLoaded={setContainerLoaded} imgRefDub={imgRef} setImgUi={setImgUI} setImgLoaded={setImgLoaded} imgUrl={product?.imagePath && product.imagePath}/>;
                setImgUI(img);
                // setImgLoaded(true);
            }
        }catch(e) {
            console.error(e);
            const imgUI =  <RenderImgError />;
            setImgLoaded(true);
            setImgUI(prevState => imgUI);
        }
    }

    const imgSizeHandler = () => {
        const productContainer = productRef.current;
        const img = imgContainer.current;
        const imgLoader = imgLoaderRef.current;
        const failureEle = failureRef?.current;
        if(!productContainer) return;
        const productHeight = productContainer.getBoundingClientRect().width;
        if(currentValue < 100) {
            if(productContainer) productContainer.style.height = `${productHeight}px`;
            if(img) {
                img.style.width = `${productHeight}px`;
                img.style.height = `${productHeight}px`;
            }
            if(imgLoader) {
                imgLoader.style.height = `${productHeight}px`;
                imgLoader.style.marginBottom = '0';
            }
            if(failureEle) failureEle.style.height = `${productHeight}px`
        }
        if(currentValue == 100) {
            if(img) {
                img.style.width = `${productHeight}px`;
                img.style.height = `${productHeight}px`;
            }
            if(imgLoader) imgLoader.style.height = `${productHeight}px`
            if(productContainer) productContainer.style.height = `${650 + productHeight - 500}px`;
            if(failureEle) failureEle.style.height = `${productHeight}px`
        }

    }

    useEffect(() => {
        imgSizeHandler();
    }, [loaded, windowWidth, imgContainer?.current, productRef?.current, currentValue, failureRef?.current]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowSize(window.innerWidth);
        });
    }, []);

    const params = useParams()

    const handleProductClick =async e => {
        if(value == 100) {
            console.log(productType, product);
            return navigate(`/product/${product.id}`);
        }
        setCurrentProduct(product);
        setPopup(true);
        logEvent(analytics, 'product_type_click', {
            Product_type_id: product?.id,
            Product_type_name: product?.title
        });
    }

    return (
        <div id={`Product__${product.id}`} ref={productRef} className={'Product'} onClick={handleProductClick}>
            <div className={`Product__body--container `}>
                {/*{*/}
                {/*    imgUI && (*/}
                        <div className={`${imgLoaded ? 'Product__visible' : 'Product__hidden'}`}>
                            <div ref={imgContainer} className={`Product__image--container ${value < 100 ? 'Product__image--container-center' : 'Product__image--container-min'}`}>
                                <Img setError={setError} setHidden={setHidden} setLoaded={setLoaded} setContainerLoaded={setContainerLoaded} imgRefDub={imgRef} setImgUi={setImgUI} setImgLoaded={setImgLoaded} imgUrl={product?.imagePath && product.imagePath}/>
                                {loaded && error && <RenderImgError hidden={hidden} setHidden={setHidden} failureRef={failureRef} elemRef={imgContainer} /> }
                            </div>
                            <div className={`Product__details ${value < 100 && 'Product__details--hide'}`}>
                                <p className={'Product__details--title'}>{product?.title && product.title}</p>
                                {/*<p className={'Product__price--header'}>{product?.saleDetails?.title && product.saleDetails.title}</p>*/}
                                {/*<p className={'Product__price'}>{product.saleDetails?.priceStartingFromMsg && product.saleDetails.priceStartingFromMsg}</p>*/}
                                <div className="Product__details--prices">
                                    {
                                        product?.saleDetails && (
                                            <p>
                                                <span className={'Product__details--sale-message'}>{t("salestartsfrom")}</span><span className={'Product__details--sale-starts'}>{product?.saleDetails?.priceStartingFrom && product?.saleDetails?.priceStartingFrom}</span> <span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span>
                                            </p>
                                        )
                                    }
                                    {
                                        product?.saleDetails && (
                                            <p>
                                                <span className={'Product__details--sale-message'}>{t("rentstartsfrom")}</span><span className={'Product__details--sale-starts'}>{product?.saleDetails?.priceStartingFrom && product?.saleDetails?.priceStartingFrom}</span> <span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span>
                                            </p>
                                        )
                                    }
                                </div>
                                {product?.description && <p className={'Product__details--description'}>{product?.description?.slice(0, 80)}</p>}
                            </div>
                            {
                                value === 100 && <Count count={product?.totalNumberOfProducts || 0} />
                            }
                        </div>
                {/*//     )*/}
                {/*// }*/}
                {(!loaded || (!loaded && hidden)) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={product?.saleDetails?.priceStartingFromMsg} priceTitle={product?.description} imgLoaded={false} details={value === 100 } btn={false} />}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value,
    lan: state.categories.lan,
    filter: state.categories.filter,
    productType: state.product.product
});

export default connect(mapStateToProps, {changeSliderValue, startFetchingProvidersProducts, resetProductData, resetProvidersFetchingPage, fetchProductDetails, fetchProductTypeDetails, changeCurrentProductTypeId}) (Product);