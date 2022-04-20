const profileReducer = (state = { profileData: null}, action) => {
  switch (action.type) {
    case 'GENERATE':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, profileData: action?.data };
    default:
      return state;
  }
}

export default profileReducer;
