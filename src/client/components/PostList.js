import React from 'react';
import { Post } from './Post';
import reqwest from 'reqwest';

class PostList extends React.Component {
    
    constructor() {
        super();
        
        this.state = { posts: [] };
    }
    
    componentDidMount() {
        reqwest({
            url: 'http://jsonplaceholder.typicode.com/posts'
            , type: 'jsonp'
            })
            .then(
                (resp) => this.setState({posts: resp})
            )
            .fail(function (err, msg) {
            })
            .always(function (resp) {
            })
    }
    //
            //)
               
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