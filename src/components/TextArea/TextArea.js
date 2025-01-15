import React, { useRef, useState } from 'react';
import './TextArea.css';
import InputError from '../Input/InputError/InputError';

const TextArea = ({ id, touched, rules, valid, value, setValue, submitted, required, placeholder }) => {
    const [height, setHeight] = useState(100); // Default height
    // const [width, setWidth] = useState(300);   // Default width

    const textAreaRef = useRef();

    const handleResize = (e) => {
        // Determine whether it's a mouse or touch event
        const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

        const newHeight = clientY - textAreaRef.current.getBoundingClientRect().top;

        if (newHeight > 50) setHeight(newHeight); // Set minimum height
    };


    const startResize = (e) => {
        e.preventDefault();

        if (e.type === 'mousedown') {
            window.addEventListener('mousemove', handleResize);
            window.addEventListener('mouseup', stopResize);
        } else if (e.type === 'touchstart') {
            window.addEventListener('touchmove', handleResize);
            window.addEventListener('touchend', stopResize);
        }
    };

    const stopResize = () => {
        window.removeEventListener('mousemove', handleResize);
        window.removeEventListener('touchmove', handleResize);
        window.removeEventListener('mouseup', stopResize);
        window.removeEventListener('touchend', stopResize);
    };


    return (
        <div className='TextArea__wrapper'>
            <textarea
                ref={textAreaRef}
                required={required}
                value={value}
                placeholder={placeholder}
                style={{height: `${height}px`}}
                onChange={e => setValue(e.target.value)}
                className={`TextArea ${required && submitted && !value ? 'TextArea__invalid' : ''}`}
                id={id}
            />
            {/* <div
                className="TextArea__resize--handler"
                onTouchStart={startResize}
                onMouseDown={startResize}   // Desktop event

            /> */}

            {/* <i
                className="TextArea__resize--handler fa-solid fa-arrow-down-short-wide"
                onTouchStart={startResize}
                onMouseDown={startResize}   // Desktop event

            ></i> */}

            <InputError touched={touched} submitted={submitted} rules={rules} valid={valid} />

    
        </div>
    )
}

export default TextArea;