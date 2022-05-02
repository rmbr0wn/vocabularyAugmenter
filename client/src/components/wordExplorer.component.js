import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { queryThesaurus } from "../actions/wordExplorer.actions.js";

export default function WordExplorer () {
  const regularUser = JSON.parse(localStorage.getItem('account'));
  const googleUser = JSON.parse(localStorage.getItem('profile'));
  const[searchWord, setSearchWord] = useState('');
  const[returnedWord, setReturnedWord] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if(!regularUser && !googleUser){
      navigate("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e){
    e.preventDefault();

    let thesaurusQuery = await dispatch(queryThesaurus(searchWord));
    setReturnedWord(thesaurusQuery);
    // console.log(thesaurusQuery);
  }

  function handleChange(e){
    e.persist();

    setSearchWord(e.target.value);
  }

  useEffect(() => {
    if(returnedWord){
      // console.log(returnedWord);
    }
  }, [returnedWord]);

    return (
      <div>
        <p> You are on the Word Explorer component!</p>
        <form onSubmit={handleSubmit}>
          <label> Enter a word: </label>
          <input type="text"
          id="word-query-input"
          name="queryBox"
          onChange={handleChange}
          />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
}
