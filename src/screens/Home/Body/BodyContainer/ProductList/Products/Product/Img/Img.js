import React, {useEffect, useRef} from 'react';
import './Img.scss';
import {connect} from "react-redux";
import {changeSliderValue} from "../../../../../../../../store/actions/categories.action";

const Img = ({value, product, setImgLoaded}) => {
    const imgRef = useRef();
    useEffect(() => {
        const image = imgRef.current;
        image.addEventListener('load', () => {
            setImgLoaded(true);
        })

    }, []);
    return (
        <img ref={imgRef} className={'Img'} style={{width: `${value < 100 ? '100%' : '80%'}`}} onClick={() => {
            // setGalleryOpen(true);
        }} src={product?.imagePath && product.imagePath} alt=""/>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps, {changeSliderValue}) (Img);