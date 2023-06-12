import React, {useEffect} from 'react';
import Cover from "./Cover/Cover";
import './Body.Container.Styles.scss';
import {connect} from "react-redux";
import Categories from "./CategoriesBar/Categories";
import ProductList from "./ProductList/ProductList";
import SpinnerComponent from "../../../../components/Spinner/Spinner.Component";
import {fetchCategoryProducts} from "../../../../store/actions/categories.action";

const BodyContainerComponent = ({loadingCategories, id, fetchCategoryProducts}) => {
    // useEffect(() => {
    //     fetchCategoryProducts(id);
    // }, [id]);

    return (
        <div className={'BodyContainer'}>
            <Cover />
            {
                !loadingCategories && <Categories />
            }
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
    id: state.categories.curId
});

export default connect(mapStateToProps, {fetchCategoryProducts}) (BodyContainerComponent);