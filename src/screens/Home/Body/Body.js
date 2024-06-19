import React, {lazy, Suspense} from 'react';
import {fetchCategories} from "../../../store/actions/categories.action";
import {connect} from "react-redux";
import SpinnerComponent from "../../../components/Spinner/Spinner.Component";
import BodyContainerComponent from "./BodyContainer/Body.Container.Component";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Backdrop from "../../../components/Backdrop/Backdrop";
import CategoryError from "../../../components/CategoryError/CategoryError";
import './Body.scss'
import {Outlet} from "react-router-dom";
import {closePopup} from "../../../store/actions/ui.actions";

const Body = ({ coverLoaded, setCoverLoaded, currentProduct, setCurrentProduct, setSidebar, sidebar, loadingCategories}) => {
    return (
            <div className={'Body'}>
                {
                    (loadingCategories) ? (
                        <div />
                    ) : <CategoryError>
                        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                        <Backdrop sidebar={sidebar} setSidebar={setSidebar} />
                        <BodyContainerComponent coverLoaded={coverLoaded} setCoverLoaded={setCoverLoaded} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
                        <Outlet />
                    </CategoryError>
                }
                {/*{*/}
                {/*    (!coverLoaded) && <div className={'Body__hidden'}>*/}
                {/*        <SpinnerComponent />*/}
                {/*    </div>*/}
                {/*}*/}
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