import React, {useEffect, useState} from 'react';
import './RenderImgError.scss';
import {connect} from "react-redux";
import LoadingProduct from "../LoadingProduct/LoadingProduct";

const RenderImgError = ({value, failureRef, elemRef, imgLoaderRef, hidden, setHidden}) => {
    useEffect(() => {
        if(failureRef?.current?.getBoundingClientRect().height == elemRef?.current?.getBoundingClientRect().height) setHidden(false)
    }, [failureRef?.current?.getBoundingClientRect().height]);

    return (
        <>
            <div ref={failureRef} style={{height: `${elemRef?.current?.getBoundingClientRect().height}px`}} className={`RenderImgError ${hidden ? 'RenderImgError__hidden' : 'RenderImgError__visible'}`}>
                <i className="fa-solid fa-circle-exclamation"></i>
                <p style={{fontSize: `${value === 100 && '12px'}`}}>فشل تحميل الصورة</p>
            </div>
            {/*{hidden && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}
        </>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps) (RenderImgError);