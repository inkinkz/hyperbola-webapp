import React, { Component } from "react";
import "./OrderTopping.css";
import Oreo from "./Oreo.png";
import Cereal from "./Cereal.png";
import Strawberry from "./Strawberry.png";
import Peach from "./Peach.png";
import Koko from "./KokoKrunch.png";
import HoneyStar from "./Honeystars.png";
import Raisin from "./Raisin.png";
import Whitemalt from "./Whitemalt.png";
import Ovaltine from "./Ovaltine.png";
import Redjelly from "./Redjelly.jpg";
import Maltflake from "./Maltflake.png";
import Coffee from "./Coffee.png";
import Greentea from "./Greentea.png";
import Rainbow from "./Rainbow.jpg";
import Purplepotato from "./Purplepotato.png";

class OrderTopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noneStatus: true,
      oreoStatus: false,
      cerealStatus: false,
      kokoStatus: false,
      ovaltineStatus: false,
      redjellyStatus: false,
      strawberryStatus: false,
      peachStatus: false,
      maltflakeStatus: false,
      whitemaltStatus: false,
      honeystarStatus: false,
      raisinStatus: false,
      purplePotatoStatus: false,
      greenteaStatus: false,
      coffeeStatus: false,
      rainbowStatus: false,
      counter: 0,
      hasNotifyStatus: false
    };
    this.goCheckout = this.goCheckout.bind(this);
    this.noneClicked = this.noneClicked.bind(this);
    this.oreoClicked = this.oreoClicked.bind(this);
    this.cerealClicked = this.cerealClicked.bind(this);
    this.kokoClicked = this.kokoClicked.bind(this);
    this.ovaltineClicked = this.ovaltineClicked.bind(this);
    this.redjellyClicked = this.redjellyClicked.bind(this);
    this.strawberryClicked = this.strawberryClicked.bind(this);
    this.peachClicked = this.peachClicked.bind(this);
    this.maltflakeClicked = this.maltflakeClicked.bind(this);
    this.whitemaltClicked = this.whitemaltClicked.bind(this);
    this.honeystarClicked = this.honeystarClicked.bind(this);
    this.raisinClicked = this.raisinClicked.bind(this);
    this.purplePotatoClicked = this.purplePotatoClicked.bind(this);
    this.greenteaClicked = this.greenteaClicked.bind(this);
    this.coffeeClicked = this.coffeeClicked.bind(this);
    this.rainbowClicked = this.rainbowClicked.bind(this);
  }

  componentDidMount() {
    if (!sessionStorage.getItem("flavor")) this.props.history.push("/");
  }

  async goCheckout() {
    await sessionStorage.removeItem("toppings");

    let toppingList = [];

    if (this.state.noneStatus) {
      sessionStorage.setItem("toppings", JSON.stringify(toppingList));
      this.props.history.push("/order/summary");
    }

    if (this.state.ovaltineStatus) toppingList.push("Ovaltine");
    if (this.state.cerealStatus) toppingList.push("Cereal");
    if (this.state.kokoStatus) toppingList.push("Koko Krunch");
    if (this.state.oreoStatus) toppingList.push("Oreo");
    if (this.state.redjellyStatus) toppingList.push("Red Jelly");
    if (this.state.strawberryStatus) toppingList.push("Strawberry");
    if (this.state.peachStatus) toppingList.push("Peach");
    if (this.state.maltflakeStatus) toppingList.push("Malt Flake");
    if (this.state.whitemaltStatus) toppingList.push("White Malt");
    if (this.state.honeystarStatus) toppingList.push("Honey Star");
    if (this.state.raisinStatus) toppingList.push("Raisin");
    if (this.state.purplePotatoStatus) toppingList.push("Purple Potato");
    if (this.state.greenteaStatus) toppingList.push("Greentea");
    if (this.state.coffeeStatus) toppingList.push("Coffee");
    if (this.state.rainbowStatus) toppingList.push("Rainbow");

    sessionStorage.setItem("toppings", JSON.stringify(toppingList));
    this.props.history.push("/order/summary");
  }

  maxCone() {
    if (sessionStorage.getItem("type") === "cone" && this.state.counter === 2) {
      return false;
    } else {
      return true;
    }
  }

  //CLick
  oreoClicked() {
    if (this.state.oreoStatus === true) {
      if (
        //case1: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.cerealStatus === true ||
        this.state.kokoStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.redjellyStatus === true ||
        this.state.strawberryStatus === true ||
        this.state.peachStatus === true ||
        this.state.maltflakeStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.honeystarStatus === true ||
        this.state.raisinStatus === true
      ) {
        this.setState({ oreoStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case2: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.cerealStatus === false &&
        this.state.kokoStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.redjellyStatus === false &&
        this.state.strawberryStatus === false &&
        this.state.peachStatus === false &&
        this.state.maltflakeStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.honeystarStatus === false &&
        this.state.raisinStatus === false
      ) {
        this.setState({ oreoStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.oreoStatus === false) {
      //case3: only none is true, oreo -> true, none -> false
      if (this.state.noneStatus === true) {
        this.setState({ noneStatus: false });
        this.setState({ oreoStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      } else {
        //case4
        this.setState({ oreoStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      }
    }
  }

  noneClicked() {
    if (this.state.noneStatus === true) {
      if (
        this.state.cerealStatus === false ||
        this.state.kokoStatus === false ||
        this.state.ovaltineStatus === false ||
        this.state.redjellyStatus === false ||
        this.state.strawberryStatus === false ||
        this.state.peachStatus === false ||
        this.state.maltflakeStatus === false ||
        this.state.whitemaltStatus === false ||
        this.state.honeystarStatus === false ||
        this.state.raisinSatus === false ||
        this.state.oreoStatus === false ||
        this.state.purplePotatoStatus === false ||
        this.state.greenteaStatus === false ||
        this.state.coffeeStatus === false ||
        this.state.rainbowStatus === false
      ) {
        this.setState({ noneStatus: true });
      }
    }
    if (this.state.noneStatus === false) {
      this.setState({ cerealStatus: false });
      this.setState({ kokoStatus: false });
      this.setState({ ovaltineStatus: false });
      this.setState({ redjellyStatus: false });
      this.setState({ strawberryStatus: false });
      this.setState({ peachStatus: false });
      this.setState({ maltflakeStatus: false });
      this.setState({ whitemaltStatus: false });
      this.setState({ honeystarStatus: false });
      this.setState({ raisinStatus: false });
      this.setState({ oreoStatus: false });
      this.setState({ noneStatus: true });
      this.setState({ purplePotatoStatus: false });
      this.setState({ greenteaStatus: false });
      this.setState({ coffeeStatus: false });
      this.setState({ rainbowStatus: false });
      this.setState({ counter: 0 });
    }
  }
  cerealClicked() {
    if (this.state.cerealStatus === true) {
      if (
        //case: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.oreoStatus === true ||
        this.state.kokoStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.redjellyStatus === true ||
        this.state.strawberryStatus === true ||
        this.state.peachStatus === true ||
        this.state.maltflakeStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.honeystarStatus === true ||
        this.state.raisinStatus === true
      ) {
        this.setState({ cerealStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.oreoStatus === false &&
        this.state.kokoStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.redjellyStatus === false &&
        this.state.strawberryStatus === false &&
        this.state.peachStatus === false &&
        this.state.maltflakeStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.honeystarStatus === false &&
        this.state.raisinStatus === false
      ) {
        this.setState({ cerealStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.cerealStatus === false) {
      //case: only none is true, oreo -> true, none -> false
      if (this.state.noneStatus === true) {
        this.setState({ noneStatus: false });
        this.setState({ cerealStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      } else {
        this.setState({ cerealStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      }
    }
  }
  kokoClicked() {
    if (this.state.kokoStatus === true) {
      if (
        //case: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.cerealStatus === true ||
        this.state.oreoStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.redjellyStatus === true ||
        this.state.strawberryStatus === true ||
        this.state.peachStatus === true ||
        this.state.maltflakeStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.honeystarStatus === true ||
        this.state.raisinStatus === true
      ) {
        this.setState({ kokoStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.cerealStatus === false &&
        this.state.oreoStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.redjellyStatus === false &&
        this.state.strawberryStatus === false &&
        this.state.peachStatus === false &&
        this.state.maltflakeStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.honeystarStatus === false &&
        this.state.raisinStatus === false
      ) {
        this.setState({ kokoStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.kokoStatus === false) {
      //case: only none is true, oreo -> true, none -> false
      if (this.state.noneStatus === true) {
        this.setState({ noneStatus: false });
        this.setState({ kokoStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      } else {
        this.setState({ kokoStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      }
    }
  }
  ovaltineClicked() {
    if (this.state.ovaltineStatus === true) {
      if (
        //case: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.cerealStatus === true ||
        this.state.kokoStatus === true ||
        this.state.oreoStatus === true ||
        this.state.redjellyStatus === true ||
        this.state.strawberryStatus === true ||
        this.state.peachStatus === true ||
        this.state.maltflakeStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.honeystarStatus === true ||
        this.state.raisinStatus === true ||
        this.state.purplePotatoStatus === true
      ) {
        this.setState({ ovaltineStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.cerealStatus === false &&
        this.state.kokoStatus === false &&
        this.state.oreoStatus === false &&
        this.state.redjellyStatus === false &&
        this.state.strawberryStatus === false &&
        this.state.peachStatus === false &&
        this.state.maltflakeStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.honeystarStatus === false &&
        this.state.raisinStatus === false &&
        this.state.purplePotatoStatus === false
      ) {
        this.setState({ ovaltineStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.ovaltineStatus === false) {
      if (this.maxCone()) {
        //case: only none is true, oreo -> true, none -> false
        if (this.state.noneStatus === true) {
          this.setState({ noneStatus: false });
          this.setState({ ovaltineStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        } else {
          this.setState({ ovaltineStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        }
      }
    }
  }
  redjellyClicked() {
    if (this.state.redjellyStatus === true) {
      if (
        //case: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.cerealStatus === true ||
        this.state.kokoStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.oreoStatus === true ||
        this.state.strawberryStatus === true ||
        this.state.peachStatus === true ||
        this.state.maltflakeStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.honeystarStatus === true ||
        this.state.raisinStatus === true
      ) {
        this.setState({ redjellyStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.cerealStatus === false &&
        this.state.kokoStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.oreoStatus === false &&
        this.state.strawberryStatus === false &&
        this.state.peachStatus === false &&
        this.state.maltflakeStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.honeystarStatus === false &&
        this.state.raisinStatus === false
      ) {
        this.setState({ redjellyStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.redjellyStatus === false) {
      //case: only none is true, oreo -> true, none -> false
      if (this.state.noneStatus === true) {
        this.setState({ noneStatus: false });
        this.setState({ redjellyStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      } else {
        this.setState({ redjellyStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      }
    }
  }
  strawberryClicked() {
    if (this.state.strawberryStatus === true) {
      if (
        //case: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.cerealStatus === true ||
        this.state.kokoStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.redjellyStatus === true ||
        this.state.oreoStatus === true ||
        this.state.peachStatus === true ||
        this.state.maltflakeStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.honeystarStatus === true ||
        this.state.raisinStatus === true
      ) {
        this.setState({ strawberryStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.cerealStatus === false &&
        this.state.kokoStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.redjellyStatus === false &&
        this.state.oreoStatus === false &&
        this.state.peachStatus === false &&
        this.state.maltflakeStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.honeystarStatus === false &&
        this.state.raisinStatus === false
      ) {
        this.setState({ strawberryStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.strawberryStatus === false) {
      //case: only none is true, oreo -> true, none -> false
      if (this.state.noneStatus === true) {
        this.setState({ noneStatus: false });
        this.setState({ strawberryStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      } else {
        this.setState({ strawberryStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      }
    }
  }
  peachClicked() {
    if (this.state.peachStatus === true) {
      if (
        //case: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.cerealStatus === true ||
        this.state.kokoStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.redjellyStatus === true ||
        this.state.strawberryStatus === true ||
        this.state.oreoStatus === true ||
        this.state.maltflakeStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.honeystarStatus === true ||
        this.state.raisinStatus === true
      ) {
        this.setState({ peachStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.cerealStatus === false &&
        this.state.kokoStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.redjellyStatus === false &&
        this.state.strawberryStatus === false &&
        this.state.oreoStatus === false &&
        this.state.maltflakeStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.honeystarStatus === false &&
        this.state.raisinStatus === false
      ) {
        this.setState({ peachStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.peachStatus === false) {
      //case: only none is true, oreo -> true, none -> false
      if (this.state.noneStatus === true) {
        this.setState({ noneStatus: false });
        this.setState({ peachStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      } else {
        this.setState({ peachStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      }
    }
  }
  maltflakeClicked() {
    if (this.state.maltflakeStatus === true) {
      if (
        //case: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.cerealStatus === true ||
        this.state.kokoStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.redjellyStatus === true ||
        this.state.strawberryStatus === true ||
        this.state.peachStatus === true ||
        this.state.oreoStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.honeystarStatus === true ||
        this.state.raisinStatus === true
      ) {
        this.setState({ maltflakeStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.cerealStatus === false &&
        this.state.kokoStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.redjellyStatus === false &&
        this.state.strawberryStatus === false &&
        this.state.peachStatus === false &&
        this.state.oreoStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.honeystarStatus === false &&
        this.state.raisinStatus === false
      ) {
        this.setState({ maltflakeStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.maltflakeStatus === false) {
      //case: only none is true, oreo -> true, none -> false
      if (this.state.noneStatus === true) {
        this.setState({ noneStatus: false });
        this.setState({ maltflakeStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      } else {
        this.setState({ maltflakeStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      }
    }
  }
  whitemaltClicked() {
    if (this.state.whitemaltStatus === true) {
      if (
        //case1: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.purplePotatoStatus === true ||
        this.state.coffeeStatus === true ||
        this.state.greenteaStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.rainbowStatus === true
      ) {
        this.setState({ whitemaltStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case2: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.purplePotatoStatus === false &&
        this.state.coffeeStatus === false &&
        this.state.greenteaStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.rainbowStatus === false
      ) {
        this.setState({ whitemaltStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.whitemaltStatus === false) {
      //case3: only none is true, oreo -> true, none -> false
      if (this.maxCone()) {
        if (this.state.noneStatus === true) {
          this.setState({ noneStatus: false });
          this.setState({ whitemaltStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        } else {
          //case4
          this.setState({ whitemaltStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        }
      }
    }
  }
  honeystarClicked() {
    if (this.state.honeystarStatus === true) {
      if (
        //case: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.cerealStatus === true ||
        this.state.kokoStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.redjellyStatus === true ||
        this.state.strawberryStatus === true ||
        this.state.peachStatus === true ||
        this.state.maltflakeStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.oreoStatus === true ||
        this.state.raisinStatus === true
      ) {
        this.setState({ honeystarStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.cerealStatus === false &&
        this.state.kokoStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.redjellyStatus === false &&
        this.state.strawberryStatus === false &&
        this.state.peachStatus === false &&
        this.state.maltflakeStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.oreoStatus === false &&
        this.state.raisinStatus === false
      ) {
        this.setState({ honeystarStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.honeystarStatus === false) {
      //case: only none is true, oreo -> true, none -> false
      if (this.state.noneStatus === true) {
        this.setState({ noneStatus: false });
        this.setState({ honeystarStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      } else {
        this.setState({ honeystarStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      }
    }
  }
  raisinClicked() {
    if (this.state.raisinStatus === true) {
      if (
        //case: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.cerealStatus === true ||
        this.state.kokoStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.redjellyStatus === true ||
        this.state.strawberryStatus === true ||
        this.state.peachStatus === true ||
        this.state.maltflakeStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.honeystarStatus === true ||
        this.state.oreoStatus === true
      ) {
        this.setState({ raisinStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.cerealStatus === false &&
        this.state.kokoStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.redjellyStatus === false &&
        this.state.strawberryStatus === false &&
        this.state.peachStatus === false &&
        this.state.maltflakeStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.honeystarStatus === false &&
        this.state.oreoStatus === false
      ) {
        this.setState({ raisinStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.raisinStatus === false) {
      //case: only none is true, oreo -> true, none -> false
      if (this.state.noneStatus === true) {
        this.setState({ noneStatus: false });
        this.setState({ raisinStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      } else {
        this.setState({ raisinStatus: true });
        this.setState({ counter: this.state.counter + 1 });
      }
    }
  }

  purplePotatoClicked() {
    if (this.state.purplePotatoStatus === true) {
      if (
        //case1: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.ovaltineStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.greenteaStatus === true ||
        this.state.coffeeStatus === true ||
        this.state.rainbowStatus === true
      ) {
        this.setState({ purplePotatoStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case2: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.ovaltineStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.greenteaStatus === false &&
        this.state.coffeeStatus === false &&
        this.state.rainbowStatus === false
      ) {
        this.setState({ purplePotatoStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.purplePotatoStatus === false) {
      if (this.maxCone()) {
        //case3: only none is true, oreo -> true, none -> false
        if (this.state.noneStatus === true) {
          this.setState({ noneStatus: false });
          this.setState({ purplePotatoStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        } else {
          //case4
          this.setState({ purplePotatoStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        }
      }
    }
  }

  greenteaClicked() {
    if (this.state.greenteaStatus === true) {
      if (
        //case1: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.purplePotatoStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.coffeeStatus === true ||
        this.state.rainbowStatus === true
      ) {
        this.setState({ greenteaStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case2: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.purplePotatoStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.coffeeStatus === false &&
        this.state.rainbowStatus === false
      ) {
        this.setState({ greenteaStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.greenteaStatus === false) {
      if (this.maxCone()) {
        //case3: only none is true, oreo -> true, none -> false
        if (this.state.noneStatus === true) {
          this.setState({ noneStatus: false });
          this.setState({ greenteaStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        } else {
          //case4
          this.setState({ greenteaStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        }
      }
    }
  }
  coffeeClicked() {
    if (this.state.coffeeStatus === true) {
      if (
        //case1: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.purplePotatoStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.greenteaStatus === true ||
        this.state.ovaltineStatus === true ||
        this.state.rainbowStatus === true
      ) {
        this.setState({ coffeeStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case2: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.purplePotatoStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.greenteaStatus === false &&
        this.state.ovaltineStatus === false &&
        this.state.rainbowStatus === false
      ) {
        this.setState({ coffeeStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.coffeeStatus === false) {
      //case3: only none is true, oreo -> true, none -> false
      if (this.maxCone()) {
        if (this.state.noneStatus === true) {
          this.setState({ noneStatus: false });
          this.setState({ coffeeStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        } else {
          //case4
          this.setState({ coffeeStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        }
      }
    }
  }
  rainbowClicked() {
    if (this.state.rainbowStatus === true) {
      if (
        //case1: oreo true at least 1 other true, oreo -> false, none -> false
        this.state.purplePotatoStatus === true ||
        this.state.whitemaltStatus === true ||
        this.state.greenteaStatus === true ||
        this.state.coffeeStatus === true ||
        this.state.ovaltineStatus === true
      ) {
        this.setState({ rainbowStatus: false });
        this.setState({ noneStatus: false });
        this.setState({ counter: this.state.counter - 1 });
      }
      if (
        //case2: oreo true and and everything else false -> oreo -> false, none -> true
        this.state.purplePotatoStatus === false &&
        this.state.whitemaltStatus === false &&
        this.state.greenteaStatus === false &&
        this.state.coffeeStatus === false &&
        this.state.ovaltineStatus === false
      ) {
        this.setState({ rainbowStatus: false });
        this.setState({ noneStatus: true });
        this.setState({ counter: this.state.counter - 1 });
      }
    }
    if (this.state.rainbowStatus === false) {
      //case3: only none is true, oreo -> true, none -> false
      if (this.maxCone()) {
        if (this.state.noneStatus === true) {
          this.setState({ noneStatus: false });
          this.setState({ rainbowStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        } else {
          //case4
          this.setState({ rainbowStatus: true });
          this.setState({ counter: this.state.counter + 1 });
        }
      }
    }
  }

  render() {
    const selected = <div className="circle_check" />;

    const cupToppings = (
      <div className="topping_background nested">
        <div className="toppingbtn-container">
          {this.state.noneStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.noneClicked} />
          </div>
          <div className="topping_label">None</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.oreoStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.oreoClicked}>
              <img src={Oreo} alt="Oreo" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">Oreo</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.cerealStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.cerealClicked}>
              <img src={Cereal} alt="Cereal" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">Cereal</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.kokoStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.kokoClicked}>
              <img src={Koko} alt="Koko Krunch" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">Koko Krunch</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.ovaltineStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.ovaltineClicked}>
              <img src={Ovaltine} alt="Ovaltine" className="btn_img_honey" />
            </button>
          </div>
          <div className="topping_label">Ovaltine</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.redjellyStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.redjellyClicked}>
              <img
                src={Redjelly}
                alt="Red Jelly"
                className="btn_img_redjelly"
              />
            </button>
          </div>
          <div className="topping_label">Red Jelly</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.strawberryStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.strawberryClicked}>
              <img src={Strawberry} alt="Strawberry" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">Strawberry</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.peachStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.peachClicked}>
              <img
                src={Peach}
                alt="Peach"
                className="btn_img_honey"
                width="90px"
                height="90px"
              />
            </button>
          </div>
          <div className="topping_label">Peach</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.maltflakeStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.maltflakeClicked}>
              <img src={Maltflake} alt="Malt Flakes" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">Malt Flakes</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.whitemaltStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.whitemaltClicked}>
              <img src={Whitemalt} alt="White Malt" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">White Malt</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.honeystarStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.honeystarClicked}>
              <img src={HoneyStar} alt="Honey Star" className="btn_img_honey" />
            </button>
          </div>
          <div className="topping_label">Honey Star</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.raisinStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.raisinClicked}>
              <img src={Raisin} alt="Rasin" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">Raisin</div>
        </div>
      </div>
    );

    const coneToppings = (
      <div className="topping_background nested">
        <div className="toppingbtn-container">
          {this.state.noneStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.noneClicked} />
          </div>
          <div className="topping_label">None</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.ovaltineStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.ovaltineClicked}>
              <img src={Ovaltine} alt="Ovaltine" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">Ovaltine</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.purplePotatoStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.purplePotatoClicked}>
              <img src={Purplepotato} alt="Sweet Potato" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">Sweet Potato</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.whitemaltStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.whitemaltClicked}>
              <img src={Whitemalt} alt="White Malt" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">White Malt</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.greenteaStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.greenteaClicked}>
              <img src={Greentea} alt="Green Tea" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">Green Tea</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.coffeeStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.coffeeClicked}>
              <img src={Coffee} alt="Coffee" className="btn_img" />
            </button>
          </div>
          <div className="topping_label">Coffee</div>
        </div>

        <div className="toppingbtn-container">
          {this.state.rainbowStatus ? selected : ""}
          <div>
            <button className="toppingbtn" onClick={this.rainbowClicked}>
              <img src={Rainbow} alt="Rainbow" className="btn_img_redjelly" />
            </button>
          </div>
          <div className="topping_label">Rainbow</div>
        </div>
      </div>
    );
    return (
      <div className="topping-component">
        <div className="topping-text-container">
          <div>
            <div className="topping_format">Topping</div>

            {sessionStorage.getItem("type") === "cup" ? (
              <div className="subtopping_format">
                +5 baht for 2 toppings of your choice <br />
                +5 baht per additional topping
              </div>
            ) : (
              <div className="subtopping_format">
                Free 1 or 2 powdered topping{" "}
              </div>
            )}
            <div className="selected_flavor_heading">
              Selected Flavor: {sessionStorage.getItem("flavor")}
            </div>
          </div>
        </div>
        {/* //topping */}

        {sessionStorage.getItem("type") === "cup" ? cupToppings : coneToppings}

        {/* button */}
        <div style={{ marginTop: "35px", marginBottom: "16px" }}>
          <button className="btn_select select_text" onClick={this.goCheckout}>
            CONTINUE
          </button>
        </div>
      </div>
    );
  }
}

export default OrderTopping;
