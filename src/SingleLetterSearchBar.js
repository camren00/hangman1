import React from 'react';


// Use this class to allow the user to enter a letter
// this class needs a function passed as a prop called onSearch to handle the user's request
class SingleLetterSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

    handleInputChange = (event) => {
        const value = event.target.value.charAt(0); // Get only the first character
        this.setState({
            inputValue: value}
        );
    };

    handleSearchClick = () => {
      const val = this.state.inputValue;
      if (val.length !== 1) {
        alert('Please enter a single letter.');
        return;
      }
      const letter = val.toLowerCase();
      // If parent passed usedLetters, prevent duplicate guesses
      if (this.props.usedLetters && this.props.usedLetters.includes(letter)) {
        alert('You already guessed that letter.');
      } else if (typeof this.props.onSearch === 'function') {
        this.props.onSearch(letter);
      } else {
        console.warn('onSearch prop not provided to SingleLetterSearchbar');
      }
      // Clear input after search
      this.setState({
        inputValue: ''
      });
    };

  render() {
    return (
      <div className="search-row">
        <input
          className="search-input"
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          maxLength={1}
        />
        <button className="btn-primary" onClick={this.handleSearchClick}>Guess</button>
      </div>
    );
  }
}

export default SingleLetterSearchbar;