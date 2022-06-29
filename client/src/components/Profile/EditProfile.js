import React from "react";
import PropTypes from "prop-types";

const EditProfile = (props) => (
  <div id="profile-container">
    <form onSubmit={props.onSubmit}>
        <div className="profile-welcome">
          <h2> Welcome to your profile {props.name}!</h2>
          {
            props.success && <h3 className="form-success-message">{props.success}</h3>
          }
          {
            props.error.username && <h3 className="form-error-message">{props.error.username}</h3>
          }
          <button type="button" onClick={props.onClick}> Change Username </button>
          {props.allowChange?
            <div className="name-change-container">
              <label> New Username: </label>
              <input type="text"
                id="username-input"
                name="usernameInput"
                onChange={props.onChange}/>
              <input type="submit" value="Submit" name="submitChange"/>
            </div>
            : null
          }
        </div>
    </form>
  </div>
);

EditProfile.propTypes = {
  onSubmit: PropTypes.func,
  name: PropTypes.string,
  onClick: PropTypes.func,
  allowChange: PropTypes.bool,
  error: PropTypes.object,
  onChange: PropTypes.func,
  success: PropTypes.string
};

export default EditProfile;
