import React, {useEffect, useState} from 'react';
import './ProductsDetails.scss';
import Count from "../Product/Count/Count";
import Img from "../Product/Img/Img";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import axios from "axios";
import RenderImgError from "../../../../../../../components/RenderImgError/RenderImgError";
import SpinnerComponent from "../../../../../../../components/Spinner/Spinner.Component";
import LoadingProduct from "../../../../../../../components/LoadingProduct/LoadingProduct";

const ProductsDetails = ({currentProduct, setPopup, setCurrentProduct, value}) => {
    const [imgUI, setImgUI] = useState(null);

    const {t} = useTranslation();

    useEffect(() => {
        renderImage()
    }, []);

    const renderImage = async () => {
        try{
            const res = await axios.get(currentProduct?.imagePath);
            console.log(res.status);
            if(res.status === 200) {
                const img = <Img product={currentProduct && currentProduct}/>;
                setImgUI(img);
            }
        }catch(e) {
            console.error(e);
            const imgUI =  <RenderImgError />;
            setImgUI(prevState => imgUI);
        }
    }
    return (
        <div className={'ProductsDetails'}>
            <div className="ProductsDetails__container">
                <div onClick={() => {
                    setPopup(false);
                    setCurrentProduct(null);
                }} className="ProductsDetails__close">
                    <i className="fa-solid fa-xmark"></i>
                </div>
                {
                    imgUI ? (
                        <div className="ProductDetails__body">
                            <div className="ProductDetails__img--container">
                                {
                                    imgUI && imgUI
                                }
                            </div>
                            <div className="ProductDetails__details">
                                <h3 className="ProductDetails__header">{currentProduct?.title && currentProduct.title}</h3>
                                {
                                    currentProduct?.saleDetails && (
                                        <>
                                            <h5 className={'ProductsDetails__msg'}>{currentProduct?.saleDetails.title && currentProduct?.saleDetails.title}</h5>
                                            <p>{currentProduct?.saleDetails.priceStartingFromMsg && currentProduct?.saleDetails.priceStartingFromMsg}</p>
                                        </>

                                    )
                                }
                            </div>
                            <button className="ProductsDetails__btn">{t('show products')}</button>
                        </div>
                    ) : (
                        <LoadingProduct details={true} btn={true} />
                    )
                }

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
    value: state.categories.value
});

export default connect(mapStateToProps) (ProductsDetails);