import React, { Component } from "react";
import "./AdminLogin.css";
import { withRouter, Redirect } from "react-router-dom";
import Logo from "./hyperbola-logo.svg";

class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirect: null,
      failed: false
    };
    this.onChange = this.onChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("accountType") === "admin") {
      this.setState({
        redirect: "/vendor/manage"
      });
    } else if (localStorage.getItem("accountType") === "walkin") {
      this.setState({
        redirect: "/"
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // For Creating user
  signUp(e) {
    e.preventDefault();
    console.log("onsubmit called");
    console.log(this.state.email);
    console.log(this.state.password);
    this.props.db
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        if (userCredentials.user) {
          userCredentials.user
            .updateProfile({
              displayName: "Walk-In"
            })
            .then(s => {});
        }
      })
      .catch(function(error) {
        // alert(error.message);
      });
  }
  logIn(e) {
    e.preventDefault();

    // this.props.db
    //   .auth()
    //   .createUserWithEmailAndPassword(this.state.email, this.state.password)
    //   .then(userCredentials => {
    //     if (userCredentials.user) {
    //       userCredentials.user
    //         .updateProfile({
    //           displayName: "Admin"
    //         })
    //         .then(s => {});
    //     }
    //   })
    //   .catch(function(error) {
    //     // alert(error.message);
    //   });

    this.props.db
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        // localStorage.setItem("user", u);
        // this.setState({ redirect: "/admin/manage" });
        if (this.state.email !== "walkin@hyperbola.com") {
          localStorage.setItem("accountType", "admin");
        } else {
          localStorage.setItem("accountType", "walkin");
        }
        window.location.reload();
      })
      .catch(error => {
        // console.log(error);
        this.setState({ failed: true });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div>
          <img
            src={Logo}
            className="logo"
            alt=""
            width="210px"
            height="210px"
          />
          <form onSubmit={this.logIn}>
            <div className="font-nunito text-large">Vendor Login</div>
            <p className={`errorMessage ${!this.state.failed ? "hidden" : ""}`}>
              Invalid username or password.
            </p>
            <input
              className="font-nunito margin-lr"
              type="text"
              placeholder="Enter username"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <br />
            <input
              className="font-nunito margin-lr"
              type="password"
              placeholder="Enter password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <br />
            <button
              className="font-nunito purple-button"
              type="submit"
              name="submit"
            >
              Login
            </button>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(AdminLogin);
