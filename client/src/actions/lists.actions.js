import { instance } from '../apis/axios.api.js'

export const createList = (listTitle, userEmail) => async (dispatch) => {
  try {
    const payload = { listTitle, userEmail };
    const { data } = await instance.post('/lists/create-list', payload);

    return data;
    /* Later, will want to create a reducer that updates the lists store
     * so that we can view the user's lists on the page. That's when the below
     * dispatch will be uncommented & filled in correctly.
     */
    // dispatch({ type: 'AUTH', data });
    //
    // navigation('/');
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
    return data;
  } catch (error) {
    return error;
  }
}

export const changeListName = (newName, listId) => async (dispatch) => {
  try {
    const payload = { newName, listId };
    const { data } = await instance.put('/lists/change-list-name', payload);

  } catch (error) {
    return error;
  }
}

export const deleteList = (listId) => async (dispatch) => {
  try {
    console.log(listId);
    const { data } = await instance.delete(`/lists/${listId}`);

  } catch (error) {
    return error;
  }
}

export const deleteWord = (word, listId) => async (dispatch) => {
  try {
    const payload = { word, listId };
    console.log(payload);
    const { data } = await instance.put('/lists/delete-word', payload);
    console.log(data);

  } catch (error) {
    return error;
  }
}
