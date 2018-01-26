import React, { Component } from 'react';
import * as firebase from 'firebase';
//import logo from './logo.svg';
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
       activeRoomKey: 'none',
       activeRoomName:'Nowhere! Select a room, please.',
       user: null
     };
   }


   handleRoomChange(room) {
     this.setState({activeRoomKey: room.key})
     this.setState({activeRoomName: room.name})
   }

   setUser(user) {
     this.setState({user: user})
   }

   checkUser() {
     if (!this.state.user) {
       return "Guest"
     }
      return this.state.user.displayName;
   }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat!</h1>
          <h4 className="Active-Room">{this.checkUser()}, you are chatting in: {this.state.activeRoomName}</h4>
        </header>
        <main>
          <MessageList
            firebase={this.state.firebase}
            activeRoomKey={this.state.activeRoomKey}
            user={this.state.user}
          />
          <RoomList
            firebase={this.state.firebase}
            activeRoomKey={this.state.activeRoomKey}
            onRoomChange={(room) => this.handleRoomChange(room)}
            user={this.state.user}
          />
          <User
            firebase={this.state.firebase}
            authenticator={this.state.authenticator}
            setUser={(user) => this.setUser(user)}
            user={this.state.user}
          />
        </main>
      </div>
    );
  }

}

export default App;
