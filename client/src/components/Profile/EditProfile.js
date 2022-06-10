import React from "react";
import PropTypes from "prop-types";

const EditProfile = ({ onSubmit, user, name, onClick, allowChange, error, onChange, success }) => (
  <div id="profile-container">
    <form onSubmit={onSubmit}>
      {user ?
          <div className="profile-welcome">
            <h2> Welcome to your profile {name}!</h2>
            <button type="button" onClick={onClick}> Change Username </button>
            {allowChange?
              <div className="name-change-container">
                <label> New Username: </label>
                <input type="text"
                id="google-username"
                name="googleUsername"
                onChange={onChange}/>
                <input type="submit" value="Submit"/>
                {
                  error.username && <h3 className="form-error-message">{error.username}</h3>
                }
                {
                  success && <h3 className="form-success-message">{success}</h3>
                }
              </div>
              : null
            }
          </div>
          :
          <div className="profile-welcome">
            <h2> Welcome to your profile {name}!</h2>
            <button type="button" id="tester" onClick={onClick}> Change Username </button>
            {allowChange ?
              <div className="name-change-container">
                <label> New Username: </label>
                <input type="text"
                id="regular-username"
                name="regularUsername"
                onChange={onChange}/>
                <input type="submit" value="Submit"/>
                {
                  error.username && <h3 className="form-error-message">{error.username}</h3>
                }
                {
                  success && <h3 className="form-success-message">{success}</h3>
                }
              </div>
              : null
            }
          </div>
      }
    </form>
  </div>
);

EditProfile.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.object,
  name: PropTypes.object,
  onClick: PropTypes.func,
  allowChange: PropTypes.bool,
  error: PropTypes.object,
  onChange: PropTypes.func,
  success: PropTypes.func
};

export default EditProfile;
