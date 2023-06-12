import React, {useState} from 'react';
import {Slider} from "@mui/material";
import './Slider.css';
import {connect} from "react-redux";
import {changeSliderValue} from "../../../../../../store/actions/categories.action";

const SliderComponent = ({value, changeSliderValue}) => {
    const handleSliderChange = (e) => {
        console.log(e.target.value);
        changeSliderValue(e.target.value);
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

const mapStateToProps = state => ({
    value: state.categories.value
})

export default connect(mapStateToProps, {changeSliderValue}) (SliderComponent);