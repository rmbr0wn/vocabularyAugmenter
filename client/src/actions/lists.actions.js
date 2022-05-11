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
    // console.log(data);

  } catch (error) {
    return error;
  }
}
