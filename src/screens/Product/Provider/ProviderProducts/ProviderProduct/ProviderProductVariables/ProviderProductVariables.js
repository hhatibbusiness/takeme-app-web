import React from 'react';
import './ProviderProductVariables.scss';
import ProviderProductVariable from "./ProviderProductVariable/ProviderProductVariable";

const ProviderProductVariables = ({variables}) => {
    return (
        <div className={'ProviderProductVariables'}>
            {
                variables?.length > 0 && variables.map((v, i) => (
                    <ProviderProductVariable variable={v} />
                ))
            }
        </div>
    );
};

export default ProviderProductVariables;