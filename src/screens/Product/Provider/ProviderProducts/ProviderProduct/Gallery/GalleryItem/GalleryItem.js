import React, {useEffect, useState} from 'react';
import axios from "axios";
import Img from "../../../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../../../components/LoadingProduct/LoadingProduct";
import './GalleryItem.scss';
const GalleryItem = ({imgUrl}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgUI, setImgUI] = useState(null);

    const renderImage = async () => {
        try{
            const res = await axios.get(imgUrl.imagePath);
            if(res.status === 200) {
                const img = <Img setImgLoaded={setImgLoaded} imgUrl={imgUrl.imagePath}/>;
                setImgUI(img);
            }
        }catch(e) {
            console.error(e);
            const imgUI =  <RenderImgError />;
            setImgLoaded(true);
            setImgUI(prevState => imgUI);
        }
    }

    useEffect(() => {
        renderImage()
    }, []);

    return (
        <div className={'GalleryItem'}>
            {
                imgUI ? (
                    imgUI
                ) : (
                    <LoadingProduct imgLoaded={imgLoaded}/>
                )
            }
        </div>
    );
};

export default GalleryItem;