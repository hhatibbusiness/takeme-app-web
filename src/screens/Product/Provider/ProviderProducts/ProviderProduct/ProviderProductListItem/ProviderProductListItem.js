import React, {useEffect, useState} from 'react';
import './ProviderProductListItem.css';
import Img from "../../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import axios from "axios";
import RenderImgError from "../../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../../components/LoadingProduct/LoadingProduct";

const ProviderProductListItem = ({item}) => {
    const [imgUI, setImgUI] = useState(null);
    const [imgLoaded, setImgLoaded] = useState(false);

    const renderImage = async () => {
        try{
            const res = await axios.get(item?.imagePath && item?.imagePath);
            if(res.status === 200) {
                const img = <Img setImgLoaded={setImgLoaded} imgUrl={item?.imagePath && item?.imagePath}/>;
                setImgUI(img);
            }
        }catch(e) {
            console.error(e);
            const imgUI = false;
            setImgLoaded(true);
            setImgUI(prevState => imgUI);
        }
    }

    useEffect(() => {
        renderImage()
    }, []);

    return (
        item?.item && <div className={'ProviderProductListItem'}>
            {
                imgLoaded ? (
                    <>
                        <div className="ProviderProductListItem__img">
                            {
                                imgUI ? imgUI : <i className="fa-solid fa-circle-check"></i>
                            }
                        </div>
                    </>
                ) : (
                    <LoadingProduct imgLoaded={imgLoaded} details={false} btn={false} />
                )
            }
            <div className="ProviderProductListItem__text">
                <span>{item?.item && item.item}</span>
            </div>
        </div>
    );
};

export default ProviderProductListItem;