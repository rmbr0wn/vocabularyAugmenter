import { instance } from "../apis/axios.api.js";

export const queryThesaurus = (word) => async (dispatch) => {
  try {
    const { data } = await instance.get(`/explore/get-word?word=${word}`);

    if(data.length === 0){
      localStorage?.removeItem('thesaurus');
      let errorObj = { error: `No results found for '${word}'.`}
      return errorObj;
    }

    if(typeof data[0] !== 'object'){
      let errorObj = { error: `Not currently handling suggested alternatives.`};
      return errorObj;
    }

    let result = parseDesiredData(data);

    localStorage.setItem('thesaurus', JSON.stringify({result}));

    return result;
  } catch (error) {
    return error;
  }
}

function parseDesiredData(queryResult){
  /* NOTE: exampleSentence, relatedWordList, synonymList and antonymList only
   * sometimes exist depending on the word, hence the optional chaining below.
   */
  if(queryResult === "Word is required."){
    let errorObj = { error: "You must enter a word." };
    return errorObj;
  }

  // if(Array.isArray(queryResult)){
  //   let errorObj = { error: "Not currently handling replacement/suggested words." };
  //   return errorObj;
  // }

  let baseQuery = queryResult[0].def[0].sseq[0][0][1];
  let wordName = queryResult[0].hwi.hw;
  let partOfSpeech = queryResult[0].fl;
  let definition = baseQuery.dt[0][1];   // // NOTE: This only gets ONE definition

  let exampleSentence = baseQuery?.dt[1] ? baseQuery?.dt[1][1][0].t : null;
  if(exampleSentence){
    exampleSentence = exampleSentence.replace('{it}', '');
    exampleSentence = exampleSentence.replace('{/it}', '');
  }

  let relatedWordList = baseQuery?.rel_list;
  let relatedWordArr = [];
  if(relatedWordList){
    for(let i = 0; i < relatedWordList.length; i++){
      for(let j = 0; j < relatedWordList[i].length; j++){
        relatedWordArr.push(relatedWordList[i][j].wd);
      }
    }
  }

  // The synonymList declaration throws an error with optional chaining, hence the ugliness.
  let synonymList = baseQuery.syn_list ? baseQuery.syn_list[0] : null;
  let synonymArr = [];
  if(synonymList){
    for(let i = 0; i < synonymList.length; i++){
      synonymArr.push(synonymList[i].wd);
    }
  }

  let antonymList = baseQuery?.ant_list;
  let antonymArr = [];
  if(antonymList){
    for(let i = 0; i < antonymList[0].length; i++){
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
  }

  return returnObj;
}
