import React, {useEffect, useRef, useState} from 'react';
import './ProductsDetails.scss';
import Count from "../Product/Count/Count";
import Img from "../Product/Img/Img";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import axios from "axios";
import RenderImgError from "../../../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../../../components/LoadingProduct/LoadingProduct";
import {useNavigate} from "react-router-dom";
import history from "../../../../../../../history/history";
import {fetchProductTypeDetails, startFetchingProvidersProducts, resetProductData, resetProvidersFetchingPage, fetchProductDetails} from "../../../../../../../store/actions/product.actions";
import productDefaultImg from '../../../../../../../assets/images/defaults/default-product-image.png'

const ProductsDetails = ({currentProduct, productType, setPopup, popup, lan, filter, setCurrentProduct, value, fetchProductTypeDetails, startFetchingProvidersProducts, resetProductData, resetProvidersFetchingPage, fetchProductDetails}) => {
    const [imgUI, setImgUI] = useState(true);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const imgContainer = useRef(null);
    const failureRef = useRef(null);
    const [hidden, setHidden] = useState(true);
    const [windowWidth, setWindowSize] = useState(window.innerWidth);
    const imgLoaderRef = useRef();

    const productRef = useRef();

    const navigate = useNavigate();
    const {t} = useTranslation();

    // useEffect(() => {
    //     renderImage()
    // }, []);

    const renderImage = async () => {
        try{
            const res = await axios.get(currentProduct?.imagePath);
            if(res.status === 200) {
                const img = <Img setImgLoaded={setImgLoaded} imgUrl={currentProduct?.imagePath && currentProduct.imagePath}/>;
                setImgUI(img);
            }
        }catch(e) {
            console.error(e);
            const imgUI =  <RenderImgError />;
            setImgLoaded(true)
            setImgUI(prevState => imgUI);
        }
    }

    useEffect(() => {

        // window.addEventListener('popstate', e => history.go(1));
        if(popup) {
            window.history.pushState(null, null, window.location.href);
            window.addEventListener('popstate', e => {
                e.preventDefault();
                setPopup(false);
            });
        }
    }, [setPopup]);

    // useEffect(() => {
    //     window.addEventListener('beforeunload', e => {
    //         setPopup(false);
    //     })
    // }, []);

    const productHeightHandler = (productHeight) => {
        console.log(currentProduct.description.length);
        if(currentProduct.rentDetails && currentProduct.saleDetails) {
            if(currentProduct.description.length > 100) {
                return 750 + productHeight - 500;
            } else if(currentProduct.description.length > 80) {
                console.log(currentProduct.description.length)
                return 620 + productHeight - 500;
            } else {
                return 650 + productHeight - 500
            }
        }else {
            if(currentProduct.description.length > 100) {
                return 680 + productHeight - 500;
            } else if(currentProduct.description.length > 80) {
                console.log(currentProduct.description.length);
                return 670 + productHeight - 500;
            } else {
                return 640 + productHeight - 500
            }
        }
    }

    const imgSizeHandler = () => {
        const productContainer = productRef.current;
        // const productContainer = document.querySelector(`#Product__${product.id}`)
        const img = imgContainer.current;
        const imgLoader = imgLoaderRef.current;
        const failureEle = failureRef?.current;
        if(!productContainer) return;
        const productHeight = productContainer.getBoundingClientRect().width;
        if(false) {
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
        if(true) {
            if(img) {
                img.style.width = `${productHeight}px`;
                img.style.height = `${productHeight}px`;
            }
            if(imgLoader) imgLoader.style.height = `${productHeight}px`
            if(productContainer) productContainer.style.height = `${productHeightHandler(productHeight)}px`;
            if(failureEle) failureEle.style.height = `${productHeight}px`
            if(failureEle) failureEle.style.width = `${productHeight}px`
        }

    }

    useEffect(() => {
        imgSizeHandler();
    }, [loaded, windowWidth, imgContainer?.current, productRef?.current, failureRef?.current]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowSize(window.innerWidth);
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

    return (
        <div className={'ProductsDetails'}>
            <div className="ProductsDetails__container">
                <div onClick={() => {
                    setPopup(false);
                    setCurrentProduct(null);
                    history.back();
                }} className="ProductsDetails__close">
                    <i className="fa-solid fa-xmark"></i>
                </div>

                {
                    imgUI && (
                        <div ref={productRef}  className={`ProductDetails__body ${imgLoaded ? 'ProductsDetails__visible' : 'ProductsDetails__hidden'}`}>
                            {
                                currentProduct && <Count count={currentProduct?.totalNumberOfProducts || 0} />
                            }

                            <div ref={imgContainer} className="ProductDetails__img--container">
                                <Img product={true} setError={setError} setHidden={setHidden} setLoaded={setLoaded} setImgLoaded={setImgLoaded} imgUrl={(currentProduct?.imagePath && currentProduct.imagePath) || productDefaultImg}/>
                                {loaded && error && <RenderImgError hidden={hidden} setHidden={setHidden} failureRef={failureRef} elemRef={imgContainer} />}
                            </div>
                            <div className={`Product__details`}>
                                <p className={'Product__details--title'}>{currentProduct?.title && currentProduct.title}</p>
                                {/*<p className={'Product__price--header'}>{product?.saleDetails?.title && product.saleDetails.title}</p>*/}
                                {/*<p className={'Product__price'}>{product.saleDetails?.priceStartingFromMsg && product.saleDetails.priceStartingFromMsg}</p>*/}
                                <div className="Product__details--prices">
                                    {
                                        currentProduct?.saleDetails && (
                                            <p className={'Product__details--sale'}>
                                                <span className={'Product__details--sale-message'}>{t("salestartsfrom")}</span><span className={'Product__details--sale-starts'}>{currentProduct?.saleDetails?.priceStartingFrom && currentProduct?.saleDetails?.priceStartingFrom}</span> <span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span>
                                            </p>
                                        )
                                    }
                                    {
                                        currentProduct?.rentDetails && (
                                            <p className={'Product__details--sale'}>
                                                <span className={'Product__details--sale-message'}>{t("rentstartsfrom")}</span><span className={'Product__details--sale-starts'}>{currentProduct?.rentDetails?.priceStartingFrom && currentProduct?.rentDetails?.priceStartingFrom}</span> <span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span><span className={'Product__details--sale-minimum'} style={{fontSize: '12px', marginRight: '5px'}}>({t('minRentTimeMessage')}{formateMinDuration(currentProduct?.rentDetails?.minimumforRentStartingFrom, currentProduct?.rentDetails?.rentUnit)})</span>
                                            </p>
                                        )
                                    }
                                </div>
                                {currentProduct?.description && <p className={'Product__details--description'}>{currentProduct?.description}</p>}
                            </div>
                            <button onClick={e => {
                                e.preventDefault();
                                setPopup(false);
                                // navigate(-1);
                                navigate(`/product/${currentProduct.id}`);
                                setCurrentProduct(null);
                            }} className="ProductsDetails__btn">{t('show products')}</button>
                        </div>
                    )
                }

                {/*{true && <LoadingProduct rentDetails={currentProduct?.rentDetails} imgLoaderRef={imgLoaderRef} priceStartFrom={currentProduct?.saleDetails?.priceStartingFromMsg} priceTitle={currentProduct?.description} imgLoaded={false} details={true} btn={true} /> }*/}
                {(!loaded || (hidden)) && <LoadingProduct moreAndMoreDetails={currentProduct?.description?.length > 144} moreDetails={currentProduct?.description?.length > 80} rentDetails={currentProduct?.rentDetails} imgLoaderRef={imgLoaderRef} priceStartFrom={currentProduct?.saleDetails?.priceStartingFromMsg} priceTitle={currentProduct?.description} imgLoaded={false} details={true} btn={true} /> }

            </div>
            <div onClick={() => {
                setPopup(false);
                setCurrentProduct(null);
                history.back();
            }} className="ProductsDetails__backdrop"></div>
        </div>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value,
    productType: state.product.product,
    lan: state.categories.lan,
    filter: state.categories.filter
});

export default connect(mapStateToProps, {fetchProductTypeDetails, startFetchingProvidersProducts, resetProductData, resetProvidersFetchingPage, fetchProductDetails}) (ProductsDetails);