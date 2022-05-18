import React from 'react';

function objectsToArray(wordObjectList, deleteHandler, listId, editingPayload) {
   let listOfWords = []

   for(let i = 0; i < wordObjectList.length; i++){
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

 function tempHand(){
   console.log("Herro")
 }

const ListPanel = ({ list, editingPayload, handlers }) => (
    <div className="list-panel">
      {editingPayload.id === list._id && editingPayload.beingEdited === true ?
        <div>
          <form onSubmit={handlers.handleSubmit} listid={list._id}>
            <input type="text" className="edit-list-name" defaultValue={list.name} onChange={handlers.handleChange}/>
            <button type="button" onClick={handlers.deleteList} listid={list._id}> Delete List </button>
            <h3 className="edit-list-tags"> {list.tags} </h3>
            <h5 className="edit-list-words">
              {objectsToArray(list.words, handlers.deleteWord, list._id, editingPayload)}
            </h5>
            <h6 className="temp-params"> {list.email} , {list.private.toString()} </h6>
            <input type="submit" value="Save Changes"/>
            <button type="button" onClick={handlers.toggleEditing} listid={list._id}> Cancel </button>
          </form>
        </div>
        :
        <div>
          <button type="button" onClick={handlers.toggleEditing} listid={list._id}> Edit </button>
          <h4 className="list-panel-name"> {list.name} </h4>
          <h3 className="list-panel-tags"> {list.tags} </h3>
          <h5 className="list-panel-words">
            {objectsToArray(list.words, handlers.deleteWord, list._id, editingPayload.beingEdited)}
          </h5>
          <h6 className="temp-params"> {list.email} , {list.private.toString()} </h6>
        </div>
      }
    </div>
);

export default ListPanel;
