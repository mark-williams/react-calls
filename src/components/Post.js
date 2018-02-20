import React from 'react';
import PropTypes from 'prop-types';

const Post = (props) => (
  <div key={ props.id }>
    <h4>{ props.post.title }</h4>
    <p>{ props.post.body }</p>
  </div>
);

Post.propTypes = {
  id: PropTypes.string,
  post: PropTypes.object
};

export default Post;
