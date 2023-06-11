import React from 'react';
import Cover from "./Cover/Cover";
import './Body.Container.Styles.scss';
import {connect} from "react-redux";
import Categories from "./CategoriesBar/Categories";

const BodyContainerComponent = ({loadingCategories}) => {
    return (
        <div className={'BodyContainer'}>
            <Cover />
            {
                !loadingCategories && <Categories />
            }
        </div>
    );
};

const mapStateToProps = state => ({
    loadingCategories: state.categories.loadingCategories
});

export default connect(mapStateToProps) (BodyContainerComponent);