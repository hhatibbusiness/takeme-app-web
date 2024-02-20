import React, {useEffect, useRef, useState} from 'react';
import ProviderProduct from "./ProviderProduct/ProviderProduct";
// import ProviderProduct from "./ProviderProduct/ProviderProductTest";
import Failure from "./Failure/Failure";
import './ProviderProducts.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";

import {useTranslation} from "react-i18next";

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
import Dots from "./Dots/Dots";
import {getAnalytics, logEvent} from "firebase/analytics";
import ProductsTypeContainer from "./ProductsTypeContainer/ProductsTypeContainer";


const ProviderProducts = ({products, productTypes, setGallery, providerRef, search, openGallery, setActiveProduct, providerOrNot, provider}) => {
    const carouselRef = useRef();
    const imgRef = useRef();
    const [productsArray, setProductsArray] = useState([]);
    const [sliding, setSliding] = useState(false);
    const [active, setActive] = useState(0);
    const nextRef = useRef();
    const prevRef = useRef();
    const containerRef = useRef();

    const groupProducts = products => {
        if(providerOrNot) {
            // console.log(productTypes)
            setProductsArray(productTypes);
        } else {
            const productsArray = [];
            Object.keys(products).map((p, i) => {
                return products[p].map((product, j) => {
                    return productsArray.push(product);
                })
            });
            setProductsArray(productsArray);
            productsArray.length > 0 && setActiveProduct(productsArray[0]);
        }
        // const productsArray = [];
        // Object.keys(products).map((p, i) => {
        //     return products[p].map((product, j) => {
        //         return productsArray.push(product);
        //     })
        // });
        // setProductsArray(productsArray);
        // productsArray.length > 0 && setActiveProduct(productsArray[0]);

    }

    useEffect(() => {
        groupProducts(products);
    }, [products, productTypes]);

    useEffect(() => {

    }, []);

    const {t} = useTranslation();

    return (
        <div id={'ProviderProducts'} ref={carouselRef} className={'ProviderProducts ProviderProducts__carousel'}>
            {
                // Object.keys(products).length > 0 ? (
                //     <div className={'ProviderProducts__array'}>
                //         <Swiper
                //             grabCursor={true}
                //             centeredSlides={true}
                //             slidesPerView={'auto'}
                //             coverflowEffect={{
                //                 rotate: 50,
                //                 stretch: 0,
                //                 depth: 100,
                //                 modifier: 3,
                //                 slideShadows: false,
                //             }}
                //             // navigation={{
                //             //     nextEl: nextRef.current,
                //             //     prevEl: prevRef.current,
                //             //     disabledClass: "swiper-button-disabled"
                //             // }}
                //             // modules={[Navigation]}
                //             pagination={true}
                //             className="mySwiper"
                //             onSlideChange={swiper => {
                //                 setSliding(true);
                //                 setActive(swiper.activeIndex);
                //                 setTimeout(() => {
                //                     setSliding(false);
                //                 });
                //                 console.log(swiper.activeIndex);
                //                 const currentProduct = productsArray.length > 0 && productsArray[swiper.activeIndex]
                //                 setActiveProduct(currentProduct);
                //                 const analytics = getAnalytics();
                //                 logEvent(analytics, 'swipe', {
                //                     productName: currentProduct.name,
                //                     productId: currentProduct.id
                //                 });
                //                 console.log(productsArray[swiper.activeIndex]);
                //                 if(productsArray.length == swiper.activeIndex) {
                //                     logEvent(analytics, 'last-product', {
                //                         productId: currentProduct.id,
                //                         productName: currentProduct.name
                //                     })
                //                 }
                //             }}
                //         >
                //             {
                //                 productsArray.map((p, i) => (
                //                     <SwiperSlide className={'ProviderProducts__swiper'} key={i}>
                //                         <ProviderProduct providerRef={providerRef} search={search} sliding={sliding} imgRef={imgRef} product={p} openGallery={openGallery} />
                //                     </SwiperSlide>
                //                 ))
                //             }
                //         </Swiper>
                //         {
                //             productsArray.length > 1 && <Dots color={'black'} products={productsArray} activeIndex={active}  />
                //         }
                //     </div>
                // ) : (
                //     <Failure text={t('fail to load providers')} />
                // )
                providerOrNot ? productsArray.map((productType, i) => productsArray.length > 0 ? (
                        <div ref={containerRef} className={'ProviderProducts__array'}>
                            <ProductsTypeContainer setGallery={setGallery} arrayRef={containerRef} provider={provider} openGallery={openGallery} imgRef={imgRef} providerRef={providerRef} providerOrNot={providerOrNot} sliding={sliding} setSliding={setSliding} productsArray={productType} />
                        </div>
                    ) : (
                        <Failure text={t('fail to load providers')} />
                    )
                ) : Object.keys(products).length > 0 ? (
                    <div ref={containerRef} className={'ProviderProducts__array'}>
                        <Swiper
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 3,
                                slideShadows: false,
                            }}
                            // navigation={{
                            //     nextEl: nextRef.current,
                            //     prevEl: prevRef.current,
                            //     disabledClass: "swiper-button-disabled"
                            // }}
                            // modules={[Navigation]}
                            pagination={true}
                            className="mySwiper"
                            onSlideChange={swiper => {
                                // console.log('swipper works')
                                setSliding(true);
                                setActive(swiper.activeIndex);
                                setTimeout(() => {
                                    setSliding(false);
                                });
                                setActiveProduct(productsArray.length > 0 && productsArray[swiper.activeIndex])
                            }}
                            onSwiper={swiper => {
                                // console.log(swiper);
                            }}
                        >
                            {
                                productsArray.map((p, i) => (
                                    <SwiperSlide className={'ProviderProducts__swiper'} key={i}>
                                        <ProviderProduct setGallery={setGallery} arrayRef={containerRef} providerOrNot={providerOrNot}  providerRef={providerRef} sliding={sliding} imgRef={imgRef} product={p} openGallery={openGallery} provider={provider} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        {/*{*/}
                        {/*    productsArray.length > 1 && <Dots color={'black'} products={productsArray} activeIndex={active}  />*/}
                        {/*}*/}
                    </div>
                ) : (
                    <Failure text={t('fail to load providers')} />
                )
            }
        </div>
    );
};

export default ProviderProducts;