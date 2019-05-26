import React, { Component } from "react";
import "./OrderFlavor.css";
import Yogurt_png from "./yogurt.png";
import Charcoal from "./charcoal.png";
import Twotone from "./two tone.png";
import Milk from "./milk.png";
import DarkChocolate from "./chocolate.png";
import WhiteMalt from "./white malt.png";
import { withRouter, Redirect } from "react-router-dom";

class OrderFlavor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      showPriceState: false,
      optionSelected: "cup",
      yogurtStatus: "",
      maltStatus: "",
      milkStatus: "",
      charcoalStatus: "",
      chocolateStatus: "",
      twotoneStatus: ""
    };
    this.showPrice = this.showPrice.bind(this);
    this.toHome = this.toHome.bind(this);
    this.toToppings = this.toToppings.bind(this);
    this.optionChanged = this.optionChanged.bind(this);
  }

  async componentDidMount() {
    if (!localStorage.getItem("user")) {
      this.setState({ redirect: "/login" });
    }

    var availableFlavor = 0;
    var that = this;
    await fetch("/flavor-status").then(function(res) {
      res.json().then(function(data) {
        for (var i in data) {
          if (data[i].flavor_id === "1") {
            that.setState({ charcoalStatus: data[i].flav_availability });
            if (data[i].flav_availability === "available") availableFlavor++;
          }
          if (data[i].flavor_id === "2") {
            that.setState({ milkStatus: data[i].flav_availability });
            if (data[i].flav_availability === "available") availableFlavor++;
          }
          if (data[i].flavor_id === "3") {
            that.setState({ maltStatus: data[i].flav_availability });
            if (data[i].flav_availability === "available") availableFlavor++;
          }
          if (data[i].flavor_id === "4") {
            that.setState({ yogurtStatus: data[i].flav_availability });
            if (data[i].flav_availability === "available") availableFlavor++;
          }
          if (data[i].flavor_id === "5") {
            that.setState({ chocolateStatus: data[i].flav_availability });
            if (data[i].flav_availability === "available") availableFlavor++;
          }
        }
        if (availableFlavor > 1) {
          that.setState({ twotoneStatus: "Available" });
        } else {
          that.setState({ twotoneStatus: "Not available" });
        }
      });
    });
  }

  // Button
  toHome() {
    this.setState({ redirect: "/" });
  }

  async toToppings(e) {
    await sessionStorage.setItem("flavor", e.target.id);
    await sessionStorage.setItem("type", this.state.optionSelected);

    this.props.history.push("/order/topping");
  }

  // popup
  showPrice() {
    if (this.state.showPriceState === true) {
      this.setState({ showPriceState: false });
    } else {
      this.setState({ showPriceState: true });
    }
  }

  async optionChanged(e) {
    await this.setState({ optionSelected: e.target.value });
  }

  // RENDER
  render() {
    /// Colors for different status
    const twotoneAvailble = (
      <div className="flavor-green-text">{this.state.twotoneStatus}</div>
    );
    const twotoneNotAvailble = (
      <div className="flavor-red-text">{this.state.twotoneStatus}</div>
    );

    const yogurtAvailable = (
      <div className="flavor-green-text">
        {this.state.yogurtStatus.charAt(0).toUpperCase() +
          this.state.yogurtStatus.slice(1)}
      </div>
    );

    const yogurtNotAvailable = (
      <div className="flavor-red-text">
        {this.state.yogurtStatus.charAt(0).toUpperCase() +
          this.state.yogurtStatus.slice(1)}
      </div>
    );

    const yogurtInProduction = (
      <div className="flavor-yellow-text">
        {this.state.yogurtStatus.charAt(0).toUpperCase() +
          this.state.yogurtStatus.slice(1)}
      </div>
    );

    const maltAvailable = (
      <div className="flavor-green-text">
        {this.state.maltStatus.charAt(0).toUpperCase() +
          this.state.maltStatus.slice(1)}
      </div>
    );

    const maltNotAvailable = (
      <div className="flavor-red-text">
        {this.state.maltStatus.charAt(0).toUpperCase() +
          this.state.maltStatus.slice(1)}
      </div>
    );

    const maltInProduction = (
      <div className="flavor-yellow-text">
        {this.state.maltStatus.charAt(0).toUpperCase() +
          this.state.maltStatus.slice(1)}
      </div>
    );

    const milkAvailable = (
      <div className="flavor-green-text">
        {this.state.milkStatus.charAt(0).toUpperCase() +
          this.state.milkStatus.slice(1)}
      </div>
    );

    const milkNotAvailable = (
      <div className="flavor-red-text">
        {this.state.milkStatus.charAt(0).toUpperCase() +
          this.state.milkStatus.slice(1)}
      </div>
    );

    const milkInProduction = (
      <div className="flavor-yellow-text">
        {this.state.milkStatus.charAt(0).toUpperCase() +
          this.state.milkStatus.slice(1)}
      </div>
    );

    const chocolateAvailable = (
      <div className="flavor-green-text">
        {this.state.chocolateStatus.charAt(0).toUpperCase() +
          this.state.chocolateStatus.slice(1)}
      </div>
    );

    const chocolateNotAvailable = (
      <div className="flavor-red-text">
        {this.state.chocolateStatus.charAt(0).toUpperCase() +
          this.state.chocolateStatus.slice(1)}
      </div>
    );

    const chocolateInProduction = (
      <div className="flavor-yellow-text">
        {this.state.chocolateStatus.charAt(0).toUpperCase() +
          this.state.chocolateStatus.slice(1)}
      </div>
    );

    const charcoalAvailable = (
      <div className="flavor-green-text">
        {this.state.charcoalStatus.charAt(0).toUpperCase() +
          this.state.charcoalStatus.slice(1)}
      </div>
    );

    const charcoalNotAvailable = (
      <div className="flavor-red-text">
        {this.state.charcoalStatus.charAt(0).toUpperCase() +
          this.state.charcoalStatus.slice(1)}
      </div>
    );

    const charcoalInProduction = (
      <div className="flavor-yellow-text">
        {this.state.charcoalStatus.charAt(0).toUpperCase() +
          this.state.charcoalStatus.slice(1)}
      </div>
    );

    // contents
    const yogurt_content = (
      <div>
        <div className="row">
          <div className="column">
            <div className="big-flavor-text">Yogurt</div>
            {this.state.yogurtStatus === "available" ? yogurtAvailable : ""}
            {this.state.yogurtStatus === "not available"
              ? yogurtNotAvailable
              : ""}
            {this.state.yogurtStatus === "in production"
              ? yogurtInProduction
              : ""}
          </div>
          <div className="column">
            <img src={Yogurt_png} alt="Yogurt" />
          </div>
          <div className="column">
            {this.state.yogurtStatus === "available" ? (
              <button
                className="flavor-button-able"
                onClick={this.toToppings}
                id="Yogurt"
              >
                ORDER
              </button>
            ) : (
              <button className="flavor-button-disable">ORDER</button>
            )}
          </div>
        </div>
        <hr width="90%" />
      </div>
    );

    const charcoal_content = (
      <div>
        <div className="row">
          <div className="column">
            <div className="big-flavor-text">Charcoal</div>
            {this.state.charcoalStatus === "available" ? charcoalAvailable : ""}
            {this.state.charcoalStatus === "not available"
              ? charcoalNotAvailable
              : ""}
            {this.state.charcoalStatus === "in production"
              ? charcoalInProduction
              : ""}
          </div>
          <div className="column">
            <img src={Charcoal} alt="Charcoal" />
          </div>
          <div className="column">
            {this.state.charcoalStatus === "available" ? (
              <button
                className="flavor-button-able"
                onClick={this.toToppings}
                id="Charcoal"
              >
                ORDER
              </button>
            ) : (
              <button className="flavor-button-disable">ORDER</button>
            )}
          </div>
        </div>
        <hr width="90%" />
      </div>
    );

    const twotone_content = (
      <div>
        <div className="row">
          <div className="column">
            <div className="big-flavor-text">Two Tone</div>
            {this.state.twotoneStatus === "Available" ? twotoneAvailble : ""}
            {this.state.twotoneStatus === "Not available"
              ? twotoneNotAvailble
              : ""}
          </div>
          <div className="column">
            <img src={Twotone} alt="Twotone" />
          </div>
          <div className="column">
            {this.state.twotoneStatus === "Available" ? (
              <button
                className="flavor-button-able"
                onClick={this.toToppings}
                id="Two Tone"
              >
                ORDER
              </button>
            ) : (
              <button className="flavor-button-disable">ORDER</button>
            )}
          </div>
        </div>
        <hr width="90%" />
      </div>
    );

    const milk_content = (
      <div>
        <div className="row">
          <div className="column">
            <div className="big-flavor-text">Milk</div>
            {this.state.milkStatus === "available" ? milkAvailable : ""}
            {this.state.milkStatus === "not available" ? milkNotAvailable : ""}
            {this.state.milkStatus === "in production" ? milkInProduction : ""}
          </div>
          <div className="column">
            <img src={Milk} alt="Milk" />
          </div>
          <div className="column">
            {this.state.milkStatus === "available" ? (
              <button
                className="flavor-button-able"
                onClick={this.toToppings}
                id="Milk"
              >
                ORDER
              </button>
            ) : (
              <button className="flavor-button-disable">ORDER</button>
            )}
          </div>
        </div>
        <hr width="90%" />
      </div>
    );

    const darkchoc_content = (
      <div>
        <div className="row">
          <div className="column">
            <div className="big-flavor-text">Chocolate</div>
            {this.state.chocolateStatus === "available"
              ? chocolateAvailable
              : ""}
            {this.state.chocolateStatus === "not available"
              ? chocolateNotAvailable
              : ""}
            {this.state.chocolateStatus === "in production"
              ? chocolateInProduction
              : ""}
          </div>
          <div className="column">
            <img src={DarkChocolate} alt="DarkChocolate" />
          </div>
          <div className="column">
            {this.state.chocolateStatus === "available" ? (
              <button
                className="flavor-button-able"
                onClick={this.toToppings}
                id="Chocolate"
              >
                ORDER
              </button>
            ) : (
              <button className="flavor-button-disable">ORDER</button>
            )}
          </div>
        </div>
        <hr width="90%" />
      </div>
    );

    const whitemalt_content = (
      <div>
        <div className="row">
          <div className="column">
            <div className="big-flavor-text">Malt</div>
            {this.state.maltStatus === "available" ? maltAvailable : ""}
            {this.state.maltStatus === "not available" ? maltNotAvailable : ""}
            {this.state.maltStatus === "in production" ? maltInProduction : ""}
          </div>
          <div className="column">
            <img src={WhiteMalt} alt="WhiteMalt" />
          </div>
          <div className="column">
            {this.state.maltStatus === "available" ? (
              <button
                className="flavor-button-able"
                onClick={this.toToppings}
                id="Malt"
              >
                ORDER
              </button>
            ) : (
              <button className="flavor-button-disable">ORDER</button>
            )}
          </div>
        </div>
        <hr width="90%" />
      </div>
    );

    //popup information
    const showInfo = (
      <div className="flavor-popup-rectangle">
        <div className="flavor-popup-text">
          Hyperbola Ice-cream "Cup" is 25 Baht.
          <br /> Hyperbola Ice-cream "Cone" is 28 Baht <br />( Free 1 or 2
          powdered toppings ).
        </div>
      </div>
    );

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: { plsLogin: true }
          }}
        />
      );
    } else {
      return (
        <div>
          <p className="header_text">Ice Cream</p>
          <p className="header_text-small">Please select your ice-cream</p>
          <div className="space-flavor" />
          <div className="circle-container">
            <div
              className="circle"
              onClick={this.showPrice}
              // onTouchStart={this.showPrice}
              // onTouchEnd={this.showPrice}
            >
              <div className="circle-question-mark">?</div>
            </div>
            {this.state.showPriceState ? showInfo : " "}
          </div>
          <label className="radio-container">
            Cone
            <input
              type="radio"
              name="radio"
              value="cone"
              onChange={this.optionChanged}
            />
            <span className="checkmark" />
          </label>
          <label className="radio-container">
            Cup
            <input
              type="radio"
              name="radio"
              value="cup"
              onChange={this.optionChanged}
              defaultChecked
            />
            <span className="checkmark" />
          </label>

          <div className="container">
            {this.state.yogurtStatus === "available" ? yogurt_content : ""}
            {this.state.charcoalStatus === "available" ? charcoal_content : ""}
            {this.state.milkStatus === "available" ? milk_content : ""}
            {this.state.chocolateStatus === "available" ? darkchoc_content : ""}
            {this.state.maltStatus === "available" ? whitemalt_content : ""}
            {this.state.twotoneStatus === "Available" ? twotone_content : ""}

            {this.state.twotoneStatus !== "Available" ? twotone_content : ""}
            {this.state.yogurtStatus !== "available" ? yogurt_content : ""}
            {this.state.charcoalStatus !== "available" ? charcoal_content : ""}
            {this.state.milkStatus !== "available" ? milk_content : ""}
            {this.state.chocolateStatus !== "available" ? darkchoc_content : ""}
            {this.state.maltStatus !== "available" ? whitemalt_content : ""}
          </div>
        </div>
      );
    }
  }
}

export default withRouter(OrderFlavor);
