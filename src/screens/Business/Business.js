import React, {useEffect, useRef, useState} from 'react';
import ItemsShimmer from '../../components/ItemsShimmer/ItemsShimmer';
import ItemsList from '../../components/ItemsList/ItemsList';
import './Business.css';
import {connect} from "react-redux";
import {fetchBusiness, deleteBusiness, searchBusiness} from "../../store/actions/business.actions";

const Business = ({ fetchBusiness, searchBusiness, deleteBusiness, setAdmin, business }) => {
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
        if(business.page > 0) return;

        const data = {
            lan: 'ar_SA',
            sortType: 'NEWEST',
            page: 0
        };
        fetchBusiness(data);
    }, []);

    const itemsListPropsSearch = {
        itemsFun: searchBusiness || (() => {}),
        page: business.searchResultsPage || 0,
        more: business.moreSearchResults,
        items: business.searchResults || [],
        paginationData: {
            lan: 'ar_SA',
            page: business.searchResultsPage,
            searchKey: business.searchKey
        },
        displayName: 'name',
        searchKey: business.searchKey,
        dots: true,
        dotsProps: id => ({
            urls: {
                addUrl: `/business/add/duplicate/${id}`,
                editUrl: `/business/edit/${id}`
            },
            deleteData: {
                mLocale: 'ar_SA',
                businessId: id
            },
            deleteFun: deleteBusiness,
            isItem: true,
            deleting: business?.deleting
        }),
        isSearching: business.search,
        parentScroller: parentRef.current
    }

    const itemsListPropsMain = {
        itemsFun: fetchBusiness || (() => {}),
        page: business.page || 0,
        more: business.more,
        items: business.profiles || [],
        paginationData: {
            mLocale: 'ar_SA',
            page: business.page,
            sortType: 'NEWEST'
        },
        displayName: 'name',
        searchKey: business.searchKey,
        dots: true,
        dotsProps: id => ({
            urls: {
                addUrl: `/business/add/duplicate/${id}`,
                editUrl: `/business/edit/${id}`,
            },
            deleteData: {
                mLocale: 'ar_SA',
                businessId: id
            },
            deleteFun: deleteBusiness,
            isItem: true,
            deleting: business?.deleting
        }),
        isSearching: business.search,
        parentScroller: parentRef.current
    }

    return (
        <div id={'Business'} className='Business' ref={parentRef} style={{paddingTop: `${paddingTop}px`}}>
            {
                business.search ? (
                    business.searching ? (
                        <ItemsShimmer />
                    ) : (
                        <ItemsList window={false} {...itemsListPropsSearch} />
                    )
                ) : (
                    business.fetchingProfiles ? (
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
    business: state.business
})

export default connect(mapStateToProps, {
    searchBusiness,
    fetchBusiness,
    deleteBusiness
})(Business);
