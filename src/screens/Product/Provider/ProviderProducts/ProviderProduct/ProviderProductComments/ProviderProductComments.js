import React from 'react';
import './ProviderProductComments.scss';

const ProviderProductComments = ({comments}) => {
    return (
        <div className={'ProviderProductComments'}>
            {
                comments?.length > 0 && comments.map((c, i) => (
                    <span>{c}</span>
                ))
            }
        </div>
    );
};

export default ProviderProductComments;