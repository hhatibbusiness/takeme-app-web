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


const ProductsDetails = ({currentProduct, productType, setPopup, popup, lan, filter, setCurrentProduct, value, fetchProductTypeDetails, startFetchingProvidersProducts, resetProductData, resetProvidersFetchingPage, fetchProductDetails}) => {
    const [imgUI, setImgUI] = useState(true);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const imgContainer = useRef(null);
    const failureRef = useRef(null);
    const [hidden, setHidden] = useState(true);

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
                        <div className={`ProductDetails__body ${imgLoaded ? 'ProductsDetails__visible' : 'ProductsDetails__hidden'}`}>
                            <div ref={imgContainer} className="ProductDetails__img--container">
                                <Img setError={setError} setHidden={setHidden} setLoaded={setLoaded} setImgLoaded={setImgLoaded} imgUrl={currentProduct?.imagePath && currentProduct.imagePath}/>
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
                                        currentProduct?.saleDetails && (
                                            <p className={'Product__details--sale'}>
                                                <span className={'Product__details--sale-message'}>{t("rentstartsfrom")}</span><span className={'Product__details--sale-starts'}>{currentProduct?.saleDetails?.priceStartingFrom && currentProduct?.saleDetails?.priceStartingFrom}</span> <span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span>
                                            </p>
                                        )
                                    }
                                </div>
                                {currentProduct?.description && <p className={'Product__details--description'}>{currentProduct?.description?.slice(0, 50)}...</p>}
                            </div>
                            <button onClick={e => {
                                e.preventDefault();
                                navigate(`/product/${currentProduct.id}`)
                            }} className="ProductsDetails__btn">{t('show products')}</button>
                        </div>
                    )
                }

                {(!loaded || (hidden)) && <LoadingProduct priceStartFrom={currentProduct?.saleDetails?.priceStartingFromMsg} priceTitle={currentProduct?.description} imgLoaded={false} details={true} btn={true} /> }

                {
                    currentProduct && <Count count={currentProduct?.totalNumberOfProducts || 0} />
                }

            </div>
            <div onClick={() => {
                setPopup(false);
                setCurrentProduct(null);
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