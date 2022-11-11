import React from "react";
import { connect } from "react-redux";

const VerifyBanner = (props) => {
    const {shouldWeShowVerifyBanner, firstTimeSigningUp} = props;

    let banner = null;

    if (shouldWeShowVerifyBanner) {
        if (firstTimeSigningUp) {
            banner = (
                <React.Fragment>
                    <p>Thank you for signing up!</p>
                    <p>Please check your email to verify your account!</p>
                </React.Fragment>
            );
        } else {
            banner = (
            <React.Fragment>
                    <p>Please check your email to verify your account!</p>
                    <p>If you don't verify your account by Dec 21st</p>
                    <p>it will be deleted!</p>
            </React.Fragment>
            );
        }
    }

    return banner;
};

const mapStateToProps = state => {
    return {
        shouldWeShowVerifyBanner: state.authenticate.shouldWeShowVerifyBanner,
        firstTimeSigningUp: state.authenticate.firstTimeSigningUp
    };
}

export default connect(mapStateToProps)(VerifyBanner);