import React, { Component } from 'react';

class Album extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
