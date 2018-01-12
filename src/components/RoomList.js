import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
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

  handleSubmit(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({newRoomName: ''});
  }

  handleChange(e) {
    this.setState( {newRoomName: e.target.value })
  }

  render() {
    return (
    <div>
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
      <form className="create-room" onSubmit={ (e) => this.handleSubmit(e) }>
        <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
        <input type="submit" value="Create a Room" />
      </form>
    </div>
    );
  }
}

export default RoomList;
