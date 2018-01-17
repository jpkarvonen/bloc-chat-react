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



class App extends Component {

  constructor(props) {
     super(props);
     this.state = {
       firebase: firebase.initializeApp(config),
       activeRoomKey: '',
       activeRoomName:''
     };
   }


   handleRoomChange(room) {
     this.setState({activeRoomKey: room.key})
     this.setState({activeRoomName: room.name})
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
          />
          <RoomList
            firebase={this.state.firebase}
            activeRoomKey={this.state.activeRoomKey}
            onRoomChange={(room) => this.handleRoomChange(room)}
          />
          <User
            firebase={this.state.firebase}
          />
        </main>
      </div>
    );
  }

}

export default App;
