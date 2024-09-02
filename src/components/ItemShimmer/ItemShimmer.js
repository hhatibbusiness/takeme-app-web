import React, {useEffect, useRef} from 'react';
import './ItemShimmer.css';
import locationImage from "../../assets/images/socials/location.png";
import callImg from '../../assets/images/socials/call.png';
import whatsapp from "../../assets/images/socials/whatsapp.png";

const ItemShimmer = ({value, store, setImageRef}) => {

    const imgRef = useRef();

    useEffect(() => {
        const imageContainer = imgRef.current;
        if(imageContainer) {
            console.log(imageContainer);
            imageContainer.style.height = `${imageContainer.getBoundingClientRect().width}px`;
            window.addEventListener('resize', e => {
                imageContainer.style.height = `${imageContainer.getBoundingClientRect().width}px`;
            })
        }
    }, [imgRef, value]);

    useEffect(() => {
        if(setImageRef) {
            setImageRef(imgRef);
        }
    }, [imgRef?.current]);

    return (
        <div className={'ItemShimmer'}>
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
                <div className="ItemShimmer__desc">
                    <div className="ItemShimmer__desc--name"></div>
                    <div className="ItemShimmer__desc--price"></div>
                    <div className="ItemShimmer__desc--text"></div>
                </div>
            </div>
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
        </div>
    );
};

export default ItemShimmer;