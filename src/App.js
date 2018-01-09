import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

<script src="https://www.gstatic.com/firebasejs/4.8.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjKIL83Ubw7Np6KnFQy_JpdtnZsYkV6_Y",
    authDomain: "bloc-chat-react-b9796.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-b9796.firebaseio.com",
    projectId: "bloc-chat-react-b9796",
    storageBucket: "bloc-chat-react-b9796.appspot.com",
    messagingSenderId: "184700416267"
  };
  firebase.initializeApp(config);
</script>

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
