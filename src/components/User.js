import React, { Component } from 'react';


class User extends Component {


  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);

    });
  }

  handleSignInClick() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    
    this.props.firebase.auth().signInWithPopup( provider ).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //let token = result.credential.accessToken;
      // The signed-in user info.
      //let user = result.user;

      }).catch(function(error) {
      // Handle Errors here.
      //let errorCode = error.code;
      //let errorMessage = error.message;
      // The email of the user's account used.
      //let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //let credential = error.credential;
      // ...
      });
    }

  handleSignOutClick() {
    this.props.firebase.auth().signOut().then(function() {
      // Sign-out successful.

    }).catch(function(error) {
      // An error happened.
    });
  }

  checkUser() {
    if (!this.props.user) {
      return "Guest"
    }
     return this.props.user.displayName;
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
      <h3>Welcome {this.checkUser()}</h3>
    </div>
    );
  }

}

export default User;
