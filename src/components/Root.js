import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import PostList from './PostList';
import store from '../store';

const Root = () => (
  <Provider store={store}>
    <Fragment>
      <h1>User Posts</h1>
      <div>
        <PostList />
      </div>
    </Fragment>
  </Provider>
);

export default Root;
