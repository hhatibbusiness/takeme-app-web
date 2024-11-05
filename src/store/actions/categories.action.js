import axios from "axios";
import {
    CHANGE_CUR_ITEM_TYPE_ID,
    CHANGE_CURRENT_ID,
    CHANGE_CURRENT_SELECTED_LOCALE,
    CHANGE_FILTER,
    CHANGE_LAN_SUCCESS,
    CHANGE_SLIDER_VALUE,
    END_FETCHING_CATEGORIES,
    END_FETCHING_ITEM_TYPES,
    END_FETCHING_LOCALES,
    END_FETCHING_MARKET_STORES,
    END_FETCHING_PRODUCTS,
    END_FETCHING_PRODUCTS_MARKET,
    END_LOADING_MORE_PRODUCT_TYPES,
    ERROR_ACTIVE,
    ERROR_INACTIVE,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORY_PRODUCTS,
    FETCH_ITEM_TYPES,
    FETCH_LOCALES,
    FETCH_MARKET_STORES,
    FETCH_PRODUCTS_MARKET,
    INCREASE_CATEGORIES_PAGE_NUMBER,
    INCREASE_PAGE_NUMBER,
    RESET_CATEGORIES_PAGE,
    RESET_MARKET_STORE_DATA,
    RESET_PAGE_NUMBER,
    START_FETCHING_CATEGORIES,
    START_FETCHING_ITEM_TYPES,
    START_FETCHING_LOCALES,
    START_FETCHING_MARKET_STORES,
    START_FETCHING_PRODUCTS,
    START_FETCHING_PRODUCTS_MARKET,
    START_LOADING_MORE_PRODUCT_TYPES,
    SWITCH_MARKET_STORE
} from "./action.types";
import {BASE_URL} from "../../utls/assets";
import {getAnalytics, logEvent} from "firebase/analytics";
import allCategoryImage from "../../assets/images/all-icon.jpg";
import {loadUser} from "./login.action";

export const startFetchingCategories = {
    type: START_FETCHING_CATEGORIES
}

export const endFetchingCategories = {
    type: END_FETCHING_CATEGORIES
}

export const errorActive = {
    type: ERROR_ACTIVE
}

export const errorInactive = {
    type: ERROR_INACTIVE
}

// change current selected category id action.
export const changeId = id => ({
    type: CHANGE_CURRENT_ID,
    id
});

export const increaseCategoriesPageNumber= {
    type: INCREASE_CATEGORIES_PAGE_NUMBER
}


export const fetchCategories = (lan, filter, navigate, page, storePage, store, selectedLocale) => async dispatch => {
    try {
        console.log('this is working!');
        // const localesData = {
        //     lan,
        //     sortType: 'NEWEST',
        //     page: 0
        // };
        
        // await dispatch(fetchLocales(localesData));

        if(page == 0) dispatch(startFetchingProducts);
        const res = await axios.get(`${BASE_URL}endpoints/categories/list-no-empty?locale=${lan}&&page=${page}&&filterByAction=${filter}`);
        let categories;
        if(page == 0) {
            const allCategory =       {
                id: 0,
                name: 'الكل',
                description: 'هذة الفئة تحتوي علي جميع انواع المنتجات',
                imagePath: allCategoryImage,
                sortIndex: 1,
                createdDate: new Date(),
                updatedDate: new Date(),
                imageName: 'all.jpg'
            }

            categories = [
                allCategory,
                ...res.data.output
            ]

        }else {
            categories = [...res.data.output]
        }


        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            categories
        });

        dispatch(increaseCategoriesPageNumber);

        dispatch(endFetchingCategories);

        if(categories?.length === 0) return;
        const firstId = categories[0].id;
        // dispatch(errorActive);
        dispatch(errorInactive);
        if(page == 0) await dispatch(changeId(firstId));
        console.log(store);
        if(store) {
            if(storePage == 0) {
                const data = {
                    lan,
                    page,
                    filter,
                    categoryId: 0
                }
                await dispatch(fetchMarketStores(data));
            }
        }else {
            console.log('Hello from the productTypes!')
            const data = {
                page: 0,
                lan,
                filter,
                navigate,
                categoryIds: [null],
                storeId: [null]
            }
            if(page == 0) {
                await dispatch(fetchItemTypes(data))
            };
        }
        dispatch(endFetchingCategories);
        return res;
    }catch (err) {
        if(err?.response?.status == 401) {
            dispatch(loadUser(navigate, 'ar'));
        }

        const allCategory = {
            id: 0,
            name: 'الكل',
            description: 'هذة الفئة تحتوي علي جميع انواع المنتجات',
            imagePath: allCategoryImage,
            sortIndex: 1,
            createdDate: new Date(),
            updatedDate: new Date(),
            imageName: 'all.jpg'
        }

        const categories = [
            allCategory,
        ];

        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            categories: categories
        });

        const firstId = categories[0].id;

        await dispatch(changeId(firstId));

        const data = {
            page: 0,
            lan,
            filter,
            navigate,
            id: null
        }

        await dispatch(fetchCategoryProducts(data, firstId, lan, 0, filter, navigate));
        
        console.log('End fetching Categories!');

        dispatch(endFetchingCategories);
    }
}

