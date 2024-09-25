import React, {memo, useEffect, useRef} from 'react';
import './Category.css';
import {logEvent} from "firebase/analytics";
import {analytics} from "../../../../../../utls/firebase.auth";
import {useNavigate} from "react-router-dom";
import categoryAlt from '../../../../../../assets/images/categoryalt.jpg';
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
                      term,
                      filter
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
    const navigate = useNavigate();
    const imageRef = useRef();

    return (
        <a role={'category'} onClick={() => {
            if(home) {
                changeId(cat?.id && cat.id);
                resetPageNumber();
                fetchCategoryProducts(cat?.id && cat.id, lan, 0, filter, navigate);
            }
            if(search) {
                changeSearchCategoryId(cat?.id && cat.id);
                // fetchSearchResults(lan, cat?.id && cat.id, 'All', term, 0)
            }
            logEvent(analytics, 'category_clicked', {CategoryId: cat?.id, CategoryName: cat?.name})
        }}  draggable={false} className={`Category ${home && id === (cat?.id && cat.id) && 'Category__active'} ${search && searchId == (cat?.id && cat.id) && 'Category__active'}`}>
            <div className="Category__container">
                <img ref={imageRef} onError={e => {
                    if(imageRef?.current) {
                        imageRef.current.src = categoryAlt;
                    }
                }} src={cat?.imagePath && cat.imagePath} draggable={false} />
            </div>
            <p role={'name'} draggable={false}>{cat?.name && (cat.name.length <= 7 ? cat.name : cat.name.substring(0, 5) + ' ...')}</p>
        </a>
    );
};

export default Category;

// export default connect(mapStateToProps, {changeId, fetchCategoryProducts, resetPageNumber, changeSearchCategoryId, fetchSearchResults}) (memo(Category));