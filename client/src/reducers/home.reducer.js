const homeReducer = (state = { profileData: null}, action) => {
  switch (action.type) {
    case 'SET_LOCAL_PROFILE':
      if(action?.data.result.length === 0) return;
      else{
        localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
        return { ...state, profileData: action?.data };
      }
    default:
      return state;
  }
}

export default homeReducer;