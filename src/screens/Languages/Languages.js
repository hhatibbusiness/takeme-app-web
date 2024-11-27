import React, { useEffect, useState } from 'react';
import './Languages.css';
import { useLanguagesContext } from '../../context/languages.context.js';
import KeepAlive from 'react-activation';
import LanguagesShimmer from '../../components/ItemsShimmerAdmin/ItemsShimmer.js';
import ItemsList from '../../components/ItemsListAdmin/ItemsList.js';


function Languages({paddingTop, setBackBtn}) {
    const { languages, fetchLanguages, searchLanguage, deleteLanguage } = useLanguagesContext();

    const itemsListPropsMain = {
        itemsFun: fetchLanguages,
        page: languages.page,
        more: languages.more,
        items: languages.languages,
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
        dots: true
    }

    const itemsListPropsSearch = {
        itemsFun: searchLanguage,
        page: languages.searchResultsPage,
        more: languages.moreSearchResults,
        items: languages.searchResults,
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
        dots: true
    }

    useEffect(() => {
        setBackBtn(true)
        return () => {
            setBackBtn(false);
        }
    }, []);

    return (
        <KeepAlive>
            <div className='Languages' style={{paddingTop: `${paddingTop}px`}}>
                <div className='Languages__contianer'>
                    {
                        languages.search ? (
                            languages.searching ? (
                                <LanguagesShimmer />

                            ) : (
                                <ItemsList window={true} {...itemsListPropsSearch} />
                            )
                        ) : (
                            languages.fetchingLanguages ? (
                                <LanguagesShimmer />
                            ) : (
                                <ItemsList window={true} {...itemsListPropsMain} />
                            )
                        )
                    }
                </div>
            </div>
        </KeepAlive>
    );
}

export default Languages;