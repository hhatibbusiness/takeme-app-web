import React, {useEffect, useRef, useState} from 'react';
import ProviderProduct from "./ProviderProduct/ProviderProduct";
import Failure from "./Failure/Failure";
import './ProviderProducts.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import {useTranslation} from "react-i18next";
import 'swiper/css';
import "swiper/css/navigation";
import Dots from 'react-carousel-dots';
import ProductsTypeContainer from "./ProductsTypeContainer/ProductsTypeContainer";

const ProviderProducts = ({products, url, productTypes, setGallery, providerRef, search, openGallery, setActiveProduct, providerOrNot, provider}) => {
    const carouselRef = useRef();
    const imgRef = useRef();
    const [productsArray, setProductsArray] = useState([]);
    const [sliding, setSliding] = useState(false);
    const [active, setActive] = useState(0);
    const containerRef = useRef();
    const [dots, setDots] = useState(0);

    useEffect(() => {
        setDots(productsArray?.length);
    }, [productsArray]);


    const groupProducts = products => {
        if(providerOrNot) {
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
    }

    useEffect(() => {
        groupProducts(products);
    }, [products, productTypes]);

    const {t} = useTranslation();

    return (
        <div id={'ProviderProducts'} ref={carouselRef} className={'ProviderProducts ProviderProducts__carousel'}>
            {
                providerOrNot ? productsArray.map((productType, i) => productsArray.length > 0 ? (
                        <div ref={containerRef} className={'ProviderProducts__array'}>
                            <ProductsTypeContainer setGallery={setGallery} arrayRef={containerRef} provider={provider} openGallery={openGallery} imgRef={imgRef} providerRef={providerRef} providerOrNot={providerOrNot} sliding={sliding} setSliding={setSliding} productsArray={productType} setActiveProduct={setActiveProduct} />
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
                            spaceBetween={20}
                            modules={[Pagination, Navigation]}

                            className="mySwiper"
                            onSlideChange={swiper => {
                                setSliding(true);
                                setActive(swiper.activeIndex);
                                setTimeout(() => {
                                    setSliding(false);
                                });
                                setActiveProduct(productsArray.length > 0 && productsArray[swiper.activeIndex])
                            }}
                        >
                            {
                                productsArray.map((p, i) => (
                                    <SwiperSlide className={'ProviderProducts__swiper'} key={i}>
                                        <ProviderProduct url={url} setGallery={setGallery} arrayRef={containerRef} providerOrNot={providerOrNot}  providerRef={providerRef} sliding={sliding} imgRef={imgRef} product={p} openGallery={openGallery} provider={provider} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <div className="ProviderProduct__dots--container">
                            {
                                productsArray?.length > 1 && <Dots length={dots} active={active} className={`${dots <= 10 ? 'dots--center' : ''}`} visible={10}/>
                            }
                        </div>
                    </div>
                ) : (
                    <Failure text={t('fail to load providers')} />
                )
            }
        </div>
    );
};

export default React.memo(ProviderProducts);