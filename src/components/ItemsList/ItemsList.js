import React, { useEffect, useState } from 'react';
import Item from './Item/Item';
import InfiniteScroll from 'react-infinite-scroller/dist/InfiniteScroll';
import ItemsShimmer from '../ItemsShimmer/ItemsShimmer';

const ItemsList = ({
    items,
    window,
    select,
    single,
    selectedItem,
    multiSelectFun,
    closePopup,
    itemClickFun,
    parentScroller,
    dots,
    page,
    searchKey,
    displayName,
    isSearching,
    paginationData,
    more,
    sortType,
    itemsFun,
    dotsProps,
    clickable,
    link,
    hasSubName,
    subName
}) => {
    const [moreLoading, setMoreLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMoreLoading(more);
    }, [more]);

    return (
        <div className='ItemsList'>
            <InfiniteScroll
                dataLength={items}
                page={page}
                loadMore={async () => {
                    if (items.length == 0 && page == 0) return;
                    if (!moreLoading || loading || !more) return;

                    setLoading(true);
                    try {
                        await itemsFun(paginationData);
                    } finally {
                        setLoading(false);
                    }
                }}
                hasMore={moreLoading}
                loader={<ItemsShimmer />}
                initialLoad={false}
                useWindow={window}
                getScrollParent={() => parentScroller}
            >
                {
                    items?.map(item => {
                        return <Item
                            select={select}
                            single={single}
                            closePopup={closePopup}
                            selectedItem={selectedItem}
                            itemClickFun={itemClickFun}
                            dots={dots}
                            isSearching={isSearching}
                            dotsProps={dotsProps}
                            id={item.id}
                            searchKey={searchKey}
                            item={item}
                            displayName={displayName}
                            multiSelectFun={multiSelectFun}
                            clickable={clickable}
                            link={link}
                            hasSubName={hasSubName}
                            subName={subName}
                        />
                    })
                }
            </InfiniteScroll>
        </div>
    )
}

export default ItemsList;