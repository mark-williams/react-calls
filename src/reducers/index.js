import { START_RETRIEVING_DATA, POSTS_RETRIEVED, USERS_RETRIEVED, USER_FILTER_CHANGE } from '../actions';
export const UI_LOADING = 'UI_LOADING';
export const UI_LOADED = 'UI_LOADED';

const initialState = {
  posts: [],
  users: [],
  userFilter: 0,
  uiState: UI_LOADING
};

export const postsReducer = (state = [], action) => {
  switch (action.type) {
  case POSTS_RETRIEVED:
    return action.data;
  default:
    return state;
  }
};

export const usersReducer = (state = [], action) => {
  switch (action.type) {
  case USERS_RETRIEVED:
    return action.data;
  default:
    return state;
  }
};

export const filterReducer = (state = 0, action) => {
  switch (action.type) {
  case USER_FILTER_CHANGE:
    return parseInt(action.value, 10);
  default:
    return state;
  }
};

export const uiReducer = (state = UI_LOADING, action) => {
  switch (action.type) {
  case START_RETRIEVING_DATA:
    return UI_LOADING;
  case POSTS_RETRIEVED:
    return UI_LOADED;
  default:
    return state;
  }
};

const reducer = (state = initialState, action) => {
  return {
    posts: postsReducer(state.posts, action),
    users: usersReducer(state.users, action),
    userFilter: filterReducer(state.userFilter, action),
    uiState: uiReducer(state.uiState, action)
  };
};

export default reducer;
