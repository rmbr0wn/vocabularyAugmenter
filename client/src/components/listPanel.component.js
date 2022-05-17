import React from 'react';

function objectsToArray(wordObjectList) {
   let individualWord = [];
   let listOfWords = [];

   for(let i = 0; i < wordObjectList.length; i++){
     individualWord.push(Object.values(wordObjectList[i]) + "\n");
   }
   listOfWords.push(individualWord);

   return listOfWords;
 }

const ListPanel = ({ list, editButton, editingPayload, submitHandler, changeHandler }) => (
    <div className="list-panel">
      {editButton}
      {editingPayload.id === list._id && editingPayload.beingEdited === true ?
        <div>
          <form onSubmit={submitHandler} listid={list._id}>
            <input type="text" className="edit-list-name" defaultValue={list.name} onChange={changeHandler}/>
            <h3 className="edit-list-tags"> {list.tags} </h3>
            <h3 className="edit-list-words"> {objectsToArray(list.words)} </h3>
            <h6 className="temp-params"> {list.email} , {list.private.toString()} </h6>
            <input type="submit" value="Save Changes"/>
          </form>
        </div>
        :
        <div>
          <h4 className="list-panel-name"> {list.name} </h4>
          <h3 className="list-panel-tags"> {list.tags} </h3>
          <h3 className="list-panel-words"> {objectsToArray(list.words)} </h3>
          <h6 className="temp-params"> {list.email} , {list.private.toString()} </h6>
        </div>
      }
    </div>
);

export default ListPanel;
