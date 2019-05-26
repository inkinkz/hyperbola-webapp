import React, { Component } from "react";
import "./QRReceipt.css";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import { withRouter, Redirect } from "react-router-dom";

class QRReceipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      headText: "Receipt"
    };
    // this.saveImage = this.saveImage.bind(this);
    this.toHome = this.toHome.bind(this);
    this.saveReceipt = this.saveReceipt.bind(this);
  }
  componentDidMount() {
    this.saveReceipt();
  }
  async toHome() {
    await this.setState({ redirect: "/" });
    sessionStorage.clear();
  }

  async saveReceipt() {
    await this.setState({ headText: "Hyperbola Receipt" });
    await html2canvas(document.getElementById("qr-main")).then(function(
      canvas
    ) {
      var data = canvas.toDataURL("image/png");
      var button = document.getElementById("btn-download");
      button.href = data;
    });
    await this.setState({ headText: "Receipt" });
  }

  render() {
    const toppings = Array.from(
      JSON.parse(sessionStorage.getItem("toppings"))
    ).map((topping, i) => (
      <li style={{ listStyle: "none", display: "flex" }} key={i}>
        - {topping}
      </li>
    ));
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div>
          <div id="qr-main" className="qr-main">
            <div>
              <div className="qr-text">{this.state.headText}</div>
              <div className="qr-description">
                Please scan your QR code at the scanner
              </div>
            </div>
            <div className="qr-img-div">
              <QRCode
                id="qrpic"
                className="qr-center-img"
                value={sessionStorage.getItem("orderID")}
                size={220}
              />
            </div>
            <div className="qr-order-sum">
              {/* order1 */}
              <div className="qr-each-order">
                <div className="number-center" />
                <div>
                  <div style={{ fontSize: "14px" }}>
                    {sessionStorage.getItem("time")}
                  </div>

                  <div>{sessionStorage.getItem("flavor")} Ice-cream</div>
                  <div style={{ marginLeft: "5%" }}>{toppings}</div>
                </div>
              </div>
              <div
                className="number-center"
                style={{
                  paddingLeft: "59%",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "18px",
                  color: "black"
                }}
              >
                {sessionStorage.getItem("sumPrice")} Baht
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              marginLeft: "2%",
              marginRight: "2%"
            }}
          >
            <button
              onClick={this.toHome}
              className="qr-home-but"
              style={{ marginLeft: "0" }}
            >
              HOME
            </button>
            <button className="qr-saveimg-but" style={{ marginRight: "0" }}>
              <a
                style={{ textDecoration: "none", color: "white" }}
                href="download"
                id="btn-download"
                download="HYPERBOLA-QR_RECEIPT.png"
                onClick={this.saveReceipt}
              >
                SAVE RECEIPT
              </a>
            </button>
          </div>
        </div>
      );
    }
  }
}
export default withRouter(QRReceipt);
