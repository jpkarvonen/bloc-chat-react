import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

  }


  handleSignInClick() {
    const provider = this.props.authenticator
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOutClick() {
    this.props.firebase.auth().signOut();
  }




  render() {
    return (
    <div className="sign-in-out">
      <button onClick ={() => this.handleSignInClick()}>
        <span>Sign In</span>
      </button>
      <button onClick ={() => this.handleSignOutClick()}>
        <span>Sign Out</span>
      </button>
    </div>
    );
  }

}

export default User;
