import React from 'react';
import { Post } from './Post';
import reqwest from 'reqwest';
import postsStore from './PostsStore';
import { 
    POSTS_RETRIEVED, 
    USERS_RETRIEVED, 
    USER_FILTER_CHANGE, 
} from './actions';
import { 
    postDataRetrieved, 
    usersDataRetrieved, 
    userFilterChange 
} from './actions';
import PostFilter from './PostFilter';

class PostList extends React.Component {
    
    constructor() {
        super();
        postsStore.subscribe(this.storeUpdated.bind(this));
        this.state = postsStore.getState();
    }
    
    componentDidMount() {
        console.log('Mounted!');
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
        reqwest({
            url: 'http://jsonplaceholder.typicode.com/users'
            , type: 'jsonp'
            })
            .then(
                (resp) => postsStore.dispatch(usersDataRetrieved(resp))
            )
            .fail((err, msg) => {
                console.log('ERROR: ' + err);
            })
    }
   
    componentDidUpdate() {
        console.log('Updated');
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
    
    userChanged(event) {
        postsStore.dispatch(userFilterChange(event.target.value))    
    }   

    filterPosts(){
        return this.state.posts
            .filter((u) => {
                //return true; 
                return (this.state.userFilter == 0) ? true : (u.userId === this.state.userFilter); 
            })
           .map(p => this.renderPost(p)); 
    }

      
    render() {
        console.log(this.state);
        return (
            <div>
                <div className="row">
                    <PostFilter users={this.state.users} userOnChange={this.userChanged} />
                </div>
                <div className="row">
                    <div className="eight columns">
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