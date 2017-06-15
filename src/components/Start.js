import React, { Component } from 'react';
import './Start.css';

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }
  
  render() {
    return (
      <div className='Start'>
        <div className='Start-indication'>Click to play</div>
        <div className='Start-button' onClick={this.props.onClick}>Click</div>
      </div>
    );
  }
}

export default Start;
