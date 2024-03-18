import React, {useEffect, useState} from 'react';
import './ProductsTypeContainer.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import ProviderProduct from "../ProviderProduct/ProviderProduct";
import Socials from "../../Socials/Socials";
import {fetchProviderProductsTypes} from "../../../../../store/actions/provider.actions";

import { Navigation, Pagination } from 'swiper';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import navigation styles
import 'swiper/css/pagination';
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
// import ReactCarouselDots from "react-carousel-dots/src"; // Import pagination styles
import Dots from 'react-carousel-dots';
import SocialsNew from "../../SocialsNew/SocialsNew";

const ProductsTypeContainer = ({sliding, lan, filter, curId, setGallery, fetchProviderProductsTypes, arrayRef, provider, imgRef, openGallery, keyMap: key, providerRef, productsArray, providerOrNot, setSliding}) => {
    const [activeProduct, setActiveProduct] = useState();
    const [products, setProducts] = useState([]);
    const [active, setActive] = useState(0);
    const [dots, setDots] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(productsArray);
        if(!productsArray && productsArray.length == 0) return;
        setActiveProduct(productsArray[0]);
    }, [productsArray]);

    useEffect(() => {
        setDots(productsArray?.products?.length);
    }, [productsArray]);

    const handleSwipeMove = (swiper) => {
        const diffX = swiper.touches.currentX - swiper.touches.startX;
        const isSwipeRight = diffX > 0;

        console.log(`Swiped ${isSwipeRight ? 'right' : 'left'}`);
        console.log(swiper);
        return;
        // swiper.classNames[0].push('swiper-no-swiping');
    };

    const params = useParams();

    // useEffect(() => {
    //     console.log(productsArray?.products?.splice(1, 2));
    // }, [productsArray]);

    return (
        <div className={'ProductsTypeContainer'}>
            <Swiper
                // preventInteractionOnTransition={true}
                // allowTouchMove={false}
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
                spaceBetween={20}
                // pagination={ true }
                className="mySwiper"
                modules={[Pagination, Navigation]}
                onSlideChange={swiper => {
                    console.log('swiper works')
                    setSliding(true);
                    setActive(swiper.activeIndex);
                    setTimeout(() => {
                        setSliding(false);
                    });
                    console.log(productsArray);
                    setActiveProduct(productsArray?.products.length > 0 && productsArray?.products[swiper.activeIndex])
                }}
                onSwiper={(swiper) => console.log(swiper)}
                // onTouchStart={(swiper) => {
                //     const direction = swiper.touches.startX > swiper.touches.currentX ? 'right' : 'left';
                //     console.log(`Swiped ${direction}`);
                // }}
                // on={{
                //     slideNextTransitionStart: () => {
                //         console.log('Swipping right!')
                //     }
                // }}

                // onTouchMove={handleSwipeMove}
                // onTouchStart={handleSwipeMove}
                // onReachBeginning={swiper => {
                //     console.log(swiper)
                // }}

                // onReachEnd={swiper => {
                //     console.log(productsArray);
                //     if(productsArray.more) {
                //         const data = {
                //             providerId: params.providerId,
                //             categoryListIds: curId == 0 ? null : [curId],
                //             productTypeId: productsArray.id,
                //             page: productsArray.page,
                //             lan,
                //             filter,
                //             navigate
                //         };
                //
                //         fetchProviderProductsTypes(data);
                //     }
                // }}
            >
                {
                    productsArray?.products?.map((p, i) => (
                        <SwiperSlide className={'ProviderProducts__swiper'} key={i}>
                            <ProviderProduct setGallery={setGallery} arrayRef={arrayRef} providerOrNot={providerOrNot} productTypesCount={Object.keys(productsArray).length} providerRef={providerRef} sliding={sliding} imgRef={imgRef} product={p} openGallery={openGallery} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {/*{*/}
            {/*    productsArray[key].length > 1 && <Dots color={'black'} products={productsArray[key]} activeIndex={active}  />*/}
            {/*}*/}
            <div className="ProviderProduct__dots--container">
                {
                    productsArray?.products?.length > 1 && <Dots length={dots} active={active} className={`${dots <= 10 ? 'dots--center' : ''}`} visible={10}/>
                }
            </div>
            <SocialsNew provider={provider} activeProduct={activeProduct} />
        </div>

    );
};

const mapStateToProps = state => ({
    curId: state.categories.curId,
    filter: state.categories.filter,
    lan: state.categories.lan,

})

export default connect(mapStateToProps, {fetchProviderProductsTypes}) (ProductsTypeContainer);