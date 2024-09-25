import React, {memo, useEffect, useState} from 'react';
import './Store.css';
import {connect} from "react-redux";
import {fetchMarketStores, resetMarketStoreData} from "../../../../../store/actions/categories.action";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../../../components/Loader/Loader";
import StoreItem from "./StoreItem/StoreItem";
import StoreViewShimmer from "../../../../../components/StoreViewShimmer/StoreViewShimmer";

const Store = ({fetchMarketStores, curId, filter, resetMarketStoreData, lan, page, fetchingStores, stores, more}) => {
    const [moreLoading, setMoreLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resetMarketStoreData();
        console.log('From useEffect!', curId);
        (async () => {
            const data = {
                lan,
                page: 0,
                filter: filter,
                categoryId: curId
            };

            await fetchMarketStores(data);
        })();
        return () => {
            console.log('Product Unmounted!')
        }
    }, [curId]);

    useEffect(() => {
        console.log('Hello From the Store page!')
    }, []);

    // useEffect(() => {
    //     setMoreLoading(more);
    // }, [more]);


    return (
        <div className={'Store'}>
            <InfiniteScroll
                // style={{position: 'relative', paddingBottom: '100px;'}}
                dataLength={stores.length}
                pageStart={page}
                loadMore={async () => {
                    // return
                    if(stores.length === 0 && page === 0) return;
                    console.log(more);
                    if(!moreLoading) return;
                    if(!more) return setMoreLoading(false);
                    setLoading(true);
                    if(loading) return ;
                    const data = {
                        lan,
                        page,
                        filter: filter,
                        categoryId: curId
                    };
                    console.log('From Infinite Scroll!')
                    await fetchMarketStores(data);
                    setLoading(false);
                }}
                hasMore={moreLoading}
                loader={
                    <>
                        <StoreViewShimmer />
                        <div className="Store__separator"></div>
                        <StoreViewShimmer />
                        <div className="Store__separator"></div>
                        <StoreViewShimmer />
                        <div className="Store__separator"></div>
                        <StoreViewShimmer />

                    </>
                }
                useWindow={true}
                threshold={50}
            >
                {
                    stores.length > 0 && stores.map((store, i) => (
                        <>
                            <StoreItem key={i} store={store}/>
                            <div className="Store__separator"></div>
                        </>
                    ))
                }
            </InfiniteScroll>
        </div>
    );
};

const mapStateToProps = state => ({
    curId: state.categories.curId,
    filter: state.categories.filter,
    lan: state.categories.lan,
    page: state.categories.storePage,
    fetchingStores: state.categories.fetchingStores,
    stores: state.categories.stores,
    more: state.categories.moreStores
});

export default connect(mapStateToProps, {resetMarketStoreData, fetchMarketStores}) (memo(Store));