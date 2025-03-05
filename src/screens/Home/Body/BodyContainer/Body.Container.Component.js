import React, {useCallback, useEffect, useRef, useState} from 'react';
import Cover from "./Cover/Cover";
import './Body.Container.Styles.scss';
import {connect} from "react-redux";
import SpinnerComponent from "../../../../components/Spinner/Spinner.Component";
import {fetchCategoryProducts, fetchItemTypes, changeCurItemTypeId, fetchCategories, fetchProductsMarket} from "../../../../store/actions/categories.action";
import Store from "./Store/Store";
import Items from "./Items/Items";
import ItemShimmer from "../../../../components/ItemShimmer/ItemShimmer";

const BodyContainerComponent = ({y, setY, topValue, setTopValue, bodyContainerRef, navHeight, moreItems, itemsPage, fetchingItems, curItemTypeId, items, fetchProductsMarket, coverLoaded, fetchingStores, store, setCoverLoaded, setCurrentProduct, id, value}) => {
    const spacerRef = useRef();
    const containerRef = useRef();
    const mainRef = useRef();

    const handleWindowScroll = useCallback( e => {
        console.log(topValue);
        if(Math.floor(y) > Math.floor(window.scrollY)) {
            setY(window.scrollY);
            if(topValue + (y - window.scrollY) > 0) {
                return setTopValue(0);
            }
            setTopValue(topValue + (y - window.scrollY));
        } else if(Math.floor(y) < Math.floor(window.scrollY)) {
            if(window.scrollY - y > Math.abs(navHeight) - Math.abs(topValue)) {
                setY(window.scrollY);
                return setTopValue(-navHeight);
            };
            if(window.scrollY - y + topValue < -navHeight) {
                setY(window.scrollY);
                return setTopValue(-navHeight);
            };
            setTopValue(topValue - (window.scrollY - y));
            setY(window.scrollY);
        }
    }, [y]);

    useEffect(() => {
        const container = bodyContainerRef.current;
        if(container) {
            console.log('Starting to listen to the scroll event!')
            setY(window.scrollY);
            window.addEventListener('scroll', handleWindowScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        }
    }, [handleWindowScroll, bodyContainerRef.current, store]);

    const itemsContainerStyles = {
        paddingTop: `${navHeight}px`
    }

    return (
        <div ref={mainRef} className={'BodyContainer'}>
            { false && <Cover loaded={coverLoaded} setLoaded={setCoverLoaded} /> }
            {
                true ? (
                    <>
                        <div ref={containerRef} className="BodyContainer__container">
                            <div ref={spacerRef} className={`spacer`}></div>
                        </div>
                        {
                            store ? (
                                fetchingStores ? (
                                    <SpinnerComponent />
                                ) : (
                                    <div className={'Store__container'} style={itemsContainerStyles}>
                                        <Store />
                                    </div>
                                )
                            ) : (
                                <div className={'Items__container'} style={itemsContainerStyles}>
                                    {
                                        fetchingItems ? (
                                            <ItemShimmer value={value} />
                                        ) : (
                                            <Items value={value} curId={id} setCurrentProduct={setCurrentProduct} curItemTypeId={curItemTypeId} fetchProductsMarket={fetchProductsMarket} items={items} itemsPage={itemsPage} moreItems={moreItems} />
                                        )
                                    }
                                </div>
                            )
                        }
                    </>
                ) : (
                    <div></div>
                )
            }
        </div>
    );
};

const mapStateToProps = state => ({
    loadingCategories: state.categories.loadingCategories,
    loadingCategoryProducts: state.categories.loadingCategoryProducts,
    id: state.categories.curId,
    value: state.categories.value,
    page: state.categories.page,
    categories: state.categories.categories,
    lan: state.categories.lan,
    store: state.categories.store,
    fetchingStores: state.categories.fetchingStores,
    productTypes: state.categories.products,
    more: state.categories.more,
    filter: state.categories.filter,
    items: state.categories.items,
    itemTypes: state.categories.itemTypes,
    itemTypesMore: state.categories.itemTypesMore,
    itemTypesPage: state.categories.itemTypesPage,
    fetchingItemTypes: state.categories.fetchingItemTypes,
    curItemTypeId: state.categories.curItemTypeId,
    fetchingItems: state.categories.fetchingItems,
    itemsPage: state.categories.itemsPage,
    moreItems: state.categories.moreItems,
    selectedLocale: state.categories.selectedLocale
});

export default connect(mapStateToProps, {changeCurItemTypeId, fetchItemTypes, fetchCategoryProducts, fetchCategories, fetchProductsMarket}) (React.memo(BodyContainerComponent));