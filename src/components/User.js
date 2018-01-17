import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

  }


  handleSignInClick = () => {
    console.log()
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
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
