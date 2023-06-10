import React, {useEffect} from 'react';
import {fetchCategories} from "../../../store/actions/categories.action";
import {connect} from "react-redux";
import SpinnerComponent from "../../../components/Spinner/Spinner.Component";

const Body = ({ fetchCategories, loadingCategories}) => {

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className={'Body'}>
            {
                loadingCategories ? (
                    <SpinnerComponent />
                ): (
                    <div>Hello from this component</div>
                )
            }
        </div>
    );
};

const mapStateToProps = state => ({
    loadingCategories: state.categories.loadingCategories
})

export default connect(mapStateToProps, {fetchCategories}) (Body);