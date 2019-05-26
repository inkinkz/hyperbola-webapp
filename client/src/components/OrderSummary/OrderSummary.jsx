import React, { Component } from "react";
import "./OrderSummary.css";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { withRouter, Redirect } from "react-router-dom";
import CancelPopUp from "./CancelPopUp";

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      toppingList: [],
      toppingPrice: 0,
      icecreamPrice: 25,
      orderID: "",
      toppingReward: 0,
      icecreamReward: false,
      showCancelPopUp: false
    };
    this.toPayment = this.toPayment.bind(this);
    this.toOrderFlavor = this.toOrderFlavor.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onError = this.onError.bind(this);
    this.generateID = this.generateID.bind(this);
    this.toReward = this.toReward.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.showPopUp = this.showPopUp.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  closePopUp() {
    this.setState({
      showCancelPopUp: false
    });
  }

  async componentDidMount() {
    let list = sessionStorage.getItem("toppings");
    this.setState({ toppingList: JSON.parse(list) });

    if (sessionStorage.getItem("type") === "cone") {
      await this.setState({ icecreamPrice: 28 });
    } else {
      if (JSON.parse(list).length < 2) await this.setState({ toppingPrice: 0 });
      if (JSON.parse(list).length === 2 || JSON.parse(list).length === 1)
        await this.setState({ toppingPrice: 5 });
      if (JSON.parse(list).length > 2) {
        var temp = 5;
        temp += (JSON.parse(list).length - 2) * 5;
        await this.setState({ toppingPrice: temp });
      }
    }

    if (sessionStorage.getItem("pointLeft")) {
      if (
        sessionStorage.getItem("toppingReward") <
        JSON.parse(sessionStorage.getItem("toppings")).length
      ) {
        var s = (await sessionStorage.getItem("toppingReward")) * 5;
        await this.setState({ toppingPrice: this.state.toppingPrice - s });
      }
      if (
        sessionStorage.getItem("cupReward") > 0 ||
        sessionStorage.getItem("coneReward") > 0
      ) {
        await this.setState({
          icecreamPrice: 0
        });
      }
    }
  }

  generateID() {
    var id = "";
    var pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var length = 32;

    for (var i = 0; i < length; i++)
      id += pool.charAt(Math.floor(Math.random() * pool.length));

    return id;
  }

  cancelOrder() {
    sessionStorage.clear();
    this.setState({ redirect: "/" });
  }
  toReward() {
    this.props.history.push("/reward");
  }

  toPayment() {
    var ID = this.generateID();
    var array = sessionStorage.getItem("toppings");
    console.log(array);
    var subbed = array.substring(1, array.length - 1);
    console.log(JSON.stringify(array));
    var postgresArray = "{" + subbed + "}";
    console.log(postgresArray);
    var date = new Date();
    var dateTime =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    sessionStorage.setItem("time", dateTime);
    let transactionInfo = {
      userID: localStorage.getItem("user"),
      transactionID: ID,
      dateTime: dateTime,
      vendorID: "p29E1ZXiSnMKUydtrWejXAdk0qr2",
      location: "engineering",
      totalPrice: this.state.icecreamPrice + this.state.toppingPrice,
      flavorName: sessionStorage.getItem("flavor"),
      toppings: postgresArray,
      type: sessionStorage.getItem("type")
    };
    console.log("transactionInfo :" + JSON.stringify(transactionInfo));
    var req = new Request("/add-transaction", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(transactionInfo)
    });
    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {
          console.log("transaction added");
          // console.log(data);
        });
      })
      .catch(function(err) {
        console.log(err);
      });

    if (sessionStorage.getItem("pointLeft")) {
      let uid = {
        userID: localStorage.getItem("user"),
        newPoint: sessionStorage.getItem("pointLeft")
      };

      var update = new Request("/update-user-point", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json"
        }),
        body: JSON.stringify(uid)
      });
      fetch(update);
    } else {
      let uid = {
        userID: localStorage.getItem("user")
      };

      var addPoint = new Request("/add-point", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json"
        }),
        body: JSON.stringify(uid)
      });
      fetch(addPoint);
    }

    sessionStorage.removeItem("toppingReward");
    sessionStorage.removeItem("pointLeft");
    sessionStorage.removeItem("coneReward");
    sessionStorage.removeItem("cupReward");
    sessionStorage.setItem("orderID", ID);
    sessionStorage.setItem(
      "sumPrice",
      this.state.icecreamPrice + this.state.toppingPrice
    );
    this.setState({ redirect: "/order/receipt" });
  }

  toOrderFlavor() {
    this.setState({ redirect: "/order/flavor" });
  }

  // PayPal Succeed
  onSuccess(payment) {
    console.log("The payment was succeeded!", payment);
    var ID = this.generateID();
    var array = sessionStorage.getItem("toppings");
    var subbed = array.substring(1, array.length - 1);
    var postgresArray = "{" + subbed + "}";
    var date = new Date();
    var dateTime =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    sessionStorage.setItem("time", dateTime);

    let transactionInfo = {
      userID: localStorage.getItem("user"),
      transactionID: ID,
      dateTime: dateTime,
      vendorID: "p29E1ZXiSnMKUydtrWejXAdk0qr2",
      location: "engineering",
      totalPrice: this.state.icecreamPrice + this.state.toppingPrice,
      flavorName: sessionStorage.getItem("flavor"),
      toppings: postgresArray,
      type: sessionStorage.getItem("type")
    };

    console.log("transactionInfo :" + JSON.stringify(transactionInfo));

    var req = new Request("/add-transaction", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(transactionInfo)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {
          console.log("transaction added");
          // console.log(data);
        });
      })
      .catch(function(err) {
        console.log(err);
      });

    if (sessionStorage.getItem("pointLeft")) {
      let uid = {
        userID: localStorage.getItem("user"),
        newPoint: sessionStorage.getItem("pointLeft")
      };
      var update = new Request("/update-user-point", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json"
        }),
        body: JSON.stringify(uid)
      });
      fetch(update);
    } else {
      let uid = {
        userID: localStorage.getItem("user")
      };
      var addPoint = new Request("/add-point", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json"
        }),
        body: JSON.stringify(uid)
      });
      fetch(addPoint);
    }

    sessionStorage.removeItem("toppingReward");
    sessionStorage.removeItem("pointLeft");
    sessionStorage.removeItem("coneReward");
    sessionStorage.removeItem("cupReward");
    sessionStorage.setItem("orderID", ID);
    sessionStorage.setItem(
      "sumPrice",
      this.state.icecreamPrice + this.state.toppingPrice
    );
    this.setState({ redirect: "/order/receipt" });
  }

  onCancel(data) {
    console.log("The payment was cancelled!", data);
  }

  onError(err) {
    console.log("Error!", err);
  }

  showPopUp() {
    this.setState({ cancelPopUp: !this.state.cancelPopUp });
  }

  render() {
    const cancelPopUp = (
      <CancelPopUp closePopUp={this.showPopUp} cancel={this.cancelOrder} />
    );

    const client = {
      sandbox:
        "AcLizIo4ip07phXNXFmw0G2nTRHh_YveAaMD1_zB8QQuF5aBbaaH13nBYzxDag1dcr4geGGFUHUM1uZs",
      production:
        "EHWCvA6BJBSSX3DEIZGOkL6EeFobSPUX4eI-Dho_h-vKwr5HFbILPNgyc228EVzCIhwU-5IaAs5LSh_s"
    };

    const toppings = Array.from(this.state.toppingList).map((topping, i) => (
      <li style={{ listStyle: "none", display: "flex" }} key={i}>
        - {topping}
      </li>
    ));

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect
          }}
        />
      );
    } else {
      return (
        <div className="sum-main-compo">
          {/* text */}
          {/* <div> */}
          <div className="payment-text">Order Summary</div>
          {/* </div> */}
          {/* mid */}
          <div className="sum-middle">
            <div className="sum-cancel-but-div">
              <div className="each-but">
                <button className="sum-cancel-but" onClick={this.showPopUp}>
                  CANCEL
                </button>
              </div>
              <div className="each-but">
                <button className="sum-reward-btn" onClick={this.toReward}>
                  REDEEM
                </button>
              </div>
            </div>
            <div className="sum-order-add-container">
              {/* container */}
              <div className="sum-order-container">
                {(sessionStorage.getItem("toppingReward") &&
                  sessionStorage.getItem("toppingReward") <
                    JSON.parse(sessionStorage.getItem("toppings")).length) ||
                sessionStorage.getItem("coneReward") > 0 ||
                sessionStorage.getItem("cupReward") > 0 ? (
                  <div className="reward-alert">Reward Point Used!</div>
                ) : (
                  ""
                )}
                {/* order1 */}
                <div className="sum-each-order">
                  <div className="sum-flavor-column">
                    <div>{sessionStorage.getItem("flavor")} ice-cream</div>
                    <div className="sum-center-text">
                      {this.state.icecreamPrice}
                    </div>
                    <div className="sum-center-text">Baht</div>
                  </div>

                  <div className="sum-flavor-column">
                    <div className="add-tab">
                      Topping(s)
                      <div className="add-tab"> {toppings}</div>
                    </div>
                    <div className="sum-center-text">
                      {this.state.toppingPrice}
                    </div>
                    <div className="sum-center-text">Baht</div>
                  </div>

                  <button className="sum-edit-but" onClick={this.toOrderFlavor}>
                    EDIT
                  </button>
                  <div className="line" />
                </div>
                {/* <button className="sum-add-ice" onClick={this.toOrderFlavor}>
                  ADD ICE-CREAM
                </button> */}
              </div>
            </div>
            <div className="sum-total">
              <div className="sum-total-text">Total</div>
              <div />
              <div className="sum-total-text">
                {this.state.icecreamPrice + this.state.toppingPrice}
              </div>
              <div className="sum-total-text">Baht</div>
            </div>
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              marginRight: "0 "
              // marginLeft: "2%"
            }}
          >
            <button className="cash-button" onClick={this.toPayment}>
              CASH
            </button>
            <div className="paypal-button">
              <PaypalExpressBtn
                client={client}
                currency={"THB"}
                total={
                  this.state.icecreamPrice + this.state.toppingPrice > 0
                    ? this.state.icecreamPrice + this.state.toppingPrice
                    : 1
                }
                onError={this.onError}
                onSuccess={this.onSuccess}
                onCancel={this.onCancel}
              />
            </div>
          </div>
          {this.state.cancelPopUp ? cancelPopUp : " "}
        </div>
      );
    }
  }
}

export default withRouter(OrderSummary);
