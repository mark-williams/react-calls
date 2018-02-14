import React from 'react';
import PropTypes from 'prop-types';

const Post = (props) => (
  <div key={ props.id }>
    <h5>{ props.post.title }</h5>
    <p>{ props.post.body }</p>
  </div>
);

Post.propTypes = {
  id: PropTypes.string,
  post: PropTypes.object
};

export default Post;
