import React, { useState, useRef, useEffect } from 'react';
import PopupInput from '../../../../../components/PopupInput/PopupInput';
import { useTranslation } from 'react-i18next';
import './PlaceType.css';

const PlaceType = ({ value, onChange, width, height, margin, placeholder }) => {
    const { t } = useTranslation();
    const placeTypes = t('placeTypes', { returnObjects: true });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (placeType) => {
        onChange(placeType.id);
        setIsOpen(false);
    };

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
                inputClickHandler={handleToggle}
                setOpen={setIsOpen}
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
