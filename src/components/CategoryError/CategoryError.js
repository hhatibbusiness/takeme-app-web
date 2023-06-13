import React from 'react';
import './CategoryError.scss';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

const CategoryError = ({ error, children }) => {
    const navigate = useNavigate();
    return error ? (
            <div className={'CategoryError'}>
                <i className="fa-solid fa-cloud-bolt"></i>
                <p>Server Error. Please try again later!</p>
                <p className={'CategoryError__or'}>OR</p>
                <p className={'CategoryError__reload'} onClick={() => navigate(0)}><i className="fa-solid fa-rotate-right"></i></p>
            </div>
        ) : children;
};

const mapStateToProps = state => ({
    error: state.categories.error
});

export default connect(mapStateToProps) (CategoryError);