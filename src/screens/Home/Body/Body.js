import React from 'react';
import {fetchCategories} from "../../../store/actions/categories.action";
import {connect} from "react-redux";
import BodyContainerComponent from "./BodyContainer/Body.Container.Component";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Backdrop from "../../../components/Backdrop/Backdrop";
import CategoryError from "../../../components/CategoryError/CategoryError";
import './Body.scss'
import {closePopup} from "../../../store/actions/ui.actions";

const Body = ({ coverLoaded, setNavHeight, considerNav, setConsiderNav, fixedNav, setY, y, setFixedNav, topValue, setTopValue, setCoverLoaded, navShow, bodyContainerRef, setNavShow, setFiltersActive, filtersActive, navHeight, currentProduct, setCurrentProduct, setSidebar, sidebar, loadingCategories}) => {
    return (
            <div className={'Body'}>
                {
                    (loadingCategories) ? (
                        <div />
                    ) : <CategoryError>
                        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                        <Backdrop sidebar={sidebar} setSidebar={setSidebar} />
                        <BodyContainerComponent y={y} setY={setY} fixedNav={fixedNav} setFixedNav={setFixedNav} topValue={topValue} setTopValue={setTopValue} considerNav={considerNav}j bodyContainerRef={bodyContainerRef} setConsiderNav={setConsiderNav} setNavHeight={setNavHeight} navShow={navShow} setNavShow={setNavShow} filtersActive={filtersActive} setFiltersActive={setFiltersActive} navHeight={navHeight} coverLoaded={coverLoaded} setCoverLoaded={setCoverLoaded} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
                    </CategoryError>
                }
            </div>
    );
};

const mapStateToProps = state => ({
    loadingCategories: state.categories.loadingCategories,
    categoryError: state.categories.categoryError,
    lan: state.categories.lan,
    page: state.categories.page,
    openPopup: state.ui.openPopup
});

export default connect(mapStateToProps, {fetchCategories, closePopup}) (React.memo(Body));