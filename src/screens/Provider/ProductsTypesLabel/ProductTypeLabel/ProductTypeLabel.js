import React, {useEffect, useRef} from 'react';
import './ProductTypeLabel.scss';

const ProductTypeLabel = ({ productType, labelContainer, active, setActive, swiper, productTypes }) => {
    const labelRef = useRef();

    useEffect(() => {
        const label = labelRef?.current;
        const container = labelContainer?.current;
        if(label && container) {
            const elemDistance = window.pageXOffset + label.getBoundingClientRect().right;
            console.log(elemDistance);
            if(elemDistance < 0 && productType.id == active) {
                console.log(elemDistance, );
                container.scrollLeft -= (Math.abs(elemDistance) + label.getBoundingClientRect().width + 10);
            } else if(elemDistance > container.getBoundingClientRect().width) {
                container.scrollLeft += (elemDistance - container.getBoundingClientRect().width);
            }
        }
    }, [active, labelRef?.current, labelContainer?.current]);

    return (
        <div ref={labelRef} onClick={e => {
            setActive(productType?.id);
            swiper.enable();
            swiper.slideTo(productTypes?.findIndex(p => p.id == productType?.id), 1500);
        }} className={`ProductTypeLabel ${active == productType?.id && 'ProductTypeLabel__active'}`}>
            {productType?.name}
        </div>
    );
};

export default React.memo(ProductTypeLabel);