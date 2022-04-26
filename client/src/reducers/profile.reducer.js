const profileReducer = (state = { profileData: null}, action) => {
  switch (action.type) {
    case 'CHANGE_USERNAME':

      /* There is no 'profile' collection for regular users, so we have to
         check the user type to see what localStorage we need to update. */
      if(action?.data.result.googleId){
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
        return { ...state, profileData: action?.data };
      }
      else{
        localStorage.setItem('account', JSON.stringify({ ...action?.data }));
        return { ...state, profileData: action?.data };
      }
    default:
      return state;
  }
}

export default profileReducer;
