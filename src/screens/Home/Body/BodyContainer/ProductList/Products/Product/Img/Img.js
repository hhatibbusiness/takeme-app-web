import React, {useEffect, useRef, useState} from 'react';
import './Img.scss';
import {connect} from "react-redux";
import {MapInteractionCSS} from 'react-map-interaction';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import provider from "../../../../../../../Product/Provider/Provider";
import providerDefault from '../../../../../../../../assets/images/defaults/default-provider-image.png';
import productDefault from '../../../../../../../../assets/images/defaults/default-product-image.png';
import logoDefault from '../../../../../../../../assets/images/defaults/logo-default-image.svg'
import categoryDefault from '../../../../../../../../assets/images/categoryalt.jpg'
import ListItemDefault from '../../../../../../../../assets/images/defaults/listitemdefault.svg';

const Img = ({value, logo, popup, category, imgUrl, gallery, setError, setHidden, setLoaded, setImgLoaded, imgRefDub: imgRef, activeIndex, provider, product}) => {
    const [transform, setTransform] = useState('');
    const [defaultImage, setDefaultImage] = useState(null);

    const transformationRef = useRef();

    useEffect(() => {
        // console.log('changed')
        setTransform(transform + 'closed');
    }, [activeIndex]);

    useEffect(() => {
        setDefaultImage(imgUrl);
    }, []);
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
    // useEffect(() => {
    //     if(!imgUrl) {
    //         setImgLoaded(true);
    //         setError(true);
    //         setLoaded(true);
    //     }
    // }, [imgUrl]);

    useEffect(() => {
        // console.log('Img container rendered!')
    }, []);

    return (
        gallery ? (
            <div className={'Img__container'}>
                <TransformWrapper
                    ref={transformationRef}
                    disablePadding={true}
                    onPanningStop={() => console.log('Hello From here!')}
                    onZoomStop={e => {
                        console.log('Transformation stopped!')
                        transformationRef?.current?.resetTransform();
                    }}
                >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <TransformComponent>
                            {/*<input onChange={e => {*/}
                            {/*    console.log('Changed');*/}
                            {/*    resetTransform()*/}
                            {/*}}  value={transform} type="text"/>*/}
                            <img ref={imgRef} onLoad={e => {
                                setImgLoaded(true);
                                setError(false);
                                setLoaded(true);
                                setHidden(false);
                            }} onError={e => {
                                // setImgLoaded(true);
                                // setError(true);
                                // setLoaded(true);
                                // console.log('Error!')
                                if(provider) {
                                    setDefaultImage(providerDefault)
                                } else if(product) {
                                    setDefaultImage(productDefault)
                                } else if(logo) {
                                    setDefaultImage(logoDefault)
                                } else if(category) {
                                    setDefaultImage(categoryDefault);
                                } else if(popup){
                                    setDefaultImage(ListItemDefault)
                                }
                            }} className={`Img ${gallery && 'img__gallery'}`} style={{width: `${value < 100 && '100%'}`}} onClick={() => {
                                // setGalleryOpen(true);
                            }} src={defaultImage} alt=""/>
                        </TransformComponent>

                    )}
                </TransformWrapper>
            </div>
            ) : (
                defaultImage && (
                    <img ref={imgRef} onLoad={e => {
                        setImgLoaded(true);
                        setError(false);
                        setLoaded(true);
                        setHidden(false);
                    }} onError={e => {
                        // setImgLoaded(true);
                        // setError(true);
                        // setLoaded(true);
                        // console.log('Error!')
                        if(provider) {
                            setDefaultImage(providerDefault)
                        } else if(product) {
                            // console.log('Product case!')
                            setDefaultImage(productDefault)
                        } else if(logo) {
                            setDefaultImage(logoDefault)
                        } else if(category) {
                            setDefaultImage(categoryDefault);
                        } else if(popup){
                            setDefaultImage(ListItemDefault)
                        }
                    }} className={'Img'} style={{width: `${value < 100 && '100%'}`}} onClick={() => {
                        // setGalleryOpen(true);
                    }} src={defaultImage} alt=""/>
                )
        )

    );
};

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps) (Img);