import React, {useEffect, useRef} from 'react';
import './ProductTypeLabel.scss';
import {changeCurItemTypeId} from "../../../../store/actions/categories.action";
import {useParams} from "react-router-dom";

const ProductTypeLabel = ({ productType, fetchItems, changeCurItemTypeId, lan, curItemTypeId, market, index, containerHeight, transformValue, setTransformValue, labelContainer, active, setActive, swiper, productTypes }) => {
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

    const params = useParams();

    return (
        <div ref={labelRef} onClick={async e => {
            setActive(productType?.id);
            if(active != productType?.id) {
                const container = document.querySelector('.Items__container');
                if(container) {
                    const height = container.offsetHeight;
                    container.style.height = `${height}px`;
                }

                changeCurItemTypeId(productType?.id);

                const data = {
                    page: 0,
                    lan,
                    itemTypeIds: [productType?.id],
                    storeIds: [params.providerId]
                };


                const res = await fetchItems(data);

                if(container) {
                    if(res.status == 200) {
                        container.style.height = 'auto';
                    }
                }
            }
            !market && productTypeClickHandler();
        }} className={`ProductTypeLabel ${active == productType?.id && 'ProductTypeLabel__active'}`}>
            {productType?.name}
        </div>
    );
};

export default React.memo(ProductTypeLabel);