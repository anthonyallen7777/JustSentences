import React from "react";
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
        <div>
            <BackButton />
            <div>
                <h2>Profile</h2>
                <button onClick={goToSetting}>Settings</button>
            </div>
            <div>
                <p>{displayName}</p>
                <LogoutButton />
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