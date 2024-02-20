import React from 'react';
import './Mid.scss'

const Mid = ({midText}) => {



    return (
        <div className={'Mid'}>
            {midText}
            {/*<h3 >{midText}</h3>*/}
            {/*<h3>{midText.length > 10 && '...'}{midText.length <= 21 ? midText : midText.substring(0, 22)}</h3>*/}
        </div>
    );
};

export default Mid;