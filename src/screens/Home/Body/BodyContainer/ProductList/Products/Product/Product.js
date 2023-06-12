import React, {useEffect, useRef, useState} from 'react';
import './Product.css';
import axios from "axios";
import RenderImgError from "../../../../../../../components/RenderImgError/RenderImgError";
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
                const img = <img ref={imgRef} onClick={() => {
                    setIndex(index)
                    // setGalleryOpen(true);
                }} src={product.imagePath} alt=""/>;

                setImgUI(img);
            }
        }catch(e) {
            console.error(e);
            const imgUI =  <RenderImgError />;
            setImgUI(imgUI);
        }
    }

    return (
        <div ref={productRef} className={'Product'}>
            {
                imgUI && imgUI
            }
            <p style={{fontSize: `${value === 0 ? '13px' : value/4}px`}}>{product.title}</p>
        </div>
    );
};

export default Product;