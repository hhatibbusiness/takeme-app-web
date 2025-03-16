import React, {useEffect, useRef, useState} from 'react';
import ItemsShimmer from '../../components/ItemsShimmer/ItemsShimmer';
import ItemsList from '../../components/ItemsList/ItemsList';
import './BusinessPlans.css';
import {connect} from "react-redux";
import {fetchBusinessPlans, deleteBusinessPlan, searchBusinessPlans} from "../../store/actions/businessPlans.actions";

const BusinessPlans = ({ fetchBusinessPlans, searchBusinessPlans, deleteBusinessPlan, setAdmin, businessPlans }) => {
    const [paddingTop, setPaddingTop] = useState(105);

    const parentRef = useRef(null);

    useEffect(() => {
        setAdmin(true);
        return () => {
            setAdmin(false);
        }
    }, []);

    const navbarGetter = document.querySelector('.Navbar');

    useEffect(() => {
        if(navbarGetter) {
            setPaddingTop(navbarGetter.getBoundingClientRect().height);
        }
    });

    useEffect(() => {
        const data = {
            lan: 'ar_SA',
            page: 0,
            sortType: 'NEWEST',
        };

        if(businessPlans.businessPlans.length > 0) return;

        fetchBusinessPlans(data);
    }, []);

    const itemsListPropsSearch = {
        itemsFun: searchBusinessPlans || (() => {}),
        page: businessPlans.searchResultsPage || 0,
        more: businessPlans.moreSearchResults,
        items: businessPlans.searchResults || [],
        paginationData: {
            lan: 'ar_SA',
            page: businessPlans.searchResultsPage,
            searchKey: businessPlans.searchKey
        },
        displayName: 'name',
        searchKey: businessPlans.searchKey,
        dots: true,
        dotsProps: id => ({
            urls: {
                addUrl: `/business-plans/add/duplicate/${id}`,
                editUrl: `/business-plans/edit/${id}`,
            },
            deleteData: {
                lan: 'ar_SA',
                id: id
            },
            deleteFun: deleteBusinessPlan,
            isItem: true,
            deleting: businessPlans?.deleting
        }),
        isSearching: businessPlans.search,
        parentScroller: parentRef.current,
    }

    const itemsListPropsMain = {
        itemsFun: fetchBusinessPlans || (() => {}),
        page: businessPlans.page || 0,
        more: businessPlans.more,
        items: businessPlans.businessPlans || [],
        paginationData: {
            lan: 'ar_SA',
            page: businessPlans.page,
            searchKey: businessPlans.searchKey
        },
        displayName: 'name',
        searchKey: businessPlans.searchKey,
        dots: true,
        dotsProps: id => ({
            urls: {
                addUrl: `/business-plans/add/duplicate/${id}`,
                editUrl: `/business-plans/edit/${id}`,
            },
            deleteData: {
                lan: 'ar_SA',
                id: id
            },
            deleteFun: deleteBusinessPlan,
            isItem: true,
            deleting: businessPlans?.deleting
        }),
        isSearching: businessPlans.search,
        parentScroller: parentRef.current,
    }

    return (
        <div id={"BusinessPlans"} className='BusinessPlans' ref={parentRef} style={{paddingTop: `${paddingTop}px`}}>
            {
                businessPlans.search ? (
                    businessPlans.searching ? (
                        <ItemsShimmer />
                    ) : (
                        <ItemsList window={false} {...itemsListPropsSearch} />
                    )
                ) : (
                    businessPlans.fetchingBusinessPlans ? (
                        <ItemsShimmer />
                    ) : (
                        <ItemsList window={false} {...itemsListPropsMain} />
                    )
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    businessPlans: state.businessPlans
})

export default connect(mapStateToProps, {searchBusinessPlans, fetchBusinessPlans, deleteBusinessPlan})(BusinessPlans);
