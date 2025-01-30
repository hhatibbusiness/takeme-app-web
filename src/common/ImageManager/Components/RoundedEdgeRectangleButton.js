import React from 'react';

const RoundedEdgeButton = ({ label, onPress, bgColor }) => {
  return (
    <button
      className="rounded-1 border-0 shadow-sm text-center"
      style={{
        backgroundColor: `#${bgColor}`,
        width: '45vw',
        height: '40px',
        borderRadius: '5px',
      }}
      onClick={onPress}
    >
      <div
        className="fs-4"
        style={{
          textDecoration: 'none',
          color: bgColor === '07AB83' ? 'white' : '#07AB83',
        }}
      >
        {label}
      </div>
    </button>
  );
};

export default RoundedEdgeButton;
