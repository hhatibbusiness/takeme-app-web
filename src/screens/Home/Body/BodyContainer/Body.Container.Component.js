import React, {useEffect, useState} from 'react';
import Cover from "./Cover/Cover";
import './Body.Container.Styles.scss';
import {connect} from "react-redux";
import Categories from "./CategoriesBar/Categories";
import ProductList from "./ProductList/ProductList";
import SpinnerComponent from "../../../../components/Spinner/Spinner.Component";
import {fetchCategoryProducts} from "../../../../store/actions/categories.action";

const BodyContainerComponent = ({loadingCategories, id, fetchCategoryProducts, value}) => {
    return (
        <div className={'BodyContainer'}>
            <Cover />
            <Categories />
            {!loadingCategories ? (
                <ProductList />
            ) : (
                <SpinnerComponent />
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    loadingCategories: state.categories.loadingCategories,
    loadingCategoryProducts: state.categories.loadingCategoryProducts,
    id: state.categories.curId,
    value: state.categories.value
});

export default connect(mapStateToProps, {fetchCategoryProducts}) (BodyContainerComponent);