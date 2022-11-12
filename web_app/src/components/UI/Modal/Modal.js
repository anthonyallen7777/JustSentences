import React from "react";
import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        <div className={classes.Modal}
        style={{
            transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.showModal ? '1': '0'
        }}>
            <h2>This is a modal</h2>
        </div>
    );
};

export default Modal;