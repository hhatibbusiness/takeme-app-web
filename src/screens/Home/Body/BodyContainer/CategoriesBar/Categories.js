import React, {useEffect, useRef, useState} from 'react';
import './Categories.css';
import {connect} from "react-redux";
import CategoryItem from './Category/Category';

const Categories = ({categories, loadingCategories}) => {
    const [currId, setCurrId] = useState(null);
    const categoriesRef = useRef();

    useEffect(() => {
        if(categories.length !== 0) {
            setCurrId(categories[0].id);
        }
    }, [categories.length]);

    // useEffect(() => {
    //     if(currId !== null) {
    //         getCategory(currId)
    //     }
    // }, [currId]);

    return (
        <div className={'Categories'}>
            <div ref={categoriesRef} className="Categories__parent">
                <div ref={categoriesRef} className="Categories__container">
                    {
                        !loadingCategories && categories.map((cat, i) => (
                            <CategoryItem id={currId} setCurrId={setCurrId} key={cat.id} cat={cat} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    categories: state.categories.categories,
    loadingCategories: state.categories.loadingCategories,
});

export default connect(mapStateToProps) (Categories);