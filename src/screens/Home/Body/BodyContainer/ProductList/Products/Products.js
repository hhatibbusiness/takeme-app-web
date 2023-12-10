import React, {useEffect, useRef, useState} from 'react';
import Product from "./Product/Product";
import './Products.css';
import {connect} from "react-redux";
import ProductsDetails from "./ProductsDetails/ProductsDetails";
import CategoryError from "../../../../../../components/CategoryError/CategoryError";
import Failure from "../../../../../Product/Provider/ProviderProducts/Failure/Failure";
import {useTranslation} from "react-i18next";
import Loader from "../../../../../../components/Loader/Loader";
import SpinnerComponent from '../../../../../../components/Spinner/Spinner.Component';

const Products = ({products, setGalleryOpen, setIndex, value, loadingProducts, page}) => {
    const [popup, setPopoup] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const {t } = useTranslation();

    const containerRef = useRef();
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

    useEffect(() => {
        if(loadingProducts) {

        }
    }, [loadingProducts]);

    return (
        <div className={'Products'}>
            <div style={{gridTemplateColumns: `${turnValueIntoCol(value).col}`, gap: `${turnValueIntoCol(value).gap}px`}} className={`Products__container ${value === 100 && 'Products__full'}`}>
                {
                    !loadingProducts ? (
                        products.length > 0 && !loadingProducts ? (
                            products?.map((product, i) =>(
                                <Product setPopup={setPopoup} setCurrentProduct={setCurrentProduct} index={i} setIndex={setIndex} setGalleryOpen={setGalleryOpen} value={value} product={product} key={product.id && product.id}/>
                            ))
                        ) : (
                            <Failure text={t('there\'s not products')} />
                        )
    
                    ) : (
                        <SpinnerComponent />
                    )
                }
                {/* {
                    products?.map((product, i) =>(
                        <Product setPopup={setPopoup} setCurrentProduct={setCurrentProduct} index={i} setIndex={setIndex} setGalleryOpen={setGalleryOpen} value={value} product={product} key={product.id && product.id}/>
                    ))

                } */}

                {
                    popup && currentProduct && <ProductsDetails setCurrentProduct={setCurrentProduct} setPopup={setPopoup} currentProduct={currentProduct} />
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value,
    loadingProducts: state.categories.loadingCategoryProducts,
    page: state.categories.page,
})

export default connect(mapStateToProps) (Products);