import axios from "axios";
import {
    CHANGE_CURRENT_PROVIDER_CATEGORY_ID, CHANGE_STORE_CURRENT_ITEM_TYPE,
    CLOSE_PROVIDER_GALLERY,
    EDIT_PROVIDER_PRODUCT,
    END_EDITING_PROVIDER_PRODUCT,
    END_FETCHING_PROVIDER,
    END_FETCHING_PROVIDER_CATEGORIES,
    END_FETCHING_PROVIDER_PRODUCTS_TYPES,
    END_FETCHING_STORE_ITEM_TYPES, END_FETCHING_STORE_ITEMS,
    FETCH_PRODUCTS_TYPES_PRODUCTS,
    FETCH_PROVIDER_CATEGORIES,
    FETCH_PROVIDER_DATA,
    FETCH_PROVIDER_PRODUCTS_TYPES,
    FETCH_STORE_ITEM_TYPES, FETCH_STORE_ITEMS,
    INCREASE_PROVIDER_PRODUCT_TYPES_PAGE,
    OPEN_PROVIDER_GALLERY,
    RESET_PROVIDER_PRODUCT_TYPES_DATA,
    START_EDITING_PROVIDER_PRODUCT,
    START_FETCHING_PROVIDER,
    START_FETCHING_PROVIDER_CATEGORIES,
    START_FETCHING_PROVIDER_PRODUCTS_TYPES,
    START_FETCHING_STORE_ITEM_TYPES,
    START_FETCHING_STORE_ITEM_types,
    START_FETCHING_STORE_ITEMS,
} from "./action.types";
import { BASE_URL } from "../../utls/assets";
import allCategoryImage from "../../assets/images/all-icon.jpg";
import {loadUser, logout} from "./login.action";

export const fetchProviderData = (lan, id, filter, navigate) => async dispatch => {
    try {
        dispatch(startFetchingProvider);
        const res = await axios.get(`${BASE_URL}endpoints/provider-details?locale=${lan}&providerId=${id}&filterByAction=${filter}`);
        if(res.status == 200 && res.data.status == true && Object.keys(res.data.output).length != 0 && res.data.output != null) {
            dispatch({
                type: FETCH_PROVIDER_DATA,
                provider: res.data.output
            });
        }
        if(res?.data?.output == null) {

        }
        dispatch(endFetchingProvider);
    } catch (e) {
        if(e?.response?.status == 401) {
            dispatch(loadUser(navigate, lan));
            // tokenUnautharizedMiddleware(navigate, '/login');
        }
        console.error(e.message);
        dispatch(endFetchingProvider);
    }
}

export const startFetchingProviderProductsTypes = {
    type: START_FETCHING_PROVIDER_PRODUCTS_TYPES
}

export const endFetchingProviderProductsTypes = {
    type: END_FETCHING_PROVIDER_PRODUCTS_TYPES
}

export const fetchProviderProductsTypes = data => async dispatch => {
    try {
        if(data.page == 0) dispatch(startFetchingProviderProductsTypes);
        const formData = {
            providerId: data.providerId,
            categoryListIds: data.categoryListIds,
            productTypeId: data.productTypeId
        };
        const res = await axios.post(`${BASE_URL}endpoints/provider-data?locale=ar&page=${data.page}&itemsCount=10`, formData);
        // console.log(res);
        if(!formData.productTypeId) {
            // console.log('ProductType is null', data.productTypeId);
            dispatch({
                type: FETCH_PROVIDER_PRODUCTS_TYPES,
                productTypes: res.data.output
            });
        } else {
            // console.log('ProductType is not null');
            dispatch({
                type: FETCH_PRODUCTS_TYPES_PRODUCTS,
                productType: res.data.output[0]
            });
        }
        dispatch(increaseProviderProductTypesPage());
        dispatch(endFetchingProviderProductsTypes);
    } catch(e) {
        dispatch(endFetchingProviderProductsTypes);
        dispatch({
            type: 'FETCH_PRODUCTS_TYPES_PRODUCTS_ERROR',
            productTypeId: data.productTypeId
        });

        if(e?.response?.status == 401) {
            dispatch(loadUser(data.navigate, data.lan));

            // tokenUnautharizedMiddleware(navigate, '/login')
        }

        console.error(e.message);
    }
}

export const increaseProviderProductTypesPage = () => {
    return {
        type: INCREASE_PROVIDER_PRODUCT_TYPES_PAGE
    }
}

export const resetProviderProductTypesData = () => {
    return {
        type: RESET_PROVIDER_PRODUCT_TYPES_DATA
    }
}

export const openProviderGallery = product => ({
    type: OPEN_PROVIDER_GALLERY,
    product: product
});

export const closeProviderGallery = product => ({
    type: CLOSE_PROVIDER_GALLERY,
});

export const startFetchingProvider = {
    type: START_FETCHING_PROVIDER
}

