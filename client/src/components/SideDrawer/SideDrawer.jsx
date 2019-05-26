import React, { Component } from "react";
import "./SideDrawer.css";
import Logo from "./hyperbola-logo.svg";
import { Redirect, withRouter } from "react-router-dom";

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    this.props.db.auth().signOut();
  }

  render() {
    const notLoggedIn = (
      <div>
        <li>
          <a className="side-drawer-text" href="/login">
            Login
          </a>
        </li>
        <li>
          <a className="side-drawer-text" href="/vendor/login">
            Vendor
          </a>
        </li>
      </div>
    );
    const loggedIn = (
      <div>
        <li>
          <a className="side-drawer-text" href="/user">
            My Account
          </a>
        </li>
        <li>
          <a className="side-drawer-text" href="/user/history">
            Order History
          </a>
        </li>
        <li>
          <div onClick={this.logOut}>
            <a className="side-drawer-text" href="/">
              Log Out
            </a>
          </div>
        </li>
      </div>
    );
    const loggedInAdmin = (
      <div>
        <li>
          <a className="side-drawer-text" href="/vendor/manage">
            Manage
          </a>
        </li>
        <li>
          <div onClick={this.logOut}>
            <a className="side-drawer-text" href="/">
              Log Out
            </a>
          </div>
        </li>
      </div>
    );
    const walkIn = (
      <div>
        <li>
          <div onClick={this.logOut}>
            <a className="side-drawer-text" href="/">
              Log Out
            </a>
          </div>
        </li>
      </div>
    );
    const userGreeting = (
      <div>
        <li className="side-drawer-text">Hi, {this.props.displayName}!</li>
        <br />
      </div>
    );

    const showSideDrawer = (
      <nav className="side-drawer open">
        <ul>
          <li>
            <img src={Logo} alt="" width="73px" height="73px" />
          </li>

          {localStorage.getItem("user") ? userGreeting : ""}
          <li>
            <a className="side-drawer-text" href="/">
              Home
            </a>
          </li>
          {localStorage.getItem("user") ? "" : notLoggedIn}
          {localStorage.getItem("user") && !localStorage.getItem("accountType")
            ? loggedIn
            : ""}
          {localStorage.getItem("user") &&
          localStorage.getItem("accountType") === "admin"
            ? loggedInAdmin
            : ""}
          {localStorage.getItem("user") &&
          localStorage.getItem("accountType") === "walkin"
            ? walkIn
            : ""}
        </ul>
      </nav>
    );

    const hideSideDrawer = <nav className="side-drawer" />;

    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return <div>{this.props.show ? showSideDrawer : hideSideDrawer}</div>;
    }
  }
}

export default withRouter(SideDrawer);
