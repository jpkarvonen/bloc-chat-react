import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';




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

class App extends Component {

  constructor(props) {
     super(props);
     this.state = {
       firebase: firebase,
       activeRoomKey: '',
       activeRoomName:'',
       userInfo: [],
       userName: 'Guest'
     };
   }


   handleRoomChange(room) {
     this.setState({activeRoomKey: room.key})
     this.setState({activeRoomName: room.name})
   }

   setUser(user) {
     this.setState({userInfo: user})
     this.setState({userName: user.displayName})
   }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat!</h1>
          <h2 className="Active-Room">You are chatting in: {this.state.activeRoomName}</h2>
        </header>
        <main>
          <MessageList
            firebase={this.state.firebase}
            activeRoomKey={this.state.activeRoomKey}
            user={this.state.userInfo}
            userName={this.state.userName}
          />
          <RoomList
            firebase={this.state.firebase}
            activeRoomKey={this.state.activeRoomKey}
            onRoomChange={(room) => this.handleRoomChange(room)}
            userInfo={this.state.userInfo}
            userName={this.state.userName}
          />
          <User
            firebase={this.state.firebase}
            authenticator={this.state.authenticator}
            setUser={(user) => this.setUser(user)}
            userInfo={this.state.userInfo}
            userName={this.state.userName}
          />
        </main>
      </div>
    );
  }

}

export default App;
