import defaultImage from '../assets/Default-product-type-and-product-image 1.png'
import React from 'react';
const DefaultImage = () => {

  return ( 
    <div className='col-12 d-flex justify-content-center align-items-center' 
    style={{
       backgroundColor: '#F9FFF9' , 
       height: '100vw',
       backgroundImage:`url(${defaultImage})`,
       backgroundPosition:'top center',
       backgroundRepeat:'no-repeat',
      //  backgroundSize:'70% 80%'
       }}>
    </div>
  );
}

export default DefaultImage;