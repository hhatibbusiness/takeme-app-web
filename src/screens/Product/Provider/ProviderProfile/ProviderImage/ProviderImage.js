import React, {useEffect, useRef, useState} from 'react';
import './ProviderImage.scss';
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {closePopup, changePopupProduct, openPopup, changeDestination} from "../../../../../store/actions/ui.actions";
import {useTranslation} from "react-i18next";
import verifiedImage from '../../../../../assets/images/verifiedImage.svg';
import Img from "../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import LoadingProduct from "../../../../../components/LoadingProduct/LoadingProduct";
import filledStar from '../../../../../assets/images/product/Filled star.svg';
import unFilledStar from '../../../../../assets/images/product/Unfilled star.svg';
import halfFilledStar from '../../../../../assets/images/product/Half filled star.svg';
import ProviderDefaultImage from '../../../../../assets/images/defaults/default-provider-image.png'
import {changeCurrentProvider} from "../../../../../store/actions/ui.actions";

const ProviderImage = ({img, id, p, isAuthenticated, changeCurrentProvider, closePopup, openPopup, changeDestination, changePopupProduct, activeProduct}) => {
    const [array, setArray] = useState([]);
    const [currentLocation, setCurrentLocation] = useState('');
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const imgLoaderRef = useRef(null);

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        // console.log(img);
    }, []);

    const renderStars = (rating, i) => {
        const floorNumber = Math.floor(rating);
        const ceil = Math.ceil(rating);
        if(floorNumber == ceil) {
            // console.log(floorNumber, ceil);
            // console.log('star is empty');
            if (i < ceil) {
                return <img className={'ProductImage__star'} src={filledStar} />
            }
            return <img className={'ProductImage__star'} src={unFilledStar} />
            // return <i style={{color: `${i < p.ratingsScore && 'gold'}`}} className={`ProductImage__star ${i < ceil ? 'fa-solid' : 'fa-regular'} fa-star`}></i>
        } else {
            // console.log('star is solid');
            if(i <= floorNumber - 1 || i > ceil - 1) {
                return i <= ceil - 1 ? <img className={'ProductImage__star'} src={filledStar} /> : <img className={'ProductImage__star'} src={unFilledStar} />
            }
            return <img className={'ProductImage__star'} src={halfFilledStar} />
            // return <i style={{color: `${i < ceil && 'gold'}`/*, transform: 'rotateY(180deg)'*/}} className={`ProductImage__star ${i <= ceil - 1 ? 'fa-solid' : 'fa-regular'} ${(i <= floorNumber - 1 || i > ceil - 1) ? 'fa-star' : 'fa-star-half-stroke'} ${'ProductImage__star--rotated'}`}></i>;
        }
    }
    //
    // const renderStars = (rating, i) => {
    //     const floorNumber = Math.floor(rating);
    //     const ceil = Math.ceil(rating);
    //     if(floorNumber == ceil) {
    //         console.log(floorNumber, ceil);
    //         console.log('star is empty')
    //         return <svg xmlns="http://www.w3.org/2000/svg" fill={'gold'} id="star"><path d="M92.3 38.6 64 34.9 51.8 9.1c-.7-1.5-2.9-1.5-3.6 0L36 34.9 7.7 38.6c-1.7.2-2.3 2.2-1.1 3.4l20.7 19.6-5.2 28.1c-.3 1.6 1.4 2.9 2.9 2.1l25-13.6 25 13.6c1.5.8 3.2-.5 2.9-2.1l-5.2-28.1L93.4 42c1.2-1.2.5-3.2-1.1-3.4zM69.1 59.5c-.5.5-.7 1.1-.6 1.8l4.7 25L51 74.1c-.3-.2-.6-.2-1-.2-.3 0-.7.1-1 .2L26.8 86.3l4.7-25c.1-.7-.1-1.3-.6-1.8L12.4 42l25.2-3.3c.7-.1 1.3-.5 1.6-1.1l10.8-23 10.9 22.9c.3.6.9 1 1.5 1.1L87.6 42 69.1 59.5z"></path><path fill="#00F" d="M1084-370v1684H-700V-370h1784m8-8H-708v1700h1800V-378z"></path></svg>
    //
    //         // return <i style={{color: `${i < p.ratingsScore && 'gold'}`}} className={`ProductImage__star ${i < ceil ? 'fa-solid' : 'fa-regular'} fa-star`}></i>
    //     } else {
    //         console.log('star is solid')
    //         return <i style={{color: `${i < ceil && 'gold'}`/*, transform: 'rotateY(180deg)'*/}} className={`ProductImage__star ${i <= ceil - 1 ? 'fa-solid' : 'fa-regular'} ${(i <= floorNumber - 1 || i > ceil - 1) ? 'fa-star' : 'fa-star-half-stroke'} ${'ProductImage__star--rotated'}`}></i>;
    //     }
    // }

    useEffect(() => {
        const array = Array.from(Array(5).keys());
        setArray(array);
        // console.log(p);
    }, []);

    return (
        <div className={'ProviderImage__container'}>
            <Img provider={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={img || ProviderDefaultImage}/>
            {/*<img className={'ProviderImage'} src={img} alt="provider"/>*/}
            {/*{true && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}
            {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
            <img src={verifiedImage} alt="" className="ProviderImage__verified"/>
            {/*<div  className="ProviderImage__ratings">*/}
            {/*    {*/}
            {/*        p?.ratingsCount > 0 ? (*/}
            {/*            <p onClick={e => {*/}
            {/*                e.stopPropagation();*/}
            {/*                e.preventDefault();*/}
            {/*                if(!isAuthenticated) {*/}
            {/*                    closePopup();*/}
            {/*                    return navigate('/login', {state: {previousLocation: currentLocation}})*/}
            {/*                };*/}
            {/*                changePopupProduct(activeProduct);*/}
            {/*                openPopup();*/}
            {/*                changeDestination(true);*/}
            {/*                changeCurrentProvider(p);*/}
            {/*            }} className={'ProviderBody__score'}>*/}
            {/*                {*/}
            {/*                    p?.ratingsScore && p?.ratingsScore > 0 && (*/}
            {/*                        <p className={'ProviderBody__stars'}>*/}
            {/*                            {*/}
            {/*                                p?.ratingsScore && array.map((a, i) => (*/}
            {/*                                    renderStars(p?.ratingsScore, i)*/}
            {/*                                ))*/}
            {/*                            }*/}
            {/*                        </p>*/}
            {/*                    )*/}
            {/*                }<span className={'ProviderImage__score--count'}>({p?.ratingsCount && p.ratingsCount})</span>*/}
            {/*            </p>*/}
            {/*        ) : (*/}
            {/*            <p style={{color: `var(--main-color-green-dark-1)`, fontWeight: 'bold', columnGap: '3px', display: 'flex', alignItems: "center", position: "absolute", bottom: '-20px', fontSize: '12px', left: '50%', transform: "translateX(-50%)", width: "100%"}} onClick={e => {*/}
            {/*                e.preventDefault();*/}
            {/*                e.stopPropagation();*/}
            {/*                changePopupProduct(activeProduct);*/}
            {/*                openPopup();*/}
            {/*                changeDestination(true);*/}
            {/*                changeCurrentProvider(p);*/}
            {/*            }}><i className="fa-solid fa-plus"></i>{t("add-rating")}</p>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated
})

export default connect(mapStateToProps, {closePopup, changeCurrentProvider, changeDestination, changePopupProduct, openPopup}) (ProviderImage);