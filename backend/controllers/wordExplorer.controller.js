import dotenv from "dotenv";
import express from "express";
import axios from "axios";

export const getThesaurusWord = async (req, res) => {
  let myKey = process.env.THESAURUS_API_KEY;
  let baseUri = process.env.THESAURUS_API_URI;
  const router = express.Router();

  try{
    let word = req.query.word;
    let keyString = `?key=${myKey}`;
    let searchUrl = baseUri + word + keyString;

    const clientResponse = await axios.get(searchUrl);

    if(!clientResponse) return res.status(404).json({
      message: `The entered word '${word}' was not found. Please check the spelling.`
    });

    return res.status(200).send(clientResponse.data);

  } catch (error) {
    res.status(500).json({ message: "Something went wrong with fetching the thesaurus word: ", error });
  }
};


// `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/umpire?key=${myKey}`
