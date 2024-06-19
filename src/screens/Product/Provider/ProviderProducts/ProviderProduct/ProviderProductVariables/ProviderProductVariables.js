import React from 'react';
import './ProviderProductVariables.scss';
import ProviderProductVariable from "./ProviderProductVariable/ProviderProductVariable";

const ProviderProductVariables = ({variables}) => {
    return (
        <>
            <hr style={{marginBottom: '15px'}} />

            <div className={'ProviderProductVariables'}>
                {
                    variables?.length > 0 && variables.map((v, i) => (
                        <ProviderProductVariable variable={v} />
                    ))
                }
            </div>
        </>
    );
};

export default React.memo(ProviderProductVariables);