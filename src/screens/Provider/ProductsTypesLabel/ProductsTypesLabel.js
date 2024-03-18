import React, {useEffect, useRef, useState} from 'react';
import './ProductsTypesLabel.scss';
import {connect} from "react-redux";
import ProductTypeLabel from "./ProductTypeLabel/ProductTypeLabel";
import productTypeLabel from "./ProductTypeLabel/ProductTypeLabel";

const ProductsTypesLabel = ({loadingProductTypes, productTypes}) => {
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [down, setDown] = useState(false);
    const [active, setActive] = useState(0);

    const categoriesRef = useRef();
    const containerRef = useRef();

    useEffect(() => {
        console.log(productTypes)
        setActive(productTypes[0]?.id);
    }, []);

    const mouseDownHandler = e => {
        const ele = categoriesRef.current;
        if(!ele) return;
        setDown(true);
        setStartX(prevState => e.pageX - ele.offsetLeft);
        setScrollLeft(prevState => ele.scrollLeft);
    }
    //
    const mouseMoveHandler = e => {
        if(!down) return;
        const ele = categoriesRef.current;
        if(!ele) return;
        e.preventDefault();
        const x = e.pageX - ele.offsetLeft;
        const walk = (x - startX)/50;

        ele.scrollLeft = (ele.scrollLeft - walk)
    }

    const mouseUpHandler = e => {
        const ele = categoriesRef.current;
        setDown(false);
    }

    return (
        <div className={'ProductsTypesLabel'}>
            <div className="ProductsTypesLabel__parent" onMouseDown={mouseDownHandler} onMouseLeave={mouseUpHandler} onMouseUp={mouseUpHandler} onMouseMove={mouseMoveHandler}>
                <div className="ProductsTypesLabel__container">
                    {
                        !loadingProductTypes && productTypes?.map((productType, i) => (
                            <ProductTypeLabel setActive={setActive} active={active} productType={productType} key={productType.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    loadingProductTypes: state.provider.loadingProductTypes,
    productTypes: state.provider.productTypes
})

export default connect(mapStateToProps) (ProductsTypesLabel);