import React, {useEffect, useState} from 'react';
import './Gallery.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import {connect} from "react-redux";
import ProviderProduct from "../ProviderProduct";
import GalleryItem from "./GalleryItem/GalleryItem";
import Dots from "../../Dots/Dots";
import {closeGallery} from "../../../../../../store/actions/product.actions";

const Gallery = ({product, closeGallery}) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const product = document.querySelector('.ProductScreen');
        const freezeStyles = () => {
            product.classList.add('scrollable')
        }
        const releaseStyles = () => {
            product.classList.remove('scrollable')
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

const mapStateToProps = state => ({
    product: state.product.galleryProduct
})

export default connect(mapStateToProps, {closeGallery}) (Gallery);