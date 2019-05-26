import React, { Component } from "react"; //จำเป็น ทำใน app.js ด้วย ,react = verb t chai nai frontend
import "./Payment.css";
// import blabla from "./hyperbola-logo.svg";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.toOrderSummary = this.toOrderSummary.bind(this);
  }

  toOrderSummary() {
    this.props.history.push("/order/summary");
  }
  render() {
    return (
      //only 1 component 1 big div devided into many component
      <div className="payment-main-compo">
        {/* <div className="payment-text-div">
          <div className="payment-text">Payment</div>
          <br />
          <div className="payment-description">
            Please select your payment method
          </div>
        </div> */}

        <div className="payment-text-div">
          <div className="payment-text">Payment</div>
          <div className="payment-description">
            Please select your payment method
          </div>
        </div>

        <div className="payment-main-button-div">
          <div className="paymemt-set-of-main-but">
            <button className="payment-purple-button">CASH</button>
            <button className="payment-purple-button">PAYMENT</button>
          </div>
        </div>
        <div className="payment-back-button-div">
          <button
            className="payment-white-button"
            onClick={this.toOrderSummary}
          >
            BACK
          </button>
        </div>
      </div>
    );
  }
}

export default Payment;
