import React, {useEffect, useState} from 'react';
import './Gallery.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import {connect} from "react-redux";
import ProviderProduct from "../ProviderProduct";
import GalleryItem from "./GalleryItem/GalleryItem";
import Dots from "../../Dots/Dots";
import {getAnalytics, logEvent} from "firebase/analytics";

const Gallery = ({product, closeGallery}) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const provider = document.querySelector('.ProviderScreen');
        const freezeStyles = () => {
            provider && provider.classList.add('scrollable')
        }
        const releaseStyles = () => {
            provider && provider.classList.remove('scrollable')
        }

        freezeStyles();

        return () => {
            releaseStyles();
        }
    }, []);

    return (
        <div className={'Gallery'}>
            <Swiper
                effect={"coverflow"}
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
                pagination={true}
                className="mySwiper"
                onSlideChange={swiper => {
                    setActive(swiper.activeIndex);
                    const currentImage = product?.images?.length > 0 && product?.images[swiper.activeIndex];
                    console.log(currentImage);
                    const analytics = getAnalytics();

                    logEvent(analytics, 'swipe-image', {
                        imageName: currentImage?.imagePath
                    });

                    if(product?.images.length == swiper.activeIndex) {
                        logEvent(analytics, 'last-photo', {
                            imagesPath: currentImage.imagesPath
                        })
                    }
                }}
            >
                {
                    product?.images?.length > 0 && product.images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <GalleryItem imgUrl={img} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                product?.images?.length > 1 && <Dots color={'white'} products={product?.images && product?.images} activeIndex={active}  />
            }
            <div onClick={() => {
                closeGallery()
            }} className={'Gallery__close'}><i className="fa-solid fa-xmark"></i></div>
        </div>
    );
};

export default Gallery;