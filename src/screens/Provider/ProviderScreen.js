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


    useEffect(() => {
        const swiperContainer = swiperRef?.current?.swiper;
        let removeInlineStyles;
        if(swiperContainer) {
            removeInlineStyles = () => {
                const slides = swiperContainer.slides;
                slides.forEach((slide) => {
                    slide.style.height = ''; // Remove inline height
                    slide.style.marginBottom = ''; // Remove inline margin-bottom
                });
            };

            console.log(swiperContainer)
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

            console.log('Loading ProductTypes!')
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
            console.log(data);
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

    const location = useLocation();
    const providerScreenRef = useRef();

    const categoriesContainerRef = useRef();
    const providerProductTypeContainerRef = useRef();

    useEffect(() => {
        const productTypesContainer = providerProductTypeContainerRef?.current;
        const categoriesContainer = categoriesContainerRef?.current;
        if(productTypesContainer && categoriesContainer) {
            productTypesContainer.style.height = `${window?.innerHeight - categoriesContainer.getBoundingClientRect().height - 50}px`;
        }
    }, [providerProductTypeContainerRef?.current, categoriesContainerRef?.current]);

    useEffect(() => {
        const providerContainer = providerProductTypeContainerRef?.current;
        if(providerContainer) {
            const slides = providerContainer.querySelectorAll('.swiper-slide');
            slides.forEach((slide) => {
                console.log(slide);
                slide.style.height = 'auto'; // Override the default height
                slide.style.marginBottom = '0'; // Override the default margin
            });
        }
    }, [providerProductTypeContainerRef?.current]);


    return (
        <>
            <KeepAlive cacheKey={'Provider'}>
                <div
                    style={{overflowY: `${hideCover ? 'auto' : 'hidden'}`}}
                    onTouchStart={e => {
                        setProviderPosition(e.targetTouches[0].clientY);
                    }}
                    onTouchMove={e => {
                        if(e.targetTouches[0].clientY < providerPosition) {
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
                                        if(e.targetTouches[0].clientY > categoryBarPosition) {
                                            setHideCover(false);
                                            setCategoryBarPosition(e.targetTouches[0].clientY);
                                        }
                                    }}
                                    className={'Provider__categories'}
                                    ref={categoriesContainerRef}
                                >
                                    <Categories loadingCategories={loadingCategories} categories={categories} provider={true} curId={curId} />
                                    {!loadingProductTypes && productTypes?.length > 0 && <ProductsTypesLabel swiper={swiperInstance} active={active} setActive={setActive} />}
                                </div>
                                {
                                    loadingProductTypes ? (
                                        <SpinnerComponent />
                                    ) : (
                                        <div
                                            ref={providerProductTypeContainerRef} className={`ProviderScreen__productTypes--container`}
                                            style={{overflowY: `${!hideCover ? 'hidden': 'auto'}`}}
                                        >
                                            <Swiper
                                                onSwiper={swiper => {
                                                    swiperRef.current = swiper.el;
                                                    setSwiperInstance(swiper);
                                                    console.log(swiper.slides);
                                                    swiper.slides.map((slide) => {
                                                        slide.style.height = 'auto';
                                                    });
                                                }}
                                                // virtual={true}
                                                direction={'vertical'}
                                                spaceBetween={20}
                                                className={'mySwiper'}
                                                slidesPerView={1}
                                                coverflowEffect={{
                                                    rotate: 50,
                                                    stretch: 0,
                                                    modifier: 3,
                                                    slideShadows: false,
                                                }}
                                                grabCursor={true}
                                                onSlideChange={slider => {
                                                    console.log(slider.activeIndex);
                                                    setActive(productTypes[slider.activeIndex]?.id);
                                                    setTScroll(false);
                                                    setBScroll(false);
                                                }}
                                                // onReachEnd={swiper => {
                                                //     if(more) {
                                                //         const data = {
                                                //             providerId: params.providerId,
                                                //             categoryListIds: (curId === 0 || curId === null) ?  null : [curId],
                                                //             productTypeId: null,
                                                //             navigate,
                                                //             filter,
                                                //             lan,
                                                //             page
                                                //         };
                                                //         fetchProviderProductsTypes(data);
                                                //     }
                                                // }}
                                                // autoHeight={false}
                                            >
                                                {
                                                    productTypes?.map((productType, i) => (
                                                        <SwiperSlide className={`ProviderScreen__swiper`} style={{height: '700px !important'}} key={productType?.id}>
                                                            <ProviderProductType
                                                                currentUser={currentUser}
                                                                takemeUserToken={takemeUserToken}
                                                                takemeProviderData={takemeProviderData}
                                                                takemeProviderToken={takemeProviderToken}
                                                                productTypes={productTypes}
                                                                containerRef={providerScreenRef}
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
                                                            />
                                                        </SwiperSlide>
                                                    ))
                                                }
                                            </Swiper>
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