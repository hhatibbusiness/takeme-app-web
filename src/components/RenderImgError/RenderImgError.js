import React, {useEffect} from 'react';
import './RenderImgError.scss';
import {connect} from "react-redux";

const RenderImgError = ({value}) => {
    useEffect(() => {
        console.log(value);
    }, [value])
    return (
        <div style={{height: `${value < 100 ? '100%' : '80%'}`}} className={'RenderImgError'}>
            <i className="fa-solid fa-circle-exclamation"></i>
            <p>فشل تحميل الصورة</p>
        </div>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps) (RenderImgError);