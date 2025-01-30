import React from 'react';
import './Monitor.css'; // Import the CSS file for styling

const Monitor = ({ src }) => {
  return (
    <div id="monitor" style={{ width: '100%', height: '100%' }}>
      <div className="scan"></div>
      <img src={src} alt="Monitor Screen" className="screen mt-0" style={{ objectFit: 'contain' }} />
    </div>
  );
}

export default Monitor;
