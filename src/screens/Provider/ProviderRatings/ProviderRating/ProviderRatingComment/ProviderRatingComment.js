import React from 'react';
import './ProviderRatingComment.css';

const ProviderRatingComment = ({rating}) => {
    return (
        <div className={'ProviderRatingComment'}>
            <p>{rating.ratingComment}</p>
        </div>
    );
};

export default ProviderRatingComment;