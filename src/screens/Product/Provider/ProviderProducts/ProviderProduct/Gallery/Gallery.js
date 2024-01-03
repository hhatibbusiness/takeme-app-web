import React, {useEffect, useState} from 'react';
import './Gallery.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import {connect} from "react-redux";
import ProviderProduct from "../ProviderProduct";
import GalleryItem from "./GalleryItem/GalleryItem";
import Dots from "../../Dots/Dots";
import {getAnalytics, logEvent} from "firebase/analytics";
import history from "../../../../../../history/history";

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
        console.log(setGallery, gallery);

        // window.addEventListener('popstate', e => history.go(1));
        if(gallery) {
            window.history.pushState(null, null, window.location.href);
            window.addEventListener('popstate', e => {
                e.preventDefault();
                closeGallery();
                setGallery(false);
                console.log(history);
            });
        }

        return () => {
            window.removeEventListener('popstate', () => {
                console.log('Hello there!');
            });
        }
    }, [gallery]);

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
                            <GalleryItem activeIndex={active} imgUrl={img} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                product?.images?.length > 1 && <Dots color={'white'} products={product?.images && product?.images} activeIndex={active}  />
            }
            <div onClick={() => {
                closeGallery();
                history.back();
                setGallery(false);
            }} className={'Gallery__close'}><i className="fa-solid fa-xmark"></i></div>
        </div>
    );
};

export default Gallery;