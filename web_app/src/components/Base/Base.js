import React from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from '../UI/Buttons/LogoutButton';

const Base = () => {
    // const search = useLocation().search;
    // const verifyCode = new URLSearchParams(search).get('oobCode');
    // console.log(verifyCode);
    return (
        <div>
            <h2>Practice</h2>
            <h2>Progress</h2>
            <h2>Languages</h2>
            <h2>Profile</h2>
            <LogoutButton />
        </div>
    );
};

export default Base;