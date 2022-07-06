import React from "react";
import PropTypes from "prop-types";

import AddToList from "./AddToList";
import DisplayResults from "./DisplayResults";

const ThesaurusContainer = (props) => (
  <div id="thesaurus-response-container">
    <AddToList
      word={props.thesaurusResponse.word}
      toggleListDropdown={props.toggleListDropdown}
      listDropdownButtonText={props.listDropdownButtonText}
      listDropdownVisible={props.listDropdownVisible}
      listDisplay={props.listDisplay}
      listNames={props.listNames}
      addWordResponse={props.addWordResponse}
    />
    <DisplayResults thesaurusResponse={props.thesaurusResponse}/>
  </div>
);

ThesaurusContainer.propTypes = {
  thesaurusResponse: PropTypes.object,
  toggleListDropdown: PropTypes.func,
  listDropdownButtonText: PropTypes.string,
  listDropdownVisible: PropTypes.bool,
  listDisplay: PropTypes.func,
  listNames: PropTypes.array,
  addWordResponse: PropTypes.string
};

export default ThesaurusContainer;
