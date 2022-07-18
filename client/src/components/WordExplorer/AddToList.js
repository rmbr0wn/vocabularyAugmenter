import React from "react";
import PropTypes from "prop-types";

import "./addtolist.css"

const AddToList = (props) => (
  <div className="add-to-list-container">
      <h2 id="searched-word-header"> {props.word} </h2>
      <div className="list-dropdown">
        {props.listDropdownVisible ?
          <div className="word-dropdown-content">
            <h3 className="word-name-header"> Add &ldquo;{props.word}&rdquo; to a list: </h3>
            <hr className="word-name-divider"/>
            <div className="explorer-list-names"> {props.listDisplay(props.listNames)} </div>
            <p> {props.addWordResponse} </p>
          </div>
          :
          null
        }
        <button type="button" onClick={props.toggleListDropdown} className="form-button add-to-list-button">
        {props.listDropdownButtonText}
        </button>
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
