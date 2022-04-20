import { instance } from '../apis/axios.api.js'

export const generateProfile = (userData) => async (dispatch) => {
  try {
    const { data } = await instance.post('/profile/generate', userData);
    dispatch({ type: 'GENERATE', data });
  } catch (error) {
    return error;
  }
}

export const changeUsername = () => async (dispatch) => {}

export const changeImage = () => async (dispatch) => {}
