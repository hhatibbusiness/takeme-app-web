import React, {useEffect, useRef, useState} from 'react';
import './Product.css';
import RenderImgError from "../../../../../../../components/RenderImgError/RenderImgError";
import {connect} from "react-redux";
import {changeSliderValue} from "../../../../../../../store/actions/categories.action";
import Img from "./Img/Img";
import Count from "./Count/Count";
import LoadingProduct from "../../../../../../../components/LoadingProduct/LoadingProduct";
import {useNavigate, useParams} from "react-router-dom";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../../../../../utls/firebase.auth";
import {useTranslation} from "react-i18next";
import {fetchProductTypeDetails, changeCurrentProductTypeId, startFetchingProvidersProducts, resetProductData, resetProvidersFetchingPage, fetchProductDetails} from "../../../../../../../store/actions/product.actions";
import productDefault from '../../../../../../../assets/images/defaults/default-product-image.png'

const Product = ({product,  value, setCurrentProduct}) => {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const [imgUI, setImgUI] = useState(true);
    const [currentValue, setCurrentValue] = useState(100);
    const productRef = useRef(product.id);
    const navigate = useNavigate();
    const imgRef = useRef();
    const imgContainer = useRef();
    const imgLoaderRef = useRef();
    const failureRef = useRef(null);
    const [windowWidth, setWindowSize] = useState(window.innerWidth);
    const [hidden, setHidden] = useState(true);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [more, setMore] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const descRef = useRef();

    const {t} = useTranslation();

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const checkLineCount = (ele) => {
        const productWidth = productRef?.current?.getBoundingClientRect().width;
        const lines = 2.5;
        const charWidth = 6;
        const descLength = (productWidth * lines) / (charWidth);

        if(descLength < product?.description?.length) {
            setMore(true);
            setCharCount(Math.floor(descLength));
        }else {
            setMore(false);
            setCharCount(product?.description?.length);
        }
    }

    useEffect(() => {
        const ele = descRef?.current;
        if(ele && productRef?.current) {
            const resizeEvent = window.addEventListener('resize', (e) => {
                checkLineCount(ele);
            })
        }
    }, [descRef, productRef]);

    useEffect(() => {
        const ele = descRef?.current;
        if(ele && productRef?.current) {
            checkLineCount(ele);
        }
    }, [descRef, productRef]);

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

    const formateMinDuration = (duration, unit) => {
        switch (unit) {
            case "Days":
                if(duration == 0) return;
                if(duration == 1) return t("rentDurationDay");
                if(duration == 2) return t("twoDays");
                if(duration > 10) return `${duration}${t("rentDurationDay")}`;
                else return `${duration}${t("multipleDays")}`;
                break;
            case "Hours":
                if(duration == 0) return;
                if(duration == 1) return t("rentDurationHour");
                if(duration == 2) return t("twoHours");
                if(duration > 10) return `${duration} ${t("rentDurationHour")}`;
                else return `${duration} ${t("MultipleHours")}`;
                break;
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
            if(imgLoader) imgLoader.style.height = `${productHeight}px`;
            if (productContainer) productContainer.style.height = 'auto';
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
            return navigate(`/product/${product.id}`);
        }
        setCurrentProduct(product);
        navigate(`popup/${product?.id}`);
        logEvent(analytics, 'product_type_click', {
            Product_type_id: product?.id,
            Product_type_name: product?.title
        });
    }

    return (
        <div style={{marginBottom: `${value == 100 ? '8px' : 'auto'}`, paddingBottom: `${value == 100 ? '10px' : '0px'}`}} id={`Product__${product.id}`}  className={'Product'} onClick={handleProductClick}>
            <div ref={productRef} className={`Product__body--container `}>
                <div className={`${imgLoaded ? 'Product__visible' : 'Product__hidden'}`}>
                    <div ref={imgContainer} className={`Product__image--container ${value < 100 ? 'Product__image--container-center' : 'Product__image--container-min'}`}>
                        <Img product={true} setError={setError} setHidden={setHidden} setLoaded={setLoaded} setContainerLoaded={setContainerLoaded} imgRefDub={imgRef} setImgUi={setImgUI} setImgLoaded={setImgLoaded} imgUrl={(product?.imagePath && product.imagePath) || productDefault}/>
                        {loaded && error && <RenderImgError hidden={hidden} setHidden={setHidden} failureRef={failureRef} elemRef={imgContainer} /> }
                    </div>
                    <div className={`Product__details ${value < 100 && 'Product__details--hide'}`}>
                        <p className={'Product__details--title'}>{product?.title && product.title}</p>
                        <div className="Product__details--prices">
                            {
                                product?.saleDetails && (
                                    <p>
                                        <span className={'Product__details--sale-message'}>{t("salestartsfrom")}</span><span className={'Product__details--sale-starts'}>{product?.saleDetails?.priceStartingFrom && product?.saleDetails?.priceStartingFrom}</span> <span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span>
                                    </p>
                                )
                            }
                            {
                                product?.rentDetails && (
                                    <p className={'Product__details--price-rent'}>
                                        <span className={'Product__details--sale-message'}>{t("rentstartsfrom")}</span><span className={'Product__details--sale-starts'}>{product?.rentDetails?.priceStartingFrom && product?.rentDetails?.priceStartingFrom}</span> <span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span><span className={'Product__details--sale-minimum'} style={{fontSize: '12px', marginRight: '5px'}}>({t('minRentTimeMessage')}{formateMinDuration(product.rentDetails.minimumforRentStartingFrom, product.rentDetails.rentUnit)})</span>
                                    </p>
                                )
                            }
                        </div>
                        {product?.description && <p ref={descRef} className={'Product__details--description'}>{product?.description?.slice(0, charCount)}{more && `...`}{more && <span onClick={e => {
                        // {product?.description && <p ref={descRef} className={'Product__details--description'}>{product?.description?.length <= 150 ? product?.description?.slice(0, 150) : `${product?.description?.slice(0, 150)}...`}{product?.description?.length > 150 && <span onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCurrentProduct(product);
                            navigate(`popup/${product?.id}`);
                            // setPopup(true);
                            logEvent(analytics, 'product_type_click', {
                                Product_type_id: product?.id,
                                Product_type_name: product?.title
                            });
                        }} className={'Product__details--description-more'}>{t('more')}</span>}</p>}
                    </div>
                    {
                        value === 100 && <Count count={product?.totalNumberOfProducts || 0} />
                    }
                </div>
                {(!loaded || (!loaded && hidden)) && <LoadingProduct moreAndMoreDetails={false} moreDetails={false} rentDetails={false} imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false } btn={false} />}
                {/*{(true) && <LoadingProduct moreAndMoreDetails={false} moreDetails={false} rentDetails={false} imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false } btn={false} />}*/}
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

export default connect(mapStateToProps, {changeSliderValue, startFetchingProvidersProducts, resetProductData, resetProvidersFetchingPage, fetchProductDetails, fetchProductTypeDetails, changeCurrentProductTypeId}) (React.memo(Product));