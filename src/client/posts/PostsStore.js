import { createStore } from 'redux';
import reducer from './reducers';

const postsStore = createStore(reducer);
export default postsStore;
