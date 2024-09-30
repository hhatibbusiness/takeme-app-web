import React, {useCallback, useEffect, useRef, useState} from 'react';
import './ProviderSceen.scss';
import {connect} from "react-redux";
import {fetchProviderData, closeProviderGallery, changeStoreCurrentItemType, openProviderGallery, fetchProviderProductsTypes, resetProviderProductTypesData, changeCurrentId, fetchStoreItemTypes, fetchStoreItems} from "../../store/actions/provider.actions";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import {getAnalytics, logEvent} from "firebase/analytics";
import {openPopup, changePopupProduct, changeNavbarAssets} from "../../store/actions/ui.actions";
import {KeepAlive} from "react-activation";
import ProviderProfile from "../Product/Provider/ProviderProfile/ProviderProfile";
import Categories from "../Home/Body/BodyContainer/CategoriesBar/Categories";
import {fetchProviderCategories} from "../../store/actions/provider.actions";
import ProductsTypesLabel from "./ProductsTypesLabel/ProductsTypesLabel";
import {Swiper, SwiperSlide} from "swiper/react";
import ProviderProductType from "./ProviderProductType/ProviderProductType";
import {openGallery} from "../../store/actions/product.actions";

// import 'swiper/css'; // Import Swiper styles

import 'swiper/swiper-bundle.css';
import ChangeIndication from "./ProviderProductType/ChangeIndication/ChangeIndication";
import {fetchItemTypes} from "../../store/actions/categories.action";
import Item from "../Home/Body/BodyContainer/Items/Item/Item";
import StorePageShimmer from "../../components/StorePageShimmer/StorePageShimmer";
import ItemShimmer from "../../components/ItemShimmer/ItemShimmer";
import Items from "../Home/Body/BodyContainer/Items/Items";
import ItemTypesShimmer from "../../components/ItemTypesShimmer/ItemTypesShimmer";
import search from "../../components/HOC/Navbar/Search/Search";


