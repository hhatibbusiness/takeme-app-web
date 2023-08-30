import React from 'react';
import './ProviderProductVariable.scss';

const ProviderProductVariable = ({variable}) => {
    return (
        variable?.value && variable?.key && <div className={'ProviderProductVariable'}>
            {variable?.iconPath && <div className="ProviderProductVariable__icon">
                <img src={variable.iconPath} />
            </div>}
            {
                variable?.key && <span>{variable.key}: </span>
            }
            {
                variable?.value && <span>{variable.value}</span>
            }
        </div>
    );
};

export default ProviderProductVariable;