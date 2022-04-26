import { instance } from '../apis/axios.api.js'

export const changeUsername = (newUsername, userType, userEmail) => async (dispatch) => {
  try{
    const formData = { newUsername, userType, userEmail };
    const { data } = await instance.put('/profile/change-name', formData);
    dispatch({ type: 'CHANGE_USERNAME', data });
  } catch(error) {
    return error;
  }
}
