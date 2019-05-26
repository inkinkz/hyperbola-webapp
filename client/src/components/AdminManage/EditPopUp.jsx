import React, { Component } from "react";
import "./EditPopUp.css";

class EditPopUp extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="edit-popup-container">
          <div className="popup-heading">{this.props.text} status</div>
          <hr
            width="82%"
            color="#9b62c4"
            style={{ height: "0.01px", opacity: "0.5" }}
          />
          {/* <button className="status-button"> */}
          <button
            className="status-button"
            style={{ color: "#5e8c24" }}
            onClick={this.props.setAvailable}
          >
            AVAILABLE
          </button>
          <button
            className="status-button"
            style={{ color: "#cd9b19" }}
            onClick={this.props.setInProduction}
          >
            {/* <button className="status-button"> */}
            IN PRODUCTION
          </button>
          {/* <button className="status-button"> */}
          <button
            className="status-button"
            style={{ color: "#e4283d" }}
            onClick={this.props.setUnavailable}
          >
            NOT AVAILABLE
          </button>
          <button
            className="cancel-status-button"
            onClick={this.props.closePopUp}
          >
            CANCEL
          </button>
        </div>
      </div>
    );
  }
}

export default EditPopUp;
