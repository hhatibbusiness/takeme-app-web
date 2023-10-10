import React, {useEffect, useState} from 'react';
import './ProductsTypeContainer.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import ProviderProduct from "../ProviderProduct/ProviderProduct";
import Dots from "../Dots/Dots";
import Socials from "../../Socials/Socials";

const ProductsTypeContainer = ({sliding, provider, imgRef, openGallery, keyMap: key, providerRef, productsArray, providerOrNot, setSliding}) => {
    const [activeProduct, setActiveProduct] = useState();
    const [active, setActive] = useState(0);

    useEffect(() => {
        console.log(productsArray);
        if(!productsArray && productsArray[key].length == 0) return;
        setActiveProduct(productsArray[key][0]);
    }, [productsArray]);

    console.log(productsArray, key);
    return (
        <div className={'ProductsTypeContainer'}>
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
                    setSliding(true);
                    setActive(swiper.activeIndex);
                    setTimeout(() => {
                        setSliding(false);
                    });
                    setActiveProduct(productsArray[key].length > 0 && productsArray[key][swiper.activeIndex])
                }}
            >
                {
                    productsArray[key].map((p, i) => (
                        <SwiperSlide className={'ProviderProducts__swiper'} key={i}>
                            <ProviderProduct providerOrNot={providerOrNot} productTypesCount={Object.keys(productsArray).length} providerRef={providerRef} sliding={sliding} imgRef={imgRef} product={p} openGallery={openGallery} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                productsArray[key].length > 1 && <Dots color={'black'} products={productsArray[key]} activeIndex={active}  />
            }
            <Socials provider={provider} activeProduct={activeProduct} />
        </div>

    );
};

export default ProductsTypeContainer;