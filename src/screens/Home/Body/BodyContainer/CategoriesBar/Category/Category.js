import React, {memo, useEffect, useRef, useState} from 'react';
import './Category.css';
import {connect} from "react-redux";
import {changeId, fetchCategoryProducts, resetPageNumber} from "../../../../../../store/actions/categories.action";
import {changeSearchCategoryId, fetchSearchResults} from "../../../../../../store/actions/search.actions";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../../../../utls/firebase.auth";
import {useNavigate} from "react-router-dom";
import categoryAlt from '../../../../../../assets/images/categoryalt.jpg';
import KeepAlive from "react-activation";
import {useTranslation} from "react-i18next";
import Img from "../../ProductList/Products/Product/Img/Img";
import LoadingProduct from "../../../../../../components/LoadingProduct/LoadingProduct";
import {changeCurrentId} from "../../../../../../store/actions/provider.actions";

const Category = ({
    cat,
    changeSearchCategoryId,
    searchId,
    changeCurrentId,
    id,
    changeId,
    fetchCategoryProducts,
    lan,
    resetPageNumber,
    provider,
    page,
    home,
    search,
    fetchSearchResults,
    term,
    filter,
    curId
}) => {
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const imgLoaderRef = useRef(null);

    // const imgRef = useRef();
    // useEffect(() => {
    //     console.log(cat);
    //     renderImage()
    // }, []);

    // const renderImage = async () => {
    //
    //     try{
    //         const res = await axios.get(cat.imagePath);
    //         console.log(res.status);
    //         if(res.status === 200) {
    //             return imgRef.current.src = cat.imagePath;
    //         }
    //     }catch(e) {
    //         console.error(e);
    //         return imgRef.current.src = notFoundImg;
    //     }
    // }
    const navigate = useNavigate();
    const imageRef = useRef();
    const {t} = useTranslation();

    return (
        <a onClick={async () => {
            // if(home) {
            //     console.log(document.querySelector('.Products').offsetHeight);
                resetPageNumber();
                const containerHeight = document.querySelector('.Products').offsetHeight;
                document.querySelector('.Products').style.height = `${containerHeight}px`;
                const res = await fetchCategoryProducts(cat?.id && cat.id, lan, 0, filter, navigate);
                document.querySelector('.Products') && (document.querySelector('.Products').style.height = 'auto');
                // console.log(cat?.id);
                if(provider) {
                    changeCurrentId(cat?.id && cat.id);

                } else {
                    changeSearchCategoryId(cat?.id && cat.id);
                    changeId(cat?.id && cat.id);

                }
            // }
            // if(search) {
            //     changeSearchCategoryId(cat?.id && cat.id);
            //     // fetchSearchResults(lan, cat?.id && cat.id, 'All', term, 0)
            // }
            logEvent(analytics, 'category_clicked', {CategoryId: cat?.id, CategoryName: cat?.name})
        }}  draggable={false} className={`Category ${ curId === (cat?.id && cat.id) && 'Category__active'}`} >
            <div className="Category__container">
                <Img category={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={(cat?.imagePath && cat?.imagePath) || categoryAlt}/>
                {/*<img className={'ProviderImage'} src={img} alt="provider"/>*/}
                {/*{true && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}
                {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}

                {/*<img ref={imageRef} onError={e => {*/}
                {/*    if(imageRef?.current) {*/}
                {/*        imageRef.current.src = categoryAlt;*/}
                {/*    }*/}
                {/*}} src={cat?.imagePath && cat.imagePath} draggable={false} />*/}
            </div>
            <p style={{wordBreak: "break-word"}} draggable={false}>{cat?.id != 0 ? cat?.name && (cat.name.length <= 24 ? cat.name : cat.name.substring(0, 24) + ' ...') : t('all')}</p>
        </a>
    );
};

const mapStateToProps = state => ({
    id: state.categories.curId,
    searchId: state.search.categoryId,
    lan: state.categories.lan,
    page: state.categories.page,
    term: state.search.term,
    filter: state.categories.filter
});

export default connect(mapStateToProps, {changeId, fetchCategoryProducts, changeCurrentId, resetPageNumber, changeSearchCategoryId, fetchSearchResults}) (memo(Category));