const startFetchingProducts = {
    type: START_FETCHING_PRODUCTS
};

const endFetchingProducts = {
    type: END_FETCHING_PRODUCTS
}

export const fetchCategoryProducts = (data, id, lan, page, filter, navigate) => async dispatch => {
    try {
        console.log('This is working!')

        if(data.page == 0) dispatch(startFetchingProducts);
        const res = await axios.get(`${BASE_URL}endpoints/products-types?locale=${data.lan}&categoryId=${data.id}&page=${data.page}&filterByAction=${data.filter}`)
        console.log('Hello from the Products!');
        const allProductType = {
            id: null,
            title: 'الكل'
        };
        let products;
        if(page == 0) {
            products = [
                allProductType,
                ...res.data
            ]
        }else {
            products = [
                ...res.data
            ]
        }
        dispatch({
            type: FETCH_CATEGORY_PRODUCTS,
            products
        });

        dispatch(increasePageNumber());
        const analytics = getAnalytics();
        if(data.page > 0 && res.status == 200 && res?.data?.length > 0) {
            logEvent(analytics, 'pagination', {
                paginationName: 'procutType'
            })
        }
        const marketData = {
            id: null,
            page: 0,
            filter,
            navigate,
            lan
        };
        // await dispatch(fetchProductsMarket(marketData));
        dispatch(errorInactive)
        if(data.page == 0) dispatch(endFetchingProducts);
        return res;
    } catch (e) {
        console.log(e);
        if(e?.response?.status == 401) {
            dispatch(loadUser(data.navigate, data.lan));
        }
        dispatch(endFetchingProducts);

        // dispatch(errorActive);
    }
}

export const changeSliderValue = value => ({
    type: CHANGE_SLIDER_VALUE,
    value
});

export const changeLan = (lan, id, filter) => async dispatch => {
    try {
        dispatch({
            type: CHANGE_LAN_SUCCESS,
            lan
        });
        await dispatch(fetchCategories(lan, filter));
        // await dispatch(fetchCategoryProducts(id, lan, 0));
        // dispatch(errorActive);
        dispatch(errorInactive);
    } catch (e) {
        // dispatch(errorActive);
        console.error(e);
    }
};

//increase the page number action
export const increasePageNumber = () => ({
    type: INCREASE_PAGE_NUMBER
});

//reset the page number action
export const resetPageNumber = () => ({
    type: RESET_PAGE_NUMBER
});
export const resetCategoriesPage = {
    type: RESET_CATEGORIES_PAGE
}

export const changeFilter = (id, lan, page, navigate, filter, store) => async dispatch => {
    try {
        console.log(store)
        dispatch({
            type: CHANGE_FILTER,
            filter: filter
        });
        dispatch(resetCategoriesPage);
        dispatch(resetPageNumber());
        dispatch(resetMarketStoreData());
        await dispatch(fetchCategories(lan, filter, navigate, 0, 0, store));
        // const res = await dispatch(fetchCategoryProducts(id, lan, page, filter, navigate));
        // return res;
    } catch (e) {
        console.log(e.message);
    }
};

export const startFetchingMarketStores = {
    type: START_FETCHING_MARKET_STORES
}

export const endFetchingMarketStores = {
    type: END_FETCHING_MARKET_STORES
}

