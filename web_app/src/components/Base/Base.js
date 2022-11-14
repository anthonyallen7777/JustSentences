import React from "react";
import classes from './Base.module.css';
import { NavLink } from "react-router-dom";

import VerifyBanner from "../Auth/VerifyBanner/VerifyBanner";

const Base = () => {
    return (
        <div className={classes.Base}>
            <VerifyBanner />
            <div className={classes.RouteContainer}>
                <div className={classes.Route}>
                    <NavLink to='/practice'>Practice</NavLink>
                </div>
                <div className={classes.Route}>
                    <NavLink to='/progress'>Progress</NavLink>
                </div>
                <div className={classes.Route}>
                    <NavLink to='/languages'>Languages</NavLink>
                </div>
                <div className={classes.Route}>
                    <NavLink to='/profile'>Profile</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Base;