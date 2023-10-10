import React, {useEffect, useRef} from 'react';
import './Img.scss';
import {connect} from "react-redux";
import {changeSliderValue} from "../../../../../../../../store/actions/categories.action";

const Img = ({value, ref, imgUrl, setImgLoaded, imgRefDub: imgRef}) => {
    // const imgRef = useRef();
    useEffect(() => {
        if(!imgRef?.current) return;
        const image = imgRef?.current;
        image.addEventListener('load', () => {
            console.log(imgUrl);
            setImgLoaded(true);
        })
    }, [imgRef]);
    return (
        <img ref={imgRef}  className={'Img'} style={{width: `${value < 100 && '100%'}`}} onClick={() => {
            // setGalleryOpen(true);
        }} src={imgUrl} alt=""/>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps, {changeSliderValue}) (Img);