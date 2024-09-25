import React, {useCallback, useEffect, useRef, useState} from 'react';
import './ProductsTypesLabel.scss';
import {connect} from "react-redux";
import ProductTypeLabel from "./ProductTypeLabel/ProductTypeLabel";
import {useParams} from "react-router-dom";
import {changeCurItemTypeId} from "../../../store/actions/categories.action";

const ProductsTypesLabel = ({containerHeight, providerId, changeCurItemTypeId, fetchItems, curItemTypeId, filter, market, lan, curId, fetchProviderProductsTypes, page, more, setTransformValue, transFormValue, loadingProductTypes, productTypes, swiper, active, setActive}) => {
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
            page,
            id: curId,
            lan,
            filter
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
                            <ProductTypeLabel curId={curId} providerId={providerId} changeCurItemTypeId={changeCurItemTypeId} fetchItems={fetchItems} curItemTypeId={curItemTypeId} lan={lan} market={market} containerHeight={containerHeight} transformValue={transFormValue} setTransformValue={setTransformValue} labelContainer={labelContainer} index={i} swiper={swiper} productTypes={productTypes} setActive={setActive} active={active} productType={productType} key={productType.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan,
    filter: state.categories.filter
});

export default connect(mapStateToProps) (React.memo(ProductsTypesLabel));