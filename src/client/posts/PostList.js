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
    postStartRetrieving,
    postDataRetrieved, 
    usersDataRetrieved, 
    userFilterChange 
} from './actions';
import { UI_LOADING, UI_LOADED } from './reducers';
import PostFilter from './PostFilter';

class PostList extends React.Component {
    
    constructor() {
        super();
        postsStore.subscribe(this.storeUpdated.bind(this));
        this.state = postsStore.getState();
    }
    
    componentDidMount() {
        postsStore.dispatch(postStartRetrieving());
        setTimeout(() => {
            reqwest({
                url: 'http://jsonplaceholder.typicode.com/posts'
                , type: 'json'
                })
                .then(
                    (resp) => postsStore.dispatch(postDataRetrieved(resp))
                )
                .fail((err, msg) => {
                    console.log('ERROR: ' + err);
                })
        }, 6000);
            
        reqwest({
            url: 'http://jsonplaceholder.typicode.com/users'
            , type: 'json'
            })
            .then(
                (resp) => postsStore.dispatch(usersDataRetrieved(resp))
            )
            .fail((err, msg) => {
                console.log('ERROR: ' + err);
            });
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
        // if (typeof this.state.posts === 'undefined') {
        //     return null;
        // }
        return this.state.posts
            .filter((u) => {
                return (this.state.userFilter == 0) ? true : (u.userId === this.state.userFilter); 
            })
           .map(p => this.renderPost(p)); 
    }
      
    render() {
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