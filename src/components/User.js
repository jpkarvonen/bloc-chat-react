import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

  }


  handleSignInClick() {
    const provider = this.props.authenticator
    this.props.firebase.auth().signInWithPopup( provider );
  }




  render() {
    return (
    <div>
      <button className="sign-in-button" onClick ={() => this.handleSignInClick()}>
        <span>Sign In</span>
      </button>
    </div>
    );
  }

}

export default User;
