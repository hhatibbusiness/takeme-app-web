import React, {useEffect, useRef, useState} from 'react';
import './Img.scss';
import {connect} from "react-redux";
import {MapInteractionCSS} from 'react-map-interaction';

const Img = ({value, imgUrl, gallery, setError, setHidden, setLoaded, setImgLoaded, imgRefDub: imgRef}) => {
    // const imgRef = useRef();
    // useEffect(() => {
    //     if(!imgRef?.current) return;
    //     const image = imgRef?.current;
    //     image.addEventListener('load', () => {
    //         console.log(imgUrl);
    //         setImgLoaded(true);
    //         console.log('Hello from Image!')
    //         setContainerLoaded(true);
    //     })
    // }, [imgRef]);

    // useEffect(() => {
    //     if(!imgRef?.current) return;
    //     const image = imgRef?.current;
    //     image.addEventListener('load', () => {
    //         console.log(imgUrl);
    //         setImgLoaded(true);
    //         console.log('Hello from Image!')
    //         setContainerLoaded(true);
    //     });
    //     image.addEventListener('error', e => {
    //         console.log('Helo there!');
    //         setImgLoaded(true);
    //         setContainerLoaded(true);
    //     });
    // }, [imgRef]);
    useEffect(() => {
        if(!imgUrl) {
            setImgLoaded(true);
            setError(true);
            setLoaded(true);
        }
    }, [imgUrl]);
    return (
        gallery ? (
            <div className={'Img__container'}>
                <MapInteractionCSS>
                    <img ref={imgRef} onLoad={e => {
                        setImgLoaded(true);
                        setError(false);
                        setLoaded(true);
                        setHidden(false);
                    }} onError={e => {
                        setImgLoaded(true);
                        setError(true);
                        setLoaded(true);
                    }} className={`Img ${gallery && 'img__gallery'}`} style={{width: `${value < 100 && '100%'}`}} onClick={() => {
                        // setGalleryOpen(true);
                    }} src={imgUrl} alt=""/>
                </MapInteractionCSS>
            </div>
            ) : (
            <img ref={imgRef} onLoad={e => {
                setImgLoaded(true);
                setError(false);
                setLoaded(true);
                setHidden(false);
            }} onError={e => {
                setImgLoaded(true);
                setError(true);
                setLoaded(true);
            }} className={'Img'} style={{width: `${value < 100 && '100%'}`}} onClick={() => {
                // setGalleryOpen(true);
            }} src={imgUrl} alt=""/>
        )

    );
};

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps) (Img);