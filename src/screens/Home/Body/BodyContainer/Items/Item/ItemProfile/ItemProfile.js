import React, {useRef, useState} from 'react';
import './ItemProfile.css';
import Img from "../../../ProductList/Products/Product/Img/Img";
import providerDefaultImage from '../../../../../../../assets/images/defaults/default-provider-image.png'
import LoadingProduct from "../../../../../../../components/LoadingProduct/LoadingProduct";
import verifiedImage from "../../../../../../../assets/images/verifiedImage.svg";
import {useNavigate} from "react-router-dom";

const ItemProfile = ({item}) => {
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgLoaderRef = useRef(null);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);

    const navigate = useNavigate();

    return (
        <div onClick={e => {
            navigate(`/provider/${item?.storeDetails?.providerId}`)
        }} className={'ItemProfile'}>
            <div className="ItemProfile__avatar">
                <Img provider={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={item?.storeDetails && item?.storeDetails?.imagePath || providerDefaultImage} />
                {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
                {/*{true && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}
            </div>
            <div className="ItemProfile__name">
                <p>{item?.storeDetails?.name}</p>
                <img src={verifiedImage} alt="" className={`ProviderImage__verified`}/>

            </div>
        </div>
    );
};

export default ItemProfile;