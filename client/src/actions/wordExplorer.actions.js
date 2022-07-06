import { instance } from "../apis/axios.api.js";

export const queryThesaurus = (word) => async () => {
  try {
    const { data } = await instance.get(`/explore/get-word?word=${word}`);

    if (data.length === 0) {
      localStorage?.removeItem("thesaurus");
      let errorObj = { error: `No results found for '${word}'.` };
      return errorObj;
    }

    if (typeof data[0] !== "object") {
      let errorObj = { error: "Not currently handling suggested alternative words." };
      return errorObj;
    }

    let result = parseDesiredData(data);

    localStorage.setItem("thesaurus", JSON.stringify({ result }));

    return result;
  } catch (error) {
    return error;
  }
};

export const getListNames = (email) => async (dispatch) => {
  try {
    const { data } = await instance.get("/explore/list-names", {
      params: { email: email } });

    dispatch({ type: "GET_LISTS", data });

    return data;
  } catch (error) {
    return error;
  }
};

export const addToList = (newWord, listId) => async (dispatch) => {
  try {
    const payload = { newWord, listId };

    const { data } = await instance.put("/explore/add-word", payload);

    dispatch({ type: "UPDATE_LIST", data });

    return data;
  } catch (error) {
    return error;
  }
};

function parseDesiredData (queryResult) {
  if (queryResult === "Word is required.") {
    let errorObj = { error: "You must enter a word." };
    return errorObj;
  }

  let baseQuery = queryResult[0].def[0].sseq[0][0][1];
  let wordName = queryResult[0].hwi.hw;
  let partOfSpeech = queryResult[0].fl;
  let definition = baseQuery.dt[0][1];   // // NOTE: This only gets ONE definition
  definition = definition.replace(new RegExp("{it}", "g"), "");
  definition = definition.replace(new RegExp("{/it}", "g"), "");

  let exampleSentence = baseQuery?.dt[1] ? baseQuery?.dt[1][1][0].t : null;
  if (exampleSentence) {
    exampleSentence = exampleSentence.replace(new RegExp("{it}", "g"), "");
    exampleSentence = exampleSentence.replace(new RegExp("{/it}", "g"), "");
  }

  let relatedWordList = baseQuery?.rel_list;
  let relatedWordArr = [];
  if (relatedWordList) {
    for (let i = 0; i < relatedWordList.length; i++) {
      for (let j = 0; j < relatedWordList[i].length; j++) {
        relatedWordArr.push(relatedWordList[i][j].wd);
      }
    }
  }

  let synonymList = baseQuery.syn_list ? baseQuery.syn_list[0] : null;
  let synonymArr = [];
  if (synonymList) {
    for (let i = 0; i < synonymList.length; i++) {
      synonymArr.push(synonymList[i].wd);
    }
  }

  let antonymList = baseQuery?.ant_list;
  let antonymArr = [];
  if (antonymList) {
    for (let i = 0; i < antonymList[0].length; i++) {
      antonymArr.push(antonymList[0][i].wd);
    }
  }

  let returnObj = {
    word: wordName,
    partOfSpeech: partOfSpeech,
    definition: definition,
    exampleSentence: exampleSentence,
    relatedWords: relatedWordArr,
    synonyms: synonymArr,
    antonyms: antonymArr
  };

  return returnObj;
}