export const endFetchingProvider = {
    type: END_FETCHING_PROVIDER
}

export const startFetchingProviderCategories = {
    type: START_FETCHING_PROVIDER_CATEGORIES
}

export const endFetchingProviderCategories = {
    type: END_FETCHING_PROVIDER_CATEGORIES
}

export const fetchProviderCategories = data => async dispatch => {
    try {
        dispatch(startFetchingProviderCategories);
        const res = await axios.get(`${BASE_URL}endpoints/categories/list-no-empty?locale=${data.lan}&providerId=${data.providerId}`);
        const allCategory =       {
            id: null,
            name: 'الكل',
            description: 'هذة الفئة تحتوي علي جميع انواع المنتجات',
            imagePath: allCategoryImage,
            sortIndex: 1,
            createdDate: new Date(),
            updatedDate: new Date(),
            imageName: 'all.jpg'
        };

        const categories = [
            allCategory,
            ...res.data.output
        ];

        // dispatch(changeCurrentId(null));

        dispatch({
            type: FETCH_PROVIDER_CATEGORIES,
            categories
        });

        dispatch(endFetchingProviderCategories);
    } catch (e) {
        if(e?.response?.status == 401) {
            dispatch(loadUser(data.navigate, data.lan));

            // tokenUnautharizedMiddleware(navigate, '/login')
        }

        console.error(e.message);
    }
}

export const changeCurrentId = id => {
    return {
        type: CHANGE_CURRENT_PROVIDER_CATEGORY_ID,
        id
    }
}

export const startEditingProviderProduct = {
    type: START_EDITING_PROVIDER_PRODUCT
}

export const endEditingProviderProduct = {
    type: END_EDITING_PROVIDER_PRODUCT
}

export const editProviderProduct = data => async dispatch => {
    try {
        dispatch(startEditingProviderProduct);
        const formData = {
            ...data.product
        };
        const sentData = {
            ...data.product,
            rentDetails: null,
            saleDetails: null,

        };
        const config = {
            headers: { Authorization: `Bearer ${data.token}` }
        };

        console.log(formData);
        const res = await axios.put(`${BASE_URL}endpoints/products/update?locale=${data.lan}`, sentData, config);
        console.log(res);
        dispatch({
            type: EDIT_PROVIDER_PRODUCT,
            product: res.data.product
        });
        console.log(res);
        dispatch(endEditingProviderProduct);
    } catch (e) {
        if(e?.response?.status == 401 || e?.response?.status == 403) {
            localStorage.removeItem('takemeProviderToken');
            localStorage.removeItem('takemeProviderData');
            data.navigate('/login');
            dispatch(logout());
        }

        console.log(e.message);
    }
}

export const startFetchingStoreItemTypes = {
    type: START_FETCHING_STORE_ITEM_TYPES
}

export const endFetchingStoreItemTypes = {
    type: END_FETCHING_STORE_ITEM_TYPES
}

export const fetchStoreItemTypes = data => async dispatch => {
    try {
        if(data.page == 0) dispatch(startFetchingStoreItemTypes);

        console.log(data);

        const res = await axios.get(`${BASE_URL}endpoints/products-types/list-by-category-ids?locale=${data.lan}&page=${data.page}&categoryIds=${data.categoryIds}&storeId=${data.storeId}`);

        console.log(res);
        const allItemType = {
            id: null,
            name: 'الكل'
        };

        dispatch({
            type: FETCH_STORE_ITEM_TYPES,
            itemTypes: data.page == 0 ? [allItemType, ...res.data.output] : res.data.output,
            page: data.page
        });

        if(data.page == 0) {
            dispatch(changeStoreCurrentItemType(null));
            const itemTypesData = {
                page: 0,
                lan: data.lan,
                itemTypeIds: [null],
                storeIds: data.storeId
            };
            await dispatch(fetchStoreItems(itemTypesData));
        }
        dispatch(endFetchingStoreItemTypes);
        return res;
    } catch (e) {
        console.log(e.message);
    }
}

export const startFetchingStoreItems = {
    type: START_FETCHING_STORE_ITEMS
}

export const endFetchingStoreItems = {
    type: END_FETCHING_STORE_ITEMS
}

export const fetchStoreItems = data => async dispatch => {
    try {
        if(data.page == 0) dispatch(startFetchingStoreItems);
        const res = await axios.get(`${BASE_URL}endpoints/items/list/by-item-types-ids?locale=${data.lan}&page=${data.page}&itemTypeIds=${data.itemTypeIds}&storeIds=${data.storeIds}`);

        dispatch({
            type: FETCH_STORE_ITEMS,
            items: res.data.output,
            page: data.page
        });
        dispatch(endFetchingStoreItems);
        return res;
    } catch (e) {
        console.error(e.message);
    }
}

export const changeStoreCurrentItemType = (id) => ({
    type: CHANGE_STORE_CURRENT_ITEM_TYPE,
    id
})