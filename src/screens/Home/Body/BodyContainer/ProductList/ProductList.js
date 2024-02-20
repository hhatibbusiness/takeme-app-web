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
            {/*<SliderComponent />*/}
            <InfiniteScroll
                style={{position: 'relative', paddingBottom: '100px;'}}
                dataLength={products.length}
                pageStart={page}
                loadMore={() => {
                    // console.log('step1')
                    if(products.length === 0 && page === 0) return;
                    // console.log('step2')
                    if(!moreLoading) return;
                    // console.log('step3')
                    if(!more) return setMoreLoading(false);
                    // console.log('step4')
                    fetchCategoryProducts(id, lan, page, filter, navigate);
                    // console.log('step5')
                }}
                hasMore={moreLoading}
                loader={<Loader />}
                useWindow={true}
            >
                <Products id={`products_${id}`} products={products} />
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