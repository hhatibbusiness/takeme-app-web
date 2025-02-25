import React from 'react';
import './BackBtn.scss';
import history from '../../../../history/history';
import backImage from '../../../../assets/images/defaults/back.png';
import {connect} from "react-redux";

const BackBtn = ({step, setStep, backBtn}) => {
    return (
        <div role={'navbar__back'} onClick={() => {
            if(step && step > 1) {
                setStep(step - 1)
            } else {
                history.go(-1);
            }
        }} className={'BackBtn'}>
            <img src={backImage} />
        </div>
    );
};

const mapStateToProps = state => ({
    backBtn: state.navbar.backBtn,
})

export default connect(mapStateToProps) (BackBtn);