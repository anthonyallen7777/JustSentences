import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LogoutButton from '../UI/Buttons/LogoutButton';
import { connect } from "react-redux";

const Base = (props) => {
    // const search = useLocation().search;
    // const verifyCode = new URLSearchParams(search).get('oobCode');
    // console.log(verifyCode);
    const {shouldWeShowVerifyBanner} = props;
    useEffect(() => {
        console.log(shouldWeShowVerifyBanner);
    }, []);
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

const mapStateToProps = state => {
    return {
        shouldWeShowVerifyBanner: state.authenticate.shouldWeShowVerifyBanner
    };
  }

export default connect(mapStateToProps)(Base);