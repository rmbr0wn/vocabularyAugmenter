import React from "react";
import PropTypes from "prop-types";

const AddToList = ({ word, onClick, buttonText, dropdownVisibility, listDisplay, lists, response }) => (
  <div className="add-to-list-container">
      <h2> {word} </h2>
      <div className="list-dropdown">
        <button type="button" onClick={onClick}> {buttonText} </button>
        {dropdownVisibility ?
          <div className="dropdown-content">
            {listDisplay(lists)}
            {response}
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
