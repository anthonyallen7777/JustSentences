import React, { useState } from "react";
import classes from './Settings.module.css';
import Modal from '../../../UI/Modal/Modal';

const Settings = (props) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <Modal showModal={showModal}></Modal>
            <div>
                <h2>Settings</h2>
            </div>
            <div>
                <button onClick={() => setShowModal(!showModal)}>Change username</button>
                <button onClick={() => setShowModal(!showModal)}>Change Email</button>
                <button onClick={() => setShowModal(!showModal)}>Reset Progress</button>
                <button className={classes.DeleteButton}
                 onClick={() => setShowModal(!showModal)}>Delete Account</button>
            </div>
        </div>
    );
};

export default Settings;