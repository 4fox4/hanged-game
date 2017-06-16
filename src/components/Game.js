import React, { Component } from 'react';
import './Game.css';

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
    this.getWordSplitted = this.getWordSplitted.bind(this);
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
    var word = this.getWord();
    var wordSplited = this.getWordSplitted(word);
    this.setState({
      word: word,
      splited: wordSplited
    });
  }

  getWordSplitted(word) {
    var frSplited = word.fr.split('');
    var enSplited = word.en.split('');
    var wordSplited = {
      fr: frSplited,
      en: enSplited
    };
    return wordSplited;
  }

  getWord() {
    console.log('getWord Call');
    var word = { fr: 'bonjour', en: 'hello' };
    return word;
  }

  continueGame() {
    var word = this.getWord();
    var wordSplited = this.getWordSplitted(word);
    this.setState({
      word: word,
      splited: wordSplited,
      success: false
    });
  }

  replayGame() {
    var word = this.getWord();
    var wordSplited = this.getWordSplitted(word);
    this.setState({
      word: word,
      splited: wordSplited,
      score: 10,
      success: false,
      replay: false
    });
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
    if (word === this.state.word.en) {
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
            <div className='Game-score'>Score: {this.state.score} pts</div>

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
                    <input placeholder='Tapez la réponse ici' className='Game-input' type='text' onKeyPress={this.keyPress} />
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
