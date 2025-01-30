import React, {useEffect, useRef, useState} from 'react';
import './ProviderPreview.css';
import {connect} from "react-redux";
import Img from "../../../screens/Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import ProviderDefaultImage from "../../../assets/images/defaults/default-provider-image.png";
import LoadingProduct from "../../LoadingProduct/LoadingProduct";
import {useTranslation} from "react-i18next";
import verifiedImage from "../../../assets/images/verifiedImage.svg";
import {Link} from "react-router-dom";

const ProviderPreview = ({provider, setSidebar, takemeProviderToken, takemeProviderData}) => {
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const imgLoaderRef = useRef(null);

    const {t} = useTranslation();

    return (
        <Link onClick={e => setSidebar(false)} to={`/profile`} className={"ProviderPreview"}>
            <div className="ProviderPreview__container">
                <div className="ProviderPreview__avatar">
                    <div className="ProviderPreview__avatar--img">
                        <Img provider={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={provider?.imagePath || ProviderDefaultImage}/>
                        {/*<img className={'ProviderImage'} src={img} alt="provider"/>*/}
                        {/*{true && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}
                        {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
                    </div>
                    <div className="ProviderPreview__avatar--details">
                        <div className="ProviderPreview__avatar--details-container">
                            <div className="ProviderPreview__avatar--name">{provider?.name}</div>
                            <p>{t("enterProfile")}</p>

                        </div>
                        <img src={verifiedImage} alt="" className="ProviderPreview__avatar--verify"/>

                    </div>
                </div>
                {
                    provider?.location && (
                        <div className="ProviderPreview__location">
                            <i className="fa-solid fa-location-dot"></i>
                            <p>{provider?.city}</p>
                        </div>
                    )
                }
            </div>
        </Link>
    );
};

const mapstateToProps = state => ({
    takemeProviderToken: state.login.takemeProviderToken,
    takemeProviderData: state.login.takemeProviderData
});

export default connect(mapstateToProps) (ProviderPreview);