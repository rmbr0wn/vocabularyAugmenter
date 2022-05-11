import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ListPanel from './listPanel.component.js'
import { createList, getUserLists } from '../actions/lists.actions.js'

const initialListState = {
  email: '',
  name: '',
  private: '',
  tags: '',
  words: ''
}

export default function ListsPage () {
  const[listTitlePrompt, setListTitlePrompt] = useState(false);
  const[newListTitle, setNewListTitle] = useState('');
  const[returnMessage, setReturnMessage] = useState({ title: '' });
  const[userLists, setUserLists] = useState(initialListState);
  const regularUser = JSON.parse(localStorage.getItem('account'));
  const googleUser = JSON.parse(localStorage.getItem('profile'));
  const userEmail = (googleUser) ? googleUser?.result.email : regularUser?.result.email;
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    if(!regularUser && !googleUser){
      navigate('/');
      return;
    }
  }, []);

  // The unmounted stuff is to fix a memory leak warning. Will see if it works.
  useEffect(() => {
    let unmounted = false;

    async function queryUserLists(){
      let fetchUserLists = await dispatch(getUserLists(userEmail));
      const getData = await fetchUserLists;

      if(!unmounted) setUserLists(getData);
    }
    queryUserLists();

    return () => { unmounted = true };
  }, [])

  async function handleSubmit(e){
    e.preventDefault();

    let createListRequest = await dispatch(createList(newListTitle, userEmail));

    if(createListRequest.response){
      setReturnMessage({ title: createListRequest.response.data.message });
    }
    /* The ! check below seems redundant, but it will not work without it.
     * Presumably due to the async/await.
     */
    if(createListRequest.message && !createListRequest.response){
      setReturnMessage({ title: createListRequest.message});
    }
  }

  function handleChange(e){
    e.persist();

    setNewListTitle(e.target.value);
  }

  function switchListPrompt(){
    setListTitlePrompt(!listTitlePrompt);
    setReturnMessage({ title: ''});
  }

  useEffect(() => {
    if(userLists && userLists.email !== ''){
      const result = userLists.result;
      console.log(result);
    }
  }, [userLists])

  function dynamicListDisplay(list) {
    let myArr = [];

    if(!list || list.length === 0){
      myArr.push("No lists to be found.");
      return myArr;
    }

    for(let i = 0; i < list.length; i++){
      let myPanel = <ListPanel
        email={list[i].email}
        name={list[i].name}
        privacy={list[i].private}
        tags={list[i].tags}
        words={list[i].words}
        key={list[i]._id}
      />
      myArr.push(myPanel);
    }
    return myArr;
  }

    return (
      <div>
        <h1> Welcome to the Lists page! </h1>
        <form onSubmit={handleSubmit}>
        {listTitlePrompt ?
          <div id="create-list-controls">
            <input type="text" onChange={handleChange} placeholder="Enter list title..."/>
            <button type="button" onClick={switchListPrompt}> X </button>
            <input type="submit" value="Add list"/>
            {
              returnMessage.title && <h5 className="title-returnMessage-returnMessage">{returnMessage.title}</h5>
            }
          </div>
          :
          <div id="create-new-list">
            <button type="button" onClick={switchListPrompt}> + Create New List </button>
          </div>
        }
        </form>
        <div id="lists-display-container">
          {dynamicListDisplay(userLists.result)}
        </div>
      </div>
    );
}
