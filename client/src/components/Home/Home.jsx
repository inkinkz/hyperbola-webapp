import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Home.css";
import GearIcon from "./gear_icon.svg";
import ArtsIcon from "./arts_icon.svg";
import SalaIcon from "./sala_icon.svg";
import AriaTabPanel from "react-aria-tabpanel";
import Arrow from "./down-arrow.svg";
import UpArrow from "./up-arrow.svg";
import Map from "./Map.jsx";
import places from "./places.json";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEng: false,
      showArts: false,
      showSala: false,
      activeTabEngineering: "t1",
      activeTabArts: "t1",
      activeTabSalaphrakeaw: "t1",
      engAvailableFlavor: [],
      engCurrentQueue: [],
      engNumCurrentQueue: "",
      queue: [],
      currentPosition: { lat: 13.737438, lng: 100.5327835 }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(() => ({
          currentPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
      });
    } else {
      alert("Geoloaction is not supported by your browser");
    }

    this.showEngineeing = this.showEngineeing.bind(this);
    this.showArts = this.showArts.bind(this);
    this.showSalaphrakeaw = this.showSalaphrakeaw.bind(this);
    this.setTabEngineering = this.setTabEngineering.bind(this);
    this.setTabArts = this.setTabArts.bind(this);
    this.setTabSalaphrakeaw = this.setTabSalaphrakeaw.bind(this);
    this.orderEngineering = this.orderEngineering.bind(this);
    this.showToppings = this.showToppings.bind(this);
  }

  componentDidMount() {
    var that = this;

    var queue = [];
    fetch("/get-queue")
      .then(function(res) {
        res.json().then(function(data) {
          for (var i in data) {
            queue.push([
              data[i].customer_name,
              data[i].flavor_name,
              data[i].toppings
            ]);
          }
          that.setState({
            engNumCurrentQueue: queue.length,
            queue: queue
          });
        });
      })
      .catch(function(err) {
        console.log(err);
      });

    var eaf = [];
    fetch("/flavor-status").then(function(res) {
      res.json().then(function(data) {
        for (var i in data) {
          if (data[i].flav_availability === "available") {
            if (data[i].flavor_id === "1") eaf.push("Charcoal");
            if (data[i].flavor_id === "2") eaf.push("Milk");
            if (data[i].flavor_id === "3") eaf.push("Malt");
            if (data[i].flavor_id === "4") eaf.push("Yogurt");
            if (data[i].flavor_id === "5") eaf.push("Chocolate");
          }
        }
        that.setState({ engAvailableFlavor: eaf });
      });
    });
  }

  setTabEngineering(newActiveTabId) {
    this.setState({ activeTabEngineering: newActiveTabId });
  }
  setTabArts(newActiveTabId) {
    this.setState({ activeTabArts: newActiveTabId });
  }
  setTabSalaphrakeaw(newActiveTabId) {
    this.setState({ activeTabSalaphrakeaw: newActiveTabId });
  }

  showEngineeing() {
    if (this.state.showEng === true) {
      this.setState({ showEng: false });
    } else {
      this.setState({ showEng: true });
    }
  }

  orderEngineering() {
    this.props.history.push("/order/flavor");
  }

  showArts() {
    if (this.state.showArts === true) {
      this.setState({ showArts: false });
    } else {
      this.setState({ showArts: true });
    }
  }

  showSalaphrakeaw() {
    if (this.state.showSala === true) {
      this.setState({ showSala: false });
    } else {
      this.setState({ showSala: true });
    }
  }

  showToppings(array) {
    var x = " ";
    if (array.length === 0) {
      return x + "no";
    } else {
      return x + array.length;
    }
  }

  // RENDER /////////////////////////////////////////////////////////////////////////////////////////

  render() {
    const flavors = Array.from(this.state.engAvailableFlavor).map(
      (flavor, i) => <li key={i}>{flavor}</li>
    );

    const queues = Array.from(this.state.queue).map((queue, i) => {
      return (
        <li className="mg-bot" key={i}>
          {i + 1 + ". "} {queue[0].substring(0, 19)}
          {i === 0 ? (
            <div className="home-queue-status" style={{ color: "#e2aa3f" }}>
              Preparing...
            </div>
          ) : (
            <div className="home-queue-status" style={{ color: "grey" }}>
              Waiting...
            </div>
          )}
          <div>
            &nbsp;{"- " + queue[1]} {this.showToppings(queue[2])} topping(s).
          </div>
          <hr />
        </li>
      );
    });

    let tabDescriptions = [
      {
        title: "Available Now",
        id: "t1",
        content: <div>{flavors}</div>
      },
      {
        title: "Queue",
        id: "t2",
        content: <div className="nobp">{queues}</div>
      }
    ];

    let artsDescription = [
      {
        title: "Available Now",
        id: "t1",
        content: (
          <div>
            <li>Charcoal</li>
            <li>Yogurt</li>
            <li>Malt</li>
          </div>
        )
      },
      {
        title: "Queue",
        id: "t2",
        content: (
          <div>
            <li className="mg-bot" style={{ listStyle: "none" }}>
              1. Newapat
              <div className="home-queue-status" style={{ color: "#e2aa3f" }}>
                Preparing...
              </div>
              <div>&nbsp;- Yogurt with 2 topping(s).</div>
              <hr />
            </li>
            <li className="mg-bot" style={{ listStyle: "none" }}>
              2. John Doe
              <div className="home-queue-status" style={{ color: "grey" }}>
                Waiting...
              </div>
              <div>&nbsp;- Charcoal with 4 topping(s).</div>
              <hr />
            </li>
          </div>
        )
      }
    ];

    let salaDescription = [
      {
        title: "Available Now",
        id: "t1",
        content: (
          <div>
            <li>Milk</li>
            <li>Yogurt</li>
          </div>
        )
      },
      {
        title: "Queue",
        id: "t2",
        content: (
          <div>
            <li className="mg-bot" style={{ listStyle: "none" }}>
              1. Bob
              <div className="home-queue-status" style={{ color: "#e2aa3f" }}>
                Preparing...
              </div>
              <div>&nbsp;- Milk with no topping(s).</div>
              <hr />
            </li>
            <li className="mg-bot" style={{ listStyle: "none" }}>
              2. Trudy
              <div className="home-queue-status" style={{ color: "grey" }}>
                Waiting...
              </div>
              <div>&nbsp;- Yogurt with 1 topping(s).</div>
              <hr />
            </li>
            <li className="mg-bot" style={{ listStyle: "none" }}>
              3. Alice
              <div className="home-queue-status" style={{ color: "grey" }}>
                Waiting...
              </div>
              <div>&nbsp;- Milk with 2 topping(s).</div>
              <hr />
            </li>
          </div>
        )
      }
    ];

    const {
      activeTabEngineering,
      activeTabArts,
      activeTabSalaphrakeaw
    } = this.state;

    const upArrow = (
      <img className="arrow" src={UpArrow} alt="" height="12" width="12" />
    );

    const downArrow = (
      <img className="arrow" src={Arrow} alt="" height="12" width="12" />
    );

    const tabsEngineering = tabDescriptions.map((tabDescription, i) => {
      let innerCl = "Tabs-tabInner";
      if (tabDescription.id === activeTabEngineering) innerCl += " is-active";
      return (
        <li className="Tabs-tablistItem" key={i}>
          <AriaTabPanel.Tab
            id={tabDescription.id}
            className="Tabs-tab"
            active={tabDescription.id === activeTabEngineering}
          >
            <div className={innerCl}>{tabDescription.title}</div>
          </AriaTabPanel.Tab>
        </li>
      );
    });

    const panelsEngineering = tabDescriptions.map((tabDescription, i) => {
      return (
        <AriaTabPanel.TabPanel
          key={i}
          tabId={tabDescription.id}
          active={tabDescription.id === activeTabEngineering}
        >
          {tabDescription.content}
        </AriaTabPanel.TabPanel>
      );
    });

    const tabsArts = artsDescription.map((artsDescription, i) => {
      let innerCl = "Tabs-tabInner";
      if (artsDescription.id === activeTabArts) innerCl += " is-active";
      return (
        <li className="Tabs-tablistItem" key={i}>
          <AriaTabPanel.Tab
            id={artsDescription.id}
            className="Tabs-tab"
            active={artsDescription.id === activeTabArts}
          >
            <div className={innerCl}>{artsDescription.title}</div>
          </AriaTabPanel.Tab>
        </li>
      );
    });

    const panelsArts = artsDescription.map((tabDescription, i) => {
      return (
        <AriaTabPanel.TabPanel
          key={i}
          tabId={tabDescription.id}
          active={tabDescription.id === activeTabArts}
        >
          {tabDescription.content}
        </AriaTabPanel.TabPanel>
      );
    });

    const tabsSalaphrakeaw = salaDescription.map((tabDescription, i) => {
      let innerCl = "Tabs-tabInner";
      if (tabDescription.id === activeTabSalaphrakeaw) innerCl += " is-active";
      return (
        <li className="Tabs-tablistItem" key={i}>
          <AriaTabPanel.Tab
            id={tabDescription.id}
            className="Tabs-tab"
            active={tabDescription.id === activeTabSalaphrakeaw}
          >
            <div className={innerCl}>{tabDescription.title}</div>
          </AriaTabPanel.Tab>
        </li>
      );
    });

    const panelsSalaphrakeaw = salaDescription.map((tabDescription, i) => {
      return (
        <AriaTabPanel.TabPanel
          key={i}
          tabId={tabDescription.id}
          active={tabDescription.id === activeTabSalaphrakeaw}
        >
          {tabDescription.content}
        </AriaTabPanel.TabPanel>
      );
    });

    const engInfo = (
      <div className="info_box">
        <br />
        <div className="info_box--small">
          <AriaTabPanel.Wrapper
            onChange={this.setTabEngineering.bind(this)}
            activeTabId={this.state.activeTabEngineering}
          >
            <AriaTabPanel.TabList>
              <ul className="Tabs-tablist">{tabsEngineering}</ul>
            </AriaTabPanel.TabList>
            <div className="Tabs-panel">{panelsEngineering}</div>
          </AriaTabPanel.Wrapper>
        </div>
        <button className="purple_button" onClick={this.orderEngineering}>
          ORDER NOW!
        </button>
        <div />
        <br />
      </div>
    );
    const artsInfo = (
      <div className="info_box">
        <br />
        <div className="info_box--small">
          <AriaTabPanel.Wrapper
            onChange={this.setTabArts.bind(this)}
            activeTabId={this.state.activeTabArts}
          >
            <AriaTabPanel.TabList>
              <ul className="Tabs-tablist">{tabsArts}</ul>
            </AriaTabPanel.TabList>
            <div className="Tabs-panel">{panelsArts}</div>
          </AriaTabPanel.Wrapper>
        </div>
        <button className="purple_button">ORDER NOW!</button>
        <div />
        <br />
      </div>
    );
    const salaInfo = (
      <div className="info_box">
        <br />
        <div className="info_box--small">
          <AriaTabPanel.Wrapper
            onChange={this.setTabSalaphrakeaw.bind(this)}
            activeTabId={this.state.activeTabSalaphrakeaw}
          >
            <AriaTabPanel.TabList>
              <ul className="Tabs-tablist">{tabsSalaphrakeaw}</ul>
            </AriaTabPanel.TabList>
            <div className="Tabs-panel">{panelsSalaphrakeaw}</div>
          </AriaTabPanel.Wrapper>
        </div>
        <button
          className="purple_button"
          // onClick={this.testAPI}
        >
          ORDER NOW!
        </button>
        <div />
        <br />
      </div>
    );
    const engineering = (
      <div className="faculty-bar" onClick={this.showEngineeing}>
        <img src={GearIcon} style={{ width: "53px" }} alt="Eng" />
        <div className="space-between" />
        <div className="white-text">Engineering</div>
        <div className="space-between" />
        <div className="white-text-right">
          {this.state.engNumCurrentQueue} &nbsp; &nbsp; &nbsp; queue
        </div>
        {this.state.showEng ? upArrow : downArrow}
      </div>
    );

    const arts = (
      <div className="faculty-bar" onClick={this.showArts}>
        <img src={ArtsIcon} style={{ width: "53px" }} alt="Arts" />
        <div className="space-between" />
        <div className="white-text">Arts</div>
        <div className="space-between" />
        <div className="white-text-right">2 &nbsp; &nbsp; &nbsp; queue</div>
        {this.state.showArts ? upArrow : downArrow}
      </div>
    );

    const salaphrakeaw = (
      <div className="faculty-bar" onClick={this.showSalaphrakeaw}>
        <img src={SalaIcon} style={{ width: "53px" }} alt="Sala" />
        <div className="space-between" />
        <div className="white-text">Phrakeaw</div>
        <div className="space-between" />
        <div className="white-text-right">3 &nbsp; &nbsp; &nbsp; queue</div>
        {this.state.showSala ? upArrow : downArrow}
      </div>
    );
    return (
      <div>
        {/* <div className="bar">
          <div className="big-purple-text">Queue Status</div>
        </div> */}
        {engineering}
        {this.state.showEng ? engInfo : " "}
        <div className="separator" />

        {arts}
        {this.state.showArts ? artsInfo : " "}
        <div className="separator" />

        {salaphrakeaw}
        {this.state.showSala ? salaInfo : " "}
        <div className="separator" />
        <br />
        <p />

        <div className="big-purple-text">Hyperbola Nearby</div>
        <div className="gmap">
          <Map
            google={this.props.google}
            center={{ lat: 13.737438, lng: 100.5327835 }}
            zoom={16}
            places={places}
            currentPos={this.state.currentPosition}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
