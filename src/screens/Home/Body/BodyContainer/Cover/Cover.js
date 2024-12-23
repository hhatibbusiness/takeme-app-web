import React from 'react';
import './Cover.scss';
import {connect} from "react-redux";
// import {Swiper, SwiperSlide} from "swiper/react";
// import { Autoplay, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import MediaViewer from "./MediaViewer/MediaViewer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


const Cover = ({assets, loaded, setLoaded}) => {
    var settings = {
        // dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className={'Cover'} style={{height: `${loaded ? 'auto' : '189px'}`}}>
            <div className={'Cover__Swiper--wrapper'}>
                <Slider {...settings}>
                    {
                        assets?.coverPaths?.map((image, i) => {
                            return <MediaViewer loaded={loaded} setLoaded={setLoaded} image={image}  />
                        })
                    }
                </Slider>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets,
})

export default connect(mapStateToProps) (React.memo(Cover));