import { createStore } from 'redux';
import postsReducer from './reducers';




const postsStore = createStore(postsReducer);
export default postsStore;
