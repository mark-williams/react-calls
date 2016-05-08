import React from 'react';
import { Post } from './Post';
import reqwest from 'reqwest';
import postsStore from './PostsStore';
import { POSTS_RETRIEVED, postDataRetrieved } from './actions';

class PostList extends React.Component {
    
    constructor() {
        super();
        postsStore.subscribe(this.storeUpdated.bind(this));
        this.state = postsStore.getState();
    }
    
    componentDidMount() {
        reqwest({
            url: 'http://jsonplaceholder.typicode.com/posts'
            , type: 'jsonp'
            })
            .then(
                (resp) => postsStore.dispatch(postDataRetrieved(resp))
            )
            .fail((err, msg) => {
                console.log('ERROR: ' + err);
            })
     }
   
    storeUpdated() {
        this.setState(postsStore.getState());    
    }
    
    renderPost(p) {
        return (
            <li key={ p.id }>
                <Post post={ p } />
            </li> 
        );    
    }
       
    render() {
        console.log(this.state);
        return (
            <div className="row">
                <div className="eight columns">
                    <ul style={{ listStyleType: 'none' }}>
                        { this.state.posts.map(p => this.renderPost(p)) }
                    </ul>
                </div>
            </div>
        );           
    }
}
export default PostList;