export const fetchMarketStores = data => async dispatch => {
    try {
        // if(data.page == 0) dispatch(startFetchingMarketStores);
        const res = await axios.get(`${BASE_URL}endpoints/stores-list?locale=${data.lan}&page=${data.page}&filterByAction=${data.filter}&categoryId=${data.categoryId}&itemsCount=10`);
        console.log(res);
        dispatch({
            type: FETCH_MARKET_STORES,
            stores: res.data.output
        });
        dispatch(endFetchingMarketStores);
    } catch (e) {
        console.error(e.message);
    }
}

export const switchMarketStore = value => ({
    type: SWITCH_MARKET_STORE,
    value
});

export const resetMarketStoreData = () => ({
    type: RESET_MARKET_STORE_DATA
})

export const startFetchingProductsMarket = () => {
    console.log('Start Fetching Items!')
    return {
        type: START_FETCHING_PRODUCTS_MARKET
    }
}

export const endFetchingProductsMarket = () =>  {
    console.log('End Fetching Item!')
    return {
        type: END_FETCHING_PRODUCTS_MARKET
    }
}


export const startFetchingItemTypes = {
    type: START_FETCHING_ITEM_TYPES
}

export const endFetchingItemTypes = {
    type: END_FETCHING_ITEM_TYPES
}

export const fetchItemTypes = data => async dispatch => {
    try {
        if(data.page == 0) dispatch(startFetchingItemTypes);
        const res = await axios.get(`${BASE_URL}endpoints/products-types/list-by-category-ids?locale=${data.lan}&page=${data.page}&categoryIds=${data.categoryIds}&storeId=${data.storeId}&filterByAction=${data.filter}`);
        console.log(res);

        const allItemType = {
            id: null,
            name: 'الكل'
        }

        dispatch({
            type: FETCH_ITEM_TYPES,
            itemTypes: data.page == 0 ?  [allItemType, ...res.data.output] : res.data.output
        });

        if(data.page == 0) {
            dispatch(changeCurItemTypeId(null));
            const itemData = {
                page: 0,
                lan: data.lan,
                itemTypeIds: [null],
                storeIds: [null],
                categoryIds: [data.categoryIds],
                filter: data.filter
            };
            await dispatch(fetchProductsMarket(itemData));
        }

        dispatch(endFetchingItemTypes);
    } catch (e) {
        console.error(e.message);
    }
}

export const fetchProductsMarket = data => async dispatch => {
    try {
        if(data.page == 0) dispatch(startFetchingProductsMarket());
        console.log(data);

        const res = await axios.get(`${BASE_URL}endpoints/items/list/by-item-types-ids?locale=${data.lan}&categoryIds=${data.categoryIds}&page=${data.page}&itemTypeIds=${data.itemTypeIds}&storeIds=${data.storeIds}&filterByAction=${data.filter}`);

        console.log(res);

        dispatch({
            type: FETCH_PRODUCTS_MARKET,
            items: res.data.output,
        });

        dispatch(endFetchingProductsMarket());

        return res;

    } catch (e) {
        console.error(e.message);
    }
}

export const changeCurItemTypeId = (id) => ({
    type: CHANGE_CUR_ITEM_TYPE_ID,
    id
})

export const startFetchingLocales = {
    type: START_FETCHING_LOCALES
}

export const endFetchingLocales = {
    type: END_FETCHING_LOCALES
}

export const fetchLocales = data => async dispatch => {
    try {
        console.log('Hitting!')
        dispatch(startFetchingLocales);
        const res = await axios.get(`${BASE_URL}endpoints/locales/list?mLocale=${data.lan}&sortType=${data.sortType}&page=${data.page}`);
        console.log(res);
        dispatch({
            type: FETCH_LOCALES,
            locales: res.data.output
        });
        // dispatch(fetchCategories(res.data.output[0], data.filter, data.navigate, 0, 0, data.store))
        dispatch(changeCurrentSelectedLocale(res.data.output[0]))
        dispatch(endFetchingLocales);
    } catch (e) {
        console.log(e.message);
        dispatch(endFetchingLocales);
    }
}

export const changeCurrentSelectedLocale = locale => {
    console.log(locale);
    return {
        type: CHANGE_CURRENT_SELECTED_LOCALE,
        locale
    }
}