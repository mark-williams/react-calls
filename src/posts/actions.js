import reqwest from 'reqwest';
import Promise from 'bluebird';

export const POSTS_RETRIEVED = 'POSTS_RETRIEVED';
export const START_RETRIEVING_DATA = 'START_RETRIEVING_DATA';
export const USERS_RETRIEVED = 'USERS_RETRIEVED';
export const USER_FILTER_CHANGE = 'USER_FILTER_CHANGE';


export const startRetrievingData = () => {
  return { type: START_RETRIEVING_DATA };
};

export const postDataRetrieved = (data) => {
  return { type: POSTS_RETRIEVED, data: data };
};

export const usersDataRetrieved = (data) => {
  return { type: USERS_RETRIEVED, data: data };
};

export const userFilterChange = (value) => {
  return { type: USER_FILTER_CHANGE, value: value };
};

export const getData = () => {
  return (dispatch) => {
    dispatch(startRetrievingData());

    var getPosts = reqwest({
      url: 'http://jsonplaceholder.typicode.com/posts', type: 'json'
    });

    var getUsers = reqwest({
      url: 'http://jsonplaceholder.typicode.com/users', type: 'json'
    });

    Promise.join(getPosts, getUsers, (postsData, userData) => {
      dispatch(postDataRetrieved(postsData));
      dispatch(usersDataRetrieved(userData));
    })
      .catch(() => {
        // eslint-disable-next-line
        console.log('An error occurred - OUCH!');
      });
  };
};

