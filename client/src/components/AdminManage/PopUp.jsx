import React, { Component } from "react";
import "./PopUp.css";

class PopUp extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="popup-container">
          <div className="popup-heading">{this.props.text}</div>
          <hr
            width="82%"
            color="#9b62c4"
            style={{ height: "0.01px", opacity: "0.5" }}
          />
          {this.props.text === "Confirm Finished?" ? (
            <button className="confirm-button" onClick={this.props.finished}>
              CONFIRM
            </button>
          ) : (
            <button className="confirm-button" onClick={this.props.cancelled}>
              CONFIRM
            </button>
          )}

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

export default PopUp;
