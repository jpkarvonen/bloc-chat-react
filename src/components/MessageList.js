import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.messagesRef = this.props.firebase.database().ref('messages');


  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.activeRoomKey !== this.props.activeRoomKey) {
      this.messagesRef.orderByChild("roomId").equalTo(nextProps.activeRoomKey).on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        if (message === null) {return (this.setState({ messages: [] })) }
        this.setState({ messages:[ message ] });
      });
    }
  }


  render() {
    return (
    <div>
      <h2>Messages</h2>
      <table className="message-list">
        <colgroup>
          <col id="message-number-col"/>
          <col id="message-username-col"/>
          <col id="message-content-col"/>
        </colgroup>
        <tbody>
          {this.state.messages.map( (message, index) =>
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
