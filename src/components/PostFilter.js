import React from 'react';
import PropTypes from 'prop-types';

class PostFilter extends React.Component {
  renderUser = (user) => (
    <option key={user.id} value={user.id} >{user.name}</option>
  );

  render = () => (
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

PostFilter.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  userOnChange: PropTypes.func
};

export default PostFilter;
