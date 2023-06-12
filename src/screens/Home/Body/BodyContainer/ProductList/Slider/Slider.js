import React, {useState} from 'react';
import {Slider} from "@mui/material";
import './Slider.css';

const SliderComponent = ({value, setValue}) => {
    const handleSliderChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className={'Slider'}>
            <Slider
                aria-label="Temperature"
                valueLabelDisplay="auto"
                value={value}
                onChange={handleSliderChange}
                step={50}
                min={0}
                max={100}
                className={'Slider__bar'}
            />
        </div>
    );
};

export default SliderComponent;