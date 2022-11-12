import React from "react";
import { useNavigate } from "react-router";

const Profile = (props) => {
    let navigate = useNavigate();
    const goToSetting = () => {
        navigate('/profile/settings');
    }
    return (
        <div>
            <div>
                <h2>Profile</h2>
                <button onClick={goToSetting}>Settings</button>
            </div>
            <div>
                <p>Username</p>
                <p>Email</p>
                <p>Sign Out</p>
            </div>
        </div>
    );
};

export default Profile;