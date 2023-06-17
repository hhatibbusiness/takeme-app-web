import React, {useEffect, useState} from 'react';
// import {useParams} from "react-router-dom";
import {connect} from "react-redux";
// import {getCategory} from "../../store/actions/categories.action";
// import {Slider} from "@mui/material";
import SliderComponent from "./Slider/Slider";
import Products from "./Products/Products";
// import Gallery from "./Gallery/Gallery";
// import {Swiper} from "swiper";

const Category = ({products}) => {

    return (
        <div className={'CategoryComp'} >
            <SliderComponent />
            <Products products={products} />
        </div>
    );
};

const mapStateToProps = state => ({
    products: state.categories.products
})

export default connect(mapStateToProps) (Category);