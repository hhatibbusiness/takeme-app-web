import React from 'react';
import {connect} from "react-redux";
import {changeSliderValue} from "../../../../../../../../store/actions/categories.action";

const Img = ({changeSliderValue, value, imgRef, setIndex, product, index}) => {
    return (
        <img style={{height: `${value < 100 ? '100%' : '70%'}`, width: `${value < 100 ? '100%' : '80%'}`}} ref={imgRef} onClick={() => {
            setIndex(index)
            // setGalleryOpen(true);
        }} src={product.imagePath} alt=""/>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps, {changeSliderValue}) (Img);