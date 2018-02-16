import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from './Post';
import PostFilter from './PostFilter';

import {
  userFilterChange,
  getData
} from '../actions';
import { UI_LOADING } from '../reducers';

class PostList extends React.Component {
  componentDidMount = () => {
    this.props.getData();
  }

  renderPost = (p) => (
    <li key={p.id}>
      <Post post={p} />
    </li>
  );

  userChanged = (event) => {
    this.props.userFilterChange(event.target.value);
  }

  filterPosts = () => {
    return this.props.posts.filter((u) => {
      return (this.props.userFilter === 0) ? true : (u.userId === this.props.userFilter);
    }).map(p => this.renderPost(p));
  }

  render = () => {
    let retrievingMessage = '';
    if (this.props.uiState === UI_LOADING) {
      retrievingMessage = <div>Just getting your data, thanks for your patience</div>;
    }

    return (
      <div>
        <div className="row">
          <PostFilter users={this.props.users} userOnChange={this.userChanged} />
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

PostList.propTypes = {
  posts: PropTypes.array,
  users: PropTypes.array,
  userFilter: PropTypes.number,
  uiState: PropTypes.string,
  getData: PropTypes.func,
  userFilterChange: PropTypes.func
};

const mapStateToProps = state => {
  return {
    posts: state.posts,
    users: state.users,
    userFilter: state.userFilter,
    uiState: state.uiState
  };
};

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData()),
  userFilterChange: user => dispatch(userFilterChange(user))
});

const container = connect(mapStateToProps, mapDispatchToProps)(PostList);

export default container;
