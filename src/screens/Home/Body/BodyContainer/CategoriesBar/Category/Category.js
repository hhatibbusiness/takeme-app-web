import React, {memo, useEffect, useRef} from 'react';
import './Category.css';
import axios from "axios";
import {connect} from "react-redux";
import {changeId, fetchCategoryProducts, resetPageNumber} from "../../../../../../store/actions/categories.action";
import {changeSearchCategoryId, fetchSearchResults} from "../../../../../../store/actions/search.actions";

const Category = ({
    cat,
    changeSearchCategoryId,
    searchId,
    id,
    changeId,
    fetchCategoryProducts,
    lan,
    resetPageNumber,
    page,
    home,
    search,
    fetchSearchResults,
    term
}) => {
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

    return (
        <a href={'#categories'} onClick={() => {
            if(home) {
                changeId(cat?.id && cat.id);
                resetPageNumber();
                fetchCategoryProducts(cat?.id && cat.id, lan, 0);
            }
            if(search) {
                changeSearchCategoryId(cat?.id && cat.id);
                // fetchSearchResults(lan, cat?.id && cat.id, 'All', term, 0)
            }
        }}  draggable={false} className={`Category ${home && id === (cat?.id && cat.id) && 'Category__active'} ${search && searchId == (cat?.id && cat.id) && 'Category__active'}`}>
            <div className="Category__container">
                <img src={cat?.imagePath && cat.imagePath} draggable={false} />
            </div>
            <p draggable={false}>{cat?.name && (cat.name.length <= 7 ? cat.name : cat.name.substring(0, 5) + ' ...')}</p>
        </a>
    );
};

const mapStateToProps = state => ({
    id: state.categories.curId,
    searchId: state.search.categoryId,
    lan: state.categories.lan,
    page: state.categories.page,
    term: state.search.term,
});

export default connect(mapStateToProps, {changeId, fetchCategoryProducts, resetPageNumber, changeSearchCategoryId, fetchSearchResults}) (memo(Category));