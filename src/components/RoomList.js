import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: '',
      changedRoomName: '',
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

  deleteRoom(activeRoom) {
    if (this.props.activeRoomKey === 'none') { return alert("Please select a room first."); }
    this.roomsRef.child(activeRoom).remove();
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  changeRoomName(activeRoom, e) {
    e.preventDefault();
    if (this.props.activeRoomKey === 'none') { return alert("Please select a room first."); }
    this.roomsRef.child(activeRoom).set({ 'name': this.state.changedRoomName });
    this.setState({ changedRoomName: ''});
  }


  handleChange(e) {
    this.setState( {newRoomName: e.target.value })
  }

  handleRoomNameChange(e) {
    this.setState( {changedRoomName: e.target.value })
  }

  // Lifting State
  handleRoomClick(room) {
    this.props.onRoomChange(room)
  }

  render() {
    return (
    <div>
      <table className="room-list">
        <colgroup>
          <col id="room-number-col"/>
          <col id="room-name-col"/>
        </colgroup>
        <tbody>
          {this.state.rooms.map( (room, index) =>
            <tr className="room" key={index} onClick ={ (e) => this.handleRoomClick(room) }>
              <td className="room-number">{index + 1}</td>
              <td className="room-name">{room.name}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form className="create-room" onSubmit={ (e) => this.handleSubmit(e) }>
        <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
        <input type="submit" value="Create a Room" />
      </form>
      <button className="delete-room" onClick ={ (e) => this.deleteRoom(this.props.activeRoomKey) }>
        <span> Delete Current Room </span>
      </button>
      <form className="change-room-name" onSubmit={ (e) => this.changeRoomName(this.props.activeRoomKey, e) }>
        <input type="text" value={ this.state.changedRoomName } onChange={ (e) => this.handleRoomNameChange(e) } />
        <input type="submit" value="Change Current Room Name" />
      </form>
      </div>
    );
  }

}

export default RoomList;
