import React from "react";
import PropTypes from "prop-types";

const SearchBar = (props) => (
  <form onSubmit={props.onSubmit}>
    <label> Enter a word: </label>
    <input type="text"
      id="word-query-input"
      name="queryBox"
      onChange={props.onChange}
      />
    <input type="submit" value="Submit"/>
  </form>
);

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
};

export default SearchBar;
