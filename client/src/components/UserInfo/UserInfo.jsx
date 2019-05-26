import React, { Component } from "react";
import "./UserInfo.css";
import { withRouter, Redirect } from "react-router-dom";
import Star from "./star.png";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: null, showPriceState: false, myPoint: 0 };
    this.orderHistory = this.orderHistory.bind(this);
    this.showPrice = this.showPrice.bind(this);
    this.toOrderflavor = this.toOrderflavor.bind(this);
  }

  // popup
  showPrice() {
    if (this.state.showPriceState === true) {
      this.setState({ showPriceState: false });
    } else {
      this.setState({ showPriceState: true });
    }
  }

  componentDidMount() {
    var that = this;
    let uid = {
      userID: localStorage.getItem("user")
    };

    var req = new Request("/user-point", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(uid)
    });

    fetch(req)
      .then(function(res) {
        res.json().then(function(data) {
          that.setState({ myPoint: data.reward_points });
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  //button
  orderHistory() {
    // this.setState({ redirect: "/user/history" });
    this.props.history.push("/user/history");
  }
  toOrderflavor() {
    this.props.history.push("/order/flavor");
  }

  render() {
    //popup information
    const showInfo = (
      <div className="userinfo-popup-rectangle">
        <div className="userinfo-popup-text">
          Gain Reward Points with every purchase of Hyperbola. <br />
          Reward Points can be exchanged for special discount.
        </div>
      </div>
    );

    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      var x = this.props.profilePic;
      if (x.includes("facebook.com")) {
        x += "?height=500";
      } else if (x.includes("twimg.com")) {
        x = x.substring(0, x.lastIndexOf("_")) + ".jpg";
      }
      return (
        <div>
          <div className="welcome-text">Welcome {this.props.displayName}!</div>
          <img
            src={x}
            alt=""
            style={{
              // width: "40%",
              height: "20vh",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "20px"
            }}
          />
          <div className="userinfo-big-container">
            <div className="userinfo-container">
              <div className="userinfo-reward-text">Your Reward Points:</div>
              <img src={Star} alt="Star" />
              <div className="userinfo-reward-text-number">
                {this.state.myPoint}
              </div>
              <div className="space-userinfo" />
              <div className="userinfo-circle-container">
                <div
                  className="userinfo-circle"
                  onMouseOver={this.showPrice}
                  onMouseOut={this.showPrice}
                >
                  <div className="userinfo-circle-question-mark">?</div>
                </div>
              </div>
            </div>
          </div>
          {this.state.showPriceState ? showInfo : " "}
          <button
            className="userinfo-history-button"
            onClick={this.orderHistory}
          >
            ORDER HISTORY
          </button>
          <button
            className="userinfo-order-button"
            onClick={this.toOrderflavor}
          >
            ORDER NOW!
          </button>
        </div>
      );
    }
  }
}

export default withRouter(UserInfo);
