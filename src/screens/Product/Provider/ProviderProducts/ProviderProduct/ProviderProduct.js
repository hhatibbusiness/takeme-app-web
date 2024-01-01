import React, {useEffect, useRef, useState} from 'react';
import './ProviderProduct.scss';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Img from "../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../components/LoadingProduct/LoadingProduct";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import ProviderProductListItem from "./ProviderProductListItem/ProviderProductListItem";
import ProviderProductTags from "./ProviderProductTags/ProviderProductTags";
import ProviderProductComments from "./ProviderProductComments/ProviderProductComments";
import ProviderProductVariables from "./ProviderProductVariables/ProviderProductVariables";
import {togglePopup, changeDestination} from "../../../../../store/actions/ui.actions";
import {changePopupProduct} from "../../../../../store/actions/ui.actions";
import {getAnalytics, logEvent} from "firebase/analytics";
import {closeGallery} from "../../../../../store/actions/product.actions";

const ProviderProduct = ({imgRef, provider, setGallery, changeDestination, arrayRef, providerOrNot, productTypesCount, search, providerRef, togglePopup, product, changePopupProduct, sliding, openGallery, term}) => {
    //test
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const [imgUI, setImgUI] = useState(true);
    const [detailed, setDetailed] = useState(false);
    const [short, setShort] = useState(true);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const navigate = useNavigate();
    const descRef = useRef();
    const {t} = useTranslation();
    const imgRefDub = useRef(null);
    const imgLoaderRef = useRef(null);
    const containerRef = useRef(null);
    const failureRef = useRef(null);
    const imgContainerRef = useRef(null);
    const [hidden, setHidden] = useState(true);


    // const renderImage = async () => {
    //     try{
    //         const res = await axios.get(product?.images[0]?.imagePath);
    //         if(res.status === 200) {
    //             const img = <Img imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={product?.images[0]?.imagePath}/>;
    //             setImgUI(img);
    //         }
    //     }catch(e) {
    //         console.error(e);
    //         const imgUI =  <RenderImgError failureRef={failureRef} />;
    //         setImgLoaded(true);
    //         setImgUI(prevState => imgUI);
    //         setContainerLoaded(true);
    //     }
    // }

    const formateMinDuration = (duration, unit) => {
        switch (unit) {
            case "Days":
                if(duration == 0) return;
                if(duration == 1) return t("rentDurationDay");
                if(duration == 2) return t("twoDays");
                else return `${duration}${t("multipleDays")}`;
                break;
            case "Hours":
                if(duration == 0) return;
                if(duration == 1) return t("rentDurationHour");
                if(duration == 2) return t("twoHours");
                else return `${duration} ${t("MultipleHours")}`;
                break;
        }
    }

    const renderImage = () => {
        const img = <Img imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={product?.images[0]?.imagePath}/>;
    }

    useEffect(() => {
        renderImage()
    }, []);

    useEffect(() => {
        setDetailed(prevState => sliding && false);
    }, [sliding]);

    function createMarkup() {
        return {__html: product?.description && product.description};
    }

    const renderName = () => {
        var innerHTML = product.name;
        var index = innerHTML.indexOf(term);
        if (index >= 0) {
            // innerHTML = <p onClick={() => setDetailed(!detailed)} className={'ProviderProduct__title'}>{innerHTML.substring(0,index)}<span class='highlight'>{innerHTML.substring(index,index+term.length) }</span>{innerHTML.substring(index + term.length)}</p>;
            innerHTML = <p className={'ProviderProduct__title'}>{innerHTML.substring(0,index)}<span class='highlight'>{innerHTML.substring(index,index+term.length) }</span>{innerHTML.substring(index + term.length)}</p>;
            return innerHTML;
        } else {
            return innerHTML;
        }
    }

    //
    // useEffect(() => {
    //     if(!imgContainerRef?.current || !imgRef?.current) return;
    //     window.addEventListener('resize', () => {
    //         imgContainerRef.current.style.height = `${imgRef.current.getBoundingClientRect().height}px`;
    //     })
    //     console.log(imgContainerRef, imgRef);
    // }, []);

    const changeHeightToWidth = () => {
        const imgElement = containerRef.current;
        const imgLoader = imgLoaderRef.current
        const imgContainer = imgContainerRef.current;
        const providerElem = providerRef.current;
        const failureEle = failureRef.current;
        const productContainer = arrayRef?.current;
        if(!imgElement) return;
        const containerHeight = productContainer?.getBoundingClientRect().width;
        if(providerElem && !providerOrNot) providerElem.style.height = `${750 + (containerHeight - 400)}px`;
        if(providerElem && providerOrNot) providerElem.style.height = `${250 + 400 * productTypesCount + productTypesCount * 200 + (containerHeight - 400) * productTypesCount}px`;
        if(imgLoader) imgLoader.style.height = `${containerHeight}px`;
        if(imgContainer) imgContainer.style.height = `${containerHeight}px`;
        if(failureEle) failureEle.style.height = `${containerHeight}px`;
        if(productContainer || failureEle || imgContainer || imgLoader || imgElement && containerHeight) {
            productContainer.style.height = `${imgLoader?.getBoundingClientRect().height + 150}px`
        }
    }

    useEffect(() => {
        changeHeightToWidth();
    }, [loaded, providerOrNot, error, containerRef, imgLoaderRef, imgContainerRef, providerRef, failureRef, arrayRef]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            changeHeightToWidth();
        });
    }, []);

    useEffect(() => {
        console.log(provider);
    }, []);


    return (
        <div onClick={e => {
            const analytics = getAnalytics();
            logEvent(analytics, 'search', {
                productId: product.id
            })
        }} ref={imgRef} className={'ProviderProduct'}>
            <div ref={containerRef} className={`ProviderProduct__container`}>
                {
                    imgUI && (
                            <div className={`${imgLoaded ? 'ProviderProduct__visible' : 'ProviderProduct__hidden'}`}>
                                <div onClick={() => {
                                    openGallery(product);
                                    setGallery(true);
                                }} className={'ProviderProduct__body--container'}>
                                    <div ref={imgContainerRef} className="ProviderProduct__image--container">
                                        <Img setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={product?.images[0]?.imagePath}/>
                                        {loaded && error && <RenderImgError hidden={hidden} setHidden={setHidden} imgLoaderRef={imgLoaderRef} failureRef={failureRef} elemRef={imgContainerRef} /> }
                                    </div>
                                </div>
                                <div className={'ProviderProduct__details'}>
                                    {
                                        renderName()
                                    }
                                    <div className="ProviderProduct__details--prices">
                                        {
                                            product?.saleDetails && (
                                                <div className={'ProviderProduct__details--sale'}>
                                                    {
                                                        product?.saleDetails?.comment && (
                                                            <div className="ProviderProduct__details--sale-icon">
                                                                <i className="fa-solid fa-circle-exclamation"></i>
                                                            </div>
                                                        )
                                                    }
                                                    <div className="ProviderProduct__details--sale-price">
                                                        {t('price')}
                                                    </div>
                                                    <div className="ProviderProduct__details--sale-pricenum">
                                                        {
                                                            product?.saleDetails?.price && <span>{product?.saleDetails?.price}</span>
                                                        }
                                                    </div>
                                                    <div className="ProviderProduct__details--sale-shekel">
                                                        <i className="fa-solid fa-shekel-sign"></i>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            product?.rentDetails && (
                                                <div className={'ProviderProduct__details--rent'}>
                                                    {
                                                        product?.rentDetails?.comment && (
                                                            <div className="ProviderProduct__details--sale-icon">
                                                                <i className="fa-solid fa-circle-exclamation"></i>
                                                            </div>
                                                        )
                                                    }

                                                    <div className="ProviderProduct__details--rent-price">
                                                        {t('rentPrice')}
                                                    </div>
                                                    <div className="ProviderProduct__details--rent-pricenum">
                                                        {
                                                            product?.rentDetails?.price && <span>{product?.rentDetails?.price}</span>
                                                        }
                                                    </div>
                                                    <div className="ProviderProduct__details--rent-shekel">
                                                        <i className="fa-solid fa-shekel-sign"></i>
                                                    </div>
                                                    {product?.rentDetails?.minTimForRent && <p className={'ProviderProduct__details--rent-min'}>({t("minRentTimeMessage")}{formateMinDuration(product?.rentDetails?.minTimForRent, product?.rentDetails?.rentUnit)})</p>}
                                                </div>
                                            )
                                        }
                                    </div>
                                    {
                                        product?.description && (
                                            <div className="ProviderProduct__details--desc">
                                                {/*{product?.description?.text && <p className="ProviderProduct__details--text">{product?.description?.text && ((short ? `${product?.description?.text.substr(0, 50)}` : product?.description?.text))}  <span onClick={e => setShort(!short)} className={'ProviderProduct__details--text-short'}>{product?.description?.text && (short ? `...${t('more')}` : t('less'))}</span></p>}*/}
                                                {<p className="ProviderProduct__details--text">{product?.description?.text && ((short ? `${product?.description?.text.substr(0, 50)}` : product?.description?.text))}  <span onClick={e => {
                                                    changePopupProduct(product);
                                                    togglePopup();
                                                    changeDestination(false);
                                                    const analytics = getAnalytics();
                                                    logEvent(analytics, 'expand', {
                                                        productName: product.name,
                                                        productId: product.id,
                                                        screen: search && 'search' || 'provider'
                                                    });
                                                }} className={'ProviderProduct__details--text-short'}>{(short ? `...${t('more')}` : t('less'))}</span></p>}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                    )
                }
                {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={true} priceTitle={true} imgLoaded={false} details={true} btn={false} />}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    term: state.search.term
})

export default connect(mapStateToProps, {togglePopup, changeDestination, changePopupProduct}) (ProviderProduct);