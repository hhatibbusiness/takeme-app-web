import React from 'react';
import './ProductTypeLabel.scss';

const ProductTypeLabel = ({ productType, active, setActive }) => {
    return (
        <div onClick={e => setActive(productType?.id)} className={`ProductTypeLabel ${active == productType?.id && 'ProductTypeLabel__active'}`}>
            {productType?.name}
        </div>
    );
};

export default ProductTypeLabel;