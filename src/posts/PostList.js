import React from 'react';
import Post from './Post';
import postsStore from './PostsStore';
import {
  userFilterChange,
  getData
} from './actions';
import { UI_LOADING } from './reducers';
import PostFilter from './PostFilter';

class PostList extends React.Component {
  constructor() {
    super();
    postsStore.subscribe(this.storeUpdated.bind(this));
    this.state = postsStore.getState();
  }

  componentDidMount = () => {
    postsStore.dispatch(getData());
  }

  storeUpdated = () => {
    this.setState(postsStore.getState());
  }

  renderPost = (p) => (
    <li key={ p.id }>
      <Post post={ p } />
    </li>
  );


  userChanged = (event) => {
    postsStore.dispatch(userFilterChange(event.target.value));
  }

  filterPosts = () => {
    return this.state.posts
      .filter((u) => {
        return (this.state.userFilter === 0) ? true : (u.userId === this.state.userFilter);
      })
      .map(p => this.renderPost(p));
  }

  render = () => {
    let retrievingMessage = '';
    if (this.state.uiState === UI_LOADING) {
      retrievingMessage = <div>Just getting your data, thanks for your patience</div>;
    }

    return (
      <div>
        <div className="row">
          <PostFilter users={this.state.users} userOnChange={this.userChanged} />
        </div>
        <div className="row">
          <div className="eight columns">
            { retrievingMessage }
            <ul style={{ listStyleType: 'none' }}>
              { this.filterPosts.call(this) }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default PostList;
