import { createStore } from 'redux';
import { POSTS_RETRIEVED } from './actions';

const initialState = {
    posts: []
};



const postsReducer = (state=initialState, action) => {
    switch (action.type) {
        case POSTS_RETRIEVED:
            return Object.assign({}, { posts: action.data });
        default:
            return initialState;
    }    
};


const postsStore = createStore(postsReducer);
export default postsStore;
