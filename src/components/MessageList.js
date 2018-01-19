import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      displayedMessages: [],
      newMessage: '',
    };

    this.messagesRef = this.props.firebase.database().ref('messages');


  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.activeRoomKey !== this.props.activeRoomKey) {
      this.setState({displayedMessages: this.state.messages.filter(message => (message.roomId === nextProps.activeRoomKey))})
      }
    }

    handleSubmit(e) {
      e.preventDefault();
      console.log(typeof this.props.firebase.database.ServerValue.TIMESTAMP);
      this.messagesRef.push({
        content: this.state.newMessage,
        roomId: this.props.activeRoomKey,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        username: this.props.userName
      });
      this.setState({newMessage: ''});
    }

    handleChange(e) {
      this.setState( {newMessage: e.target.value })
    }

    /*convertTimeStamp() {
      const timeStamp = this.props.firebase.database.ServerValue.TIMESTAMP;
      console.log(this.props.firebase.database.ServerValue.TIMESTAMP);
      console.log(typeof this.props.firebase.database.ServerValue.TIMESTAMP);
      const min = Math.floor(timeStamp / 60000).toString();
      const sec = Math.floor(timeStamp % 60000).toString();
      if( isNaN(timeStamp) ) {return "-:--"}
      if (sec.length < 2) {return min + ':0' + sec;}
      return min + ':' + sec;
    }*/



  render() {
    return (
    <div>
      <h2>Messages</h2>
      <form className="send-message" onSubmit={ (e) => this.handleSubmit(e) }>
        <input type="text" value={ this.state.newMessage } onChange={ (e) => this.handleChange(e) } />
        <input type="submit" value="Send" />
      </form>
      <table className="message-list">
        <colgroup>
          <col id="message-number-col"/>
          <col id="message-username-col"/>
          <col id="message-content-col"/>
        </colgroup>
        <tbody>
          {this.state.displayedMessages.map( (message, index) =>
            <tr className="message">
              <td className="messageusername">{message.username}: </td>
              <td className="message-content">{message.content}</td>
              <td className="time-stamp">{message.sentAt}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
  }

}

export default MessageList;
