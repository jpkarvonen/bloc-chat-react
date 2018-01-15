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
      this.messagesRef.orderByChild("roomId").equalTo(this.props.activeRoomKey).on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message ) })
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
              <td className="message-number">{index + 1}</td>
              <td className="messageusername">UserName</td>
              <td className="message-content">{message.content}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
  }

}

export default MessageList;
