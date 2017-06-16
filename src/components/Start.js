import React, { Component } from 'react';
import './Start.css';

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className='Start'>
        <div className='Start-indication'>Click to play</div>
        <div className='Start-button' onClick={this.props.onClick}>PLAY</div>
      </div>
    );
  }
}

export default Start;
