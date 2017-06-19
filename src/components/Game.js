import React, { Component } from 'react';
import './Game.css';
import fetch from 'isomorphic-fetch';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: {},
      score: 10,
      splited: {},
      success: false,
      replay: false
    };
    this.keyPress = this.keyPress.bind(this);
    this.getWord = this.getWord.bind(this);
    this.replayGame = this.replayGame.bind(this);
    this.continueGame = this.continueGame.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    var diffProps = (this.props !== nextProps);
    var diffState = (
      (this.state.word !== nextState.word) ||
      (this.state.score !== nextState.score)
    );
    return (diffProps || diffState);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate call');
  }

  componentDidMount() {
    console.log('componentDidMount call');

    this.getWord(function(err, res){
      res.bind.setState({
        word: res.word,
        splited: res.splited
      });
    })
  }

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  getWord(callback) {
    console.log('getWord Call');

    fetch('http://localhost:3000/word')
      .then(this.handleErrors)
      .then(response => response.json())
      .then(json => {
        var words;
        console.log(json);
        var word = { fr: json.fr, en: json.en };

        var frSplited = word.fr.split('');
        var enSplited = word.en.split('');
        var wordSplited = {
          fr: frSplited,
          en: enSplited
        };

        words = {
          word: word,
          splited: wordSplited,
          bind: this
        };
        callback(null, words);
      }).catch(error => {
        var words;
        var word = { fr: 'salut', en: 'hello' };
        var frSplited = word.fr.split('');
        var enSplited = word.en.split('');
        var wordSplited = {
          fr: frSplited,
          en: enSplited
        };

        words = {
          word: word,
          splited: wordSplited,
          bind: this
        };
        callback(null, words);
        console.log("Fetch error: ", error);
        console.log("If you're in the development mode. It's ok, the 'word' is initialized to { fr: 'salut', en: 'hello' } for simulation and test");
        console.log("If not, run: 'npm start' for build and start server");
      });
  }

  continueGame() {
    this.getWord(function(err, res){
      res.bind.setState({
        word: res.word,
        splited: res.splited,
        success: false
      });
    })
  }

  replayGame() {
    this.getWord(function(err, res){
      res.bind.setState({
        word: res.word,
        splited: res.splited,
        score: 10,
        success: false,
        replay: false
      });
    })
  }

  loseOrWinCheck(points) {
    if (points === 0 || points === 20) {
      return true;
    } else {
      return false;
    }
  }

  successWord() {
    var loseWin = this.loseOrWinCheck(this.state.score + 1);
    if (loseWin) {
      this.setState({
        score: this.state.score + 1,
        success: true,
        replay: true
      });
    } else {
      this.setState({
        score: this.state.score + 1,
        success: true
      });
    }

  }

  failWord() {
    var loseWin = this.loseOrWinCheck(this.state.score - 1);
    if (loseWin) {
      this.setState({
        score: this.state.score - 1,
        replay: true
      });
    } else {
      this.setState({
        score: this.state.score - 1
      });
    }
  }

  checkWord(word) {
    if (word.toLowerCase() === this.state.word.en) {
      this.successWord();
    } else {
      this.failWord();
    }
  }

  keyPress(e) {
    if (e.charCode === 13) {
      console.log('Enter ! ' + e.target.value);
      this.checkWord(e.target.value.trim());
    }
  }

  render() {
    return (
      <div className='Game'>
        { this.state.word.fr && this.state.splited.fr ?
          <div>
            <div className='Game-score'>Score {this.state.score} pts</div>

            { !this.state.replay ?
                <div className='Game-indication'>Reussirez-vous à traduire ce mot en anglais ?</div> :
                ( this.state.success ?
                  <div className='Game-indication Game-win'>YOU WIN</div> :
                  <div className='Game-indication Game-lose'>YOU LOSE</div>
                )
            }

            <div className='Game-word-fr'>
              {this.state.word.fr}
            </div>

            <div className='Game-word-en'>
              {this.state.splited.en.map((c, index) =>
                <div className={'Game-word-item' + ((!this.state.success && (index > 0)) ?
                    ' Game-char-hide' : '')}
                  key={'game-en-' + c + index}>
                  {c}
                </div>
              )}
            </div>

            <div className='Game-input-container'>
              { this.state.replay ?
                  <div className='Game-button-replay' onClick={this.replayGame}>Replay Game</div> :
                  ( this.state.success ?
                    <div className='Game-button-replay' onClick={this.continueGame}>Continue</div> :
                    <input placeholder='Tapez la réponse ici' className='Game-input' type='text' onKeyPress={this.keyPress} autoFocus />
                  )
              }
            </div>

          </div> :
          <div>No word</div>
        }
      </div>
    );
  }
}

export default Game;
