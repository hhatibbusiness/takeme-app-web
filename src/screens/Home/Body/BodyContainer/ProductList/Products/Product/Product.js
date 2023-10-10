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
import {useNavigate} from "react-router-dom";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../../../../../utls/firebase.auth";
// import {notFoundImg} from "../../../../assets";

const Product = ({product, value, setCurrentProduct, setPopup}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgUI, setImgUI] = useState(null);
    const [currentValue, setCurrentValue] = useState(100);
    const productRef = useRef();
    const navigate = useNavigate();
    const imgRef = useRef();
    const imgContainer = useRef();
    const imgLoaderRef = useRef();

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
                const img = <Img imgRefDub={imgRef} setImgUi={setImgUI} setImgLoaded={setImgLoaded} imgUrl={product?.imagePath && product.imagePath}/>;
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
        if(!productContainer) return;
        const productHeight = productContainer.getBoundingClientRect().width;
        if(value == 100) {
            if(img) {
                console.log('Hello from product!')
                console.log(productContainer.getBoundingClientRect().width);
                img.style.width = `${productHeight}px`;
                img.style.height = `${productHeight}px`;
            }
            if(imgLoader) imgLoader.style.height = `${productHeight}px`
            if(product) productContainer.style.height = `${650 + productHeight - 500}px`;
        }
        if(value < 100) {
            if(product) productContainer.style.height = `${productHeight}px`;
            if(img) {
                img.style.width = `${productHeight}px`;
                img.style.height = `${productHeight}px`;
            }
            if(imgLoader) {
                imgLoader.style.height = `${productHeight}px`;
                imgLoader.style.marginBottom = '0';
            }
        }
    }

    useEffect(() => {
        imgSizeHandler();
    }, [imgLoaded, imgContainer, productRef, currentValue]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            imgSizeHandler();
        });
    }, []);

    return (
        <div ref={productRef} className={'Product'} onClick={() => {
            logEvent(analytics, 'product_type_click', {
                Product_type_id: product?.id,
                Product_type_name: product?.title
            })
            if(value == 100) {
                return navigate(`/product/${product.id}`);
            }
            setCurrentProduct(product);
            setPopup(true);
        }}>
            <div className={`Product__body--container `}>
                {
                    imgUI && (
                        <div className={`${imgLoaded ? 'Product__visible' : 'Product__hidden'}`}>
                            <div ref={imgContainer} className={`Product__image--container ${value < 100 ? 'Product__image--container-center' : 'Product__image--container-min'}`}>
                                {
                                    imgUI
                                }
                            </div>
                            <div className={`Product__details ${value < 100 && 'Product__details--hide'}`}>
                                <p className={'Product__details--title'}>{product?.title && product.title}</p>
                                <p className={'Product__price--header'}>{product?.saleDetails?.title && product.saleDetails.title}</p>
                                <p className={'Product__price'}>{product.saleDetails?.priceStartingFromMsg && product.saleDetails.priceStartingFromMsg}</p>
                            </div>
                            {
                                value === 100 && <Count count={product?.totalNumberOfProducts || 0} />
                            }
                        </div>
                    )
                }
                <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={product?.saleDetails?.priceStartingFromMsg} priceTitle={product?.saleDetails?.title} imgLoaded={imgLoaded} details={value === 100 } btn={false} />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value,
    lan: state.categories.lan
});

export default connect(mapStateToProps, {changeSliderValue}) (Product);