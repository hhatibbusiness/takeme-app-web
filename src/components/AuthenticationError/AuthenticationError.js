import React from 'react';
import './AuthenticationError.css';

function AuthenticationError({errorMessage}) {
  return (
    <div className='AuthenticationError'>
        {errorMessage}
    </div>
  )
}

export default AuthenticationError;