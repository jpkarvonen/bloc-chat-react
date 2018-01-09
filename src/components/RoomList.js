import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  render() {
    return (
      <table className="chat-list">
        <colgroup>
          <col id="chat-number-col"/>
          <col id="chat-name-col"/>
        </colgroup>
        <tbody>
          {this.state.rooms.map( (chat, index) =>
            <tr className="chat">
              <td className="chat-number">{index + 1}</td>
              <td className="chat-name">{chat.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default RoomList;
