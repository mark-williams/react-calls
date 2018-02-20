import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PostContainer = styled.div`
  margin-bottom: 2rem;
`;

const PostTitle = styled.div`
  font-size: 1.6rem;
  color: hsl(252, 20%, 40%);
  margin-bottom: 0.4rem;
  text-transform: capitalize 
`;

const PostBody = styled.div`
  color: hsl(0, 0%, 28%);
  margin: 0;
`;

const capitalizeFirst = (text) => {
  if (text.length <= 1) {
    return text;
  }
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
};

const Post = (props) => (
  <PostContainer key={ props.id }>
    <PostTitle>{ props.post.title }</PostTitle>
    <PostBody>{ capitalizeFirst(props.post.body) }</PostBody>
  </PostContainer>
);

Post.propTypes = {
  id: PropTypes.string,
  post: PropTypes.object
};

export default Post;
