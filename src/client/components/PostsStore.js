import { createStore } from 'redux';
import { POSTS_RETRIEVED, USERS_RETRIEVED, USER_FILTER_CHANGE } from './actions';

const initialState = {
    posts: [],
    users: [],
    userFilter: 0
};



const postsReducer = (state=initialState, action) => {
    switch (action.type) {
        case POSTS_RETRIEVED:
            return Object.assign({}, { posts: action.data });
        case USERS_RETRIEVED:
            return Object.assign({}, { users: action.data });
        case USER_FILTER_CHANGE: 
            return Object.assign({}, { userFilter: parseInt(action.value) });
        default:
            return initialState;
    }    
};



const postsStore = createStore(postsReducer);
export default postsStore;
