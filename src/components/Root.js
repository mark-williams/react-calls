import React from 'react';
import { Provider } from 'react-redux';
import PostList from './PostList';
import store from '../store';

const Root = () => (
  <Provider store={store}>
    <div>
      <h1>User Posts</h1>
      <div>
        <PostList />
      </div>
    </div>
  </Provider>
);

export default Root;
