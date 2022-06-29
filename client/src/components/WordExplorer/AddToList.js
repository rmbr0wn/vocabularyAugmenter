import React from "react";
import PropTypes from "prop-types";

const AddToList = (props) => (
  <div className="add-to-list-container">
      <h2> {props.word} </h2>
      <div className="list-dropdown">
        <button type="button" onClick={props.onClick}> {props.buttonText} </button>
        {props.dropdownVisibility ?
          <div className="dropdown-content">
            {props.listDisplay(props.lists)}
            {props.response}
          </div>
          :
          null
        }
      </div>
  </div>
);

AddToList.propTypes = {
  word: PropTypes.string,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  dropdownVisibility: PropTypes.bool,
  listDisplay: PropTypes.func,
  lists: PropTypes.array,
  response: PropTypes.string
};

export default AddToList;
