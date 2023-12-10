import React, {useEffect, useRef, useState} from 'react';
import './Cover.scss';
import {connect} from "react-redux";
// import axios from "axios";
import Img from "../ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../components/LoadingProduct/LoadingProduct";

const Cover = ({assets}) => {
    const [imgLoaded, setImgLoaded] = useState(true);
    const [imgUI, setImgUI] = useState(true);
    const [currentCategory, setCurrentCategory] = useState(null);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const failureRef= useRef(null);
    const imgContainerRef = useRef(null);
    const [hidden, setHidden] = useState(true);

    // useEffect(() => {
    //     if(categories?.length == 0 || !curId) return;
    //     console.log(curId);
    //     setCurrentCategory(prevState => {
    //         return categories.filter(ca => ca.id == curId)[0];
    //     });
    //     setImgLoaded(false);
    //     setImgUI(null);
    // }, [categories, curId]);

    // const renderImage = async () => {
    //     try{
    //         console.log(currentCategory)
    //         const res = await axios.get(assets?.coverPath && assets?.coverPath);
    //         if(res.status === 200) {
    //             const img = await  <Img setContainerLoaded={setContainerLoaded} imgRefDub={imgRefDub} setImgLoaded={setImgLoaded} imgUrl={assets?.coverPath && assets?.coverPath}/>;
    //             // setImgUI(img);
    //             // await setImgLoaded(true);
    //             setImgUI(img);
    //         }
    //     }catch(e) {
    //         console.error(e);
    //         const imgUI =  <RenderImgError />;
    //         setImgLoaded(true);
    //         setImgUI(prevState => imgUI);
    //     }
    // }
    //
    // useEffect(() => {
    //     renderImage()
    // }, [assets]);

    // useEffect(() => {
    //     if(categories.length == 0 || !curId || !currentCategory) return ;
    //     console.log(curId);
    //     renderImage()
    // }, [currentCategory]);
    //
    // useEffect(() => {
    //     if(!curId) return setCurrentCategory({
    //         imagePath: assets.coverPath
    //     });
    //     renderImage();
    // }, []);

    return (
        <div className={'Cover'}>
            {/*<img src={assets?.coverPath && assets.coverPath} className={'Cover__img'} />*/}
            {
                imgUI && (
                    <>
                        <div ref={imgContainerRef} className={`${imgLoaded ? 'Cover__visible' : 'Cover__hidden'}`}>
                            <Img setError={setError} setHidden={setHidden} setLoaded={setLoaded} setContainerLoaded={setContainerLoaded} imgRefDub={imgRefDub} setImgLoaded={setImgLoaded} imgUrl={assets?.coverPath && assets?.coverPath}/>
                            {loaded && error && <RenderImgError hidden={hidden} setHidden={setHidden} failureRef={failureRef} cover={true} elemRef={imgContainerRef} />}
                        </div>
                        {/*<LoadingProduct priceStartFrom={true} priceTitle={false} imgLoaded={imgLoaded} details={false} btn={false} />*/}
                    </>
                )
            }
            {(!loaded || (!loaded && hidden)) && <LoadingProduct priceStartFrom={true} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets,
    // products: state.categories.products,
    // categories: state.categories.categories,
    // curId: state.categories.curId
})

export default connect(mapStateToProps) (Cover);