import React, { useState } from 'react';
import './FocusableElement.css';

export default function FocusableElement({ children, style }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = (e) => {
    setIsFocused(!isFocused);
    document.body.classList.toggle("dimmed", !isFocused); // Toggle dimmed effect for background
  };

  return (
    <div
      className={`focusable-element ${isFocused ? "focused" : ""}`}
      onClick={handleClick}
      style={style}
    >
      {children}
    </div>
  );
}
