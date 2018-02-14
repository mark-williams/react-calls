import React from 'react';
    
export const Post = (props) => (
  <div key={ props.id }>
    <h5>{ props.post.title }</h5>
    <p  >{ props.post.body }</p>
  </div>  
);