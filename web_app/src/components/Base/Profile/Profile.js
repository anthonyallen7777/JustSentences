import React from "react";
import classes from './Profile.module.css';
import { useNavigate } from "react-router";
import BackButton from "../../UI/Buttons/BackButton/BackButton";
import LogoutButton from "../../UI/Buttons/LogoutButton/LogoutButton";

//redux
import { connect } from "react-redux";

const Profile = (props) => {
    const {displayName} = props;
    let navigate = useNavigate();
    const goToSetting = () => {
        navigate('/profile/settings');
    }
    return (
        <div className={classes.Container}>
            <BackButton />
            <div className={classes.TitleContainer}>
                <h2>Profile</h2>
                <button onClick={goToSetting}>Settings</button>
            </div>
            <div className={classes.ProfileMainContainer}>
                <div className={classes.UsernameSignOut}>
                    <div className={classes.UsernameContainer}>
                        <p>username: {displayName}</p>
                    </div>
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        displayName: state.authenticate.displayName
    }
}

export default connect(mapStateToProps)(Profile);