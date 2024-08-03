import React, {useCallback, useEffect, useRef, useState} from 'react';
import './ProductsTypesLabel.scss';
import {connect} from "react-redux";
import ProductTypeLabel from "./ProductTypeLabel/ProductTypeLabel";
import {fetchProviderProductsTypes} from '../../../store/actions/provider.actions';
import {useParams} from "react-router-dom";

const ProductsTypesLabel = ({containerHeight, curId, fetchProviderProductsTypes, page, more, setTransformValue, transFormValue, loadingProductTypes, productTypes, swiper, active, setActive}) => {
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [down, setDown] = useState(false);
    const previousScrollLeft = useRef(0);
    const [loading, setLoading] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);

    const labelContainer = useRef();

    const categoriesRef = useRef();

    const params = useParams();

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

    useEffect(() => {
        setMoreLoading(more);
    }, [more]);


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
        setDown(false);
    }

    const loadMore = async () => {
        console.log('Loading More!')
        if(productTypes?.length === 0 && page === 0) return;
        if(!moreLoading) return;
        if(!more) return setMoreLoading(false);
        setLoading(true);
        if(loading) return;
        const data = {
            providerId: params.providerId,
            categoryListIds: null,
            productTypeId: null,
            page
        }
        await fetchProviderProductsTypes(data);
        setLoading(false);
    }

    const handleScroll = useCallback(() => {
        const scrollParent = labelContainer.current;
        if (!scrollParent) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollParent;

        const scrollDirectionX = scrollLeft > previousScrollLeft.current ? 'right' : 'left';


        if(scrollDirectionX == 'left') {
            console.log(Math.abs(scrollLeft) + clientWidth, scrollWidth - 50)
            if (Math.abs(scrollLeft) + clientWidth >= scrollWidth - 50 && moreLoading) {
                console.log('Seriously scrolling!');
                loadMore();
            }
        }

        previousScrollLeft.current = scrollLeft;


    }, [loadMore, moreLoading]);

    useEffect(() => {
        const scrollParent = labelContainer.current;
        if (scrollParent) {
            scrollParent.addEventListener('scroll', handleScroll);
            return () => {
                scrollParent.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll, categoriesRef.current]);


    return (
        <div className={'ProductsTypesLabel'}>
            <div ref={labelContainer}  className="ProductsTypesLabel__parent" onMouseDown={mouseDownHandler} onMouseLeave={mouseUpHandler} onMouseUp={mouseUpHandler} onMouseMove={mouseMoveHandler}>
                <div className="ProductsTypesLabel__container">
                    {
                        !loadingProductTypes && productTypes?.map((productType, i) => (
                            <ProductTypeLabel containerHeight={containerHeight} transformValue={transFormValue} setTransformValue={setTransformValue} labelContainer={labelContainer} index={i} swiper={swiper} productTypes={productTypes} setActive={setActive} active={active} productType={productType} key={productType.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    loadingProductTypes: state.provider.loadingProductTypes,
    productTypes: state.provider.productTypes,
    page: state.provider.page,
    more: state.provider.more,
    curId: state.provider.curId
});

export default connect(mapStateToProps, {fetchProviderProductsTypes}) (React.memo(ProductsTypesLabel));