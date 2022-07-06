import React from "react";
import PropTypes from "prop-types";

const EditProfile = (props) => (
  <div id="profile-container">
    <form onSubmit={props.handleSubmit}>
        <div className="profile-welcome">
          <h2> Welcome to your profile {props.displayedUsername}!</h2>
          {
            props.responseMessage && <h3 className="form-response-message">{props.responseMessage}</h3>
          }
          <button type="button" onClick={props.showInputField}> Change Username </button>
          {props.allowUsernameChange?
            <div className="name-change-container">
              <label> New Username: </label>
              <input type="text"
                id="username-input"
                name="usernameInput"
                onChange={props.handleChange}/>
              <input type="submit" value="Submit" name="submitChange"/>
            </div>
            : null
          }
        </div>
    </form>
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
