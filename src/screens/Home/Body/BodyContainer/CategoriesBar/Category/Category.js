import React, {useEffect, useRef} from 'react';
import './Category.css';
import axios from "axios";
import {connect} from "react-redux";
import {changeId, fetchCategoryProducts, resetPageNumber} from "../../../../../../store/actions/categories.action";

const Category = ({cat, id, changeId, fetchCategoryProducts, lan, resetPageNumber, page}) => {
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
        <div onClick={() => {
            changeId(cat?.id && cat.id);
            fetchCategoryProducts(cat?.id && cat.id, lan, 0);
            resetPageNumber();
        }}  draggable={false} className={`Category ${id === (cat?.id && cat.id) && 'Category__active'}`}>
            <div className="Category__container">
                <img src={cat?.imagePath && cat.imagePath} draggable={false} />
            </div>
            <p draggable={false}>{cat?.name && (cat.name.length <= 7 ? cat.name : cat.name.substring(0, 5) + ' ...')}</p>
        </div>
    );
};

const mapStateToProps = state => ({
    id: state.categories.curId,
    lan: state.categories.lan,
    page: state.categories.page
});

export default connect(mapStateToProps, {changeId, fetchCategoryProducts, resetPageNumber}) (Category);