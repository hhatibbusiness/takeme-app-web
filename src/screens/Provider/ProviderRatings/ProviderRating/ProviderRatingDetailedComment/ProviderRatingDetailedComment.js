import React from 'react';
import './ProviderRatingDetailedComment.css';

const ProviderRatingDetailedComment = ({rating}) => {
    return (
        <div className={'ProviderRatingDetailedComment'}>
            <p>{rating?.comments}</p>
        </div>
    );
};

export default ProviderRatingDetailedComment;