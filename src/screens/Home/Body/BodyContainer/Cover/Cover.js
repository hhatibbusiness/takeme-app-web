import React from 'react';
import './Cover.scss';
import {connect} from "react-redux";

const Cover = ({assets}) => {
    return (
        <div className={'Cover'}>
            <img src={assets.coverPath} className={'Cover__img'} />
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
})

export default connect(mapStateToProps) (Cover);