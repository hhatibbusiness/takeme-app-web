import React, {memo, useEffect, useRef, useState} from 'react';
// import {useParams} from "react-router-dom";
import {connect} from "react-redux";
// import {getCategory} from "../../store/actions/categories.action";
// import {Slider} from "@mui/material";
import SliderComponent from "./Slider/Slider";
import Products from "./Products/Products";
import {fetchCategoryProducts, increasePageNumber} from "../../../../../store/actions/categories.action";
import InfiniteScroll from "react-infinite-scroller";
import SpinnerComponent from "../../../../../components/Spinner/Spinner.Component";
import Loader from "../../../../../components/Loader/Loader";
// import Gallery from "./Gallery/Gallery";
// import {Swiper} from "swiper";
import './ProductList.css';
import {useNavigate} from "react-router-dom";
import KeepAlive from "react-activation";

const Category = ({products, id, lan, page, fetchCategoryProducts, increasePageNumber, more, filter}) => {
    const [moreLoading, setMoreLoading] = useState(true);
    const containerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        setMoreLoading(more);
    }, [more]);

    return (
        <div ref={containerRef} className={'CategoryComp'} >
            <SliderComponent />
            <InfiniteScroll
                style={{position: 'relative', paddingBottom: '100px;'}}
                dataLength={products.length}
                pageStart={page}
                loadMore={() => {
                    if(products.length === 0 && page === 0) return;
                    if(!moreLoading) return;
                    if(!more) return setMoreLoading(false);
                    fetchCategoryProducts(id, lan, page, filter, navigate);
                }}
                hasMore={moreLoading}
                loader={<Loader />}
            >
                <Products products={products} />
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