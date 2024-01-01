import React from 'react';
import {connect} from "react-redux";
import './Intro.scss';
import logoImage from '../../assets/logo.png';

const Intro = ({assets}) => {
    return (
        <div className={'Intro'}>
            <div className="Intro__container">
                <img className={'Intro__logo'} src={logoImage && logoImage} />
                {/*<p>for your needs</p>*/}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
});

export default connect(mapStateToProps) (Intro);