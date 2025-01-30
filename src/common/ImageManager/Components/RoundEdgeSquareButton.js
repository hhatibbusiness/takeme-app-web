import { TakeMeConstants } from "../Utils/TakeMeConstants";
import React from 'react';

const RoundedEdgeSquareButton = ({
  imageurl,
  onButtonClick,
  isAlert,
  label,
  disabled = false
}) => {
  return (
    <div className={"d-flex flex-column align-items-center justify-content-start"}>
      <button
        disabled={disabled}
        className={"rounded-3 border-0 shadow text-center"}
        style={{
          backgroundColor: isAlert
            ? TakeMeConstants.ALERT_COLOR
            : TakeMeConstants.PRIMARY_COLOR,
          width: '50px',
          height: '50px',
        }}
        onClick={onButtonClick}
      >
        <img src={imageurl} alt="Button Image" style={{ width: "35px", height: "35px" }} />
      </button>
      <p style={{ height: '20%' }} className="text-center">{label}</p>
    </div>
  );
};

export default RoundedEdgeSquareButton;
