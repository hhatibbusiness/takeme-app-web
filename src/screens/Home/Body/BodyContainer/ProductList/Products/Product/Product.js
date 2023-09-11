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
    const productRef = useRef();
    const navigate = useNavigate();
    const imgRef = useRef();

    const changeHeightToWidth = () => {
        const productEle = productRef.current;
        if(!productEle) return;
        if(value === 100) return productEle.style.height = '300px';
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
                const img = <Img setImgLoaded={setImgLoaded} imgUrl={product?.imagePath && product.imagePath}/>;
                setImgUI(img);
            }
        }catch(e) {
            console.error(e);
            const imgUI =  <RenderImgError />;
            setImgLoaded(true);
            setImgUI(prevState => imgUI);
        }
    }

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
            {
                imgUI && (
                    <div className={`Product__body--container ${imgLoaded ? 'Product__visible' : 'Product__hidden'}`}>
                        <div className={`Product__image--container ${value < 100 ? 'Product__image--container-center' : 'Product__image--container-min'}`}>
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
            <LoadingProduct priceStartFrom={product?.saleDetails?.priceStartingFromMsg} priceTitle={product?.saleDetails?.title} imgLoaded={imgLoaded} details={value === 100 } btn={false} />
        </div>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value,
    lan: state.categories.lan
});

export default connect(mapStateToProps, {changeSliderValue}) (Product);