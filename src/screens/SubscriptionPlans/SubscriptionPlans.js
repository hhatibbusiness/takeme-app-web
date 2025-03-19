import React, {useEffect, useRef, useState} from 'react';
import ItemsShimmer from '../../components/ItemsShimmer/ItemsShimmer';
import ItemsList from '../../components/ItemsList/ItemsList';
import './SubscriptionPlans.css';
import {connect} from "react-redux";
import {fetchSubscriptionPlans, deleteSubscriptionPlan, searchSubscriptionPlans} from "../../store/actions/subscriptionPlans.actions";

const SubscriptionPlans = ({ fetchSubscriptionPlans, searchSubscriptionPlans, deleteSubscriptionPlan, setAdmin, subscriptionPlans }) => {
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
        // if already fetched, don't fetch again
        if(subscriptionPlans.page > 0) return;

        const data = {
            lan: 'ar_SA',
            page: 0,
            sortType: 'NEWEST',
        };

        fetchSubscriptionPlans(data);
    }, []);

    const itemsListPropsMain = {
        itemsFun: fetchSubscriptionPlans || (() => {}),
        page: subscriptionPlans?.page || 0,
        more: subscriptionPlans.more,
        items: subscriptionPlans.plans || [],
        paginationData: {
            lan: 'ar_SA',
            page: subscriptionPlans?.page,
                searchKey: subscriptionPlans.searchKey
        },
        displayName: 'name',
        dots: true,
        dotsProps: id => ({
            urls: {
                addUrl: `/subscription-plans/add/duplicate/${id}`,
                editUrl: `/subscription-plans/edit/${id}`,
            },
            deleteData: {
                lan: 'ar_SA',
                id: id
            },
            deleteFun: deleteSubscriptionPlan,
            isItem: true,
            deleting: subscriptionPlans?.deleting
        }),
        parentScroller: parentRef.current,
    }

    return (
        <div id={"SubscriptionPlans"} className='SubscriptionPlans' ref={parentRef} style={{paddingTop: `${paddingTop}px`}}>
            {
                subscriptionPlans.fetchingPlans ? (
                    <ItemsShimmer />
                ) : (
                    <ItemsList window={false} {...itemsListPropsMain} />
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    subscriptionPlans: state.subscriptionPlans
})

export default connect(mapStateToProps, {fetchSubscriptionPlans, deleteSubscriptionPlan})(SubscriptionPlans);
