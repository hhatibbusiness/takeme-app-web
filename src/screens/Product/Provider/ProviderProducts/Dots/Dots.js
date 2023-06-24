import React from 'react';
import './Dots.scss';

const Dots = ({products, activeIndex, color}) => {
    return (
        <div className={'Dots'}>
            {
                products.map((p, i) => (
                    <i style={{color: `${activeIndex === i  ? '#33AB85' : color}`}} className="fa-solid fa-circle"></i>
                ))
            }
        </div>
    );
};

export default Dots;