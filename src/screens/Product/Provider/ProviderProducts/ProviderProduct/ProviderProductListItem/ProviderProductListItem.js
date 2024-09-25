import React, {useRef, useState} from 'react';
import './ProviderProductListItem.css';
import Img from "../../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import LoadingProduct from "../../../../../../components/LoadingProduct/LoadingProduct";
import listItemDefault from '../../../../../../assets/images/defaults/listitemdefault.svg';


const ProviderProductListItem = ({item}) => {
    const [imgUI, setImgUI] = useState(true);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hidden, setHidden] = useState(true);
    const imgLoaderRef = useRef(null);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);

    return (
        item?.item && <div className={'ProviderProductListItem'}>
            {
                imgUI && (
                    <>
                        <div className="ProviderProductListItem__img">
                            <Img popup={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={(item?.imagePath && item?.imagePath) || listItemDefault}/>
                            {/*{loaded && error && <RenderImgError hidden={hidden} setHidden={setHidden} imgLoaderRef={imgLoaderRef} failureRef={failureRef} elemRef={imgContainerRef} /> }*/}
                        </div>
                    </>
                )
            }
            {/*{true && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}
            {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
            <div className="ProviderProductListItem__text">
                <span>{item?.item && item.item}</span>
            </div>
        </div>
    );
};

export default React.memo(ProviderProductListItem);