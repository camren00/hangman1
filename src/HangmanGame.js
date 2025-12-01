import './App.css';
import React from 'react';
import LetterBox from './LetterBox';
import SingleLetterSearchbar from './SingleLetterSearchBar';
import Header from './Header';
import MissedLetters from './MissedLetters';
import WinLossModal from './WinLossModal';

// PNGs present in `public/` root — prefer these filenames (lowercase as in repo)
const pngFiles = [
  '/noose.png',
  '/upperbody.png',
  '/upperandlowerbody.png',
  '/1arm.png',
  '/botharms.png',
];
// SVG fallbacks in `public/images/` (already present)
const svgFiles = [
  '/images/noose.svg',
  '/images/upperBody.svg',
  '/images/upperandlower.svg',
  '/images/1arm.svg',
  '/images/botharms.svg',
];
const words = ["Morehouse", "Spelman", "Basketball", "Table", "Museum", "Excellent", "Fun", "React"];

class HangmanGame extends React.Component {
  state = {
    wordList: [],
    curWord:  0,
    lifeStage: 0,
    usedLetters: [],
    missedLetters: [],
    modalOpen: false,
    modalMessage: ''
  }

  componentDidMount() {
    this.setState({ wordList: words }, this.startNewGame);
  }

  startNewGame = () => {
    const cur = Math.floor(Math.random() * this.state.wordList.length);
    this.setState({
      curWord: cur,
      lifeStage: 0,
      usedLetters: [],
      missedLetters: [],
      modalOpen: false,
      modalMessage: ''
    });
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  checkWin = (word, usedLetters) => {
    // consider letters only, case-insensitive
    const lettersInWord = Array.from(new Set(word.toLowerCase().replace(/[^a-z]/g, '').split('')));
    return lettersInWord.every(l => usedLetters.includes(l));
  }

  handleLetterSearch = (letter) => {
    const word = (this.state.wordList[this.state.curWord] || '').toLowerCase();
    if (!letter || letter.length !== 1) return;
    if (this.state.usedLetters.includes(letter) || this.state.missedLetters.includes(letter)) return;

    if (word.includes(letter)) {
      this.setState((prev) => {
        const used = prev.usedLetters.concat(letter);
        const didWin = this.checkWin(word, used);
        if (didWin) {
          return { usedLetters: used, modalOpen: true, modalMessage: 'You won! 🎉' };
        }
        return { usedLetters: used };
      });
    } else {
      this.setState((prev) => {
        const missed = prev.missedLetters.concat(letter);
        const nextStage = prev.lifeStage + 1;
        const lost = nextStage >= pngFiles.length - 1;
        if (lost) {
          return { missedLetters: missed, lifeStage: nextStage, modalOpen: true, modalMessage: `You lost. The word was: ${this.state.wordList[this.state.curWord]}` };
        }
        return { missedLetters: missed, lifeStage: nextStage };
      });
    }
  }

  render(){
    const word = this.state.wordList[this.state.curWord] || '';
    const display = word.split('').map((ch, idx) => {
      const lower = ch.toLowerCase();
      if (!/[a-z]/.test(lower)) return ch; // keep spaces/punctuation
      return this.state.usedLetters.includes(lower) ? ch : '_';
    }).join(' ');

    const triesLeft = Math.max(0, pngFiles.length - 1 - this.state.lifeStage);

    return(
      <div>
        <Header onNewGame={this.startNewGame} />
        <main style={{ padding: 16 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div>
              <img
                src={pngFiles[this.state.lifeStage]}
                alt="hangman"
                style={{ width: 240 }}
                onError={(e) => {
                  // fallback to matching svg in /images/ if PNG missing or fails to load
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = svgFiles[this.state.lifeStage] || '/images/noose.svg';
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '1.25rem', letterSpacing: '4px' }}>{display}</div>
              <SingleLetterSearchbar onSearch={this.handleLetterSearch} usedLetters={[...this.state.usedLetters, ...this.state.missedLetters]} />
              <MissedLetters missed={this.state.missedLetters} triesLeft={triesLeft} />
              <div style={{ marginTop: 12 }}>
                <strong>Used:</strong> {this.state.usedLetters.join(', ') || 'None'}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <LetterBox 
              letter={word[0] || ''}
              isVisible={true}
              boxStyle={{ backgroundColor: 'lightblue' }}
              letterStyle={{ color: 'white', fontSize: '30px' }}
            />
          </div>
        </main>

        <WinLossModal isOpen={this.state.modalOpen} message={this.state.modalMessage} onClose={this.closeModal} onRestart={this.startNewGame} />
      </div>
    )
  }

}


export default HangmanGame;
