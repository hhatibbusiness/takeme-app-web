import React from 'react';
import './SaveButton.css';
import SpinnerSmall from '../SpinnerSmall/SpinnerSmall';


const SaveButton = ({id, saveClickHanlder, saving}) => {
    return (
        <div id={id} onClick={saveClickHanlder} className='SaveButton'>
            {
                saving ? (
                    <SpinnerSmall />
                ) : <p>حفظ</p>
            }
            
        </div>
    )
}

export default SaveButton;