import React, {memo, useRef, useState} from 'react';
import './Category.css';
import {connect} from "react-redux";
import {changeId, fetchCategoryProducts, resetPageNumber, fetchItemTypes} from "../../../../../../store/actions/categories.action";
import {changeSearchCategoryId, fetchSearchResults} from "../../../../../../store/actions/search.actions";
import {fetchStoreItems, fetchStoreItemTypes} from "../../../../../../store/actions/provider.actions";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../../../../utls/firebase.auth";
import {useNavigate, useParams} from "react-router-dom";
import categoryAlt from '../../../../../../assets/images/categoryalt.jpg';
import {useTranslation} from "react-i18next";
import Img from "../../ProductList/Products/Product/Img/Img";
import LoadingProduct from "../../../../../../components/LoadingProduct/LoadingProduct";
import {changeCurrentId} from "../../../../../../store/actions/provider.actions";
import {changeCurItemTypeId} from "../../../../../../store/actions/categories.action";

const Category = ({
    providerId,
    cat,
    changeSearchCategoryId,
    changeCurrentId,
    changeId,
    fetchCategoryProducts,
    lan,
    resetPageNumber,
    provider,
    filter,
    curId,
    fetchItemTypes,
    changeCurItemTypeId,
    fetchStoreItems,
    fetchStoreItemTypes
}) => {
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const imgLoaderRef = useRef(null);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const params = useParams();

    return (
        <a
            onClick={async () => {
                if(provider) {
                    console.log('Fetching from stoer!')
                    changeCurrentId(cat?.id && cat.id);
                    const container = document.querySelector('.ProviderScreen__items');

                    if(container) {
                        container.style.height = `${container.getBoundingClientRect().height}px`;

                        const data = {
                            page: 0,
                            lan: lan,
                            itemTypeIds: [null],
                            storeId: [providerId],
                            categoryIds: [cat?.id],
                            filter
                        };

                        const res = await fetchStoreItemTypes(data);
                        container.style.height = 'auto';
                    }
                } else {
                    console.log('Fetching from market!')
                    resetPageNumber();
                    changeSearchCategoryId(cat?.id && cat.id);
                    changeId(cat?.id && cat.id);
                    const container = document.querySelector('.Items__container')
                    const spacer = document.querySelector('.spacer');
                    if(container) {
                        const containerHeight = container.offsetHeight;
                        const topPosition = spacer.getBoundingClientRect().top;
                        const elementPosition = topPosition + window.pageYOffset;
                        const offsetPosition = elementPosition - 65;
                        console.log(offsetPosition);
                        // if(topPosition <= 0) {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                            // spacer.scrollIntoView({behavior: 'smooth', block: 'start'}, 50);
                        // }
                        document.querySelector('.Items__container').style.height = `${containerHeight}px`;
                        console.log(containerHeight);
                        const data = {
                            categoryIds: cat?.id == 0 ? [null] : [cat?.id],
                            lan,
                            filter,
                            page: 0,
                            navigate,
                            storeId: [null]
                        };
                        const res = await fetchItemTypes(data);
                        // const res = await fetchCategoryProducts(data, cat?.id && cat.id, lan, 0, filter, navigate);
                        document.querySelector('.Items__container') && (document.querySelector('.Items__container').style.height = 'auto');
                    } else {
                        const data = {
                            categoryIds: cat?.id == 0 ? [null] : [cat?.id],
                            lan,
                            filter,
                            page: 0,
                            navigate
                        };
                        const res = await fetchItemTypes(data);
                    }
                }
            logEvent(analytics, 'category_clicked', {CategoryId: cat?.id, CategoryName: cat?.name});
            logEvent(analytics, `category_clicked_${cat?.name}`);
        }} draggable={false} className={`Category ${ curId === (cat?.id && cat.id) && 'Category__active'}`} >
            <div className="Category__container">
                <Img category={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={(cat?.imagePath && cat?.imagePath) || categoryAlt}/>
                {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
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

export default connect(mapStateToProps, {fetchStoreItemTypes, changeId, fetchStoreItems, changeCurItemTypeId, fetchItemTypes, fetchCategoryProducts, changeCurrentId, resetPageNumber, changeSearchCategoryId, fetchSearchResults}) (memo(Category));