function emptyValueValidation(value){

}

function parseDesiredData(action){
  let baseQuery = action?.data[0].def[0].sseq[0][0][1];
  let wordName = action?.data[0].hwi.hw;
  let partOfSpeech = action?.data[0].fl;
  let definition = baseQuery?.dt[0][1];   // Note, this only gets ONE definition

  let exampleSentence = baseQuery?.dt[1][1][0].t;
  exampleSentence = exampleSentence.replace('{it}', '');
  exampleSentence = exampleSentence.replace('{/it}', '');

  let relatedWordList = baseQuery?.rel_list;
  let relatedWordArr = [];
  for(let i = 0; i < relatedWordList.length; i++){
    for(let j = 0; j < relatedWordList[i].length; j++){
      relatedWordArr.push(relatedWordList[i][j].wd);
    }
  }

  let synonymList = baseQuery?.syn_list[0];
  let synonymArr = [];
  for(let i = 0; i < synonymList.length; i++){
    synonymArr.push(synonymList[i].wd);
  }

  let antonymList = baseQuery?.ant_list;
  let antonymArr = [];
  for(let i = 0; i < antonymList[0].length; i++){
    antonymArr.push(antonymList[0][i].wd);
  }

  let returnArr = [wordName, partOfSpeech, definition,
    exampleSentence, relatedWordArr, synonymArr, antonymArr];

  return returnArr;
}

const wordExplorerReducer = (state = { wordData: null}, action) => {
  switch (action.type) {
    case 'FETCH_WORD_DATA':
      const parsedData = parseDesiredData(action);
      console.log(parsedData);

      return{
        ...state,
        wordData: action?.data
      };
    default:
      return state;
  }
}

export default wordExplorerReducer;
