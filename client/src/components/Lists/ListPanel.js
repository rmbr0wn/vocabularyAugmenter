import React from "react";
import PropTypes from "prop-types";

import "./listpanel.css";

const ListPanel = (props) => (
    <div className="list-panel-container">
      {props.editingPayload.id === props.list._id && props.editingPayload.beingEdited === true ?
        <div className="being-edited-container">
          <form onSubmit={props.handlers.handleSubmit} listid={props.list._id}>
            <div className="change-title-container">
              <label className="change-title-label"> Change the list title: </label>
              <input type="text" className="edit-list-name" name="editNameInput" defaultValue={props.list.name} onChange={props.handlers.handleChange}/>
              <input type="submit" value="Save Changes" className="form-button"/>
              <button type="button" onClick={props.handlers.toggleEditing} listid={props.list._id} className="form-button"> Cancel </button>
              <button type="button" onClick={props.handlers.deleteList} listid={props.list._id} className="form-button"> Delete List </button>
            </div>
            <h3 className="edit-list-tags"> {props.list.tags} </h3>
            <h5 className="edit-list-words">
              {objectsToArray(props.list.words, props.handlers.deleteWord, props.list._id, props.editingPayload)}
            </h5>
          </form>
        </div>
        :
        <div className="unedited-list-container" visibility="hidden">
          <h4 className="list-panel-name"> {props.list.name} </h4>
          <hr className="list-panel-name-divider"/>
          <div className="list-panel-button-container">
            <button type="button" onClick={props.handlers.toggleEditing} listid={props.list._id} className="edit-btn form-button"> Edit </button>
          </div>
          <h3 className="list-panel-tags"> {props.list.tags} </h3>
          <h5 className="list-panel-words">
            {objectsToArray(props.list.words, props.handlers.deleteWord, props.list._id, props.editingPayload.beingEdited)}
          </h5>
        </div>
      }
    </div>
);

function objectsToArray (wordObjectList, deleteHandler, listId, editingPayload) {
  let listOfWords = [];

  for (let i = 0; i < wordObjectList.length; i++) {
    let individualWordArray = [];
    let deleteButton = <button
      type="button"
      onClick={deleteHandler}
      key={i}
      word={wordObjectList[i].wordName}
      listid={listId}
      className="form-button delete-word-button"
      >
    X
    </button>;

    let wordName = <p className="word-name" key={"n" + i}>{i+1}) {wordObjectList[i].wordName}</p>;
    let wordDefinition = <p className="word-definition" key={"d" + i}>
      ({wordObjectList[i].partOfSpeech}) {wordObjectList[i].definition}
    </p>;
    let nameAndButton = <div className="delete-word-container" key={"nab" + i}>
      {wordName}{editingPayload.beingEdited && editingPayload.id === listId ? deleteButton : null}
    </div>;


    // Currently only pushing the name, PoS and definition of the word
    individualWordArray.push(
      // editingPayload.beingEdited && editingPayload.id === listId ? deleteButton : null,
      // wordName,
      nameAndButton,
      wordDefinition,
    //   wordObjectList[i].relatedWords ? wordObjectList[i].relatedWords : null,
    //   wordObjectList[i].synonyms ? wordObjectList[i].synonyms : null
    );
    listOfWords.push(individualWordArray);
  }
  return listOfWords;
}

ListPanel.propTypes = {
  list: PropTypes.object,
  editingPayload: PropTypes.object,
  handlers: PropTypes.object
};

export default ListPanel;
