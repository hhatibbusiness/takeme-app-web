import React from 'react';
import {connect} from "react-redux";
import './Intro.scss';

const Intro = ({assets}) => {
    return (
        <div className={'Intro'}>
            <img className={'Intro__logo'} src={assets?.logoPath && assets.logoPath} />
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
});

export default connect(mapStateToProps) (Intro);