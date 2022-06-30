import React from "react";
import PropTypes from "prop-types";

const AddToList = (props) => (
  <div className="add-to-list-container">
      <h2> {props.word} </h2>
      <div className="list-dropdown">
        <button type="button" onClick={props.toggleListDropdown}> {props.listDropdownButtonText} </button>
        {props.listDropdownVisible ?
          <div className="dropdown-content">
            {props.listDisplay(props.listNames)}
            {props.addWordResponse}
          </div>
          :
          null
        }
      </div>
  </div>
);

AddToList.propTypes = {
  word: PropTypes.string,
  toggleListDropdown: PropTypes.func,
  listDropdownButtonText: PropTypes.string,
  listDropdownVisible: PropTypes.bool,
  listDisplay: PropTypes.func,
  listNames: PropTypes.array,
  addWordResponse: PropTypes.string
};

export default AddToList;
