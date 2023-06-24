import React, {useEffect, useRef, useState} from 'react';
import ProviderProduct from "./ProviderProduct/ProviderProduct";
import Failure from "./Failure/Failure";
import './ProviderProducts.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Dots from "./Dots/Dots";


const ProviderProducts = ({products}) => {
    const carouselRef = useRef();
    const imgRef = useRef();
    const [productsArray, setProductsArray] = useState([]);
    const [sliding, setSliding] = useState(false);
    const [active, setActive] = useState(0);

    // useEffect(() => {
    //     const carousel = carouselRef.current;
    //     if(!carousel) return;
    //     const firstImg = imgRef.current;
    //     console.log(firstImg)
    //     if(!firstImg) return;
    //     var lastX;
    //     var lastY;
    //     var pressed = false;
    //     var dragDirection = undefined;
    //     let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
    //     const autoSlide = () => {
    //         // if there is no image left to scroll then return from here
    //         if(Math.abs(carousel.scrollLeft) - (carousel.scrollWidth - carousel.clientWidth) > -1 || Math.abs(carousel.scrollLeft) < 0) return;
    //
    //         positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    //         let firstImgWidth = firstImg.clientWidth + 14;
    //         // getting difference value that needs to add or reduce from carousel left to take middle img center
    //         let valDifference = firstImgWidth - positionDiff;
    //
    //         if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
    //             return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    //         }
    //         // if user is scrolling to the left
    //         carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    //     }
    //     const dragStart = (e) => {
    //         // updatating global variables value on mouse down event
    //         isDragStart = true;
    //         prevPageX = e.pageX || e.touches[0].pageX;
    //         prevScrollLeft = carousel.scrollLeft;
    //         tap(e);
    //     }
    //
    //     function xpos(e) {
    //         if (e.targetTouches && (e.targetTouches.length >= 1)) {
    //             return e.targetTouches[0].clientX;
    //         }
    //         return e.clientX;
    //     };
    //
    //     function ypos(e) {
    //         if (e.targetTouches && (e.targetTouches.length >= 1)) {
    //             return e.targetTouches[0].clientY;
    //         }
    //         return e.clientY;
    //     };
    //
    //     function tap(e) {
    //         lastX = xpos(e);
    //         lastY = ypos(e);
    //     }
    //
    //
    //     const dragging = (e) => {
    //         // scrolling images/carousel to left according to mouse pointer
    //         function drag(e) {
    //             if (dragDirection === undefined) {
    //                 var deltaX = Math.abs(lastX - xpos(e));
    //                 var deltaY = Math.abs(lastY - ypos(e));
    //                 // console.log('drag', deltaX, deltaY);
    //                 if (deltaX > 10) {
    //                     return true;
    //                 } else if (deltaY > 10) {
    //                     return false;
    //                 }
    //             }
    //         }
    //
    //         dragDirection = drag(e);
    //         console.log(dragDirection);
    //         if(!dragDirection) return;
    //         if(!isDragStart) return;
    //         e.preventDefault();
    //         isDragging = true;
    //         carousel.classList.add("ProviderProduct__dragging");
    //         positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    //         carousel.scrollLeft = prevScrollLeft - positionDiff;
    //     }
    //
    //     const dragStop = () => {
    //         isDragStart = false;
    //         carousel.classList.remove("ProviderProduct__dragging");
    //         if(!isDragging) return;
    //         isDragging = false;
    //         autoSlide();
    //     }
    //
    //     carousel.addEventListener("mousedown", dragStart);
    //     carousel.addEventListener("touchstart", dragStart);
    //
    //     carousel.addEventListener("mousemove", dragging);
    //     carousel.addEventListener("touchmove", dragging);
    //
    //     carousel.addEventListener("mouseup", dragStop);
    //     carousel.addEventListener("touchend", dragStop);
    // }, []);

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
                                        <ProviderProduct sliding={sliding} imgRef={imgRef} product={p} />
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