import React, {useRef, useState} from 'react';
import './Categories.css';
import {connect} from "react-redux";
import CategoryItem from './Category/Category';
import {changeId} from "../../../../../store/actions/categories.action";

const Categories = ({categories, provider, curId, loadingCategories, search, home}) => {
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [down, setDown] = useState(false);

    const categoriesRef = useRef();
    const containerRef = useRef();

    const mouseDownHandler = e => {
        const ele = categoriesRef.current;
        if(!ele) return;
        setDown(true);
        setStartX(prevState => e.pageX - ele.offsetLeft);
        setScrollLeft(prevState => ele.scrollLeft);
    }
    const mouseMoveHandler = e => {
        if(!down) return;
        const ele = categoriesRef.current;
        if(!ele) return;
        e.preventDefault();
        const x = e.pageX - ele.offsetLeft;
        const walk = (x - startX)/50;

        ele.scrollLeft = (ele.scrollLeft - walk)
    }

    const mouseUpHandler = e => {
        setDown(false);
    }

    return (
        <div id={'categories'} className={`Categories ${provider ? 'Categories__shadow' : ''}`}>
            <div ref={categoriesRef} className="Categories__parent" onMouseDown={mouseDownHandler} onMouseLeave={mouseUpHandler} onMouseUp={mouseUpHandler} onMouseMove={mouseMoveHandler}>
                <div id={'Categories__container'} ref={containerRef} className="Categories__container">
                    {
                        !loadingCategories && categories.map((cat, i) => (
                            <CategoryItem provider={provider} curId={curId} search={search} home={home} key={cat?.id && cat.id} cat={cat} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default connect(null, {changeId}) (React.memo(Categories));