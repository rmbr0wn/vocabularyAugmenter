import React from "react";
import PropTypes from "prop-types";

import "./listcreation.css";

const ListCreation = (props) => (
  <form onSubmit={props.handleSubmit}>
    {props.createListPrompt ?
      <div id="create-list-controls">
        <div className="create-list-input-container">
          <label className="new-list-label"> Enter new list name: </label>
          <input type="text" onChange={props.handleChange} placeholder="New list" name="newListInput" className="new-list-field"/>
        </div>
        <div className="add-list-button-container">
          <input type="submit" value="Add list" className="form-button new-list-button"/>
          <button type="button" onClick={props.switchListPrompt} className="form-button new-list-button"> Cancel </button>
        </div>
        {
          props.responseMessage && <h5 className="return-messages">{props.responseMessage}</h5>
        }
      </div>
      :
      <div id="create-new-list">
        <button type="button" onClick={props.switchListPrompt} className="form-button" id="create-list-button"> + Create New List </button>
        {
          props.responseMessage && <h5 className="return-messages">{props.responseMessage}</h5>
        }
      </div>
    }
  </form>
);

ListCreation.propTypes = {
  handleSubmit: PropTypes.func,
  createListPrompt: PropTypes.bool,
  handleChange: PropTypes.func,
  switchListPrompt: PropTypes.func,
  responseMessage: PropTypes.string
};

export default ListCreation;
