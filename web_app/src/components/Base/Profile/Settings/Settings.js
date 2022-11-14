import React, { useState } from "react";
import classes from './Settings.module.css';

import BackButton from "../../../UI/Buttons/BackButton/BackButton";
import SettingsModal from './SettingsModal/SettingsModal';

const Settings = (props) => {
    const [showModal, setShowModal] = useState(false);

    const buttonPress = (dataToChange) => {
        setShowModal(!showModal);
        setDataToDisplay(dataToChange)
    }

    const [dataToDisplay, setDataToDisplay] = useState(null);
    
    return (
        <div className={classes.Container}>
            <BackButton />
            <SettingsModal showModal={showModal}
            dataToDisplay={dataToDisplay} setShowModal={setShowModal}></SettingsModal>
            <div className={classes.TitleContainer}>
                <h2>Settings</h2>
            </div>
            <div className={classes.MainSettingsContainer}>
                <button onClick={() => buttonPress('username')}>Change username</button>
                <button onClick={() => buttonPress('email')}>Change Email</button>
                <button onClick={() => buttonPress('progress')}>Reset Progress</button>
                <button className={classes.DeleteButton}
                onClick={() => buttonPress('delete')}>Delete Account</button>
            </div>
        </div>
    );
};

export default Settings;