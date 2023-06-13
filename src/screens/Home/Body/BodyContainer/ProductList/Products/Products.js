import React from 'react';
import Product from "./Product/Product";
import './Products.css';
import {connect} from "react-redux";

const Products = ({products, setGalleryOpen, setIndex, value}) => {
    const turnValueIntoCol = value => {
        if(value === 0) {
            return {
                col: 'repeat(4, 1fr)',
                gap: 10
            }
        }else if(value === 50) {
            return {
                col: 'repeat(2, 1fr)',
                gap: 20
            }
        }
        return {
            col: 'repeat(1, 1fr)',
            gap: 0
        }
    }
    return (
        <div className={'Products'}>
            <div style={{gridTemplateColumns: `${turnValueIntoCol(value).col}`, gap: `${turnValueIntoCol(value).gap}px`}} className={`Products__container ${value === 100 && 'Products__full'}`}>
                {
                    products?.map((product, i) =>(
                        <Product index={i} setIndex={setIndex} setGalleryOpen={setGalleryOpen} value={value} product={product} key={product.id && product.id}/>
                    ))
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps) (Products);