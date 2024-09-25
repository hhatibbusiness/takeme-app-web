import React from 'react';
import './ProviderProductTags.scss';

const ProviderProductTags = ({tags}) => {
    return (
        <>
            <hr style={{marginBottom: '15px'}} />
            <div className={'ProviderProductTags'}>
                {
                    tags?.length > 0 && tags?.map((t, i) => (
                        <span className={'ProviderProductTags__tag'}>{t}</span>
                    ))
                }
            </div>
        </>
    );
};

export default React.memo(ProviderProductTags);