import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: '',
      changedRoomName: '',
      modalDisplay: 'none',
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
    this.roomsRef.on('child_removed', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.filter(room => (room.key !== this.props.activeRoomKey))});
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({newRoomName: ''});
    this.closeModal();
  }

  createRoom() {
    this.setState({modalDisplay: 'block'})
  }

  closeModal() {
    this.setState({modalDisplay: 'none'})
  }

  deleteRoom(activeRoom) {
    if (this.props.activeRoomKey === 'none') { return alert("Please select a room first."); }
    this.roomsRef.child(activeRoom).remove();
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
    <div className="sidebar">
      <h3 className="sidebar-title">Available Rooms</h3>
      <button className="create-room-btn" onClick ={ (e) => this.createRoom()}>New Room</button>
        <div className="modal" style={{display: this.state.modalDisplay}}>
          <span className="close" onClick ={ (e) => this.closeModal()}>&times;</span>
          <form className="create-room" onSubmit={ (e) => this.handleSubmit(e) }>
            <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
            <input type="submit" value="Submit" />
          </form>
        </div>
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
     </div>
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
