import { instance } from "../apis/axios.api.js";

export const queryThesaurus = (word) => async (dispatch) => {
  try {
    const { data } = await instance.get(`/explore/get-word?word=${word}`);
    dispatch({ type: 'FETCH_WORD_DATA', data });
  } catch (error) {
    return error;
  }
}
