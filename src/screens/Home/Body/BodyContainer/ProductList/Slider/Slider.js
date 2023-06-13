import React, {useState} from 'react';
import {Slider} from "@mui/material";
import './Slider.css';
import {connect} from "react-redux";
import {changeSliderValue} from "../../../../../../store/actions/categories.action";

const SliderComponent = ({value, changeSliderValue}) => {
    const handleSliderChange = (e) => {
        if(e.target.value === 0) {
            return changeSliderValue(100);
        } else if(e.target.value === 100) {
            return changeSliderValue(0)
        }
        return changeSliderValue(e.target.value);
    }

    return (
        <div className={'Slider'}>
            <Slider
                className={'Slider__front'}
                aria-label="Temperature"
                valueLabelDisplay="off"
                value={value}
                onChange={handleSliderChange}
                step={50}
                min={0}
                max={100}
                className={'Slider__bar'}
                isRtl={true}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps, {changeSliderValue}) (SliderComponent);