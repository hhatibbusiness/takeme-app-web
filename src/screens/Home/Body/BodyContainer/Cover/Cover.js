import React, {useEffect, useState} from 'react';
import './Cover.scss';
import {connect} from "react-redux";
import axios from "axios";
import Img from "../ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../components/LoadingProduct/LoadingProduct";

const Cover = ({assets, products, categories, curId}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgUI, setImgUI] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        if(categories?.length == 0 || !curId) return;
        console.log(curId);
        setCurrentCategory(prevState => {
            return categories.filter(ca => ca.id == curId)[0];
        });
        setImgLoaded(false);
        setImgUI(null);
    }, [categories, curId]);

    const renderImage = async () => {
        try{
            console.log(currentCategory)
            const res = await axios.get(currentCategory?.imagePath);
            if(res.status === 200) {
                const img = <Img setImgLoaded={setImgLoaded} imgUrl={currentCategory?.imagePath}/>;
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
        if(categories.length == 0 || !curId || !currentCategory) return ;
        console.log(curId);
        renderImage()
    }, [currentCategory]);

    useEffect(() => {
        if(!curId) return setCurrentCategory({
            imagePath: assets.coverPath
        });
        renderImage();
    }, []);

    return (
        <div className={'Cover'}>
            {/*<img src={assets?.coverPath && assets.coverPath} className={'Cover__img'} />*/}
            {
                imgUI && (
                    imgUI
                )
            }
            <LoadingProduct priceStartFrom={true} priceTitle={false} imgLoaded={imgLoaded} details={false} btn={false} />
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets,
    products: state.categories.products,
    categories: state.categories.categories,
    curId: state.categories.curId
})

export default connect(mapStateToProps) (Cover);