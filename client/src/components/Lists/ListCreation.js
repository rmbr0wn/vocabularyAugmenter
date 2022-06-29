import React from "react";
import PropTypes from "prop-types";

const ListCreation = (props) => (
  <form onSubmit={props.onSubmit}>
    {props.titlePrompt ?
      <div id="create-list-controls">
        <input type="text" onChange={props.onChange} placeholder="New list name" name="newListInput"/>
        <button type="button" onClick={props.onClick}> X </button>
        <input type="submit" value="Add list"/>
        {
          props.message && <h5 className="return-messages">{props.message}</h5>
        }
      </div>
      :
      <div id="create-new-list">
        <button type="button" onClick={props.onClick}> + Create New List </button>
        {
          props.message && <h5 className="return-messages">{props.message}</h5>
        }
      </div>
    }
  </form>
);

ListCreation.propTypes = {
  onSubmit: PropTypes.func,
  titlePrompt: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  message: PropTypes.string
};

export default ListCreation;
