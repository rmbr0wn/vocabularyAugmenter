import React from "react";
import PropTypes from "prop-types";

import "./editprofile.css";

const EditProfile = (props) => (
  <div id="profile-container">
    <h1 className="profile-welcome-header"> Welcome to your profile {props.displayedUsername}!</h1>
    <form onSubmit={props.handleSubmit} className="edit-profile-form">
        <div>
          {props.allowUsernameChange ?
            <div className="name-change-container">
              <label> New Username: </label>
              <input type="text"
              id="username-input"
              name="usernameInput"
              onChange={props.handleChange}/>
            </div>
            : null
          }
          <div className="profile-button-container">
            {props.allowUsernameChange ?
              <button type="submit" name="submitChange" className="form-button profile-button"> Submit </button>
              : null
            }
            <button type="button" onClick={props.showInputField} className="form-button profile-button">
              {props.allowUsernameChange? "Cancel" : "Change Username"}
            </button>
          </div>
        </div>
    </form>
    {
      props.responseMessage && <h3 className="profile-response-message">{props.responseMessage}</h3>
    }
  </div>
);

EditProfile.propTypes = {
  handleSubmit: PropTypes.func,
  displayedUsername: PropTypes.string,
  showInputField: PropTypes.func,
  allowUsernameChange: PropTypes.bool,
  handleChange: PropTypes.func,
  responseMessage: PropTypes.string
};

export default EditProfile;
