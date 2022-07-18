import React from "react";
import PropTypes from "prop-types";

import "./searchbar.css";

const SearchBar = (props) => (
  <form onSubmit={props.handleSubmit} className="word-explorer-search-form">
    <div className="word-explorer-search-container">
      <div className="word-explorer-input-container">
        <label className="word-explorer-input-label"> Enter a word: </label>
        <input type="text"
          id="word-query-input"
          name="queryBox"
          className="word-explorer-input-field"
          onChange={props.handleChange}
        />
      </div>
      <div className="word-explorer-button-container">
        <button type="submit" className="form-button word-explorer-submit"> Submit </button>
      </div>
    </div>
  </form>
);

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func
};

export default SearchBar;
