import React, { Component } from 'react';
import './App.css';
import Start from './Start.js';
import Game from './Game.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false
    };
    this.startGame = this.startGame.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    var diffProps = (this.props !== nextProps);
    var diffState = (this.state.start !== nextState.start);
    console.log("shouldComponentUpdate: props, states => ", diffProps, diffState);
    return (diffProps || diffState);
  }

  componentDidMount() {
    
  }

  startGame() {
    console.log('startGame call');
    this.setState({ start: true });
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <div className='App-title'>Hanged Game</div>
        </div>
        <div className='App-content'>
          { this.state.start ? <Game /> : <Start onClick={this.startGame} /> }
        </div>
      </div>
    );
  }
}

export default App;
