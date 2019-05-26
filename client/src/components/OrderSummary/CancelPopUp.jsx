import React, { Component } from "react";
import "./CancelPopUp.css";

class CancelPopUp extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="popup-container">
          <div className="popup-heading">Cancel Order?</div>
          <hr
            width="82%"
            color="#9b62c4"
            style={{ height: "0.01px", opacity: "0.5" }}
          />
          <button className="confirm-button" onClick={this.props.cancel}>
            CONFIRM
          </button>

          <button
            className="cancel-confirm-button"
            onClick={this.props.closePopUp}
          >
            CANCEL
          </button>
        </div>
      </div>
    );
  }
}

export default CancelPopUp;
