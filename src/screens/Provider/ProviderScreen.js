import React, {useEffect, useRef, useState} from 'react';
import './ProviderSceen.scss';
import {connect} from "react-redux";
import {fetchProviderData, closeProviderGallery, openProviderGallery, fetchProviderProductsTypes, resetProviderProductTypesData, changeCurrentId} from "../../store/actions/provider.actions";
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


const ProviderScreen = ({fetchProviderData, takemeUserToken, currentUser, takemeProviderToken, takemeProviderData, changeCurrentId, fetchingProductTypes, fetchProviderCategories, categories, loadingCategories, curId, page, more, loadingProductTypes, productTypes, changeNavbarAssets, loadingProvider, filter, resetProviderProductTypesData, fetchProviderProductsTypes, lan, provider, gallery, galleryProduct, closeProviderGallery, openProviderGallery, changePopupProduct, openPopup, catId, openGallery}) => {
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

    const categoriesContainerRef = useRef();
    const providerProductTypeContainerRef = useRef();

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

            // console.log(swiperContainer)
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

            const data = {
                providerId: params.providerId,
                categoryListIds: (curId === 0 || curId === null) ?  null : [curId],
                productTypeId: null,
                navigate,
                filter,
                lan,
                page: 0
            };

            // console.log('Loading ProductTypes!')
            await fetchProviderProductsTypes(data);
        })();
    }, [params.providerId, curId]);

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

    useEffect(() => {
        const providerProducttypeContainer = providerProductTypeContainerRef.current;
        if(providerProducttypeContainer) {
            // console.log('transform changed!')
            providerProducttypeContainer.style.transform = `translateY(${transformValue}px)`
        }

    }, [providerProductTypeContainerRef.current, transformValue]);

    return (
        <>
            <KeepAlive cacheKey={'Provider'}>
                <div
                    style={{overflowY: `hidden`}}
                    onTouchStart={e => {
                        setProviderPosition(e.targetTouches[0].clientY);
                    }}
                    onTouchMove={e => {
                        if(e.targetTouches[0].clientY < providerPosition + 150) {
                            setHideCover(true);
                        }

                    }}
                    ref={providerScreenRef} className={'ProviderScreen'}
                >
                    {
                        !loadingProvider && !loadingCategories ? (
                            // Object.keys(provider).length !== 0 ? (
                            <div>
                                <div className={`ProviderScreen__profile--container ${hideCover ? 'ProviderProfile__hidden' : 'ProviderProfile__display'}`}>
                                    <ProviderProfile hidden={hideCover} currentUser={currentUser} takemeUserToken={takemeUserToken} prov={true} socials={false} link={false} provider={provider} />
                                </div>
                                <div
                                    onTouchStart={e => {
                                        setCategoryBarPosition(e.targetTouches[0].clientY);
                                    }}
                                    onTouchMove={e => {
                                        if(e.targetTouches[0].clientY + 100 > categoryBarPosition) {
                                            setHideCover(false);
                                            setCategoryBarPosition(e.targetTouches[0].clientY);
                                        }
                                    }}
                                    className={'Provider__categories'}
                                    ref={categoriesContainerRef}
                                >
                                    <Categories loadingCategories={loadingCategories} categories={categories} provider={true} curId={curId} />
                                    {!loadingProductTypes && productTypes?.length > 0 && <ProductsTypesLabel transFormValue={transformValue} containerHeight={productTypeHeight} setTransformValue={setTransformValue} swiper={swiperInstance} active={active} setActive={setActive} />}
                                </div>
                                {
                                    loadingProductTypes ? (
                                        <SpinnerComponent />
                                    ) : (
                                        <div
                                            ref={providerProductTypeContainerRef}
                                            className={`ProviderScreen__productTypes--container`}
                                        >
                                            {/*<Swiper*/}
                                            {/*    onSwiper={swiper => {*/}
                                            {/*        swiperRef.current = swiper.el;*/}
                                            {/*        setSwiperInstance(swiper);*/}
                                            {/*        console.log(swiper.slides);*/}
                                            {/*        // swiper.slides.forEach(slide => { slide.style.height = '500px'; })*/}
                                            {/*    }}*/}
                                            {/*    // virtual={true}*/}
                                            {/*    direction={'vertical'}*/}
                                            {/*    spaceBetween={20}*/}
                                            {/*    className={'mySwiper'}*/}
                                            {/*    slidesPerView={1}*/}
                                            {/*    coverflowEffect={{*/}
                                            {/*        rotate: 50,*/}
                                            {/*        stretch: 0,*/}
                                            {/*        modifier: 3,*/}
                                            {/*        slideShadows: false,*/}
                                            {/*    }}*/}
                                            {/*    grabCursor={true}*/}
                                            {/*    onSlideChange={slider => {*/}
                                            {/*        console.log(slider.activeIndex);*/}
                                            {/*        setActive(productTypes[slider.activeIndex]?.id);*/}
                                            {/*        setTScroll(false);*/}
                                            {/*        setBScroll(false);*/}
                                            {/*    }}*/}
                                            {/*    // onReachEnd={swiper => {*/}
                                            {/*    //     if(more) {*/}
                                            {/*    //         const data = {*/}
                                            {/*    //             providerId: params.providerId,*/}
                                            {/*    //             categoryListIds: (curId === 0 || curId === null) ?  null : [curId],*/}
                                            {/*    //             productTypeId: null,*/}
                                            {/*    //             navigate,*/}
                                            {/*    //             filter,*/}
                                            {/*    //             lan,*/}
                                            {/*    //             page*/}
                                            {/*    //         };*/}
                                            {/*    //         fetchProviderProductsTypes(data);*/}
                                            {/*    //     }*/}
                                            {/*    // }}*/}
                                            {/*    autoHeight={true}*/}
                                            {/*>*/}
                                                {
                                                    productTypes?.map((productType, i, array) => (
                                                        // <SwiperSlide className={`ProviderScreen__swiper`} key={productType?.id}>
                                                        <div className={'ProviderScreen__productType--container'}>
                                                            {
                                                                indicationTop && i != 0 && productType?.id == active && <ChangeIndication bottom={false} prev={ productTypes[i - 1]?.name} />
                                                            }
                                                            <ProviderProductType
                                                                setActive={setActive}
                                                                array={array}
                                                                currentUser={currentUser}
                                                                takemeUserToken={takemeUserToken}
                                                                takemeProviderData={takemeProviderData}
                                                                takemeProviderToken={takemeProviderToken}
                                                                productTypes={productTypes}
                                                                containerRef={providerProductTypeContainerRef}
                                                                index={i}
                                                                tScroll={tScroll}
                                                                setTScroll={setTScroll}
                                                                bScroll={bScroll}
                                                                setBScroll={setBScroll}
                                                                provider={provider}
                                                                productType={productType}
                                                                openGallery={openGallery}
                                                                active={active}
                                                                enableSwiping={enableSwiping}
                                                                setEnableSwiping={setEnableSwiping}
                                                                url={location?.pathname}
                                                                swiperInstance={swiperInstance}
                                                                hidden={hideCover}
                                                                containerScroll={containerScroll}
                                                                setContainerScroll={setContainerScroll}
                                                                currentProductType={currentProductType}
                                                                setCurrentProductType={setCurrentProductType}
                                                                productTypeContainer={providerProductTypeContainerRef}
                                                                containerHeight={productTypeHeight}
                                                                transformValue={transformValue}
                                                                setTransformValue={setTransformValue}
                                                                scrollValue={scrollValue}
                                                                setScrollValue={setScrollValue}
                                                                indicationBottom={indicationBottom}
                                                                setIndicationBottom={setIndicationBottom}
                                                                indicationTop={indicationTop}
                                                                setIndicationTop={setIndicationTop}
                                                                next={productTypes[i + 1]}
                                                                prev={productTypes[i - 1]}
                                                            />
                                                            {
                                                                indicationBottom && productType?.id == active && i + 1 != productTypes?.length && <ChangeIndication bottom={true} next={productTypes[i + 1]?.name} />
                                                            }

                                                        </div>
                                                        // </SwiperSlide>
                                                    ))
                                                }
                                            {/*</Swiper>*/}
                                        </div>
                                    )
                                }

                            </div>
                        ) : (
                            <SpinnerComponent />
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
});

export default connect(mapStateToProps, {fetchProviderCategories, openGallery, changeCurrentId, changeNavbarAssets, fetchProviderData, fetchProviderProductsTypes, closeProviderGallery, resetProviderProductTypesData, openProviderGallery, changePopupProduct, openPopup}) (React.memo(ProviderScreen));