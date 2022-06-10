import dotenv from "dotenv";
import express from "express";
import axios from "axios";

import WordList from "../models/wordList.model.js";

export const getThesaurusWord = async (req, res) => {
  let myKey = process.env.THESAURUS_API_KEY;
  let baseUri = process.env.THESAURUS_API_URI;
  const router = express.Router();

  try {
    let word = req.query.word;
    let keyString = `?key=${myKey}`;
    let searchUrl = baseUri + word + keyString;

    const clientResponse = await axios.get(searchUrl);

    if(!clientResponse) return res.status(404).json({
      message: `The entered word '${word}' was not found. Please check the spelling.`
    });

    res.status(200).send(clientResponse.data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong with fetching the thesaurus word: ", error });
  }
};

export const getListNames = async (req, res) => {
  const { email } = req.query;

  try {
    const result = await WordList.find({ email }).exec();

    if(!result || result.length === 0) return null;

    let returnArray = [];
    for(let i = 0; i < result.length; i++){
      let userList = { id: result[i]._id.toString(), name: result[i].name};
      returnArray.push(userList);
    }

    res.status(200).send(returnArray);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong with fetching the user's list names: ", error});
  }
}

export const addToList = async (req, res) => {
  const { newWord, listId } = req.body;

  try {
    const result = await WordList.findById(listId);

    result.words.push(newWord);

    const updateList = await result.save();

    res.status(200).json({ message: "Word successfully added to the list." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while adding a word to the list: ", error});
  }
}
