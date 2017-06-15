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
    };
    this.keyPress = this.keyPress.bind(this);
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
    // this.setState({
    //   success: false
    // });
  }

  componentDidMount() {
    console.log('componentDidMount call');
    this.getWord();
  }

  getWord() {
    console.log('getWord Call');
    var word = { fr: 'bonjour', en: 'hello' };
    var frSplited = word.fr.split('');
    var enSplited = word.en.split('');
    var wordSplited = {
      fr: frSplited,
      en: enSplited
    };
    console.log(word);
    console.log(wordSplited);
    this.setState({
      word: word,
      splited: wordSplited
    });
  }

  checkWord(word) {
    if (word === this.state.word.en) {
      this.setState({
        score: this.state.score + 1,
        success: true
      });
    } else {
      this.setState({
        score: this.state.score - 1
      });
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

            <div className='Game-indication'>Reussirez vous à traduire ce mot en anglais ?</div>

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
              <input placeholder='Tapez la réponse ici' className='Game-input' type='text' onKeyPress={this.keyPress} />
            </div>

          </div> :
          <div>No word</div>
        }
      </div>
    );
  }
}

export default Game;
