const profileReducer = (state = { profileData: null }, action) => {
  switch (action.type) {
    case "SET_LOCAL_PROFILE":
      if (action?.data.result.length === 0) return;
      else {
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        return { ...state, profileData: action?.data };
      }
    case "CHANGE_USERNAME":
      /* There is no 'profile' collection for regular users, so we have to
       * check the user type to see what localStorage we need to update.
       */
      if (action?.data.result.googleId) {
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
        return { ...state, profileData: action?.data };
      } else {
        localStorage.setItem("account", JSON.stringify({ ...action?.data }));
        return { ...state, profileData: action?.data };
      }
    case "LOGOUT":
      localStorage.clear();
      return { ...state, profileData: null };
    default:
      return state;
  }
};

export default profileReducer;
