import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  /*
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }
  */

  /*
  handleSubmit(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.newRoomName });
  }
  */

  /*
  handleChange(e) {
    this.setState( {newRoomName: e.target.value })
  }
  */

  render() {
    return (
    <div>
      <h1>Messages</h1>
    </div>
    );
  }
}
