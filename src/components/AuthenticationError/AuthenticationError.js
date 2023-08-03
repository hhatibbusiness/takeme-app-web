import React from 'react'

function AuthenticationError({errorMessage}) {
  return (
    <div className='Login__error'>
        {errorMessage}
    </div>
  )
}

export default AuthenticationError;