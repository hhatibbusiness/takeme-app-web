import React, {useEffect, useRef, useState} from 'react';
import './PersonalProfiles.css';
import {fetchPersonalProfiles} from "../../store/actions/personalProfiles.actions";
import {connect} from "react-redux";
import ProfilesShimmer from '../../components/ItemsShimmer/ItemsShimmer';
import ItemsList from "../../components/ItemsList/ItemsList";

const PersonalProfiles = ({profiles, fetchPersonalProfiles, setAdmin, admin, locale}) => {
    const [paddingTop, setPaddingTop] = useState(105);

    const parentRef = useRef(null);

    const navbarGetter = document.querySelector('.Navbar');

    useEffect(() => {
        if(navbarGetter) {
            setPaddingTop(navbarGetter.getBoundingClientRect().height);
        }
    });
    useEffect(() => {
        setAdmin(true);
        return () => {
            setAdmin(false);
        }
    }, []);

    useEffect(() => {
        const data = {
            page: 0,
            localeId: locale.id,
            locale: locale.locale,
            sortType: 'NEWEST'
        }

        fetchPersonalProfiles(data);
    }, []);

    useEffect(() => {
        console.log(profiles)
    })

    const itemsListPropsMain = {
        itemsFun: fetchPersonalProfiles || (() => {}),
        page: profiles.page || 0,
        more: profiles.more,
        items: profiles.profiles || [],
        paginationData: {
            lan: locale.locale,
            page: profiles.page,
            searchKey: profiles.searchKey,
            locale: locale.locale,
            sortType: profiles.sortType,
        },
        displayName: 'displayName',
        searchKey: profiles.searchKey,
        dots: true,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/profiles/add/duplicate/${id}`,
                editUrl: `/profiles/edit/${id}`,
            },
            deleteData: {
                locale: locale.locale,
                roleId: id
            },
            deleteFun: () => {},
            isItem: true,
            deleting: profiles?.deleting
        }),
        isSearching: profiles.search,
        parentScroller: parentRef.current
    }

    return (
        <div id={'PersonalProfiles'} className={'PersonalProfiles'} style={{paddingTop: `${paddingTop}px`}}>
            {
                profiles.fetching ? (
                    <ProfilesShimmer />
                ) : (
                    <ItemsList {...itemsListPropsMain} window={false} />
                )
            }
        </div>
    );
};

const mapStateToProps = state => ({
    locale: state.categories.selectedLocale,
    profiles: state.profiles
});

export default connect(mapStateToProps, {fetchPersonalProfiles}) (PersonalProfiles);