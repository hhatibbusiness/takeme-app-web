import React, {useEffect, useRef, useState} from 'react';
import CountriesShimmer from '../../components/ItemsShimmer/ItemsShimmer';
import ItemsList from '../../components/ItemsList/ItemsList';
import './PlacesPage.style.css';
import {connect} from "react-redux";
import {fetchPlaces, deletePlace, searchPlaces} from "../../store/actions/places.actions";
import KeepAlive from 'react-activation';
import {changeBackBtnState} from "../../store/actions/navbar.actions";

const PlacesPage = ({ fetchPlaces, searchPlaces, deletePlace, setAdmin, places }) => {
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
        if (places.page > 0) return

        const data = {
            lan: 'ar_SA',
            page: 0,
            sortType: 'NEWEST',
        };

        fetchPlaces(data);
    }, [])

    const itemsListPropsSearch = {
        itemsFun: searchPlaces,
        page: places.searchResultsPage,
        more: places.moreSearchResults ,
        items: places.searchResults,
        paginationData: {
            lan: 'ar_SA',
            page: places.searchResultsPage,
            sortType: places.sortType,
            searchKey: places.searchKey
        },
        displayName: 'translations.fields.value',
        searchKey: places.searchKey,
        dots: true,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/places/duplicate/${id}`,
                editUrl: `/places/edit/${id}`
            },
            deleteData: {
                lan: 'ar_SA',
                placeId: id
            },
            deleteFun: deletePlace,
            isItem: true,
            deleting: places?.deleting
        }),
        isSearching: places.search,
        parentScroller: parentRef.current
    }

    const itemsListPropsMain = {
        itemsFun: fetchPlaces,
        page: places.page,
        more: places.more,
        items: places.places,
        paginationData: {
            lan: 'ar_SA',
            page: places.page,
            sortType: places.sortType,
            searchKey: places.searchKey
        },
        displayName: 'translations.fields.value',
        searchKey: places.searchKey,
        dots: true,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/places/duplicate/${id}`,
                editUrl: `/places/edit/${id}`,
            },
            deleteData: {
                lan: 'ar_SA',
                placeId: id
            },
            deleteFun: deletePlace,
            isItem: true,
            deleting: places?.deleting
        }),
        isSearching: places.search,
        parentScroller: parentRef.current
    }

    return (
        <KeepAlive>
            <div className='Places_body' ref={parentRef} style={{paddingTop: `${paddingTop}px`}}>
                {
                    places.search ? (
                        places.searching ? (
                            <CountriesShimmer />
                        ) : (
                            <ItemsList window={false} {...itemsListPropsSearch} />
                        )
                    ) : (
                        places.fetchingPlaces ? (
                            <CountriesShimmer />
                        ) : (
                            <ItemsList window={false}  {...itemsListPropsMain} />
                        )
                    )
                }
            </div>
        </KeepAlive>
    )
}

const mapStateToProps = state => ({
    places: state.places
})

export default connect(mapStateToProps, {searchPlaces, fetchPlaces, deletePlace}) (PlacesPage);
