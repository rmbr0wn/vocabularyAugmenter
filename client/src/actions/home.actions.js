import { instance } from "../apis/axios.api.js";

export const generateGoogleProfile = (profileData) => async (dispatch) => {
  try {
    const { data } = await instance.post("/generate", profileData);
    
    dispatch({ type: "SET_LOCAL_PROFILE", data });
  } catch (error) {
    return error;
  }
};

export const generateGoogleUsername = (user) => {
  const strippedEmail = user.result.email.split("@");
  let strippedId = user.result.googleId;

  strippedId = strippedId.substr(0, 5);

  return (strippedEmail[0] + strippedId);
};

export const getGoogleProfile = (googleId) => async (dispatch) => {
  try {
    const { data } = await instance.get(`/${googleId}`);

    dispatch({ type: "SET_LOCAL_PROFILE", data });
  } catch (error) {
    return error;
  }
};
