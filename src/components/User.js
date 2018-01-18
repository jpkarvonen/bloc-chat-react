import React, { Component } from 'react';


class User extends Component {


  handleSignInClick() {
    const provider = this.props.authenticator
    this.props.firebase.auth().signInWithPopup( provider ).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;

      //Lift user info to App state
      this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      });

      }).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      // ...
      });
    }

  handleSignOutClick() {
    this.props.firebase.auth().signOut().then(function() {

      //Lift user info to App state
      this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      });
      // Sign-out successful.

    }).catch(function(error) {
      // An error happened.
    });
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
