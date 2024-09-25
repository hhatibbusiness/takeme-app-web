import React, {useCallback, useEffect, useRef, useState} from 'react';
import './Categories.css';
import {connect} from "react-redux";
import CategoryItem from './Category/Category';
import {changeId, fetchCategories} from "../../../../../store/actions/categories.action";
import InfiniteScroll from "react-infinite-scroller";
import {useNavigate} from "react-router-dom";

const Categories = ({categories, providerId, provider, fetchCategories, filter, lan, curId, loadingCategories, search, home, page, more}) => {
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [down, setDown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [moreLoading, setMoreLoading] = useState(false);

    const categoriesRef = useRef();
    const containerRef = useRef();
    const navigate = useNavigate();
    const scrollParent = useRef();
    const previousScrollLeft = useRef(0);


    useEffect(() => {
        setMoreLoading(more);
    }, [more]);

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

    const loadMore = async () => {
        if(categories?.length === 0 && page === 0) return;
        if(!moreLoading) return;
        if(!more) return setMoreLoading(false);
        setLoading(true);
        if(loading) return;
        await fetchCategories(lan, filter, navigate, page);
        setLoading(false);
    }

    const handleScroll = useCallback(() => {
        console.log('Scrolling!');
        const scrollParent = categoriesRef.current;
        if (!scrollParent) return;
        console.log(scrollParent.scrollRight)
        const { scrollLeft, scrollWidth, clientWidth } = scrollParent;

        const scrollDirectionX = scrollLeft > previousScrollLeft.current ? 'right' : 'left';

        console.log(`Scrolling ${scrollDirectionX} horizontally `);

        if(scrollDirectionX == 'left') {
            if (Math.abs(scrollLeft) + clientWidth >= scrollWidth - 10 && moreLoading) {
                console.log('Seriously scrolling!')
                loadMore();
            }
        }

        previousScrollLeft.current = scrollLeft;
    }, [loadMore, moreLoading]);

    useEffect(() => {
        const scrollParent = categoriesRef.current;
        if (scrollParent) {
            scrollParent.addEventListener('scroll', handleScroll);
            return () => {
                scrollParent.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll, categoriesRef.current]);



    return (
        <div id={'categories'} className={`Categories`}>
            <div ref={categoriesRef} className="Categories__parent" onMouseDown={mouseDownHandler} onMouseLeave={mouseUpHandler} onMouseUp={mouseUpHandler} onMouseMove={mouseMoveHandler}>
                {/*<div ref={scrollParent} className={'Categories__infinite'}>*/}
                {/*    <InfiniteScroll*/}
                {/*        pageStart={page}*/}
                {/*        useWindow={false}*/}
                {/*        // isReverse={false}*/}
                {/*        horizontal={true}*/}
                {/*        dataLength={categories.length}*/}
                {/*        hasMore={moreLoading}*/}
                {/*        initialLoad={false}*/}
                {/*        loadMore={async () => {*/}
                {/*            if(categories?.length === 0 && page === 0) return;*/}
                {/*            if(!moreLoading) return;*/}
                {/*            if(!more) return setMoreLoading(false);*/}
                {/*            setLoading(true);*/}
                {/*            if(loading) return;*/}
                {/*            await fetchCategories(lan, filter, navigate, page);*/}
                {/*            setLoading(false);*/}
                {/*        }}*/}
                {/*        threshold={50}*/}
                {/*        getScrollParent={() => scrollParent.current}*/}
                {/*    >*/}
                {/*        <div className={'Categories__parent--parent'}>*/}
                {/*        /!*    <div id={'Categories__container'} ref={containerRef} className="Categories__container">*!/*/}
                {/*                    {*/}
                {/*                        !loadingCategories && categories.map((cat, i) => (*/}
                {/*                            <CategoryItem provider={provider} curId={curId} search={search} home={home} key={cat?.id && cat.id} cat={cat} />*/}
                {/*                        ))*/}
                {/*                    }*/}

                {/*        /!*    </div>*!/*/}

                {/*        </div>*/}
                {/*    </InfiniteScroll>*/}

                {/*</div>*/}
                <div id={'Categories__container'} ref={containerRef} className="Categories__container">
                    {
                        !loadingCategories && categories.map((cat, i) => (
                            <CategoryItem providerId={providerId} provider={provider} curId={curId} search={search} home={home} key={cat?.id && cat.id} cat={cat} />
                        ))
                    }

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    more: state.categories.moreCategories,
    page: state.categories.categoriesPage,
    lan: state.categories.lan,
    filter: state.categories.filter
})

export default connect(mapStateToProps, {changeId, fetchCategories}) (React.memo(Categories));