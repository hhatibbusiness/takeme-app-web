import React from 'react';
import './RenderImgError.scss';

const RenderImgError = () => {
    return (
        <div className={'RenderImgError'}>
            <i className="fa-solid fa-circle-exclamation"></i>
            <p>فشل تحميل الصورة</p>
        </div>
    );
};

export default RenderImgError;