import React from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from '../UI/Buttons/LogoutButton';

const Base = () => {
    // const search = useLocation().search;
    // const verifyCode = new URLSearchParams(search).get('oobCode');
    // console.log(verifyCode);
    return (
        <div>
            <h1>Base</h1>
            <LogoutButton />
        </div>
    );
};

export default Base;