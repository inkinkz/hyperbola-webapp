import React, { Component } from "react";
import "./Login.css";
import { withRouter, Redirect } from "react-router-dom";
import Logo from "./hyperbola-logo.svg";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      user: null,
      plsLogin: false
    };
  }

  // Configure FirebaseUI.
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      this.props.db.auth.GoogleAuthProvider.PROVIDER_ID,
      this.props.db.auth.FacebookAuthProvider.PROVIDER_ID,
      this.props.db.auth.TwitterAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log("signInSuccessWithAuthResult", authResult, redirectUrl);
        // if (this.state.plsLogin) {
        //   console.log("called");
        //   this.props.history.push("/order/flavor");
        //   // this.setState({ redirect: "/order/flavor" });
        //   console.log(this.state.redirect);
        // } else {
        //   this.props.history.push("/user");
        // }

        // console.log(authResult.user.uid);

        let uid = {
          userID: authResult.user.uid,
          name: authResult.user.displayName
        };
        var req = new Request("/add-user", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
          }),
          body: JSON.stringify(uid)
        });

        ///xmlhttpreq
        fetch(req)
          .then(function(res) {
            //Must receive JSON
            res.json().then(function(data) {
              // console.log(data);
            });
          })
          .catch(function(err) {
            console.log(err);
          });

        this.props.history.push("/");

        return false;
      }
    }
  };

  componentDidMount() {
    if (localStorage.getItem("user")) {
      this.setState({ redirect: "/" });
    }
    if (this.props.location.state !== undefined) {
      console.log(this.props.location.state.plsLogin);
      if (this.props.location.state.plsLogin) {
        this.setState({ plsLogin: true });
      }
    }
  }

  render() {
    const plsLoginMessage = (
      <div className="text-large">Please Login before ordering.</div>
    );

    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div>
          {this.state.plsLogin ? plsLoginMessage : ""}
          <img
            src={Logo}
            className="logo"
            alt=""
            width="150px"
            height="150px"
          />
          <div className="text-large">Select login method:</div>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={this.props.db.auth()}
          />
        </div>
      );
    }
  }
}

export default withRouter(Login);
