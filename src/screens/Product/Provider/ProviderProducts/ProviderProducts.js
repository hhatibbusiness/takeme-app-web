import React, {useEffect, useRef, useState} from 'react';
import ProviderProduct from "./ProviderProduct/ProviderProduct";
import Failure from "./Failure/Failure";
import './ProviderProducts.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Dots from "./Dots/Dots";


const ProviderProducts = ({products, openGallery}) => {
    const carouselRef = useRef();
    const imgRef = useRef();
    const [productsArray, setProductsArray] = useState([]);
    const [sliding, setSliding] = useState(false);
    const [active, setActive] = useState(0);

    const groupProducts = products => {
        const productsArray = [];
        Object.keys(products).map((p, i) => {
            return products[p].map((product, j) => {
                return productsArray.push(product);
            })
        });
        setProductsArray(productsArray);
    }

    useEffect(() => {
        groupProducts(products);
    }, [products]);

    return (
        <div ref={carouselRef} className={'ProviderProducts ProviderProducts__carousel'}>
            {
                Object.keys(products).length > 0 ? (
                    <>
                        <Swiper
                            // effect={"coverflow"}
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
                                setSliding(true);
                                setActive(swiper.activeIndex);
                                setTimeout(() => {
                                    setSliding(false);
                                });
                            }}
                        >
                            {
                                productsArray.map((p, i) => (
                                    <SwiperSlide key={i}>
                                        <ProviderProduct sliding={sliding} imgRef={imgRef} product={p} openGallery={openGallery} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        {
                            productsArray.length > 1 && <Dots color={'black'} products={productsArray} activeIndex={active}  />
                        }

                    </>
                ) : (
                    <Failure />
                )
            }
        </div>
    );
};

export default ProviderProducts;