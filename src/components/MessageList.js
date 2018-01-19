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
      this.setState({displayedMessages: this.state.messages.filter(message => (message.roomId === this.props.activeRoomKey))});
    });
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.activeRoomKey !== this.props.activeRoomKey) {
      this.setState({displayedMessages: this.state.messages.filter(message => (message.roomId === nextProps.activeRoomKey))})
      }
    }

    handleSubmit(e) {
      e.preventDefault();
      this.messagesRef.push({
        content: this.state.newMessage,
        roomId: this.props.activeRoomKey,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        username: this.props.user ? this.props.user.displayName : 'Guest'
      });
      this.setState({newMessage: ''});
    }

    handleChange(e) {
      this.setState( {newMessage: e.target.value })
    }

    convertTimeStamp(timeStamp) {
      const date = new Date ( timeStamp );
      return date.toLocaleString();
    }



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
              <td className="time-stamp">{this.convertTimeStamp(message.sentAt)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
  }

}

export default MessageList;
