import React from 'react';
import './ProviderProductTags.scss';

const ProviderProductTags = ({tags}) => {
    return (
        <div className={'ProviderProductTags'}>
            {
                tags.length > 0 && tags.map((t, i) => (
                    <span>{t}</span>
                ))
            }
        </div>
    );
};

export default ProviderProductTags;