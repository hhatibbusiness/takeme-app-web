import React from 'react';
import './Img.scss';
import {connect} from "react-redux";
import {changeSliderValue} from "../../../../../../../../store/actions/categories.action";

const Img = ({value, product}) => {
    return (
        <img className={'Img'} style={{height: `${value < 100 ? '100%' : '70%'}`, width: `${value < 100 ? '100%' : '80%'}`}} onClick={() => {
            // setGalleryOpen(true);
        }} src={product?.imagePath && product.imagePath} alt=""/>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps, {changeSliderValue}) (Img);