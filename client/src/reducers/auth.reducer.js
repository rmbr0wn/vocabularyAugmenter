const authReducer = (state = { authData: null}, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('account', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case 'LOGOUT':
      localStorage.clear();
      return { ...state, authData: null, profileData: null };
    default:
      return state;

  }
}

export default authReducer;
