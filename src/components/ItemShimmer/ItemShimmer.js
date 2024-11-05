import React, {useEffect, useRef} from 'react';
import './ItemShimmer.css';
import locationImage from "../../assets/images/socials/location.png";
import callImg from '../../assets/images/socials/call.png';
import whatsapp from "../../assets/images/socials/whatsapp.png";

const ItemShimmer = ({value, store, setImageRef}) => {

    const imgRef = useRef();
    const imgRefV = useRef()

    useEffect(() => {
        const imageContainer = imgRef.current;
        if(imageContainer) {
            imageContainer.style.height = value == 100 ? `${imageContainer.getBoundingClientRect().width}px` : 'auto';
            window.addEventListener('resize', e => {
                imageContainer.style.height = value == 100 ? `${imageContainer.getBoundingClientRect().width}px` : 'auto';
            })
        }
    }, [imgRef, value]);

    useEffect(() => {
        if(setImageRef) {
            setImageRef(imgRef);
        }
    }, [imgRef?.current, value]);

    const turnValueIntoCol = value => {
        if(value === 0) {
            return {
                col: 'repeat(4, 1fr)',
                gap: 10
            }
        }else if(value === 50) {
            return {
                col: 'repeat(2, 1fr)',
                gap: 10
            }
        }
        return {
            col: 'repeat(1, 1fr)',
            gap: 10
        }
    }

    useEffect(() => {
        const imgContainer = imgRefV.current;
        if(imgContainer) {
            const imgContainerHeight = imgContainer.getBoundingClientRect().width;
            imgContainer.style.height = `${imgContainerHeight}px`;
        }
    }, [imgRefV.current?.getBoundingClientRect().width, value]);


    return (
        <div
            className={'ItemShimmer'}
            style={{gridTemplateColumns: `${turnValueIntoCol(value).col}`, gap: `${value == 100 ? '10px' : turnValueIntoCol(value).gap}px`, display: `${value == 100 ? 'block' : 'grid'}`}}
        >
            {
                value == 100 ? (
                    <>
                        {
                            !store && (
                                <div className="ItemShimmer__profile">
                                    <div className="ItemShimmer__profile--right">
                                        <div className="ItemShimmer__profile--avatar"></div>
                                        <div className="ItemShimmer__profile--name"></div>
                                    </div>
                                    <div className="ItemShimmer__profile--left">
                                        <div className="ItemShimmer__location">
                                            <i className="fa-solid fa-location-dot"></i>
                                            <p className={'ItemShimmer__location--country'}></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="ItemShimmer__middle">
                            <div ref={imgRef} className="ItemShimmer__image"></div>
                            {
                                value == 100 && (
                                    <div className="ItemShimmer__desc">
                                        <div className="ItemShimmer__desc--name"></div>
                                        <div className="ItemShimmer__desc--price"></div>
                                        <div className="ItemShimmer__desc--text"></div>
                                    </div>
                                )
                            }
                        </div>
                        {
                            value == 100 && (
                                <>
                                    <div className={`ItemShimmer__separator ${value < 100 && 'ItemShimmer__disappear'}`}></div>
                                    <div className="ItemShimmer__bottom">
                                        <div className="ItemShimmer__social">
                                            <img className={'SocialsNew__link--image'} src={locationImage} alt=""/>
                                            <p>الموقع</p>

                                        </div>
                                        <div className="ItemShimmer__social">
                                            <img className={'SocialsNew__link--image'} src={whatsapp} alt=""/>
                                            <p>واتساب</p>
                                        </div>

                                        <div className="ItemShimmer__social">
                                            <img className={'SocialsNew__link--image'} src={callImg} alt=""/>
                                            <p>اتصال</p>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div className="ItemShimmer__middle">
                            <div ref={imgRefV} style={{height: `${imgRefV.current?.getBoundingClientRect()?.width}px`}} className="ItemShimmer__image"></div>
                        </div>
                        <div className="ItemShimmer__middle">
                            <div ref={imgRefV} style={{height: `${imgRefV.current?.getBoundingClientRect()?.width}px`}} className="ItemShimmer__image"></div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default ItemShimmer;