import React, {useEffect, useRef, useState} from 'react';
import './Roles.css';
import {connect} from "react-redux";
import {fetchRoles, deleteRole} from "../../store/actions/roles.actions";
import RolesShimmer from "../../components/ItemsShimmer/ItemsShimmer";
import ItemsList from "../../components/ItemsList/ItemsList";

const Roles = ({setAdmin, admin, deleteRole, fetchRoles, locale, roles}) => {
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
            locale: locale.locale,
            page: 0,
            sortType: 'ASCENDING',
        }

        if(roles?.roles?.length <= 0) {
            fetchRoles(data);
        }
    }, []);

    const itemsListPropsMain = {
        itemsFun: fetchRoles || (() => {}),
        page: roles.page || 0,
        more: roles.more,
        items: roles.roles || [],
        paginationData: {
            lan: 'ar_SA',
            page: roles.page,
            searchKey: roles.searchKey,
            locale: locale.locale,
            sortType: roles.sortType,
        },
        displayName: 'roleName',
        searchKey: roles.searchKey,
        dots: true,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/roles/add/duplicate/${id}`,
                editUrl: `/roles/edit/${id}`,
            },
            deleteData: {
                locale: locale.locale,
                roleId: id
            },
            deleteFun: deleteRole,
            isItem: true,
            deleting: roles?.deleting
        }),
        isSearching: roles.search,
        parentScroller: parentRef.current
    }

    return (
        <div id={'Roles'} className={'Roles'} ref={parentRef} style={{paddingTop: `${paddingTop}px`}}>
            {
                roles.fetchingRoles ? (
                    <RolesShimmer />
                ) : (
                    <ItemsList {...itemsListPropsMain} window={false} />
                )
            }
        </div>
    );
};

const mapStateToProps = state => ({
    locale: state.categories.selectedLocale,
    roles: state.roles
});

export default connect(mapStateToProps, {deleteRole, fetchRoles}) (Roles);