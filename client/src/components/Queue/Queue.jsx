import React, { Component } from "react";
import "./Queue.css";
class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = { orderID: "", failed: false, queue: [] };
    this.addQueue = this.addQueue.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getQueue = this.getQueue.bind(this);
  }

  componentDidMount() {
    this.getQueue();
  }
  getQueue() {
    document.getElementById("orderID").value = "";
    this.setState({ orderID: "" });
    var queues = [];
    var that = this;

    fetch("/get-queue")
      .then(function(res) {
        res.json().then(function(data) {
          for (var i in data) {
            queues.push([
              data[i].customer_name,
              data[i].flavor_name,
              data[i].toppings
            ]);
          }
          that.setState({
            queue: queues,
            failed: false
          });
        });
      })
      .catch(function(err) {
        console.log(err);
        that.setState({ failed: true });
      });

    // setTimeout(() => {
    //   if (this.state.queue.length === temp) {
    //     this.setState({ failed: true });
    //   } else {
    //   }
    // }, 1000);
  }

  async onChange(e) {
    await this.setState({ [e.target.name]: e.target.value });
    await this.addQueue();
  }

  addQueue() {
    if (this.state.orderID.length === 32) {
      let orderID = {
        orderID: this.state.orderID
      };
      var req = new Request("/add-queue", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json"
        }),
        body: JSON.stringify(orderID)
      });
      fetch(req);
      // this.getQueue();
      setTimeout(() => {
        this.getQueue();
      }, 500);
    }
  }

  showToppings(array) {
    // var toppingList = "";
    // array.forEach(element => {
    //   toppingList += ", " + element;
    // });
    // return toppingList;
    var x = " ";
    if (array.length === 0) {
      return x + "no";
    } else {
      return x + array.length;
    }
  }

  render() {
    const queueDisplay = Array.from(this.state.queue).map((queue, i) => {
      return (
        <div key={i}>
          <li className="queue-list" key={i}>
            <div
              style={{
                fontWeight: "bolder"
              }}
            >
              <div style={{ fontSize: "1.6rem", display: "inline-block" }}>
                {" "}
                {i + 1 + ". "}{" "}
              </div>{" "}
              {queue[0]}
              {i === 0 ? (
                <div className="queue-status" style={{ color: "#e2aa3f" }}>
                  Preparing...
                </div>
              ) : (
                <div className="queue-status" style={{ color: "grey" }}>
                  Waiting...
                </div>
              )}
            </div>
            - {queue[1]} with
            {this.showToppings(queue[2])} topping(s).
          </li>
          <hr width="96%" />
        </div>
      );
    });
    return (
      <div>
        <div className="queue-head">Current Queue</div>
        <div className="total-queue">
          <div>
            Total: {this.state.queue.length} queue
            <div style={{ color: "#ad7bd1", marginTop: "1rem" }}>
              Estimated Waiting Time:{" "}
              {Math.floor(this.state.queue.length * 0.75)} minute(s)
            </div>
          </div>
        </div>
        <div
          className="container"
          style={{
            width: "85%",
            margin: "auto",
            height: "60vh",
            marginBottom: "20px"
          }}
        >
          <div style={{ marginTop: "10px" }}>{queueDisplay}</div>
        </div>
        <p className={`errorMessage ${!this.state.failed ? "hidden" : ""}`}>
          Invalid QR Code.
        </p>
        <input
          autoFocus
          style={{ width: "20px" }}
          className="font-nunito margin-lr"
          type="text"
          placeholder="QR "
          name="orderID"
          id="orderID"
          value={this.state.orderID}
          onChange={this.onChange}
        />
        {/* <br />
        <button
          className="font-nunito purple-button"
          type="submit"
          name="submit"
          onClick={this.addQueue}
        >
          Add to Queue
        </button> */}
      </div>
    );
  }
}

export default Queue;
