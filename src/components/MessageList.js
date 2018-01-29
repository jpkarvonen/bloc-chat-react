import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      displayedMessages: [],
      newMessage: '',
      sendMessageDisplay: 'none',
      deletedMessageKey: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');


  }

  componentDidMount() {

    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) }, () => {
        this.updateDisplayedMessages(this.props.activeRoomKey);
      });
    });

    this.messagesRef.on('child_removed', snapshot => {
      const removed = snapshot.val();
      const removedKey = snapshot.key;
      this.setState({messages: this.state.messages.filter(message => (message.key !== removedKey))}, () => {
        this.updateDisplayedMessages(this.props.activeRoomKey);
      });
    });

  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.activeRoomKey !== this.props.activeRoomKey) {
      this.updateDisplayedMessages(nextProps.activeRoomKey);
      }
    }

    updateDisplayedMessages(key) {
        this.setState({displayedMessages: this.state.messages.filter(message => (message.roomId === key ))});
    }

    handleSubmit(e) {
      e.preventDefault();
      if (this.props.activeRoomKey === 'none') { alert("Please select a room first."); this.setState({newMessage: ''}); return;}
      this.messagesRef.push({
        content: this.state.newMessage,
        roomId: this.props.activeRoomKey,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        username: this.props.user ? this.props.user.displayName : 'Guest'
      });
      this.messagesRef.on('child_changed', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({displayedMessages: this.state.messages.filter(message => (message.roomId === this.props.activeRoomKey))});
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

    deleteMessage(messageKey) {
      this.messagesRef.child(messageKey).remove();
    }




  render() {
    return (
    <div className="messages">
      <table className="message-list">
        <colgroup>
          <col id="message-number-col"/>
          <col id="message-username-col"/>
          <col id="message-content-col"/>
        </colgroup>
        <tbody>
          {this.state.displayedMessages.map( (message, index) =>
            <tr key={index}>
              <td className="messageusername">{message.username}: </td>
              <td className="message-content">{message.content}</td>
              <td className="time-stamp">{this.convertTimeStamp(message.sentAt)}</td>
              <td className="delete-message" onClick ={ (e) => this.deleteMessage(message.key) }>X</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        this.props.activeRoomKey &&
        <form
          className="send-message"
          onSubmit={ (e) => this.handleSubmit(e) }>
            <input className="message-text" type="text" value={ this.state.newMessage } onChange={ (e) => this.handleChange(e) } />
            <input className="submit-message" type="submit" value="Send" />
        </form>
      }
    </div>
    );
  }

}

export default MessageList;
