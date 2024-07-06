import React, {useEffect, useRef, useState} from 'react';
import './Img.scss';
import {connect} from "react-redux";
import providerDefault from '../../../../../../../../assets/images/defaults/default-provider-image.png';
import productDefault from '../../../../../../../../assets/images/defaults/default-product-image.png';
import logoDefault from '../../../../../../../../assets/images/defaults/logo-default-image.svg'
import categoryDefault from '../../../../../../../../assets/images/categoryalt.jpg'
import ListItemDefault from '../../../../../../../../assets/images/defaults/listitemdefault.svg';
import 'react-medium-image-zoom/dist/styles.css'
import {LazyLoadImage} from "react-lazy-load-image-component";
import coverDefaultImage from '../../../../../../../../assets/images/defaults/cover.gif';


const Img = ({value, logo, search, popup, category, cover, isCover, imgUrl, gallery, setError, setHidden, setLoaded, setImgLoaded, imgRefDub: imgRef, activeIndex, provider, product}) => {
    const [transform, setTransform] = useState('');
    const [defaultImage, setDefaultImage] = useState(null);
    const [zooming, setZooming] = useState(false);
    const [scale, setScale] = useState(1);
    const [startDistance, setStartDistance] = useState(0);
    const [isDefaultWorking, setIsDefaultWorking] = useState(false);

    const getDistance = touches => {
        const [touch1, touch2] = touches;
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientX - touch2.clientX;
        return Math.sqrt(dx * dx + dy * dy);
    }

    useEffect(() => {
        setTransform(transform + 'closed');
    }, [activeIndex]);

    useEffect(() => {
        setDefaultImage(imgUrl);
    }, []);
    const transformContainerRef = useRef();

    const onUpdate = ({ x, y, scale }) => {
        const { current: img } = imgRef?.current;
        if (img) {
            // Apply zoom and position transformations
            const transformValue = `translate(${x}px, ${y}px) scale(${scale})`;
            img.style.transform = transformValue;
        }
    };

    return (
        gallery ? (
            <div
                ref={transformContainerRef}
                className={'Img__container'}
                onTouchStart={e => {
                    // console.log('touch start!', e.touches);
                    if(e.touches.length === 2) {
                        // console.log('touch double!')
                        setStartDistance(getDistance(e.touches));
                    }
                }}
                onTouchMove={e => {
                    const transformContainer = transformContainerRef?.current;
                    if(e.touches.length === 2 && transformContainer) {
                        const currentDistance = getDistance(e.touches);
                        setScale(scale * (currentDistance/startDistance));
                        setStartDistance(currentDistance);
                        transformContainer.style.transform = `scale(${scale})`;
                    }
                }}
                onTouchEnd={e => {
                    const transformContainer = transformContainerRef?.current;
                    if(transformContainer) {
                        transformContainer.style.transform = 'scale(1)';
                        setStartDistance(0);
                        setScale(1);
                    }
                }}
            >
                <img
                    ref={imgRef}
                    onLoad={e => {
                        setImgLoaded(true);
                        setError(false);
                        setLoaded(true);
                        setHidden(false);
                    }}
                    onError={e => {
                    // setImgLoaded(true);
                    // setError(true);
                    // setLoaded(true);
                    // console.log('Error!')
                        if(provider) {
                            setDefaultImage(providerDefault)
                        } else if(product) {
                            if(isDefaultWorking) {
                                setDefaultImage(productDefault);
                            } else {
                                // console.log(defaultImage);
                                const imgUrlArray = defaultImage?.split('.');
                                // console.log(imgUrlArray);
                                imgUrlArray[imgUrlArray.length - 2] = `${imgUrlArray[imgUrlArray?.length - 2]}`.replace('_original', '');
                                setDefaultImage(imgUrlArray.join('.'));
                                setIsDefaultWorking(true);
                            }
                        } else if(logo) {
                            setDefaultImage(logoDefault)
                        } else if(category) {
                            setDefaultImage(categoryDefault);
                        } else if(popup){
                            setDefaultImage(ListItemDefault)
                        }

                        setLoaded(true);
                    }}
                    className={`Img ${gallery && 'img__gallery'}`} style={{width: `${(value < 100 && !search) && '100%'}`}}
                    onClick={() => {
                    // setGalleryOpen(true);
                    }}
                    src={defaultImage}
                    alt=""
                />
            </div>
        ) : (
            defaultImage && (
                <LazyLoadImage ref={imgRef} onLoad={e => {
                    setImgLoaded(true);
                    setError(false);
                    setLoaded(true);
                    setHidden(false);
                    // console.log('Image Loaded!', imgUrl)

                }} onError={e => {
                    // console.log('Image Error!', imgUrl);
                    setLoaded(true);
                    setImgLoaded(true);
                    if(provider) {
                        setDefaultImage(providerDefault);
                    } else if(product) {
                        // console.log('Product case!')
                        setDefaultImage(productDefault);
                    } else if(logo) {
                        setDefaultImage(logoDefault);
                    } else if(category) {
                        setDefaultImage(categoryDefault);
                    } else if(popup){
                        setDefaultImage(ListItemDefault);
                    } else if(isCover) {
                        setDefaultImage(coverDefaultImage);
                    }
                }} className={'Img'} style={{width: `${(value < 100 && !search) && '100%'}`}} onClick={() => {
                    // setGalleryOpen(true);
                }} src={defaultImage} alt=""/>
            )
        )
    );
};

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps) (React.memo(Img));