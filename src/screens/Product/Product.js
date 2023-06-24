import React, {useEffect, useState} from 'react';
import './Product.scss';
import Navbar from "../../components/HOC/Navbar/Navbar";
import {fetchProductDetails, fetchProductTypeDetails, resetProductData} from "../../store/actions/product.actions";
import {connect} from "react-redux";
import {Outlet, useParams} from "react-router-dom";
import Provider from "./Provider/Provider";
import Failure from "./Provider/ProviderProducts/Failure/Failure";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import Gallery from "./Provider/ProviderProducts/ProviderProduct/Gallery/Gallery";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../components/Loader/Loader";

const Product = ({fetchProductDetails, more, page, lan, providers, resetProductData, fetchProductTypeDetails, productType, loadingProductsProviders, gallery}) => {
    const [moreLoading, setMoreLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        setMoreLoading(more);
    }, [more]);

    useEffect (() => {
        fetchProductTypeDetails(params.id, lan);
        fetchProductDetails(params.id, page, lan);

        return () => {
            resetProductData();
        }
    }, [params.id]);



    useEffect(() => {
        const home = document.querySelector('.Home');
        const freezeStyles = () => {
            home.style.height = '100vh';
            home.style.overflowY = 'hidden';
        }
        const releaseStyles = () => {
            home.style.height = 'auto';
            home.overflowY = 'scroll';
        }

        freezeStyles();

        return () => {
            releaseStyles();
        }

    }, []);
    return (
        <div className={'ProductScreen'}>
            <Navbar backBtn={true} midText={productType?.title && productType.title}/>
            {
                !loadingProductsProviders ? (
                    providers?.length > 0 ? (
                        <InfiniteScroll
                            dataLength={providers.length}
                            pageStart={page}
                            loadMore={() => {
                                if(providers.length === 0 && page === 0) return;
                                if(!moreLoading) return;
                                fetchProductDetails(params.id, page, lan);
                                if(!more) setMoreLoading(false);
                            }}
                            hasMore={moreLoading}
                            loader={<Loader />}
                        >
                            {
                                providers.map((p, i) => (
                                    <>
                                        <Provider provider={p} key={p.id} />
                                        {
                                            gallery && <Gallery />
                                        }
                                    </>
                                ))
                            }
                        </InfiniteScroll>

                    ): (
                        <Failure />
                    )

                ) : (
                    <SpinnerComponent />
                )

            }
            <Outlet />
        </div>
    );
};

const mapStateToProps = state => ({
    providers: state.product.providers,
    page: state.product.page,
    lan: state.categories.lan,
    productType: state.product.product,
    loadingProductsProviders: state.product.loadingProducts,
    gallery: state.product.openGallery,
    more: state.product.more
});

export default connect(mapStateToProps, {resetProductData, fetchProductDetails, fetchProductTypeDetails}) (Product);