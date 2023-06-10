import React, {useEffect} from 'react';
import {fetchCategories} from "../../../store/actions/categories.action";
import {connect} from "react-redux";

const Body = ({ fetchCategories}) => {

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div className={'Body'}>
            
        </div>
    );
};

export default connect(null, {fetchCategories}) (Body);