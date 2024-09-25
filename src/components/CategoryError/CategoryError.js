import React from 'react';
import './CategoryError.scss';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import ErrorImage from '../../assets/error.png';

const CategoryError = ({ error, children }) => {
    const navigate = useNavigate();
    return error ? (
            <div className={'CategoryError'}>
                {/*<i className="fa-solid fa-cloud-bolt"></i>*/}
                <img src={ErrorImage} />
                <p>نعتذر منك، يوجد العديد من الطلبات على السيرفر حالياً</p>
                <p >تواصل معنا او جرب لاحقا</p>
                <p className={'CategoryError__reload'} onClick={() => navigate(0)}><i className="fa-solid fa-rotate-right"></i>حاول مجددا</p>
            </div>
        ) : children;
};

const mapStateToProps = state => ({
    error: state.categories.error
});

export default connect(mapStateToProps) (CategoryError);