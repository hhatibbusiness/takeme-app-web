import React from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../../store/actions/alert.actions';
import warning from '../../assets/images/defaults/warning.png';
import danger from '../../assets/images/defaults/alarm.png';
import success from '../../assets/images/defaults/success.png';
import close from '../../assets/images/defaults/close.png';
import './Alert.css';

const images = {
    warning,
    danger,
    success
}

const Alert = ({alert, removeAlert}) => {
    return (
        <div className='Alert'>
            
            <div
                className={`Alert__element Alert__${alert?.alertType}`}
            >
                <img
                    src={images[alert?.alertType]}
                />
                <span>
                    {alert?.msg}
                </span>
                <div
                    onClick={e => {
                        const data = {
                            id: alert?.id
                        };
                        removeAlert(data);
                    }}
                    className='Alert__close'
                >
                    <img
                        src={close}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    alert: state.alert
});

export default connect(mapStateToProps, {removeAlert}) (Alert);