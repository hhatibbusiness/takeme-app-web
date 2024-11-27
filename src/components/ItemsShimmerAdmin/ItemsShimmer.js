import React from 'react';
import './ItemsShimmer.css';
import Dots from '../Dots/Dots';

const ItemsShimmer = ({dots}) => {
    return (
        <div className='ItemsShimmer'>
            <div className='ItemsShimmer__contianer'>
                <div className='ItemsShimmer__name'></div>
                {
                    dots && <Dots />      
                }
                          
            </div>
            <div className='ItemsShimmer__separator'></div>
            <div className='ItemsShimmer__contianer'>
                <div className='ItemsShimmer__name'></div>
                {
                    dots && <Dots />      
                }
            </div>
            <div className='ItemsShimmer__separator'></div>

            <div className='ItemsShimmer__contianer'>
                <div className='ItemsShimmer__name'></div>
                {
                    dots && <Dots />      
                }
            </div>
            <div className='ItemsShimmer__separator'></div>

            <div className='ItemsShimmer__contianer'>
                <div className='ItemsShimmer__name'></div>
                {
                    dots && <Dots />      
                }
            </div>
        </div>
    )
}

export default ItemsShimmer;