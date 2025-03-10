import React, { useState, useRef, useEffect } from 'react';
import PopupInput from '../../../../../components/PopupInput/PopupInput';
import { useTranslation } from 'react-i18next';
import './PlaceType.css';

const PlaceType = ({ value, onChange, width, height, margin, placeholder, submitted, valid }) => {
    const { t } = useTranslation();
    const placeTypes = t('placeTypes', { returnObjects: true });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    const handleOptionClick = (placeType) => {
        onChange(placeType.id);
        setIsOpen(false);
    };

    // if user press anywhere it is closed
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className="placeTypeElementContainer"
            ref={dropdownRef}
            style={{ width: width, height: height, margin: margin }}
        >
            <PopupInput 
                selectedItem={{value: placeTypes.find(type => type.id === value)?.name || ''}}
                displayName={'value'}
                placeholder={placeholder}
                inputClickHandler={() => setIsOpen(!isOpen)}
                setOpen={setIsOpen}
                submitted={submitted}
                valid={valid}
            />
            {isOpen && (
                <div className="placeTypeElementContainer__options">
                    {placeTypes.map((placeType) => (
                        <>
                        <div
                            key={placeType.id}
                            className="placeTypeElementContainer__option"
                            onClick={() => handleOptionClick(placeType)}
                        >
                            {placeType.name}
                        </div>
                        <div className='Item__separator_PlaceType'></div>
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlaceType;
