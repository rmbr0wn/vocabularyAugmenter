import { instance } from '../apis/axios.api.js'

export const createList = (listTitle, userEmail) => async (dispatch) => {
  try {
    const payload = { listTitle, userEmail };
    const { data } = await instance.post('/lists/create-list', payload);

    console.log(data);

    dispatch({ type: 'CREATE_LIST', data });

    return data;
  } catch (error) {
    return error;
  }
}

export const getUserLists = (userEmail) => async (dispatch) => {
  try {
    const { data } = await instance.get('/lists/view-lists', {
      params: {
        email: userEmail,
      },
    });
    console.log(data);
    dispatch({ type: 'GET_LISTS', data });

    return data;
  } catch (error) {
    return error;
  }
}

export const changeListName = (newName, listId) => async (dispatch) => {
  try {
    const payload = { newName, listId };
    const { data } = await instance.put('/lists/change-list-name', payload);
    console.log(data);
    dispatch({ type: 'UPDATE_LIST', data });

  } catch (error) {
    return error;
  }
}

export const deleteList = (listId) => async (dispatch) => {
  try {
    const { data } = await instance.delete(`/lists/${listId}`);
    console.log(data);
    dispatch({ type: 'DELETE_LIST', data });

    return data;
  } catch (error) {
    return error;
  }
}

export const deleteWord = (word, listId) => async (dispatch) => {
  try {
    const payload = { word, listId };
    const { data } = await instance.put('/lists/delete-word', payload);
    console.log(data);
    dispatch({ type: 'UPDATE_LIST', data });

  } catch (error) {
    return error;
  }
}
