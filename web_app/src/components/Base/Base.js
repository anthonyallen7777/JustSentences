import React from "react";
import LogoutButton from '../UI/Buttons/LogoutButton';

import VerifyBanner from "../Auth/VerifyBanner/VerifyBanner";

const Base = (props) => {
    return (
        <div>
            <VerifyBanner />
            <LogoutButton />
            <div>
                <h2>Practice</h2>
                <h2>Progress</h2>
                <h2>Languages</h2>
                <h2>Profile</h2>
            </div>
        </div>
    );
};

export default Base;