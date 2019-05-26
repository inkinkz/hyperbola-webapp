import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

//Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/messaging";

//dotenv
import dotenv from "dotenv";

import Navbar from "./components/Navbar/Navbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import Home from "./components/Home/Home";
import OrderFlavor from "./components/OrderFlavor/OrderFlavor";
import OrderTopping from "./components/OrderTopping/OrderTopping";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import OrderConfirm from "./components/OrderConfirm/OrderConfirm";
import Payment from "./components/Payment/Payment";
import QRReceipt from "./components/QRReceipt/QRReceipt";
import UserInfo from "./components/UserInfo/UserInfo";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminManage from "./components/AdminManage/AdminManage";
import Login from "./components/Login/Login";
import Reward from "./components/Reward/Reward";
import Queue from "./components/Queue/Queue";
import Background from "./BG.svg";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideDrawerOpened: false,
      name: "",
      profilePic: ""
    };

    dotenv.config();

    // Initialize Firebase
    var config = {
      apiKey: process.env.REACT_APP_FB_API_KEY,
      authDomain: "hyperbola-a8e60.firebaseapp.com",
      databaseURL: "https://hyperbola-a8e60.firebaseio.com",
      projectId: "hyperbola-a8e60",
      storageBucket: "hyperbola-a8e60.appspot.com",
      messagingSenderId: "739584029621"
    };

    !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
    this.authListener = this.authListener.bind(this);
    this.notificationPermission = this.notificationPermission.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  notificationPermission() {
    var newToken = "";
    if (firebase.messaging.isSupported()) {
      const messaging = firebase.messaging();
      messaging.usePublicVapidKey(
        "BGXAi9hSeYY6FTfmx7DVglfFFDwOdqrraXZYc3L0mPcsVEIu5-gvwt86bTw25svWiQXbll3WH80et8_W98qVBDA"
      );
      messaging
        .requestPermission()
        .then(async function() {
          newToken = await messaging.getToken();
          // console.log(newToken);
          // localStorage.setItem("token", newToken);
          localStorage.setItem("token", newToken);
          let token = {
            token: newToken,
            userID: localStorage.getItem("user")
          };
          var req = new Request("/update-token", {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              Accept: "application/json"
            }),
            body: JSON.stringify(token)
          });

          // xmlhttpreq
          fetch(req)
            .then(function(res) {
              //receive JSON
              res.json().then(function(data) {
                console.log("add token called");
                console.log(data);
              });
            })
            .catch(function(err) {
              console.log(err);
            });
        })
        .catch(function(err) {
          console.log("Unable to get permission to notify.", err);
        });

      messaging.onMessage(function(payload) {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
          icon: payload.notification.icon
        };

        if (!("Notification" in window)) {
          console.log("This browser does not support system notifications");
        }
        //check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
          // create a notification
          var notification = new Notification(
            notificationTitle,
            notificationOptions
          );
          notification.onclick = function(event) {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open(payload.notification.click_action, "_blank");
            notification.close();
          };
        }
      });
      navigator.serviceWorker.addEventListener("message", message =>
        console.log("Notification Received")
      );
    }
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user);
      if (user) {
        localStorage.setItem("user", user.uid);
        // console.log(firebase.auth().currentUser);
        this.setState({
          name: firebase.auth().currentUser.displayName,
          profilePic: firebase.auth().currentUser.photoURL + ""
        });
        if (!localStorage.getItem("token")) this.notificationPermission();
      } else {
        // localStorage.removeItem("user");
        // localStorage.removeItem("accountType");
        localStorage.clear();
      }
    });
  }

  drawerToggleHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpened: !prevState.sideDrawerOpened };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpened: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpened) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div className="App" style={{ height: "100%" }}>
        <div className="background">
          <img src={Background} alt="" />
        </div>
        {backdrop}
        {/* <p className="App-intro">{this.state.apiResponse}</p> */}
        <Navbar drawerClickHandler={this.drawerToggleHandler} />
        <SideDrawer
          show={this.state.sideDrawerOpened}
          drawerClickHandler={this.drawerToggleHandler}
          displayName={this.state.name}
          db={firebase}
        />
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" render={props => <Home db={firebase} />} />
            <Route
              exact
              path="/queue"
              render={props => <Queue db={firebase} />}
            />
            <Route
              exact
              path="/login"
              render={props => <Login db={firebase} />}
            />
            <Route
              exact
              path="/user/history"
              render={props => (
                <OrderHistory db={firebase} displayName={this.state.name} />
              )}
            />
            <Route
              exact
              path="/user"
              render={props => (
                <UserInfo
                  db={firebase}
                  displayName={this.state.name}
                  profilePic={this.state.profilePic}
                />
              )}
            />
            <Route exact path="/order/flavor" component={OrderFlavor} />
            <Route exact path="/order/topping" component={OrderTopping} />
            <Route exact path="/order/summary" component={OrderSummary} />
            <Route exact path="/order/confirm" component={OrderConfirm} />
            <Route exact path="/order/payment" component={Payment} />
            <Route
              exact
              path="/order/receipt"
              render={props => <QRReceipt db={firebase} />}
            />
            <Route exact path="/reward" component={Reward} />
            <Route
              exact
              path="/vendor/login"
              render={props => <AdminLogin db={firebase} />}
            />
            <Route
              exact
              path="/vendor/manage"
              render={props => (
                <AdminManage db={firebase} displayName={this.state.name} />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
