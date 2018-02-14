import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const postsStore = createStore(reducer, applyMiddleware(thunk));
export default postsStore;

