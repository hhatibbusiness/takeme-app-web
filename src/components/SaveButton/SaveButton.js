import React from 'react';
import './SaveButton.css';
import SpinnerSmall from '../SpinnerSmall/SpinnerSmall';


const SaveButton = ({saveClickHanlder, saving}) => {
    return (
        <div onClick={saveClickHanlder} className='SaveButton'>
            {
                saving ? (
                    <SpinnerSmall />
                ) : <p>حفظ</p>
            }
            
        </div>
    )
}

export default SaveButton;