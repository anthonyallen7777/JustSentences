import React from "react";
import { NavLink } from "react-router-dom";

import VerifyBanner from "../Auth/VerifyBanner/VerifyBanner";
import LogoutButton from '../UI/Buttons/LogoutButton/LogoutButton';

const Base = (props) => {
    return (
        <div>
            <VerifyBanner />
            <LogoutButton />
            <div>
                <div>
                    <NavLink to='/practice'>Practice</NavLink>
                </div>
                <div>
                    <NavLink to='/progress'>Progress</NavLink>
                </div>
                <div>
                    <NavLink to='/languages'>Languages</NavLink>
                </div>
                <div>
                    <NavLink to='/profile'>Profile</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Base;