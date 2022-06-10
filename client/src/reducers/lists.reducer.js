const listsReducer = (state = { listsData: null }, action) => {
  switch (action.type) {
    case "GET_LISTS":
      return { ...state, listsData: action.data.result };
    case "CREATE_LIST":
      return { ...state, listsData: [...state.listsData, action.data.result] };
    case "DELETE_LIST":
      return { ...state, listsData: state.listsData.filter((list) => list._id !== action.data.id) };
    case "UPDATE_LIST":
      return { ...state, listsData: state.listsData.map((list) => (list._id === action.data.result._id ? action.data.result : list)) };
    default:
      return state;
  }
};

export default listsReducer;
