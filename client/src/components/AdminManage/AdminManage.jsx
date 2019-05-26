import React, { Component } from "react";
import "./AdminManage.css";
import { withRouter, Redirect } from "react-router-dom";
import AriaTabPanel from "react-aria-tabpanel";
import PopUp from "./PopUp";
import EditPopUp from "./EditPopUp";
import Collapse, { Panel } from "rc-collapse";

class AdminManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      activeTab: "t1",
      queue: [],
      showConfirmPopUp: false,
      showCancelPopUp: false,
      yogurtStatus: "",
      maltStatus: "",
      milkStatus: "",
      charcoalStatus: "",
      chocolateStatus: "",
      editMaltPopUp: false,
      editYogurtPopUp: false,
      editChocolatePopUp: false,
      editMilkPopUp: false,
      editCharcoalPopUp: false,
      orderID: "",
      temp: 0,
      activeKey: ["0"],
      recordData: []
    };
    this.finishOrder = this.finishOrder.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.editYogurt = this.editYogurt.bind(this);
    this.editMalt = this.editMalt.bind(this);
    this.editMilk = this.editMilk.bind(this);
    this.editCharcoal = this.editCharcoal.bind(this);
    this.editChocolate = this.editChocolate.bind(this);

    // Set available
    this.setYogurtAvailable = this.setYogurtAvailable.bind(this);
    this.setMilkAvailable = this.setMilkAvailable.bind(this);
    this.setCharcoalAvailable = this.setCharcoalAvailable.bind(this);
    this.setChocolateAvailable = this.setChocolateAvailable.bind(this);
    this.setMaltAvailable = this.setMaltAvailable.bind(this);

    // Set Unavailable
    this.setYogurtUnavailable = this.setYogurtUnavailable.bind(this);
    this.setMilkUnavailable = this.setMilkUnavailable.bind(this);
    this.setCharcoalUnavailable = this.setCharcoalUnavailable.bind(this);
    this.setChocolateUnavailable = this.setChocolateUnavailable.bind(this);
    this.setMaltUnavailable = this.setMaltUnavailable.bind(this);

    // Set in production
    this.setYogurtInProduction = this.setYogurtInProduction.bind(this);
    this.setMilkInProduction = this.setMilkInProduction.bind(this);
    this.setCharcoalInProduction = this.setCharcoalInProduction.bind(this);
    this.setChocolateInProduction = this.setChocolateInProduction.bind(this);
    this.setMaltInProduction = this.setMaltInProduction.bind(this);

    this.displayToppings = this.displayToppings.bind(this);
    this.finished = this.finished.bind(this);
    this.cancelled = this.cancelled.bind(this);
    this.showNotification = this.showNotification.bind(this);
  }

  componentWillMount() {
    // getQueue().then(result => {
    //   this.setState({
    //     queue: result
    //   });
    //   if (this.state.queue.length >= 1) {
    //     let sendNoti = {
    //       to: this.state.queue[0][4],
    //       notification: {
    //         body: "ice-cream rdy",
    //         title: "sup nigg",
    //         icon: "favicon.ico"
    //       }
    //     };
    //     var noti = new Request(
    //       "https://fcm.googleapis.com/fcm/send?message_id=739584029621",
    //       {
    //         method: "POST",
    //         headers: new Headers({
    //           "Content-Type": "application/json",
    //           Accept: "application/json",
    //           Authorization:
    //             "key=AAAArDKks7U:APA91bHzxM_Sf5ChSC6iVCOi8ojbahFw38ohJfiLrMLDDKaZW8Q1yBGBxYMd2oTfUzIM-td_StMSlTQOVs9lwTcr2TqLdTCZjEYp_cmfqS_9e1JD982Gno5uUBLEeMqrG4UorZ0Aa6WQ"
    //         }),
    //         body: JSON.stringify(sendNoti)
    //       }
    //     );
    //     fetch(noti);
    //   }
    // });
  }

  onChange = activeKey => {
    this.setState({
      activeKey
    });
  };

  showNotification() {
    if (this.state.queue.length >= 1) {
      let sendNoti = {
        to: this.state.queue[0][4],
        priority: "high",
        notification: {
          body: "Please come and pickup your ice-cream soon.",
          title: "Your Ice-Cream is almost ready!!",
          icon: "favicon.ico",
          click_action: "https://hyperbola.herokuapp.com/user/history"
        }
      };

      var noti = new Request(
        "https://fcm.googleapis.com/fcm/send?message_id=739584029621",
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "key=AAAArDKks7U:APA91bHzxM_Sf5ChSC6iVCOi8ojbahFw38ohJfiLrMLDDKaZW8Q1yBGBxYMd2oTfUzIM-td_StMSlTQOVs9lwTcr2TqLdTCZjEYp_cmfqS_9e1JD982Gno5uUBLEeMqrG4UorZ0Aa6WQ"
          }),
          body: JSON.stringify(sendNoti)
        }
      );
      fetch(noti);
    }
  }

  componentDidMount() {
    if (localStorage.getItem("user")) {
      if (localStorage.getItem("accountType") !== "admin") {
        this.setState({ redirect: "/" });
      }
    } else {
      this.setState({ redirect: "/vendor/login" });
    }

    getQueue().then(result => {
      this.setState({
        queue: result
      });
      this.showNotification();
    });
    getRecord().then(result => {
      this.setState({
        recordData: result
      });
    });
    var that = this;
    fetch("/flavor-status").then(function(res) {
      res.json().then(function(data) {
        for (var i in data) {
          if (data[i].flavor_id === "1") {
            that.setState({ charcoalStatus: data[i].flav_availability });
          }
          if (data[i].flavor_id === "2") {
            that.setState({ milkStatus: data[i].flav_availability });
          }
          if (data[i].flavor_id === "3") {
            that.setState({ maltStatus: data[i].flav_availability });
          }
          if (data[i].flavor_id === "4") {
            that.setState({ yogurtStatus: data[i].flav_availability });
          }
          if (data[i].flavor_id === "5") {
            that.setState({ chocolateStatus: data[i].flav_availability });
          }
        }
      });
    });
  }

  setTab(newActiveTabId) {
    this.setState({ activeTab: newActiveTabId });
    if (newActiveTabId === "t3") {
      getRecord().then(result => {
        this.setState({
          recordData: result
        });
      });
    } else if (newActiveTabId === "t1") {
      getQueue().then(result => {
        this.setState({
          queue: result
        });
        this.showNotification();
      });
    }
  }

  closePopUp() {
    this.setState({
      showConfirmPopUp: false,
      showCancelPopUp: false,
      editMaltPopUp: false,
      editYogurtPopUp: false,
      editChocolatePopUp: false,
      editMilkPopUp: false,
      editCharcoalPopUp: false,
      orderID: ""
    });
  }

  /// show order manage popup
  async finishOrder(id, i) {
    await this.setState({
      showConfirmPopUp: !this.state.showConfirmPopUp,
      orderID: id,
      temp: i
    });
  }

  finished() {
    let id = {
      orderID: this.state.orderID,
      status: "finished"
    };

    var req = new Request("/order-done", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(id)
    });

    fetch(req);

    setTimeout(() => {
      getQueue().then(result => {
        this.setState({
          queue: result
        });
        this.showNotification();
      });
    }, 1000);

    this.setState({
      showConfirmPopUp: !this.state.showConfirmPopUp
    });
  }

  cancelOrder(id, i) {
    this.setState({
      showCancelPopUp: !this.state.showCancelPopUp,
      orderID: id,
      temp: i
    });
  }

  cancelled() {
    let id = {
      orderID: this.state.orderID,
      status: "cancelled"
    };

    var req = new Request("/order-done", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(id)
    });

    fetch(req);

    setTimeout(() => {
      getQueue().then(result => {
        this.setState({
          queue: result
        });
        this.showNotification();
      });
    }, 1000);

    this.setState({
      showCancelPopUp: !this.state.showCancelPopUp
    });
  }

  /// Show edit popup
  editYogurt() {
    this.setState({ editYogurtPopUp: !this.state.editYogurtPopUp });
  }
  editMalt() {
    this.setState({ editMaltPopUp: !this.state.editMaltPopUp });
  }
  editCharcoal() {
    this.setState({ editCharcoalPopUp: !this.state.editCharcoalPopUp });
  }
  editChocolate() {
    this.setState({ editChocolatePopUp: !this.state.editChocolatePopUp });
  }
  editMilk() {
    this.setState({ editMilkPopUp: !this.state.editMilkPopUp });
  }

  ///
  /// Queries for editing availability
  ///

  // Yogurt
  setYogurtAvailable(e) {
    e.preventDefault();
    let data = {
      flavorID: "4",
      status: "available"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });

    this.setState({ editYogurtPopUp: false, yogurtStatus: "available" });
  }

  setYogurtUnavailable(e) {
    e.preventDefault();
    let data = {
      flavorID: "4",
      status: "not available"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({ editYogurtPopUp: false, yogurtStatus: "not available" });
  }

  setYogurtInProduction(e) {
    e.preventDefault();
    let data = {
      flavorID: "4",
      status: "in production"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({ editYogurtPopUp: false, yogurtStatus: "in production" });
  }

  // Milk
  setMilkAvailable(e) {
    e.preventDefault();
    let data = {
      flavorID: "2",
      status: "available"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });

    this.setState({ editMilkPopUp: false, milkStatus: "available" });
  }

  setMilkUnavailable(e) {
    e.preventDefault();
    let data = {
      flavorID: "2",
      status: "not available"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({ editMilkPopUp: false, milkStatus: "not available" });
  }

  setMilkInProduction(e) {
    e.preventDefault();
    let data = {
      flavorID: "2",
      status: "in production"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({ editMilkPopUp: false, milkStatus: "in production" });
  }

  // Malt
  setMaltAvailable(e) {
    e.preventDefault();
    let data = {
      flavorID: "3",
      status: "available"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });

    this.setState({ editMaltPopUp: false, maltStatus: "available" });
  }

  setMaltUnavailable(e) {
    e.preventDefault();
    let data = {
      flavorID: "3",
      status: "not available"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({ editMaltPopUp: false, maltStatus: "not available" });
  }

  setMaltInProduction(e) {
    e.preventDefault();
    let data = {
      flavorID: "3",
      status: "in production"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({ editMaltPopUp: false, maltStatus: "in production" });
  }

  // Charcoal
  setCharcoalAvailable(e) {
    e.preventDefault();
    let data = {
      flavorID: "1",
      status: "available"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });

    this.setState({ editCharcoalPopUp: false, charcoalStatus: "available" });
  }

  setCharcoalUnavailable(e) {
    e.preventDefault();
    let data = {
      flavorID: "1",
      status: "not available"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({
      editCharcoalPopUp: false,
      charcoalStatus: "not available"
    });
  }

  setCharcoalInProduction(e) {
    e.preventDefault();
    let data = {
      flavorID: "1",
      status: "in production"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({
      editCharcoalPopUp: false,
      charcoalStatus: "in production"
    });
  }

  // Chocolate
  setChocolateAvailable(e) {
    e.preventDefault();
    let data = {
      flavorID: "5",
      status: "available"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });

    this.setState({ editChocolatePopUp: false, chocolateStatus: "available" });
  }

  setChocolateUnavailable(e) {
    e.preventDefault();
    let data = {
      flavorID: "5",
      status: "not available"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({
      editChocolatePopUp: false,
      chocolateStatus: "not available"
    });
  }

  setChocolateInProduction(e) {
    e.preventDefault();
    let data = {
      flavorID: "5",
      status: "in production"
    };
    var req = new Request("/edit-flavor-status", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(data)
    });

    ///xmlhttpreq
    fetch(req)
      .then(function(res) {
        //Must receive JSON
        res.json().then(function(data) {});
      })
      .catch(function(err) {
        console.log(err);
      });
    this.setState({
      editChocolatePopUp: false,
      chocolateStatus: "in production"
    });
  }

  displayToppings(i) {
    var toppings;
    if (this.state.queue[i][2].length === 0) {
      return (toppings = <li className="order-itemlist">- No Topping</li>);
    } else {
      toppings = Array.from(this.state.queue[i][2]).map((topping, i) => (
        <li className="order-itemlist" key={i}>
          - {topping}
        </li>
      ));
    }

    return toppings;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { recordData } = this.state;

    /// Colors for different status
    const yogurtAvailable = (
      <div className="flavor-green-text">( {this.state.yogurtStatus} )</div>
    );

    const yogurtNotAvailable = (
      <div className="flavor-red-text">( {this.state.yogurtStatus} )</div>
    );

    const yogurtInProduction = (
      <div className="flavor-yellow-text">( {this.state.yogurtStatus} )</div>
    );

    const maltAvailable = (
      <div className="flavor-green-text">( {this.state.maltStatus} )</div>
    );

    const maltNotAvailable = (
      <div className="flavor-red-text">( {this.state.maltStatus} )</div>
    );

    const maltInProduction = (
      <div className="flavor-yellow-text">( {this.state.maltStatus} )</div>
    );

    const milkAvailable = (
      <div className="flavor-green-text">( {this.state.milkStatus} )</div>
    );

    const milkNotAvailable = (
      <div className="flavor-red-text">( {this.state.milkStatus} )</div>
    );

    const milkInProduction = (
      <div className="flavor-yellow-text">( {this.state.milkStatus} )</div>
    );

    const chocolateAvailable = (
      <div className="flavor-green-text">( {this.state.chocolateStatus} )</div>
    );

    const chocolateNotAvailable = (
      <div className="flavor-red-text">( {this.state.chocolateStatus} )</div>
    );

    const chocolateInProduction = (
      <div className="flavor-yellow-text">( {this.state.chocolateStatus} )</div>
    );

    const charcoalAvailable = (
      <div className="flavor-green-text">( {this.state.charcoalStatus} )</div>
    );

    const charcoalNotAvailable = (
      <div className="flavor-red-text">( {this.state.charcoalStatus} )</div>
    );

    const charcoalInProduction = (
      <div className="flavor-yellow-text">( {this.state.charcoalStatus} )</div>
    );

    const queueManage = Array.from(this.state.queue).map((queue, i) => {
      return (
        <div key={i}>
          <div className="one-row" key={i}>
            <div className="menu-list-container" key={i}>
              <div className="order-number">{i + 1}</div>
              <ul style={{ color: "#573E5B", paddingLeft: "20px" }}>
                {queue[1].toUpperCase()} {" " + queue[0]}
                <div>{this.displayToppings(i)}</div>
              </ul>
            </div>

            <div className="button-row">
              <button
                className="cancel-button"
                onClick={() => this.cancelOrder(queue[3], i)}
              >
                CANCEL
              </button>
              <button
                className="finish-button"
                onClick={() => this.finishOrder(queue[3], i)}
              >
                FINISHED
              </button>
            </div>
            <hr width="92%" />
          </div>
        </div>
      );
    });

    const finished = <div style={{ color: "#5e8c24" }}>Finished</div>;

    const notScanned = <div style={{ color: "#cd9b19" }}>Not Scanned</div>;

    const inQueue = <div style={{ color: "#608cf2" }}>In Queue</div>;

    const cancelled = <div style={{ color: "#e4283d" }}>Cancelled</div>;

    const getDay = data => {
      var x, y, z;
      // Array.from(data).map((record, i) => {
      //   x = record[6];
      //   y = record[7];
      //   z = record[8].toString().substring(2);
      //   return true;
      // });
      x = data[1][6];
      y = data[1][7];
      z = data[1][8].toString().substring(2);

      switch (y) {
        case 1:
          return x + " January " + z;
        case 2:
          return x + " February " + z;
        case 3:
          return x + " March " + z;
        case 4:
          return x + " April " + z;
        case 5:
          return x + " May " + z;
        case 6:
          return x + " June " + z;
        case 7:
          return x + " July " + z;
        case 8:
          return x + " August " + z;
        case 9:
          return x + " September " + z;
        case 10:
          return x + " October " + z;
        case 11:
          return x + " November" + z;
        case 12:
          return x + " December " + z;
        default:
          return x;
      }
    };

    const getTotal = data => {
      var totalSales = 0;
      Array.from(data).map((record, i) => {
        if (!isNaN(record[1]) && record[5] !== "cancelled")
          totalSales = totalSales + record[1];
        return true;
      });
      return "Total: " + totalSales + " Baht";
    };

    const getInside = data => {
      const insideRecord = Array.from(data).map((record, i) => {
        if (i !== 0) {
          return (
            <div
              style={{ fontFamily: "Nunito, sans-serif", color: "#6e3596" }}
              key={i}
            >
              <div style={{ fontSize: "14px" }}>
                {record[5] === "finished" ? finished : ""}
                {record[5] === "not scanned" ? notScanned : ""}
                {record[5] === "cancelled" ? cancelled : ""}
                {record[5] === "in queue" ? inQueue : ""}
              </div>
              <div style={{ fontSize: "20px" }}>
                {record[0] + " : " + record[1] + " Baht"}
              </div>
              <div style={{ fontSize: "12px" }}>
                {record[3].length !== 0
                  ? " - " + record[2] + " " + record[4] + " with " + record[3]
                  : " - " + record[2] + " " + record[4]}
              </div>
              <hr />
            </div>
          );
        } else {
          return (
            <div
              style={{
                fontFamily: "Nunito, sans-serif",
                color: "#6e3596",
                margin: "0"
              }}
              key={i}
            >
              <div style={{ fontSize: "16px", textAlign: "center" }}>
                {"Most Picked Flavor: " + record}
              </div>

              <hr width="60%" />
            </div>
          );
        }
      });

      return insideRecord;
    };

    const record = Array.from(recordData).map((record, i) => {
      return (
        <Panel
          className="record-panel"
          header={getDay(record)}
          headerClass="record-text"
          key={i}
          extra={<span>{getTotal(record)}</span>}
        >
          <div style={{ fontFamily: "Nunito, sans-serif" }}>
            {getInside(record)}
          </div>
        </Panel>
      );
    });

    let tabDescriptions = [
      {
        title: "Order",
        id: "t1",
        content: queueManage
      },
      {
        title: "Availability",
        id: "t2",
        content: (
          <div>
            <div className="row" style={{ paddingTop: "1rem" }}>
              <div className="manage-column">
                <div className="big-flavor-text">Yogurt</div>
                {this.state.yogurtStatus === "available" ? yogurtAvailable : ""}
                {this.state.yogurtStatus === "not available"
                  ? yogurtNotAvailable
                  : ""}
                {this.state.yogurtStatus === "in production"
                  ? yogurtInProduction
                  : ""}
              </div>
              <div className="manage-column">
                <button className="edit-button" onClick={this.editYogurt}>
                  EDIT
                </button>
              </div>
            </div>
            <hr width="90%" />
            <div className="row">
              <div className="manage-column">
                <div className="big-flavor-text">Charcoal</div>
                {this.state.charcoalStatus === "available"
                  ? charcoalAvailable
                  : ""}
                {this.state.charcoalStatus === "not available"
                  ? charcoalNotAvailable
                  : ""}
                {this.state.charcoalStatus === "in production"
                  ? charcoalInProduction
                  : ""}
              </div>
              <div className="manage-column">
                <button className="edit-button" onClick={this.editCharcoal}>
                  EDIT
                </button>
              </div>
            </div>
            <hr width="90%" />
            <div className="row">
              <div className="manage-column">
                <div className="big-flavor-text">Milk</div>
                {this.state.milkStatus === "available" ? milkAvailable : ""}
                {this.state.milkStatus === "not available"
                  ? milkNotAvailable
                  : ""}
                {this.state.milkStatus === "in production"
                  ? milkInProduction
                  : ""}
              </div>
              <div className="manage-column">
                <button className="edit-button" onClick={this.editMilk}>
                  EDIT
                </button>
              </div>
            </div>
            <hr width="90%" />
            <div className="row">
              <div className="manage-column">
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
              <div className="manage-column">
                <button className="edit-button" onClick={this.editChocolate}>
                  EDIT
                </button>
              </div>
            </div>
            <hr width="90%" />
            <div className="row">
              <div className="manage-column">
                <div className="big-flavor-text">Malt</div>
                {this.state.maltStatus === "available" ? maltAvailable : ""}
                {this.state.maltStatus === "not available"
                  ? maltNotAvailable
                  : ""}
                {this.state.maltStatus === "in production"
                  ? maltInProduction
                  : ""}
              </div>
              <div className="manage-column">
                <button className="edit-button" onClick={this.editMalt}>
                  EDIT
                </button>
              </div>
            </div>
            <hr width="90%" />
          </div>
        )
      },
      {
        title: "Records",
        id: "t3",
        content: (
          <div>
            <Collapse
              accordion={true}
              onChange={this.onChange}
              activeKey={this.state.activeKey}
            >
              {record}
            </Collapse>
          </div>
        )
      }
    ];

    const { activeTab } = this.state;

    const panels = tabDescriptions.map((tabDescription, i) => {
      return (
        <AriaTabPanel.TabPanel
          key={i}
          tabId={tabDescription.id}
          active={tabDescription.id === activeTab}
        >
          {tabDescription.content}
        </AriaTabPanel.TabPanel>
      );
    });

    const tab = tabDescriptions.map((tabDescription, i) => {
      let innerCl = "Admin-inner-tab";
      if (tabDescription.id === activeTab) innerCl += " is-active";
      return (
        <li className="Admin-Tabs-tablistItem" key={i}>
          <AriaTabPanel.Tab
            id={tabDescription.id}
            className="Admin-Tabs-tab"
            active={tabDescription.id === activeTab}
          >
            <div className={innerCl}>{tabDescription.title}</div>
          </AriaTabPanel.Tab>
        </li>
      );
    });

    const tabs = (
      <div className="info_box--small">
        <AriaTabPanel.Wrapper
          onChange={this.setTab.bind(this)}
          activeTabId={this.state.activeTab}
        >
          <AriaTabPanel.TabList>
            <ul className="Admin-tablist">{tab}</ul>
          </AriaTabPanel.TabList>
          <div className="admin-main-box">{panels}</div>
        </AriaTabPanel.Wrapper>
      </div>
    );

    /// Order status
    const confirmPopUp = (
      <PopUp
        text="Confirm Finished?"
        finished={this.finished}
        closePopUp={this.closePopUp}
      />
    );
    const cancelPopUp = (
      <PopUp
        text="Cancel Order?"
        cancelled={this.cancelled}
        closePopUp={this.closePopUp}
      />
    );

    /// Edit ice-cream status
    const editYogurtPopUp = (
      <EditPopUp
        text="Yogurt"
        closePopUp={this.closePopUp}
        setAvailable={this.setYogurtAvailable}
        setUnavailable={this.setYogurtUnavailable}
        setInProduction={this.setYogurtInProduction}
      />
    );
    const editMilkPopUp = (
      <EditPopUp
        text="Milk"
        closePopUp={this.closePopUp}
        setAvailable={this.setMilkAvailable}
        setUnavailable={this.setMilkUnavailable}
        setInProduction={this.setMilkInProduction}
      />
    );
    const editMaltPopUp = (
      <EditPopUp
        text="Malt"
        closePopUp={this.closePopUp}
        setAvailable={this.setMaltAvailable}
        setUnavailable={this.setMaltUnavailable}
        setInProduction={this.setMaltInProduction}
      />
    );
    const editChocolatePopUp = (
      <EditPopUp
        text="Chocolate"
        closePopUp={this.closePopUp}
        setAvailable={this.setChocolateAvailable}
        setUnavailable={this.setChocolateUnavailable}
        setInProduction={this.setChocolateInProduction}
      />
    );
    const editCharcoalPopUp = (
      <EditPopUp
        text="Charcoal"
        closePopUp={this.closePopUp}
        setAvailable={this.setCharcoalAvailable}
        setUnavailable={this.setCharcoalUnavailable}
        setInProduction={this.setCharcoalInProduction}
      />
    );

    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div>
          <div className="right-text-small">{this.props.displayName}</div>
          <div className="right-text-large">Manage</div>

          {this.state.editYogurtPopUp ? editYogurtPopUp : " "}
          {this.state.editMaltPopUp ? editMaltPopUp : " "}
          {this.state.editChocolatePopUp ? editChocolatePopUp : " "}
          {this.state.editMilkPopUp ? editMilkPopUp : " "}
          {this.state.editCharcoalPopUp ? editCharcoalPopUp : " "}
          {this.state.showCancelPopUp ? cancelPopUp : " "}
          {this.state.showConfirmPopUp ? confirmPopUp : " "}

          {tabs}
        </div>
      );
    }
  }
}

async function getQueue() {
  var queue = [];

  fetch("/get-queue")
    .then(function(res) {
      res.json().then(function(data) {
        for (var i in data) {
          queue.push([
            data[i].flavor_name,
            data[i].type,
            data[i].toppings,
            data[i].transaction_id,
            data[i].token
          ]);
        }
      });
    })
    .catch(function(err) {
      console.log(err);
    });

  // return queue;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(queue);
    }, 1000);
  });
}

async function getRecord() {
  var record = [];
  var nested = [];
  fetch("/get-record")
    .then(function(res) {
      res.json().then(function(data) {
        var tmp = data[0].date;
        for (var i in data) {
          if (data[i].date !== tmp) {
            tmp = data[i].date;
            nested.unshift(mode(nested));
            record.push(nested);
            nested = [];
            nested.push([
              data[i].name, //0
              data[i].total_price,
              data[i].flavor_name, //1
              data[i].toppings, //2
              data[i].type, //3
              data[i].status, //4
              data[i].date, //5
              data[i].month, //6
              data[i].year //7
            ]);
          } else {
            nested.push([
              data[i].name, //0
              data[i].total_price,
              data[i].flavor_name, //1
              data[i].toppings, //2
              data[i].type, //3
              data[i].status, //4
              data[i].date, //5
              data[i].month, //6
              data[i].year //7
            ]);
          }
        }
      });
    })
    .catch(function(err) {
      console.log(err);
    });
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(record);
    }, 1000);
  });
}

function mode(array) {
  if (array.length === 0) return null;
  var modeMap = {};
  var maxEl = array[0][2],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i][2];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

export default withRouter(AdminManage);
