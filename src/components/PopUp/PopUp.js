import React, { useEffect, useState, useRef } from 'react';
import './Popup.css';
import {getNeeds, searchNeed} from '../../modals/manageNeeds.js';
import ImageLoader from '../../utilty/ImageLoader';
import useDebounce from '../../utilty/useDebounce.js';
import { getHighlightedText } from '../../utilty/getHighlightText.js';



const PopUp = ({ isOpen, setIsOpen, itemNeedsData, setItemNeedsData }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [needData, setNeedData] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsContainerRef = useRef(null);

  const [LocalSelectedItems, setLocalSelectedItems] = useState(itemNeedsData);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  /////////* Fetch data from the server and SetLoading */////////
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const newData = await getNeeds(page);
      setNeedData([...needData, ...newData]);
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line 
  }, [page]);


  /////////* Handle infinite scroll for the Sub Element by locate its Ref */////////
  useEffect(() => {
    const handleScroll = () => {
        if (itemsContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = itemsContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight-5  && !isLoading) {
              setPage((prevPage) => prevPage + 1);
            }
        }
    };
    const container = itemsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
        if (container) {
          container.removeEventListener('scroll', handleScroll);
        }}
  });


  ////////*  Make the Search Function  *////////
  useEffect(() => {
    if (debouncedSearchTerm === '') {
      setNeedData([]);
      setPage(0);
    }
    const fetchData = async () => {
      const response = await searchNeed({ name: debouncedSearchTerm });
      setNeedData(response);
    };
    fetchData();
    // eslint-disable-next-line
  }, [debouncedSearchTerm]);


  ////////* Handle Checked Items *////////
  const handleSelection = (e, need) => {
    if (e.target.checked) {
      setLocalSelectedItems([...LocalSelectedItems, need]);
    } else {
      setLocalSelectedItems(LocalSelectedItems.filter((item) => item.id !== need.id));
    }};

  //////* Handle Save Button *///////
  const handleSave = () => {
    console.log(LocalSelectedItems)
    setItemNeedsData(LocalSelectedItems);
    closePopup();
  };

  ///////// Close the Popup with Animation */////////
  const closePopup = () => {
    setIsClosing(true); // Start closing animation
    setTimeout(() => {
        setIsOpen(false); // Close popup after
        setIsClosing(false); // Reset state after animation
    }, 400);
  };


  return (
    <div>
      {isOpen && 
        <div dir='rtl' className= {`overlay ${isClosing ? 'fade-out' : 'fade-in'}`} >
            <div className={`popup ${isClosing ? 'closing' : 'open'}`}>
              <div className='pop-up-header'>
                <button onClick={closePopup} className='exist-pop-up'>
                  <ImageLoader src='exist.png' height='100%' alt='close'/>
                </button>
                <div className='searchbar-container'>
                  <ImageLoader src='search-gray.png' height='100%' alt='search'/>
                  <input type='text' 
                          className='search-input' 
                          onChange={(e) => setSearchTerm(e.target.value?.trim())}
                          placeholder='شو اسم الحاجة البدك ياه ....'
                    />
                </div>                
              </div>

              {/* Checked Items in the Menu */}
              <div className='items-container' ref={itemsContainerRef}>
                {needData?.map((need) => (
                    <CheckboxWithImageAndText key={need.id} 
                                              label={need.name}
                                              HighLightText={debouncedSearchTerm}
                                              imageSrc={need.imagePath}
                                              checked={LocalSelectedItems.some((item) => item.id === need.id)}
                                              onChange={(e) => handleSelection(e, need)} 
                      />
                  ))}
              </div>
              <div className='pop-up-footer'>
                <button className='footer-button' onClick={handleSave}>اختار</button>
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default PopUp;


/////////* CheckBoxElement */////////
const CheckboxWithImageAndText = ({ label, HighLightText, imageSrc, checked, onChange }) => {
  return (
    <div className='checkboxElement'>
      <div className="checkbox-container">
        <input type="checkbox" checked={checked}  onChange={onChange}/>
      </div>
      <div className='circleImage-checkbox'>
        <img src={imageSrc} alt="circle" className="circle-image" 
            onError={(e)=> e.target.src = `${process.env.PUBLIC_URL}/images/clean.png`} />
      </div>
      <span>{getHighlightedText(label, HighLightText)}</span>
    </div>
  );
};