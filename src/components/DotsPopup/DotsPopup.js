import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteDesire } from '../../modals/manageDesires';

import './DotsPopup.style.css';


function DotsPopup( { id, setData } ) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggle the popup visibility
  const handleToggle = (event) => {
    setIsOpen(!isOpen);
  };

  /// Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  });

  const handleDelete = async () => {
    const response = await DeleteDesire({ id });
    if (response?.status) {
      console.log('Deleted successfully', response);
      setData(prevItems => prevItems.filter(item => item.id !== id));
    }
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
        
        <button 
            ref={buttonRef}
            className="desire-card-button" 
            onClick={handleToggle}
        >⋮</button>

      {isOpen && (
        <div
          ref={menuRef}
          className = 'dots-popup-menu show'
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className='popup-button regular' onClick={()=> navigate(`EditDesire/${id}`)}>تعديل</button>
            <button className='popup-button regular'>نقل</button>
            <button className='popup-button regular' onClick={()=> navigate(`DuplicateDesire/${id}`)}>تكرار</button>
            <button className='popup-button delete'  onClick={handleDelete}> حذف </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default DotsPopup;