const ProviderScreen = ({fetchProviderData, setProviderId, setShowSItemTypes, setShowMItemTypes, setShowSCategories, setShowMCategories, setShowSlider, setFiltersActive, setPersonActive, storeDetailsRef, setTopValue, topValue, bodyContainerRef, navHeight, setSearchActive, searchActive, setEyeDis, eyeDis, setPersonAva, setBackBtn, currentProduct, setCurrentProduct, currentItemTypeId, itemsPage, changeStoreCurrentItemType, itemsMore, fetchingItems, items, fetchingItemTypes, itemTypes, fetchStoreItemTypes, takemeUserToken, currentUser, takemeProviderToken, takemeProviderData, fetchStoreItems, changeCurrentId, fetchingProductTypes, fetchProviderCategories, categories, loadingCategories, curId, page, more, loadingProductTypes, productTypes, changeNavbarAssets, loadingProvider, filter, resetProviderProductTypesData, fetchProviderProductsTypes, lan, provider, gallery, galleryProduct, closeProviderGallery, openProviderGallery, changePopupProduct, openPopup, catId, openGallery}) => {
    const [moreLoading, setMoreLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const history = useLocation();
    const [active, setActive] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [tScroll, setTScroll] = useState(false);
    const [bScroll, setBScroll] = useState(false);
    const [enableSwiping, setEnableSwiping] = useState(true);
    const [providerPosition, setProviderPosition] = useState(null);
    const [hideCover, setHideCover] = useState(false);
    const [categoryBarPosition, setCategoryBarPosition] = useState(null);
    const [containerScroll, setContainerScroll] = useState(false);
    const [currentProductType, setCurrentProductType] = useState(0);
    const swiperRef=useRef();
    const [productTypeHeight, setProductTypeHeight] = useState(0);
    const location = useLocation();
    const providerScreenRef = useRef();
    const [transformValue, setTransformValue] = useState(0);
    const [scrollValue, setScrollValue] = useState(0);
    const [indicationBottom, setIndicationBottom] = useState(false);
    const [indicationTop, setIndicationTop] = useState(false);
    const [y, setY] = useState(0);

    const categoriesContainerRef = useRef();
    const providerProductTypeContainerRef = useRef();
    const providerContainerRefDub = useRef();

    const handleWindowScroll = useCallback( e => {
        const container = bodyContainerRef.current;
        const providerContainer = providerContainerRefDub.current;
        // const searchContainerEle = searchContainerRef?.current;
        const top = Math.abs(providerContainer.getBoundingClientRect()?.top);

        console.log(Math.floor(y), top);

        if(Math.floor(y) > Math.floor(top)) {
            setY(top);
            if(topValue + (y - top) > 0) {
                return setTopValue(0);
            }
            setTopValue(topValue + (y - top));
        } else if(Math.floor(y) < Math.floor(top)) {
            if(top - y > Math.abs(navHeight) - Math.abs(topValue)) {
                setY(top);
                return setTopValue(-navHeight);
            }
            if(top - y + topValue < -navHeight) {
                setY(top);
                return setTopValue(-navHeight);
            }
            setTopValue(topValue - (top - y));
            setY(top);
        }
    }, [y]);

    // useEffect(() => {
    //     const container = bodyContainerRef.current;
    //     const providerContainer = providerScreenRef?.current;
    //     if(container && providerContainer) {
    //         console.log(Math.abs(providerContainer.getBoundingClientRect()?.top))
    //         setY(Math.abs(providerContainer.getBoundingClientRect()?.top));
    //         // providerContainer.onScroll(e => {
    //         //     console.log('Hello from Scroll!')
    //         // })
    //         // console.log(providerContainer);
    //         // providerContainer.addEventListener('scroll', handleWindowScroll);
    //     }
    //     // return () => {
    //     //     providerContainer?.removeEventListener('scroll', handleWindowScroll);
    //     // }
    // }, [handleWindowScroll, bodyContainerRef.current, providerContainerRefDub?.current]);

    useEffect(() => {
        setBackBtn(true);
        setEyeDis(true);
        setSearchActive(true);
        setPersonAva(true);
        setPersonActive(true);
        setFiltersActive(false);
        setShowSlider(false);
        setTopValue(0);
        setShowSCategories(true);
        setShowMCategories(false);
        setShowSItemTypes(true);
        setShowMItemTypes(false);
        return () => {
            setEyeDis(false);
            setBackBtn(false);
            // setSearchActive(false);
            setPersonAva(false);
            setPersonActive(false);
            setShowSlider(true);
            setTopValue(0);
            setShowSCategories(false);
            setShowMCategories(true);
            setShowMItemTypes(true);
            setShowSItemTypes(false);
        }
    }, []);

    useEffect(() => {
        setProviderId(params.providerId)
    }, [params]);

    useEffect(() => {
        const barsContainer = categoriesContainerRef.current;

        if(barsContainer) {
            // console.log(window.innerHeight, barsContainer.offsetHeight)
            const barsHeight = barsContainer.getBoundingClientRect().height;
            // console.log(barsHeight);
            const remainsHeight = window.innerHeight - barsHeight - 52;
            // console.log(remainsHeight);
            setProductTypeHeight(remainsHeight);
        }
    }, [categoriesContainerRef.current?.offsetHeight]);

    useEffect(() => {
        const swiperContainer = swiperRef?.current?.swiper;
        let removeInlineStyles;
        if(swiperContainer) {
            removeInlineStyles = () => {
                const slides = swiperContainer.slides;
                // slides.forEach((slide) => {
                //     slide.style.height = ''; // Remove inline height
                //     slide.style.marginBottom = ''; // Remove inline margin-bottom
                // });
            };

            removeInlineStyles();
            swiperContainer.on('slideChange', removeInlineStyles);
        }

        return () => {
            if (swiperContainer) {
                swiperInstance.off('slideChange', removeInlineStyles);
            }
        };
    }, [swiperRef.current]);

    useEffect(() => {
        if(params.providerId == provider?.providerId) return;
        fetchProviderData(lan, params.providerId, filter, navigate);
    }, [params.providerId]);

    useEffect(() => {
        if(!loadingProvider && history?.state?.currentProduct) {
            changePopupProduct(history?.state?.currentProduct)
            openPopup();
        }
    }, []);


    useEffect(() => {
        if(swiperInstance) {
            if(enableSwiping) {
                swiperInstance.enable();
            } else {
                swiperInstance.disable();
            }
        }
    }, [swiperInstance, enableSwiping]);

    useEffect( () => {
        const analytics = getAnalytics();
        logEvent(analytics, 'provider-screen', {
            providerName: provider.name,
            providerId: provider.id
        });
        if(params.providerId == 9) {
            logEvent(analytics, 'Ameen_visit');
        }

        (async () => {
            resetProviderProductTypesData();

            // const data = {
            //     providerId: params.providerId,
            //     categoryListIds: (curId === 0 || curId === null) ?  null : [curId],
            //     productTypeId: null,
            //     navigate,
            //     filter,
            //     lan,
            //     page: 0
            // };
            //
            // // console.log('Loading ProductTypes!')
            // await fetchProviderProductsTypes(data);

            const data = {
                page: 0,
                lan,
                categoryIds: [curId],
                storeId: [params.providerId]
            };

            await fetchStoreItemTypes(data);
        })();
    }, [params.providerId, lan]);

    useEffect(() => {
        changeCurrentId(null);
    }, [params.providerId]);

    useEffect(() => {
        const home = document.querySelector('body');
        const freezeStyles = () => {
            home.classList.add('Home__hide')
        }
        const releaseStyles = () => {
            home.classList.remove('Home__hide')
        }

        freezeStyles();

        return () => {
            releaseStyles();
        }
    }, []);

    useEffect(() => {
        const data = {
            searchPage: false,
            backBtn: true,
            step: null,
            setStep: null,
            search: false,
            midText: provider?.name,
            logoLink: '/'
        }
        changeNavbarAssets(data);
    }, [provider]);

    useEffect(() => {
        return () => {
            const data = {
                searchPage: false,
                term: '',
                backBtn: false,
                step: null,
                setStep: null,
                search: true,
                logoLink: '/'
            };
            // console.log(data);
            changeNavbarAssets(data);
        }
    }, []);

    useEffect(() => {
        setMoreLoading(more);
    }, [more]);

    useEffect(() => {
        const data = {
            providerId: params.providerId,
            lan
        };

        fetchProviderCategories(data);
    }, []);

    useEffect(() => {
        setTransformValue(0);
    }, [curId]);


    useEffect(() => {
        const productTypesContainer = providerProductTypeContainerRef?.current;
        const categoriesContainer = categoriesContainerRef?.current;
        if(productTypesContainer && categoriesContainer) {
            // productTypesContainer.style.height = `${window?.innerHeight - categoriesContainer.getBoundingClientRect().height - 50}px`;
        }
    }, [providerProductTypeContainerRef?.current, categoriesContainerRef?.current]);

    useEffect(() => {
        const providerContainer = providerProductTypeContainerRef?.current;
        if(providerContainer) {
            const slides = providerContainer.querySelectorAll('.swiper-slide');
            // slides.forEach((slide) => {
            //     console.log(slide);
            //     slide.style.height = 'auto'; // Override the default height
            //     slide.style.marginBottom = '0'; // Override the default margin
            // });
        }
    }, [providerProductTypeContainerRef?.current]);

    // useEffect(() => {
    //     const providerProducttypeContainer = providerProductTypeContainerRef.current;
    //     if(providerProducttypeContainer) {
    //         // console.log('transform changed!')
    //         providerProducttypeContainer.style.transform = `translateY(${transformValue}px)`
    //     }
    //
    // }, [providerProductTypeContainerRef.current, transformValue]);

    return (
        <>
            <KeepAlive cacheKey={'Provider'}>
                <div
                    onScroll={e => {
                        if(!providerContainerRefDub?.current) return;
                        handleWindowScroll();
                    }}
                    // style={{overflowY: `hidden`}}
                    // onTouchStart={e => {
                    //     setProviderPosition(e.targetTouches[0].clientY);
                    // }}
                    // onTouchMove={e => {
                    //     if(e.targetTouches[0].clientY < providerPosition + 150) {
                    //         setHideCover(true);
                    //     }
                    //
                    // }}
                    ref={providerScreenRef} className={'ProviderScreen'}
                >
                    {
                        !loadingProvider && !loadingCategories ? (
                        // false ? (
                        // !loadingProvider && !loadingCategories ? (
                            // Object.keys(provider).length !== 0 ? (
                            <div                     style={{paddingTop: `${navHeight}px`}}
                                                     ref={providerContainerRefDub} >
                                {/*<div className={`ProviderScreen__profile--container`}>*/}
                                {/*    <ProviderProfile hidden={hideCover} currentUser={currentUser} takemeUserToken={takemeUserToken} prov={true} socials={false} link={false} provider={provider} />*/}
                                {/*</div>*/}
                                {/*<div*/}
                                {/*    onTouchStart={e => {*/}
                                {/*        setCategoryBarPosition(e.targetTouches[0].clientY);*/}
                                {/*    }}*/}
                                {/*    onTouchMove={e => {*/}
                                {/*        if(e.targetTouches[0].clientY + 100 > categoryBarPosition) {*/}
                                {/*            setHideCover(false);*/}
                                {/*            setCategoryBarPosition(e.targetTouches[0].clientY);*/}
                                {/*        }*/}
                                {/*    }}*/}
                                {/*    className={'Provider__categories'}*/}
                                {/*    ref={categoriesContainerRef}*/}
                                {/*>*/}
                                {/*    <Categories loadingCategories={loadingCategories} categories={categories} provider={true} curId={curId} />*/}
                                {/*    {!fetchingItemTypes ? <ProductsTypesLabel changeCurItemTypeId={changeStoreCurrentItemType} fetchItems={fetchStoreItems} fetchProviderProductsTypes={fetchStoreItemTypes} market={false} more={more} page={page} curId={curId} loadingProductTypes={fetchingItemTypes} transFormValue={transformValue} containerHeight={productTypeHeight} setTransformValue={setTransformValue} swiper={swiperInstance} active={active} setActive={setActive} productTypes={itemTypes} /> : <ItemTypesShimmer />}*/}
                                {/*</div>*/}
                                <div className={'ProviderScreen__items'}>
                                    {
                                        fetchingItems ? (
                                            <ItemShimmer store={true} value={100} />
                                        ) : (
                                            <div
                                                ref={providerProductTypeContainerRef}
                                                className={`ProviderScreen__productTypes--container`}
                                            >
                                                <Items
                                                    store={true}
                                                    curItemTypeId={currentItemTypeId}
                                                    moreItems={itemsMore}
                                                    itemsPage={itemsPage}
                                                    items={items}
                                                    value={100}
                                                    lan={lan}
                                                    fetchProductsMarket={fetchStoreItems}
                                                    setCurrentProduct={setCurrentProduct}
                                                    scrollParent={providerScreenRef?.current}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ) : (
                            <StorePageShimmer navHeight={navHeight} />
                        )
                    }
                </div>
            </KeepAlive>
            <Outlet />
        </>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan,
    provider: state.provider.provider,
    gallery: state.provider.galleryOpen,
    galleryProduct: state.product.galleryProduct,
    loadingProvider: state.provider.loadingProvider,
    filter: state.categories.filter,
    productTypes: state.provider.productTypes,
    loadingProductTypes: state.provider.loadingProductTypes,
    catId: state.categories.curId,
    page: state.provider.page,
    more: state.provider.more,
    categories: state.provider.categories,
    curId: state.provider.curId,
    loadingCategories: state.provider.loadingCategories,
    takemeProviderData: state.login.takemeProviderData,
    takemeProviderToken: state.login.takemeProviderToken,
    currentUser: state.login.takemeUserData,
    takemeUserToken: state.login.takemeUserToken,
    itemTypes: state.provider.itemTypes,
    fetchingItemTypes: state.provider.fetchingItemTypes,
    items: state.provider.items,
    fetchingItems: state.provider.fetchingItems,
    itemsPage: state.provider.itemsPage,
    itemsMore: state.provider.itemsMore,
    currentItemTypeId: state.provider.currentItemTypeId
});

export default connect(mapStateToProps, {fetchStoreItemTypes, fetchProviderCategories, openGallery, changeCurrentId, changeStoreCurrentItemType, fetchStoreItems, changeNavbarAssets, fetchProviderData, fetchProviderProductsTypes, closeProviderGallery, resetProviderProductTypesData, openProviderGallery, changePopupProduct, openPopup}) (React.memo(ProviderScreen));