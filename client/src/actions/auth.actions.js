import { instance } from "../apis/axios.api.js";

export const signIn = (formData, navigation) => async (dispatch) => {
  try {
    const { data } = await instance.post("/user/sign-in", formData);
    dispatch({ type: "AUTH", data });

    navigation("/");
  } catch (error) {
    return error;
  }
};

export const signUp = (formData, navigation) => async (dispatch) => {
  try {
    const { data } = await instance.post("/user/sign-up", formData);

    dispatch({ type: "AUTH", data });

    navigation("/");
  } catch (error) {
    return error;
  }
};
