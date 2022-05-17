import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

 function objectsToArray(wordObjectList) {
   let individualWord = [];
   let listOfWords = [];

   for(let i = 0; i < wordObjectList.length; i++){
     individualWord.push(Object.values(wordObjectList[i]) + "\n");
   }
   listOfWords.push(individualWord);

   return listOfWords;
 }



const ListPanel = ({ email, name, privacy, tags, words }) => (

    <div className="list-panel">
      <h4 className="list-panel-name"> {name} </h4>
      <button type="button"> Edit </button>
      <h3 className="list-panel-tags"> {tags} </h3>
      <h3 className="list-panel-words"> {objectsToArray(words)} </h3>
      <h6 className="temp-params"> {email} , {privacy.toString()} </h6>
    </div>

);

export default ListPanel;

import React from 'react';

export default function ListPanel (email, name, privacy, tags, words, id) {
 function objectsToArray (wordObjectList) {
   let individualWord = [];
   let listOfWords = [];

   if(!wordObjectList) return;

   for(let i = 0; i < wordObjectList.length; i++){
     individualWord.push(Object.values(wordObjectList[i]) + "\n");
   }
   listOfWords.push(individualWord);

   return listOfWords;
 }

  return (
    <div className="list-panel" key={id}>
      <h4 className="list-panel-name"> {name} </h4>
      <button type="button"> Edit </button>
      <h3 className="list-panel-tags"> {tags} </h3>
      <h3 className="list-panel-words"> {objectsToArray(words)} </h3>
      <h6 className="temp-params"> {email} , {privacy.toString()} </h6>
    </div>
  );
}

----

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

const ListPanel = ({ email, name, privacy, tags, words, editButton, editingPayload, listid, nameRef }) => (
    <div className="list-panel">
      <input type="text" className="list-panel-name" defaultValue={name} ref={nameRef}/>
      {editButton}
      {editingPayload.id === listid && editingPayload.beingEdited === true ?
        "BEING EDITED"
        :
        "NOT BEING EDITED"
      }
      <h3 className="list-panel-tags"> {tags} </h3>
      <h3 className="list-panel-words"> {objectsToArray(words)} </h3>
      <h6 className="temp-params"> {email} , {privacy.toString()} </h6>
    </div>
);

export default ListPanel;
