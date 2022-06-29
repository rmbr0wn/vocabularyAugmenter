import React from "react";
import PropTypes from "prop-types";

const ListPanel = (props) => (
    <div className="list-panel">
      {props.editingPayload.id === props.list._id && props.editingPayload.beingEdited === true ?
        <div>
          <form onSubmit={props.handlers.handleSubmit} listid={props.list._id}>
            <input type="text" className="edit-list-name" name="editNameInput" defaultValue={props.list.name} onChange={props.handlers.handleChange}/>
            <button type="button" onClick={props.handlers.deleteList} listid={props.list._id}> Delete List </button>
            <h3 className="edit-list-tags"> {props.list.tags} </h3>
            <h5 className="edit-list-words">
              {objectsToArray(props.list.words, props.handlers.deleteWord, props.list._id, props.editingPayload)}
            </h5>
            <h6 className="temp-params"> {props.list.email} , {props.list.private.toString()} </h6>
            <input type="submit" value="Save Changes"/>
            <button type="button" onClick={props.handlers.toggleEditing} listid={props.list._id}> Cancel </button>
          </form>
        </div>
        :
        <div>
          <button type="button" onClick={props.handlers.toggleEditing} listid={props.list._id} className="edit-btn"> Edit </button>
          <h4 className="list-panel-name"> {props.list.name} </h4>
          <h3 className="list-panel-tags"> {props.list.tags} </h3>
          <h5 className="list-panel-words">
            {objectsToArray(props.list.words, props.handlers.deleteWord, props.list._id, props.editingPayload.beingEdited)}
          </h5>
          <h6 className="temp-params"> {props.list.email} , {props.list.private.toString()} </h6>
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
      value="X">
    X
    </button>;

    individualWordArray.push(
      editingPayload.beingEdited && editingPayload.id === listId ? deleteButton : null,
      wordObjectList[i].wordName,
      wordObjectList[i].definition,
      wordObjectList[i].partOfSpeech,
      wordObjectList[i].relatedWords ? wordObjectList[i].relatedWords : null,
      wordObjectList[i].synonyms ? wordObjectList[i].synonyms : null
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
