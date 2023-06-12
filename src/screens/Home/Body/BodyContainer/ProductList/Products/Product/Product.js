import React, {useEffect, useRef, useState} from 'react';
import './Product.css';
import axios from "axios";
import RenderImgError from "../../../../../../../components/RenderImgError/RenderImgError";
import {connect} from "react-redux";
import {changeSliderValue} from "../../../../../../../store/actions/categories.action";
import Img from "./Img/Img";
// import {notFoundImg} from "../../../../assets";

const Product = ({product, value, setIndex, index}) => {
    const [imgUI, setImgUI] = useState(null);
    const productRef = useRef();
    const imgRef = useRef();

    const changeHeightToWidth = () => {
        const productEle = productRef.current;
        const productWidth = productEle.getBoundingClientRect().width;
        productEle.style.height = `${productWidth}px`;
    }

    useEffect(() => {
        changeHeightToWidth();
    }, [value]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            const currEle = productRef.current;
            if(currEle) {
                changeHeightToWidth()
            }
        });
    }, []);

    useEffect(() => {
        console.log(product);
        renderImage()
    }, []);

    const renderImage = async () => {
        try{
            const res = await axios.get(product.imagePath);
            console.log(res.status);
            if(res.status === 200) {
                // return imgRef.current.src = product.imagePath;
                const img = <Img index={index} imgRef={imgRef} product={product} setIndex={setIndex} />;

                setImgUI(img);
            }
        }catch(e) {
            console.error(e);
            const imgUI =  <RenderImgError />;
            setImgUI(prevState => imgUI);
        }
    }

    return (
        <div ref={productRef} className={'Product'}>
            {
                imgUI && imgUI
            }
            <div className={`Product__details ${value < 100 && 'Product__details--hide'}`}>
                <p>{product.title}</p>
                <p className={'Product__price--header'}>تفاصيل البيع</p>
                <p className={'Product__price'}>السعر يبدأ من {product.saleDetails.priceStartingFrom}</p>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value
});

export default connect(mapStateToProps, {changeSliderValue}) (Product);