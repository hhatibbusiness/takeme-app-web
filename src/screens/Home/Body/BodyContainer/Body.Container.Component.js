import React from 'react';
import Cover from "./Cover/Cover";
import './Body.Container.Styles.scss';

const BodyContainerComponent = () => {
    return (
        <div className={'BodyContainer'}>
            <Cover />
        </div>
    );
};

export default BodyContainerComponent;