import React from 'react';

class PostFilter extends React.Component {
    constructor(props) {
        super();
    }
    
    renderUser(user){
        return (
            <option key={user.id} value={user.id} >{user.name}</option>
        )
    }
    
    render() {
        return (
            <div className="row">
                <div className="two columns">
                    Show posts for
                </div>
                <div className="three columns">
                    <select onChange={this.props.userOnChange} >
                        <option key="0" value="0">Show all</option>
                        { this.props.users.map((u) => this.renderUser(u))}
                    </select>
                </div>
            </div>
        );
    }
}

export default PostFilter;