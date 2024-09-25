import React, {memo, useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import Products from "./Products/Products";
import {fetchCategoryProducts, increasePageNumber} from "../../../../../store/actions/categories.action";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../../../components/Loader/Loader";
import './ProductList.css';
import {useNavigate} from "react-router-dom";

const Category = ({products, currentProduct, id:catId, setCurrentProduct, id, lan, page, fetchCategoryProducts, more, filter}) => {
    const [moreLoading, setMoreLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        setMoreLoading(more);
    }, [more]);

    return (
        <div ref={containerRef} className={'CategoryComp'} >
            {/*<SliderComponent />*/}
            <InfiniteScroll
                style={{position: 'relative', paddingBottom: '100px;'}}
                dataLength={products.length}
                pageStart={page}
                loadMore={async () => {
                    if(products.length === 0 && page === 0) return;
                    if(!moreLoading) return;
                    if(!more) return setMoreLoading(false);
                    setLoading(true);
                    if(loading) return ;
                    await fetchCategoryProducts(id, lan, page, filter, navigate);
                    setLoading(false);
                }}
                hasMore={moreLoading}
                loader={<Loader />}
                useWindow={true}
            >
                <Products id={`products_${id}`} products={products} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
            </InfiniteScroll>
        </div>
    );
};

const mapStateToProps = state => ({
    products: state.categories.products,
    lan: state.categories.lan,
    page: state.categories.page,
    id: state.categories.curId,
    more: state.categories.more,
    filter: state.categories.filter
});

export default connect(mapStateToProps, {fetchCategoryProducts, increasePageNumber}) (memo(Category));