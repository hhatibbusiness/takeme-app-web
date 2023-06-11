import React, {useEffect, useState} from 'react';
import {fetchCategories} from "../../../store/actions/categories.action";
import {connect} from "react-redux";
import SpinnerComponent from "../../../components/Spinner/Spinner.Component";
import BodyContainerComponent from "./BodyContainer/Body.Container.Component";
import Navbar from "../../../components/HOC/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Backdrop from "../../../components/Backdrop/Backdrop";

const Body = ({ fetchCategories, loadingCategories}) => {
    const [sidebar, setSidebar] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className={'Body'}>
            {
                loadingCategories ? (
                    <SpinnerComponent />
                ): (
                    <>
                        <Navbar setSidebar={setSidebar} />
                        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                        <Backdrop sidebar={sidebar} setSidebar={setSidebar} />
                        <BodyContainerComponent />
                    </>

                )
            }
        </div>
    );
};

const mapStateToProps = state => ({
    loadingCategories: state.categories.loadingCategories
})

export default connect(mapStateToProps, {fetchCategories}) (Body);