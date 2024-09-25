import React, {useCallback, useEffect, useRef, useState} from 'react';
import Cover from "./Cover/Cover";
import './Body.Container.Styles.scss';
import {connect} from "react-redux";
import Categories from "./CategoriesBar/Categories";
import ProductList from "./ProductList/ProductList";
import SpinnerComponent from "../../../../components/Spinner/Spinner.Component";
import {fetchCategoryProducts, fetchItemTypes, changeCurItemTypeId, fetchCategories, fetchProductsMarket} from "../../../../store/actions/categories.action";
import Failure from "../../../Product/Provider/ProviderProducts/Failure/Failure";
import {useTranslation} from "react-i18next";
import SliderComponent from "./ProductList/Slider/Slider";
import Store from "./Store/Store";
import ProductsTypesLabel from "../../../Provider/ProductsTypesLabel/ProductsTypesLabel";
import Items from "./Items/Items";
import {value} from "lodash/seq";
import ItemTypesShimmer from "../../../../components/ItemTypesShimmer/ItemTypesShimmer";
import ItemShimmer from "../../../../components/ItemShimmer/ItemShimmer";

const BodyContainerComponent = ({loadingCategories, y, setY, topValue, setTopValue, fixedNav, setFixedNav, bodyContainerRef, considerNav, setConsiderNav, setNavHeight, navShow, setNavShow, setFiltersActive, filtersActive, navHeight, moreItems, itemsPage, fetchingItems, changeCurItemTypeId, curItemTypeId, fetchingItemTypes, itemTypesPage, itemTypesMore, fetchItemTypes, itemTypes, items, filter, fetchProductsMarket, more, loadingCategoryProducts, productTypes, coverLoaded, fetchingStores, store, setCoverLoaded, currentProduct, setCurrentProduct, categories, id, page, fetchCategoryProducts, value}) => {
    // const bodyContainerRef = useRef();
    const spacerRef = useRef();
    const {t} = useTranslation();
    const containerRef = useRef();
    const [active, setActive] = useState(0);
    const [show, setShow] = useState(false);
    // const [y, setY] = useState(null);
    const [scrollDirection, setScrollDirection] = useState(null);
    const [lastDownY, setLastDown] = useState(null);
    // const [considerNav, setConsiderNav] = useState(true);
    const [itemsPadding, setItemsPadding] = useState(null);
    const mainRef = useRef();

    const handleWindowScroll = useCallback( e => {
        const container = bodyContainerRef.current;

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
            setY(window.scrollY);
            window.addEventListener('scroll', handleWindowScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        }
    }, [handleWindowScroll, bodyContainerRef.current, store]);

    useEffect(() => {
        const categoriesContainer = bodyContainerRef.current;
        if(categoriesContainer) {
            // if(filtersActive) {
            //     console.log(categoriesContainer.getBoundingClientRect().height)
            //     setNavHeight(navHeight);
            // } else {
            //     console.log(categoriesContainer.getBoundingClientRect().height)
            //     setNavHeight(navHeight );
            //
            // }
            setItemsPadding(navHeight)
        }
    }, [filtersActive, bodyContainerRef]);

    // useEffect(() => {
    //     if(bodyContainerRef?.current && spacerRef?.current && containerRef.current) {
    //         const container = bodyContainerRef?.current;
    //
    //         const observerOptions = {
    //             root: null, // use the viewport as the root
    //             rootMargin: `${65}px`,
    //             threshold: 0,
    //         };
    //         const stickyElement = bodyContainerRef?.current;
    //         const spacer = spacerRef?.current;
    //
    //         if(store) {
    //             container.style.height = 'auto';
    //         } else {
    //             // container.style.height = `${container.getBoundingClientRect().height}px`
    //         }
    //
    //
    //         const observer = new IntersectionObserver((entries) => {
    //             entries.forEach((entry) => {
    //                 if (!entry.isIntersecting) {
    //                     // setShow(true);
    //                     // setNavShow(true)
    //                 } else {
    //                     // setShow(false);
    //                     // setNavShow(false);
    //                 }
    //             });
    //         }, observerOptions);
    //
    //         observer.observe(spacer);
    //
    //         return () => {
    //             observer.unobserve(spacer);
    //         }
    //     }
    // }, [bodyContainerRef, spacerRef, containerRef, coverLoaded, store]);    //
    const [isSticky, setIsSticky] = useState(false);
    //
    // const handleScroll = () => {
    //     const bodyContainer = bodyContainerRef?.current;
    //     const productsContainer = document.querySelector('.CategoryComp');
    //     if (spacerRef.current && bodyContainer && productsContainer) {
    //         const offsetTop = spacerRef.current.getBoundingClientRect().top;
    //         if (offsetTop < 75) {
    //             console.log('dljafldkjsalfkdja', offsetTop);
    //             setIsSticky(true);
    //             productsContainer.style.paddingTop = `${bodyContainer.getBoundingClientRect().height + 70}px`;
    //             // spacerRef.current.style.marginBottom = `${bodyContainer.getBoundingClientRect().height}px`;
    //         } else {
    //             setIsSticky(false);
    //             console.log('back now!', offsetTop);
    //             // spacerRef.current.style.marginBottom = 0;
    //             productsContainer.style.paddingTop = 0;
    //
    //         }
    //     }
    // };
    //
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    // useEffect(() => {
    //     if(id == 0) {
    //         return;
    //     }
    // }, []);

    const itemsContainerStyles = {
        paddingTop: `${navHeight}px`
    }

    useEffect(() => {
        const container = bodyContainerRef?.current;
        if(container) {
            if(filtersActive) {
                setItemsPadding(container.getBoundingClientRect().height);
            } else {
                setItemsPadding(0);
            }
        }
    }, [filtersActive, bodyContainerRef?.current?.getBoundingClientRect().height, store]);

    return (
        <div ref={mainRef} className={'BodyContainer'}>
            { false && <Cover loaded={coverLoaded} setLoaded={setCoverLoaded} /> }
            {
                true ? (
                    <>
                        <div ref={containerRef} className="BodyContainer__container">
                            <div ref={spacerRef} className={`spacer`}></div>
                            {/*{<div ref={bodyContainerRef} className={`BodyContainer__wrapper `}>*/}
                            {/*/!*{ true && <div ref={bodyContainerRef} className={`BodyContainer__wrapper ${isSticky ? 'sticky' : ''}`}>*!/*/}
                            {/*    <Categories loadingCategories={loadingCategories} categories={categories} curId={id} home />*/}
                            {/*    {*/}
                            {/*        !store && (*/}
                            {/*            <>*/}
                            {/*                {*/}
                            {/*                    !fetchingItemTypes ? (*/}
                            {/*                        <ProductsTypesLabel changeCurItemTypeId={changeCurItemTypeId} fetchItems={fetchProductsMarket} curItemTypeId={curItemTypeId} fetchProviderProductsTypes={fetchItemTypes} market={true} more={itemTypesMore} curId={id} page={itemTypesPage} loadingProductTypes={fetchingItemTypes} active={active} setActive={setActive} productTypes={itemTypes} />*/}
                            {/*                    ) : (*/}
                            {/*                        <ItemTypesShimmer />*/}
                            {/*                    )*/}
                            {/*                }*/}
                            {/*                <SliderComponent />*/}
                            {/*            </>*/}
                            {/*        )*/}
                            {/*    }*/}
                            {/*</div>}*/}
                            {/*{*/}
                            {/*    <div ref={bodyContainerRef} className={`BodyContainer__wrapper ${((filtersActive && navShow) || (filtersActive && considerNav)) ? 'BodyContainer__show' : 'BodyContainer__wrapper--hidden'}`} style={{top: `${navHeight}px`}}>*/}
                            {/*        /!*{ true && <div ref={bodyContainerRef} className={`BodyContainer__wrapper ${isSticky ? 'sticky' : ''}`}>*!/*/}
                            {/*        <Categories loadingCategories={loadingCategories} categories={categories} curId={id} home />*/}
                            {/*        {*/}
                            {/*            !store && (*/}
                            {/*                <>*/}
                            {/*                    {*/}
                            {/*                        !fetchingItemTypes ? (*/}
                            {/*                            <ProductsTypesLabel changeCurItemTypeId={changeCurItemTypeId} fetchItems={fetchProductsMarket} curItemTypeId={curItemTypeId} fetchProviderProductsTypes={fetchItemTypes} market={true} more={itemTypesMore} curId={id} page={itemTypesPage} loadingProductTypes={fetchingItemTypes} active={active} setActive={setActive} productTypes={itemTypes} />*/}
                            {/*                        ) : (*/}
                            {/*                            <ItemTypesShimmer />*/}
                            {/*                        )*/}
                            {/*                    }*/}
                            {/*                    <SliderComponent />*/}
                            {/*                </>*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    </div>*/}
                            {/*}*/}
                        </div>
                        {/*{*/}
                        {/*    (categories?.length > 0 ) ? (*/}
                        {/*        !loadingCategories && (*/}
                        {/*            store ? (*/}
                        {/*                <Store />*/}
                        {/*            ) : (*/}
                        {/*                <ProductList currentProduct={currentProduct} setCurrentProduct={setCurrentProduct}/>*/}
                        {/*            )*/}
                        {/*        )*/}
                        {/*    ) : (*/}
                        {/*        <Failure text={t('there\'s not products')} />*/}
                        {/*    )*/}
                        {/*}*/}
                        {
                            store ? (
                                fetchingStores ? (
                                    <SpinnerComponent />
                                ) : (
                                    // <div className={'Store__container'} >
                                    <div className={'Store__container'} style={itemsContainerStyles}>
                                        <Store />
                                    </div>
                                )
                            ) : (
                                // <div className={'Items__container'}>
                                <div className={'Items__container'} style={itemsContainerStyles}>
                                    {
                                        fetchingItems ? (
                                            <ItemShimmer value={value} />
                                        ) : (
                                            <Items value={value} curId={id} setCurrentProduct={setCurrentProduct} curItemTypeId={curItemTypeId} fetchProductsMarket={fetchProductsMarket} items={items} itemsPage={itemsPage} moreItems={moreItems} />
                                            // <ProductList currentProduct={currentProduct} setCurrentProduct={setCurrentProduct}/>
                                        )
                                    }
                                </div>
                            )
                        }
                    </>
                ) : (
                    <div></div>
                    // <SpinnerComponent />
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
    moreItems: state.categories.moreItems
});

export default connect(mapStateToProps, {changeCurItemTypeId, fetchItemTypes, fetchCategoryProducts, fetchCategories, fetchProductsMarket}) (React.memo(BodyContainerComponent));