import React, {useEffect, useRef, useState} from 'react';
import './Languages.css';
import { useLanguagesContext } from '../../context/languages.context.js';
import KeepAlive from 'react-activation';
import LanguagesShimmer from '../../components/ItemsShimmerAdmin/ItemsShimmer.js';
import ItemsList from '../../components/ItemsListAdmin/ItemsList.js';
import {connect} from "react-redux";
import {fetchLanguages, searchLanguages, deleteLanguage} from "../../store/actions/languages.actions";
import {changeBackBtnState} from "../../store/actions/navbar.actions";

function Languages({changeBackBtnState, setBackBtn, admin, setAdmin, searchLanguages, deleteLanguage, languages, fetchLanguages}) {
    const [paddingTop, setPaddingTop] = useState(0);
    const parentRef = useRef(null);

    useEffect(() => {
        const data = {
            lan: 'ar',
            page: 0,
            sortType: 'NEWEST',
        };

        if(languages.languages.length !== 0) return;
        fetchLanguages(data);
    }, []);

    const itemsListPropsMain = {
        itemsFun: fetchLanguages || (() => {}),
        page: languages.page || 0,
        more: languages.more ,
        items: languages.languages || [],
        paginationData: {
            lan: 'ar',
            page: languages.page,
            sortType: languages.sortType,
            searchKey: languages.searchKey
        },
        displayName: 'englishName',
        searchKey: languages.searchKey,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/languages/add/duplicate/${id}`,
                editUrl: `/languages/edit/${id}`,
            },
            deleteData: {
                lan: 'ar',
                languageId: id
            },
            deleteFun: deleteLanguage,
            isItem: true,
            deleting: languages?.deleting
        }),
        isSearching: languages.search,
        dots: true,
        parentScroller: parentRef.current

    }

    const itemsListPropsSearch = {
        itemsFun: searchLanguages || (() => {}),
        page: languages.searchResultsPage || 0,
        more: languages.moreSearchResults ,
        items: languages.searchResults || [],
        paginationData: {
            lan: 'ar',
            page: languages.searchResultsPage,
            sortType: languages.sortType,
            searchKey: languages.searchKey
        },
        displayName: 'englishName',
        searchKey: languages.searchKey,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/languages/add/duplicate/${id}`,
                editUrl: `/languages/edit/${id}`,
            },
            deleteData: {
                lan: 'ar',
                languageId: id
            },
            deleteFun: deleteLanguage,
            isItem: true,
            deleting: languages?.deleting
        }),
        isSearching: languages.search,
        dots: true,
        parentScroller: parentRef.current

    }

    useEffect(() => {
        changeBackBtnState(true);
        setAdmin(true);
        return () => {
            changeBackBtnState(false);
            setAdmin(false);
        }
    }, []);

    const navbarGetter = document.querySelector('.Navbar');

    useEffect(() => {
        if(navbarGetter) {
            setPaddingTop(navbarGetter.getBoundingClientRect().height);
        }
    });

    return (
        <KeepAlive>
            <div id={'Languages'} ref={parentRef} className='Languages' style={{paddingTop: `${paddingTop}px`}}>
                {
                    languages.search ? (
                        languages.searching ? (
                            <LanguagesShimmer />
                        ) : (
                            <ItemsList window={false} {...itemsListPropsSearch} />
                        )
                    ) : (
                        languages.fetchingLanguages ? (
                            <LanguagesShimmer />
                        ) : (
                            <ItemsList window={false} {...itemsListPropsMain} />
                        )
                    )
                }
            </div>
        </KeepAlive>
    );
}

const mapStateToProps = (state) => ({
    languages: state.languages
})

export default connect(mapStateToProps, {changeBackBtnState, searchLanguages, deleteLanguage, fetchLanguages}) (Languages);