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

    const getPosts = fetch('http://jsonplaceholder.typicode.com/posts');
    const getUsers = fetch('http://jsonplaceholder.typicode.com/users');

    Promise.all([getPosts, getUsers]).then((results) => {
      results[0].json().then(x => dispatch(postDataRetrieved(x)));
      results[1].json().then(x => dispatch(usersDataRetrieved(x)));
    });
  };
};

