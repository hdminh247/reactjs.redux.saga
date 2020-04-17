/**
 *
 * SocialLogin
 *
 */

import React from "react";
import "./style.scss";
import localStoreService from "local-storage";
import _ from "lodash";
import uuidv1 from "uuid";

class SocialLogin extends React.PureComponent {
  constructor(props) {
    super(props);

    this.nodes = {};

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
  }

  onLoginSuccess = (user) => {
    const {
      socialLoginCallBack = () => {
      }
    } = this.props;

    socialLoginCallBack(user);
  };

  onLoginFailure = (err) => {
    console.log(err);
    localStoreService.clear();
    localStorage.clear();
    window.sessionStorage.clear();
    // window.location.reload();
  };
  responseFireBase = (response) => {
    console.log("responseFireBase----------------", response);
    const {
      socialLoginCallBack = () => {
      }
    } = this.props;
    const { accessToken = "", providerId = "" } = response;
    if (accessToken)
      socialLoginCallBack({ _token: { accessToken }, _provider: providerId === "google.com" ? "google" : "facebook" });
  };

  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
      signInWithFacebook
    } = this.props;
    // console.log("SOCIAL LOGIN PROPS", this.props);
    let children = [
      /*<FacebookLogin
        key={1}
        appId={config.facebookAppId}
        callback={this.responseFacebook}
        render={renderProps => {
          return <button className={"btn"} onClick={renderProps.onClick}><img className={"logo-social"} src={"facebook.png"} alt={"facebook"}/> Sign in with Facebook</button>;
        }}
      />
      ,*/
      <button className={"btn"}
              key={uuidv1()}
              onClick={() => {
                if (_.isFunction(signInWithFacebook)) {
                  signInWithFacebook()
                    .then((res) => {
                      const { credential = {} } = res;
                      this.responseFireBase(credential);
                    }, err => {
                      console.log(err);
                    });
                } else {
                  console.log("not function");
                }
              }}><img className={"logo-social"} src={"facebook.png"} alt={"facebook"}/> Sign in with Facebook</button>
      ,
      <button className={"btn"}
              key={uuidv1()}
              onClick={() => {
                if (_.isFunction(signInWithGoogle)) {
                  signInWithGoogle()
                    .then((res) => {
                      const { credential = {} } = res;
                      this.responseFireBase(credential);
                    }, err => {
                      console.log(err);
                    });
                } else {
                  console.log("not function");
                }
              }}><img className={"logo-social"} src={"google-g-logo.png"} alt={"facebook"}/> Sign in with Google</button>

    ];

    return (
      <div className={"social-login-wrapper d-flex justify-content-between"}>
        {/*<FormattedMessage {...messages.header} />*/}
        {children}
      </div>
    );
  }
}

SocialLogin.propTypes = {};

export default SocialLogin;
