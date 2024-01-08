import React, {useEffect, useRef, useState} from 'react';
import './Cover.scss';
import {connect} from "react-redux";
// import axios from "axios";
import Img from "../ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../components/LoadingProduct/LoadingProduct";
import cover1 from '../../../../../assets/images/cover1.jpg';
import cover2 from '../../../../../assets/images/cover2.jpg';
import cover3 from '../../../../../assets/images/cover3.jpg';
import {Swiper, SwiperSlide} from "swiper/react";
import CoverImg from "./CoverImg/CoverImg";
import Dots from "../../../../Product/Provider/ProviderProducts/Dots/Dots";

import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import "swiper/css/navigation";
import CoverVideo from "./CoverVideo/CoverVideo";
import MediaViewer from "./MediaViewer/MediaViewer";

SwiperCore.use([Autoplay, Navigation, Pagination]);


const images = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const Cover = ({assets}) => {
    const [imgLoaded, setImgLoaded] = useState(true);
    const [imgUI, setImgUI] = useState(true);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hidden, setHidden] = useState(true);
    const imgRefDub = useRef(null);
    const failureRef= useRef(null);
    const imgContainerRef = useRef(null);
    const [sliding, setSliding] = useState(false);
    const [active, setActive] = useState(0);

    // useEffect(() => {
    //     if(categories?.length == 0 || !curId) return;
    //     console.log(curId);
    //     setCurrentCategory(prevState => {
    //         return categories.filter(ca => ca.id == curId)[0];
    //     });
    //     setImgLoaded(false);
    //     setImgUI(null);
    // }, [categories, curId]);

    // const renderImage = async () => {
    //     try{
    //         console.log(currentCategory)
    //         const res = await axios.get(assets?.coverPath && assets?.coverPath);
    //         if(res.status === 200) {
    //             const img = await  <Img setContainerLoaded={setContainerLoaded} imgRefDub={imgRefDub} setImgLoaded={setImgLoaded} imgUrl={assets?.coverPath && assets?.coverPath}/>;
    //             // setImgUI(img);
    //             // await setImgLoaded(true);
    //             setImgUI(img);
    //         }
    //     }catch(e) {
    //         console.error(e);
    //         const imgUI =  <RenderImgError />;
    //         setImgLoaded(true);
    //         setImgUI(prevState => imgUI);
    //     }
    // }
    //
    // useEffect(() => {
    //     renderImage()
    // }, [assets]);

    // useEffect(() => {
    //     if(categories.length == 0 || !curId || !currentCategory) return ;
    //     console.log(curId);
    //     renderImage()
    // }, [currentCategory]);
    //
    // useEffect(() => {
    //     if(!curId) return setCurrentCategory({
    //         imagePath: assets.coverPath
    //     });
    //     renderImage();
    // }, []);

    useEffect(() => {
        console.log(error, loaded);
    }, []);

    return (
        <div className={'Cover'}>
            {/*<img src={assets?.coverPath && assets.coverPath} className={'Cover__img'} />*/}
            {/*{*/}
            {/*    imgUI && (*/}
            {/*        <>*/}
                        <div className={'Cover__Swiper--wrapper'}>
                            <Swiper
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={1}
                                coverflowEffect={{
                                    rotate: 50,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 3,
                                    slideShadows: false,
                                }}
                                autoplay={{ delay: 5000 }}
                                loop={true}
                                // spaceBetween={30}
                                // slidesPerView={3}
                                // navigation={{
                                //     nextEl: nextRef.current,
                                //     prevEl: prevRef.current,
                                //     disabledClass: "swiper-button-disabled"
                                // }}
                                modules={[Navigation]}
                                pagination={true}
                                className="mySwiper"
                                onSwiper={swiper => {
                                    console.log(swiper.activeIndex);
                                    setSliding(true);
                                    setActive(swiper.activeIndex);
                                    setTimeout(() => {
                                        setSliding(false);
                                    });
                                }}
                            >
                                {
                                    images.map((image, i) => (
                                        <SwiperSlide>
                                            <MediaViewer image={image}  />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                        {/*{*/}
                        {/*    images.length > 1 && <Dots color={'white'} products={images} activeIndex={active} setActiveIndex={setActive}  />*/}
                        {/*}*/}
                        {/*<LoadingProduct priceStartFrom={true} priceTitle={false} imgLoaded={imgLoaded} details={false} btn={false} />*/}
            {/*        </>*/}
            {/*    )*/}
            {/*}*/}
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets,
    // products: state.categories.products,
    // categories: state.categories.categories,
    // curId: state.categories.curId
})

export default connect(mapStateToProps) (Cover);