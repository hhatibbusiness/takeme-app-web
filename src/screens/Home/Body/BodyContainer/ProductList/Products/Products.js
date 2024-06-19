import React, {useEffect, useRef, useState} from 'react';
import Product from "./Product/Product";
import './Products.css';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {fetchCategoryProducts} from "../../../../../../store/actions/categories.action";
import {useNavigate} from "react-router-dom";
import ProductTypesSpinner from "../../../../../../components/ProductTypesSpinner/ProductTypesSpinner";

const Products = ({products, setCurrentProduct, setGalleryOpen, setIndex, value, loadingProducts}) => {
    const [popup, setPopoup] = useState(false);

    const turnValueIntoCol = value => {
        if(value === 0) {
            return {
                col: 'repeat(4, 1fr)',
                gap: 10
            }
        }else if(value === 50) {
            return {
                col: 'repeat(2, 1fr)',
                gap: 10
            }
        }
        return {
            col: 'repeat(1, 1fr)',
            gap: 10
        }
    }

    return (
        <div id={'productTypesContainer'} className={'Products'}>
            <div  id={'Products__container'} style={{gridTemplateColumns: `${turnValueIntoCol(value).col}`, gap: `${value == 100 ? '10px' : turnValueIntoCol(value).gap}px`, display: `${value == 100 ? 'block' : 'grid'}`}} className={`Products__container ${value === 100 && 'Products__full'}`}>
                {
                    products.length > 0 && (
                        products?.map((product, i) => (
                            <Product
                                setPopup={setPopoup} setCurrentProduct={setCurrentProduct} index={i}
                                 setIndex={setIndex} setGalleryOpen={setGalleryOpen} value={value}
                                 product={product} key={product.id && product.id}
                            />
                        ))
                    )
                }
            </div>
            {
                loadingProducts && (
                    <ProductTypesSpinner />
                )
            }

        </div>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value,
    loadingProducts: state.categories.loadingCategoryProducts,
    page: state.categories.page,
    catId: state.categories.curId,
    lan: state.categories.lan,
    filter: state.categories.filter
})

export default connect(mapStateToProps, {fetchCategoryProducts}) (React.memo(Products));