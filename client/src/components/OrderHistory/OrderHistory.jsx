import React, { Component } from "react";
import "./OrderHistory.css";
import QRCode from "qrcode.react";

import { withRouter } from "react-router-dom";

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bag: []
    };
    this.toOrder = this.toOrder.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }

  componentWillMount() {
    getProducts().then(result => {
      this.setState({
        bag: result
      });
    });
  }

  componentDidMount() {
    if (!localStorage.getItem("user")) {
      this.props.history.push("/");
    }
  }

  toOrder() {
    this.props.history.push("/");
  }

  getStatus(index) {
    if (this.state.bag[index][5] === "not scanned") {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { bag } = this.state;

    const renderTime = index => {
      return (
        <div>
          <div
            style={{ fontSize: "13px", textAlign: "left", marginLeft: "6%" }}
          >
            {bag[index][0].substring(0, bag[index][0].indexOf("T"))}
            &nbsp;&nbsp;&nbsp;
            {bag[index][0].substring(
              bag[index][0].indexOf("T") + 1,
              bag[index][0].lastIndexOf(":")
            )}
          </div>
        </div>
      );
    };

    const renderTitle = index => {
      return (
        <div>
          <div
            style={{ fontSize: "20px", textAlign: "left", marginLeft: "6%" }}
          >
            {bag[index][1]} Ice-cream
          </div>
          {bag[index][2].length !== 0 ? (
            <div
              style={{
                fontSize: " 18px",
                textAlign: "left",
                marginLeft: "12%"
              }}
            >
              Toppings
            </div>
          ) : (
            ""
          )}
        </div>
      );
    };

    const renderItems = index => {
      const items = bag[index][2];
      return (
        <ul
          style={{
            listStyle: "none",
            marginTop: "0px",
            padding: "0"
          }}
        >
          {items.map((item, key) => (
            <li
              key={key}
              style={{
                fontSize: "16px",
                textAlign: "left",
                marginLeft: "16%"
              }}
            >
              - {item}
            </li>
          ))}
        </ul>
      );
    };

    const renderQR = index => {
      return (
        <div className="qr-img">
          <QRCode value={bag[index][4]} size={150} />
        </div>
      );
    };

    const renderPrice = index => {
      return (
        <div style={{ marginTop: "0" }}>
          <div
            style={{
              textAlign: "right",
              marginRight: "6%",
              fontSize: "18px"
            }}
            className="history-center-text"
          >
            {bag[index][3]} Baht
          </div>
          <hr width="96%" />
        </div>
      );
    };

    const tot = bag.map((group, index) => (
      <div key={index}>
        {renderTime(index)}
        {renderTitle(index)}
        {renderItems(index)}
        {this.getStatus(index) ? (
          renderQR(index)
        ) : (
          <div style={{ textAlign: "center" }}>Order Completed!</div>
        )}
        {renderPrice(index)}
      </div>
    ));

    // if (this.state.redirect) {
    //   return <Redirect to={{ pathname: this.state.redirect }} />;
    // } else {
    return (
      <div>
        <div className="user-text">
          {this.props.displayName}'s Order History
        </div>
        <div className="history-big-container">
          <div className="history-subcontainer">{tot}</div>
        </div>
        <button className="history-order-button" onClick={this.toOrder}>
          ORDER NOW!
        </button>
      </div>
    );
  }
  // }
}

async function getProducts() {
  let uid = {
    userID: localStorage.getItem("user")
  };

  var req = new Request("/user-history", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    }),
    body: JSON.stringify(uid)
  });

  var orderInfoTemp = [];

  fetch(req)
    .then(function(res) {
      res.json().then(function(data) {
        for (var i in data) {
          orderInfoTemp.push([
            data[i].datetime,
            data[i].flavor_name,
            data[i].toppings,
            data[i].total_price,
            data[i].transaction_id,
            data[i].status
          ]);
        }
      });
    })
    .catch(function(err) {
      console.log(err);
    });

  // console.log(orderInfoTemp);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(orderInfoTemp);
    }, 500);
  });

  // return [
  //   ["Milk", ["Item 1", "Item 2", "Item 3"], "40"],
  //   ["Charcoal", ["Item 1a", "Item 2a", "Item 3a"], "45"],
  //   ["Ham", ["Item 1b", "Item 2b", "Item 3b"], "30"]
  // ];
}

export default withRouter(OrderHistory);
