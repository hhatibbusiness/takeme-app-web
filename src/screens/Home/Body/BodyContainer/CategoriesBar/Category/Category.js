import React, {memo, useRef, useState} from 'react';
import './Category.css';
import {connect} from "react-redux";
import {changeId, fetchCategoryProducts, resetPageNumber} from "../../../../../../store/actions/categories.action";
import {changeSearchCategoryId, fetchSearchResults} from "../../../../../../store/actions/search.actions";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../../../../utls/firebase.auth";
import {useNavigate} from "react-router-dom";
import categoryAlt from '../../../../../../assets/images/categoryalt.jpg';
import {useTranslation} from "react-i18next";
import Img from "../../ProductList/Products/Product/Img/Img";
import LoadingProduct from "../../../../../../components/LoadingProduct/LoadingProduct";
import {changeCurrentId} from "../../../../../../store/actions/provider.actions";

const Category = ({
    cat,
    changeSearchCategoryId,
    changeCurrentId,
    changeId,
    fetchCategoryProducts,
    lan,
    resetPageNumber,
    provider,
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
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <a
            onClick={async () => {
                if(provider) {
                    changeCurrentId(cat?.id && cat.id);
                } else {
                    resetPageNumber();
                    changeSearchCategoryId(cat?.id && cat.id);
                    changeId(cat?.id && cat.id);
                    const container = document.querySelector('.Products')
                    const spacer = document.querySelector('.spacer');
                    // const categoriesContainer = document.querySelector('.spacer')
                    if(container) {
                        const containerHeight = container.offsetHeight;
                        console.log(containerHeight);
                        console.log(container);
                        const topPosition = spacer.getBoundingClientRect().top;
                        console.log(topPosition);

                        const elementPosition = topPosition + window.pageYOffset;
                        const offsetPosition = elementPosition - 55;

                        // if(topPosition <= 0) {
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth"
                            });
                            // spacer.scrollIntoView({behavior: 'smooth', block: 'start'}, 50);
                        // }
                        document.querySelector('.Products').style.height = `${containerHeight}px`;
                        const res = await fetchCategoryProducts(cat?.id && cat.id, lan, 0, filter, navigate);
                        document.querySelector('.Products') && (document.querySelector('.Products').style.height = 'auto');
                    }
                }
            logEvent(analytics, 'category_clicked', {CategoryId: cat?.id, CategoryName: cat?.name})
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

export default connect(mapStateToProps, {changeId, fetchCategoryProducts, changeCurrentId, resetPageNumber, changeSearchCategoryId, fetchSearchResults}) (memo(Category));