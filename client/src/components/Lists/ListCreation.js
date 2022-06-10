import React from "react";
import PropTypes from "prop-types";

const ListCreation = ({ onSubmit, titlePrompt, onChange, onClick, message }) => (
  <form onSubmit={onSubmit}>
    {titlePrompt ?
      <div id="create-list-controls">
        <input type="text" onChange={onChange} placeholder="Enter list list..."/>
        <button type="button" onClick={onClick}> X </button>
        <input type="submit" value="Add list"/>
        {
          message && <h5 className="return-messages">{message}</h5>
        }
      </div>
      :
      <div id="create-new-list">
        <button type="button" onClick={onClick}> + Create New List </button>
        {
          message && <h5 className="return-messages">{message}</h5>
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
