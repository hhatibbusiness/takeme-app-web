import React, {useEffect, useRef, useState} from 'react';
import './Gallery.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import GalleryItem from "./GalleryItem/GalleryItem";
import Dots from "../../Dots/Dots";
import {getAnalytics, logEvent} from "firebase/analytics";
import history from "../../../../../../history/history";
import productDefaultImage from '../../../../../../assets/images/defaults/default-product-image.png'
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Zoom, Navigation, Pagination } from 'swiper/modules';

const Gallery = ({product, setGallery, closeGallery, gallery}) => {
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


    useEffect(() => {
        console.log('Gallery');
        const navbarEle = document?.querySelector('.Navbar');
        if(navbarEle) {
            navbarEle.style.visibility = "hidden";
        }

        return () => {
            navbarEle.style.visibility = "visible";
        }
    }, []);

    return (
        <div className={'Gallery'}>
            <Swiper
                slidesPerView={'auto'}
                className="mySwiper"
                zoom={true}
                modules={[Zoom, Navigation, Pagination]}

                onSlideChange={swiper => {
                    setActive(swiper.activeIndex);
                    const currentImage = product?.images?.length > 0 && product?.images[swiper.activeIndex];
                    const analytics = getAnalytics();

                    // logEvent(analytics, 'swipe-image', {
                    //     imageName: currentImage?.imagePath
                    // });

                    // if(product?.images.length == swiper.activeIndex) {
                    //     logEvent(analytics, 'last-photo', {
                    //         imagesPath: currentImage.imagesPath
                    //     })
                    // }
                }}
            >
                {
                    product?.images?.length > 0 ? product.images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <GalleryItem activeIndex={active} imgUrl={img || productDefaultImage} />
                        </SwiperSlide>
                    )) : (
                        <SwiperSlide >
                            <GalleryItem activeIndex={active} imgUrl={productDefaultImage} />
                        </SwiperSlide>
                    )
                }
            </Swiper>
            {
                product?.images?.length > 1 && <Dots color={'white'} products={product?.images && product?.images} activeIndex={active}  />
            }
            <div onClick={() => {
                history.back();
                setGallery(false);
            }} className={'Gallery__close'}><i className="fa-solid fa-xmark"></i></div>
        </div>
    );
};

export default React.memo(Gallery);