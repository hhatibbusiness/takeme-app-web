import React, {useEffect, useRef, useState} from 'react';
import './ProviderImage.scss';
import {connect} from "react-redux";
import {closePopup, changePopupProduct, openPopup, changeDestination} from "../../../../../store/actions/ui.actions";
import verifiedImage from '../../../../../assets/images/verifiedImage.svg';
import Img from "../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import LoadingProduct from "../../../../../components/LoadingProduct/LoadingProduct";
import ProviderDefaultImage from '../../../../../assets/images/defaults/default-provider-image.png'
import {changeCurrentProvider} from "../../../../../store/actions/ui.actions";

const ProviderImage = ({img, id, p, isAuthenticated, changeCurrentProvider, prov, closePopup, openPopup, changeDestination, changePopupProduct, activeProduct}) => {
    const [array, setArray] = useState([]);
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const imgLoaderRef = useRef(null);

    useEffect(() => {
        const array = Array.from(Array(5).keys());
        setArray(array);
    }, []);

    return (
        <div className={'ProviderImage__container'}>
            <Img provider={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={img || ProviderDefaultImage}/>
            {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
            <img src={verifiedImage} alt="" className={`ProviderImage__verified ${prov ? 'ProviderImage__verified--provider' : ''}`}/>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated
})

export default connect(mapStateToProps, {closePopup, changeCurrentProvider, changeDestination, changePopupProduct, openPopup}) (React.memo(ProviderImage));