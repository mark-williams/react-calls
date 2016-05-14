import { POSTS_RETRIEVED, USERS_RETRIEVED, USER_FILTER_CHANGE } from './actions';

const initialState = {
    posts: [],
    users: [],
    userFilter: 0
};


const postsReducer = (state = [], action) => {
    switch (action.type) {
        case POSTS_RETRIEVED:
            return action.data;
        default:
            return state;
    }
};

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case USERS_RETRIEVED:
            return action.data;
        default:
            return state;
    }
}

const filterReducer = (state = 0, action) => {
    switch (action.type) {
        case USER_FILTER_CHANGE:
            return parseInt(action.value);
        default:
            return state;
    }
}

const reducer = (state = initialState, action) => {
    return {
        posts: postsReducer(state.posts, action),
        users: usersReducer(state.users, action),
        userFilter: filterReducer(state.userFilter, action)
    }
}

export default reducer;