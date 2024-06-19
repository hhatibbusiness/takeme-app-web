import React, {useRef, useState} from 'react';
import './ProviderProductVariable.scss';
import Img from "../../../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import LoadingProduct from "../../../../../../../components/LoadingProduct/LoadingProduct";
import okImage from '../../../../../../../assets/images/defaults/ok.svg'

const ProviderProductVariable = ({variable}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hidden, setHidden] = useState(true);
    const imgLoaderRef = useRef(null);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);

    return (
        variable?.value && variable?.key && <div className={'ProviderProductVariable'}>
            {variable?.iconPath && <div className="ProviderProductVariable__icon">
                {/*<img src={variable.iconPath} />*/}
                <Img popup={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={okImage && okImage}/>
                {/*{true && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}
                {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
            </div>}
            {
                variable?.value && <span className={'ProviderProductVariable__property'}>{variable.value} :</span>
            }
            {
                variable?.key && <span className={'ProviderProductVariable__property--value'}>{variable.key}</span>
            }
        </div>
    );
};

export default React.memo(ProviderProductVariable);