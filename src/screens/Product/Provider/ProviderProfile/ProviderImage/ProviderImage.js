import React from 'react';
import './ProviderImage.scss';
import {useNavigate} from "react-router-dom";

const ProviderImage = ({img, id}) => {
    const navigate = useNavigate();
    return (
        <img className={'ProviderImage'} src={img} alt="provider"/>
    );
};

export default ProviderImage;