import React from "react";
import PropTypes from "prop-types";

import "./displayresults.css";

const DisplayResults = (props) => {
  let uniqueKeyNum = 0;

  const DisplayWordProperties = (propertyType, propertyList) => {
    let propertyArray = [];

    if (!propertyList || propertyList.length === 0) {
      propertyArray.push(`No ${propertyType} found.`);
      return propertyArray;
    }

    propertyList.forEach((item) => {
      let arrayElement = React.createElement(
        "p",
        {
          key: propertyType + (uniqueKeyNum+=1)
        },
        item + ",");

      propertyArray.push(arrayElement);
    });

    let lastElement = propertyArray.pop().props.children;
    lastElement = lastElement.split(",").join("");
    propertyArray.push(lastElement);

    return propertyArray;
  };

  return (
    <div className="word-results-container">
      <div className="definition-and-example-container">
        <div className="definition-container">
          <h3 className="word-property-header"> Definition <i>({props.thesaurusResponse.partOfSpeech})</i> </h3>
          <hr className="property-container-divider"/>
          <p className="word-response-definition"> {props.thesaurusResponse.definition} </p>
        </div>
        {props.thesaurusResponse.exampleSentence ?
          <div className="example-sentence-container">
            <p className="example-sentence"> &ldquo;{props.thesaurusResponse.exampleSentence}&rdquo; </p>
          </div>
          :
          null
        }
      </div>
      <div className="outer-word-property-container">
        <div className="word-property-container">
          <h3 className="word-property-header"> Related Words </h3>
          <hr className="property-container-divider"/>
          <div className="word-property"> {DisplayWordProperties("related-words", props.thesaurusResponse.relatedWords)} </div>
        </div>
        <div className="word-property-container">
          <h3 className="word-property-header"> Synonyms </h3>
          <hr className="property-container-divider"/>
          <div className="word-property"> {DisplayWordProperties("synonyms", props.thesaurusResponse.synonyms)} </div>
        </div>
        <div className="word-property-container">
          <h3 className="word-property-header"> Antonyms </h3>
          <hr className="property-container-divider"/>
          <div className="word-property"> {DisplayWordProperties("antonyms", props.thesaurusResponse.antonyms)} </div>
        </div>
      </div>
    </div>

  );
};

DisplayResults.propTypes = {
  thesaurusResponse: PropTypes.object
};

export default DisplayResults;
