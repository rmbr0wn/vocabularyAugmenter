import React from "react";
import PropTypes from "prop-types";

const SearchBar = (props) => (
  <form onSubmit={props.handleSubmit}>
    <label> Enter a word: </label>
    <input type="text"
      id="word-query-input"
      name="queryBox"
      onChange={props.handleChange}
      />
    <input type="submit" value="Submit"/>
  </form>
);

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func
};

export default SearchBar;
