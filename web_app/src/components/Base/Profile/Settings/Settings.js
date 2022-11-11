import React, { useState } from "react";
import classes from './Settings.module.css';
import Modal from '../../../UI/Modal/Modal';

const Settings = (props) => {
    const [showModal, setShowModal] = useState(true);
    return (
        <div>
            <Modal showModal={showModal}></Modal>
            <div>
                <h2>Settings</h2>
            </div>
            <div>
                <button>Change username</button>
                <button>Change Email</button>
                <button>Reset Progress</button>
                <button className={classes.DeleteButton}>Delete Account</button>
            </div>
        </div>
    );
};

export default Settings;