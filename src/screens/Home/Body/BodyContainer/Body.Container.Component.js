import React, {useEffect, useState} from 'react';
import Cover from "./Cover/Cover";
import './Body.Container.Styles.scss';
import {connect} from "react-redux";
import Categories from "./CategoriesBar/Categories";
import ProductList from "./ProductList/ProductList";
import SpinnerComponent from "../../../../components/Spinner/Spinner.Component";
import {fetchCategoryProducts, fetchCategories} from "../../../../store/actions/categories.action";
import Failure from "../../../Product/Provider/ProviderProducts/Failure/Failure";
import {useTranslation} from "react-i18next";

const BodyContainerComponent = ({loadingCategories, page, lan, categories, id, fetchCategoryProducts, value, fetchCategories}) => {
    const {t} = useTranslation();
    return (
        <div className={'BodyContainer'}>
            <Cover />
            <Categories home />
            {
                categories?.length > 0 ? (
                    !loadingCategories ? (
                        <ProductList />
                    ) : (
                        <SpinnerComponent />
                    )

                ) : (
                    <Failure text={t('there\'s not products')} />
                )
            }
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