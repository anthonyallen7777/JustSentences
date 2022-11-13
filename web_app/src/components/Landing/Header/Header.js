import React from "react";
import { NavLink } from "react-router-dom";
import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.Header}>
            <h2>JstSentences</h2>
            <NavLink to='/signin' className={classes.SignInLink}>Sign In</NavLink>
        </header>
    );
};

export default Header;