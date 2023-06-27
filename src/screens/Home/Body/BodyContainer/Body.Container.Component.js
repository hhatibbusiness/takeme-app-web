import React, {useEffect, useState} from 'react';
import Cover from "./Cover/Cover";
import './Body.Container.Styles.scss';
import {connect} from "react-redux";
import Categories from "./CategoriesBar/Categories";
import ProductList from "./ProductList/ProductList";
import SpinnerComponent from "../../../../components/Spinner/Spinner.Component";
import {fetchCategoryProducts, fetchCategories} from "../../../../store/actions/categories.action";

const BodyContainerComponent = ({loadingCategories, page, lan, categories, id, fetchCategoryProducts, value, fetchCategories}) => {

    return (
        <div className={'BodyContainer'}>
            <Cover />
            <Categories home />
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
    value: state.categories.value,
    page: state.categories.page,
    categories: state.categories.categories,
    lan: state.categories.lan
});

export default connect(mapStateToProps, {fetchCategoryProducts, fetchCategories}) (BodyContainerComponent);