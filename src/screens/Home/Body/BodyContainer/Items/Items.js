import React, {useEffect, useState} from 'react';
import './items.css';
import Item from "./Item/Item";
import {connect} from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import {fetchProductsMarket} from "../../../../../store/actions/categories.action";
import ItemShimmer from "../../../../../components/ItemShimmer/ItemShimmer";
import {useParams} from "react-router-dom";

const Items = ({items, value, scrollParent, filter, curId, store, curItemTypeId, setCurrentProduct, lan, fetchProductsMarket, moreItems, itemsPage}) => {
    const [moreLoading, setMoreLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const params = useParams();

    useEffect(() => {
        console.log(moreItems);
        setMoreLoading(moreItems);
    }, [moreItems]);

    const turnValueIntoCol = value => {
        if(value === 0) {
            return {
                col: 'repeat(4, 1fr)',
                gap: 10
            }
        }else if(value === 50) {
            return {
                col: 'repeat(2, 1fr)',
                gap: 10
            }
        }
        return {
            col: 'repeat(1, 1fr)',
            gap: 10
        }
    }

    return (
        <div className={'Items'}>
            <InfiniteScroll
                style={{position: 'relative', paddingBottom: '100px;'}}
                dataLength={items.length}
                pageStart={itemsPage}
                loadMore={async () => {
                    console.log(`Loading ${store ? 'store' : 'market'}`)
                    if(items.length === 0 && itemsPage === 0) return;
                    if(!moreLoading) return;
                    if(!moreItems) return setMoreLoading(false);
                    setLoading(true);
                    if(loading) return;
                    const data = {
                        page: itemsPage,
                        lan,
                        itemTypeIds: [curItemTypeId],
                        storeIds: store ? [params.providerId] : [null],
                        categoryIds: [curId],
                        filter
                    };
                    await fetchProductsMarket(data);
                    console.log('Fetching With infinite!');
                    setLoading(false);
                }}
                hasMore={moreLoading}
                loader={<ItemShimmer store={store} value={value} />}
                useWindow={store ? false : true}
                initialLoad={false}
                getScrollParent={() => scrollParent}
            >
                <div style={{gridTemplateColumns: `${turnValueIntoCol(value).col}`, gap: `${value == 100 ? '10px' : turnValueIntoCol(value).gap}px`, display: `${value == 100 ? 'block' : 'grid'}`}}>
                    {/*<ItemShimmer />*/}
                    {
                        items.map(i => (
                            <Item store={store} value={value} setCurrentProduct={setCurrentProduct} item={i} key={i.id} />
                        ))
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan,
    filter: state.categories.filter
});

export default connect(mapStateToProps) (Items);