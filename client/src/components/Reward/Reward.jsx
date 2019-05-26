import React, { Component } from "react";
import "./Reward.css";
import Star from "./star.png";
import Cone from "./cone.png";
import Cup from "./hyperbola-logo.svg";
import Topping from "./topping.png";

class Reward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toppingRewardCount: 0,
      cupRewardCount: 0,
      coneRewardCount: 0,
      myPoint: 0,
      cupAlert: false,
      coneAlert: false,
      toppingAlert: false,
      maxTopping: 10
    };
    this.addToppingReward = this.addToppingReward.bind(this);
    this.reduceToppingReward = this.reduceToppingReward.bind(this);
    this.addCupReward = this.addCupReward.bind(this);
    this.reduceCupReward = this.reduceCupReward.bind(this);
    this.addConeReward = this.addConeReward.bind(this);
    this.reduceConeReward = this.reduceConeReward.bind(this);
    this.getRemainingPoints = this.getRemainingPoints.bind(this);
    this.redeem = this.redeem.bind(this);
    this.back = this.back.bind(this);
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

    var maxTopping = JSON.parse(sessionStorage.getItem("toppings")).length;

    this.setState({ maxTopping: maxTopping });
  }

  async redeem() {
    // if (this.state.coneRewardCount > 0)
    await sessionStorage.setItem("coneReward", this.state.coneRewardCount);
    // if (this.state.cupRewardCount > 0)
    await sessionStorage.setItem("cupReward", this.state.cupRewardCount);
    // if (this.state.toppingRewardCount > 0)
    await sessionStorage.setItem(
      "toppingReward",
      this.state.toppingRewardCount
    );

    var pointLeft = await this.getRemainingPoints();
    await sessionStorage.setItem("pointLeft", pointLeft);

    await this.props.history.push("/order/summary");
  }

  back() {
    sessionStorage.removeItem("toppingReward");
    sessionStorage.removeItem("pointLeft");
    sessionStorage.removeItem("coneReward");
    sessionStorage.removeItem("cupReward");

    this.props.history.push("/order/summary");
  }

  getRemainingPoints() {
    return (
      this.state.myPoint -
      this.state.coneRewardCount * 280 -
      this.state.cupRewardCount * 250 -
      this.state.toppingRewardCount * 50
    );
  }

  addToppingReward() {
    if (sessionStorage.getItem("type") === "cup") {
      if (this.state.maxTopping !== 1) {
        if (
          this.getRemainingPoints() >= 50 &&
          this.state.toppingRewardCount < this.state.maxTopping - 1
        ) {
          this.setState({
            toppingRewardCount: this.state.toppingRewardCount + 1
          });
        } else if (this.state.toppingRewardCount >= this.state.maxTopping - 1) {
          this.setState({ maxAlert: true });
        } else {
          this.setState({ toppingAlert: true });
        }
      } else if (this.state.maxTopping === 1) {
        if (
          this.getRemainingPoints() >= 50 &&
          this.state.toppingRewardCount === 0
        ) {
          this.setState({
            toppingRewardCount: 1
          });
        } else if (this.state.toppingRewardCount === 1) {
          this.setState({ maxAlert: true });
        }
      } else {
        this.setState({ toppingAlert: true });
      }
    }
  }

  reduceToppingReward() {
    if (this.state.toppingRewardCount !== 0) {
      this.setState({ toppingRewardCount: this.state.toppingRewardCount - 1 });
    }
  }

  addCupReward() {
    if (sessionStorage.getItem("type") === "cup") {
      if (this.getRemainingPoints() >= 250)
        this.setState({ cupRewardCount: 1 });
    } else {
      this.setState({ cupAlert: true });
    }
  }

  reduceCupReward() {
    if (this.state.cupRewardCount !== 0) {
      this.setState({ cupRewardCount: this.state.cupRewardCount - 1 });
    }
  }

  addConeReward() {
    if (sessionStorage.getItem("type") === "cone") {
      if (this.getRemainingPoints() >= 280)
        this.setState({ coneRewardCount: 1 });
    } else {
      this.setState({ coneAlert: true });
    }
  }

  reduceConeReward() {
    if (this.state.coneRewardCount !== 0) {
      this.setState({ coneRewardCount: this.state.coneRewardCount - 1 });
    }
  }

  render() {
    return (
      <div className="reward-main-compo">
        <div className="reward-text-div">
          <div className="reward-text">Reward</div>
          <div className="reward-description">
            Please redeem items with your points
          </div>
        </div>
        <div className="reward-middle">
          <div className="reward-fullwidth">
            <div className="reward-point-div">
              <div className="reward-point-text">Your Points:</div>
              <div className="star-div">
                <img src={Star} alt="star" className="star-small" />
              </div>
              <div className="reward-point-num">{this.state.myPoint}</div>
            </div>
          </div>
          <div className="reward-reward-container">
            {/* promo1 */}
            <div className="reward-each-div">
              <div className="reward-fullwidth">
                <img src={Topping} className="reward-pic" alt="Topping" />
              </div>
              <div className="reward-text-n-btn">
                <div className="reward-reward-text-div">
                  <div className="reward-name">Get 1 Free Topping</div>
                  <div className="reward-point-need-div">
                    <div className="reward-fullwidth">
                      <img src={Star} alt="star" className="star-small" />
                    </div>
                    <div className="reward-point-need"> 50 Points</div>
                  </div>
                  <div className="number-reward-div">
                    <div className="reward-fullwidth">choose:</div>
                    <div className="reward-fullwidth">
                      <button
                        className="reduce-promo"
                        onClick={this.reduceToppingReward}
                      >
                        -
                      </button>
                    </div>
                    <div className="center-text">
                      {this.state.toppingRewardCount}
                    </div>
                    <div className="reward-fullwidth">
                      <button
                        className="reduce-promo"
                        onClick={this.addToppingReward}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {this.state.maxAlert ? (
                  <div className="alert-text">
                    You only have {this.state.maxTopping} toppings!
                  </div>
                ) : (
                  ""
                )}
                {this.state.toppingAlert ? (
                  <div className="alert-text">Only for cup ice-cream!</div>
                ) : (
                  ""
                )}
                {/* <div className="redeem-div">
                  <button className="redeem">Redeem</button>
                </div> */}
              </div>

              <div className="line" />
            </div>

            {/* end of promo1 */}

            {/* promo2 */}
            <div className="reward-each-div">
              <div className="reward-fullwidth">
                <img src={Cup} className="reward-pic" alt="Cup" />
              </div>
              <div className="reward-text-n-btn">
                <div className="reward-reward-text-div">
                  <div className="reward-name">Get 1 Free Cup</div>
                  <div className="reward-point-need-div">
                    <div className="reward-fullwidth">
                      <img src={Star} alt="star" className="star-small" />
                    </div>
                    <div className="reward-point-need"> 250 Points</div>
                  </div>
                  <div className="number-reward-div">
                    <div className="reward-fullwidth">choose:</div>
                    <div className="reward-fullwidth">
                      <button
                        className="reduce-promo"
                        onClick={this.reduceCupReward}
                      >
                        -
                      </button>
                    </div>
                    <div className="center-text">
                      {this.state.cupRewardCount}
                    </div>
                    <div className="reward-fullwidth">
                      <button
                        className="reduce-promo"
                        onClick={this.addCupReward}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {this.state.cupAlert ? (
                  <div className="alert-text">No cup ice-cream selected!!</div>
                ) : (
                  ""
                )}
                {/* <div className="redeem-div">
                  <button className="redeem">Redeem</button>
                </div> */}
              </div>

              <div className="line" />
            </div>
            {/* end of promo2 */}

            {/* promo3 */}
            <div className="reward-each-div">
              <div className="reward-fullwidth">
                <img src={Cone} className="reward-pic-2" alt="Cone" />
              </div>
              <div className="reward-text-n-btn">
                <div className="reward-reward-text-div">
                  <div className="reward-name">Get 1 Free Cone</div>
                  <div className="reward-point-need-div">
                    <div className="reward-fullwidth">
                      <img src={Star} alt="star" className="star-small" />
                    </div>
                    <div className="reward-point-need"> 280 Points</div>
                  </div>
                  <div className="number-reward-div">
                    <div className="reward-fullwidth">choose:</div>
                    <div className="reward-fullwidth">
                      <button
                        className="reduce-promo"
                        onClick={this.reduceConeReward}
                      >
                        -
                      </button>
                    </div>
                    <div className="center-text">
                      {this.state.coneRewardCount}
                    </div>
                    <div className="reward-fullwidth">
                      <button
                        className="reduce-promo"
                        onClick={this.addConeReward}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {this.state.coneAlert ? (
                  <div className="alert-text">No cone ice-cream selected!</div>
                ) : (
                  ""
                )}
                {/* <div className="redeem-div">
                  <button className="redeem">Redeem</button>
                </div> */}
              </div>

              <div className="line" />
            </div>
            {/* end promo3 */}
          </div>

          <div className="remain-point-div">
            <div className="reward-point-text">Remaining Points: </div>
            <div className="reward.fullwidth">
              <img src={Star} alt="Star" className="star" />
            </div>
            <div className="reward-point-text">{this.getRemainingPoints()}</div>
          </div>
        </div>

        <div className="reward-btn-div">
          <div className="reward-each-btn">
            <button className="reward-edit-btn" onClick={this.back}>
              CANCEL
            </button>
          </div>
          <div className="reward-each-btn">
            <button className="reward-back-btn" onClick={this.redeem}>
              REDEEM
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Reward;
