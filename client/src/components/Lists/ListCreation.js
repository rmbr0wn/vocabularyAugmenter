import React from "react";
import PropTypes from "prop-types";

const ListCreation = (props) => (
  <form onSubmit={props.handleSubmit}>
    {props.createListPrompt ?
      <div id="create-list-controls">
        <input type="text" onChange={props.handleChange} placeholder="New list name" name="newListInput"/>
        <button type="button" onClick={props.switchListPrompt}> X </button>
        <input type="submit" value="Add list"/>
        {
          props.responseMessage && <h5 className="return-messages">{props.responseMessage}</h5>
        }
      </div>
      :
      <div id="create-new-list">
        <button type="button" onClick={props.switchListPrompt}> + Create New List </button>
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
