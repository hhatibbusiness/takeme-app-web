import React, {useEffect, useRef} from 'react';
import './ProductTypeLabel.scss';

const ProductTypeLabel = ({ productType, index, containerHeight, transformValue, setTransformValue, labelContainer, active, setActive, swiper, productTypes }) => {
    const labelRef = useRef();

    useEffect(() => {
        const label = labelRef?.current;
        const container = labelContainer?.current;
        if(label && container) {
            // console.log(container.scrollLeft);
            const elemDistance = window.pageXOffset + label.getBoundingClientRect().right;
            const labelWidth = label.getBoundingClientRect().width;
            if (productType.id == active) {
                console.log(label.getBoundingClientRect().left, container.getBoundingClientRect().left, container.scrollLeft, container.clientWidth / 2, label.clientWidth / 2);

                const offset = label.getBoundingClientRect().left - container.getBoundingClientRect().left + container.scrollLeft - (container.clientWidth / 2) + (label.clientWidth / 2);
                console.log(offset)
                container.scrollTo({
                    left: offset,
                    behavior: 'smooth' // Smooth scrolling
                });
            }


            // if((elemDistance < 0 || elemDistance < labelWidth * 2) && productType.id == active ) {
                // console.log(elemDistance);

                // container.scrollLeft = -container.getBoundingClientRect().width / 2;
                // container.scrollLeft -= (Math.abs(elemDistance) + labelWidth / 2);
            // } else if(elemDistance > container.getBoundingClientRect().width) {
                // container.scrollLeft += (elemDistance - container.getBoundingClientRect().width + 150);
            // }
        }
    }, [active, labelRef?.current, labelContainer?.current]);

    const productTypeClickHandler = () => {
        const productTypeTransformValue = index * containerHeight;
        setTransformValue(-productTypeTransformValue);
    }

    return (
        <div ref={labelRef} onClick={e => {
            setActive(productType?.id);
            // swiper.enable();
            // swiper.slideTo(productTypes?.findIndex(p => p.id == productType?.id), 1500);
            productTypeClickHandler();
        }} className={`ProductTypeLabel ${active == productType?.id && 'ProductTypeLabel__active'}`}>
            {productType?.name}
        </div>
    );
};

export default React.memo(ProductTypeLabel);