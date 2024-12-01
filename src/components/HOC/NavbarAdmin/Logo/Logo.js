import React, { useEffect, useState } from 'react';
import './Logo.css';
import logoDefaultImage from '../../../../assets/defaults/logo-default-image.svg';

const Logo = ({ imgUrl }) => {
    const [defaultImage, setDefaultImage] = useState(null);

    useEffect(() => {
        setDefaultImage(imgUrl);
    }, []);


    return (
        <div className='Logo'>
            <img src={defaultImage} onError={e => {
                setDefaultImage(logoDefaultImage);
            }} />
        </div>
    );
}

export default Logo;